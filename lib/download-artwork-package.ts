"use client";

import JSZip from "jszip";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { GeneratedArtwork } from "@/types/wall-art";

const printSizes = [
  { label: "30x40 cm", widthCm: 30, heightCm: 40 },
  { label: "50x70 cm", widthCm: 50, heightCm: 70 },
  { label: "70x100 cm", widthCm: 70, heightCm: 100 },
  { label: "100x140 cm", widthCm: 100, heightCm: 140 },
] as const;

const CM_TO_POINTS = 28.3464567;

export async function downloadPreviewImage(artwork: GeneratedArtwork) {
  const source = await loadArtworkSource(artwork.image);
  const watermarked = await renderWatermarkedPreview(source);
  const filename = `${slugify(artwork.title)}-preview.jpg`;
  downloadBlob(watermarked, filename);
}

export async function downloadArtworkPackage(artwork: GeneratedArtwork) {
  const source = await loadArtworkSource(artwork.image);
  const pngBytes = source.mimeType === "image/png" ? source.bytes : await convertImageBytes(source, "image/png");
  const jpgBytes = source.mimeType === "image/jpeg" ? source.bytes : await convertImageBytes(source, "image/jpeg");
  const pdfBytes = source.mimeType === "image/jpeg" || source.mimeType === "image/png" ? source.bytes : pngBytes;
  const pdfMimeType = source.mimeType === "image/jpeg" ? "image/jpeg" : "image/png";

  const zip = new JSZip();
  zip.file("Artwork.png", pngBytes);
  zip.file("Artwork.jpg", jpgBytes);

  for (const size of printSizes) {
    const pdf = await buildArtworkPdf(pdfBytes, pdfMimeType, size.widthCm, size.heightCm, artwork.title);
    zip.file(`${size.label}/Artwork.pdf`, pdf);
  }

  zip.file("Guides/Printing Guide.pdf", await buildGuidePdf("Printing Guide", [
    "Use heavyweight matte or fine art paper for the calmest premium finish.",
    "Print at 100% scale with borderless output disabled unless your printer supports it cleanly.",
    "Allow dark tones to dry fully before framing to preserve contrast and texture.",
  ]));
  zip.file("Guides/Recommended Paper.pdf", await buildGuidePdf("Recommended Paper", [
    "Textured matte cotton rag for gallery softness.",
    "Smooth museum matte for minimal interiors and neutral palettes.",
    "Archival canvas for larger statement pieces with premium depth.",
  ]));
  zip.file("Guides/Color Profile.pdf", await buildGuidePdf("Color Profile", [
    "Exported for premium print workflows with sRGB-friendly output.",
    "For professional labs, request profile matching before final production.",
    "Always soft-proof warm neutrals if you are printing on textured stock.",
  ]));

  const blob = await zip.generateAsync({ type: "blob" });
  downloadBlob(blob, `${slugify(artwork.title)}-print-ready-package.zip`);
}

async function loadArtworkSource(source: string) {
  if (source.startsWith("data:")) {
    return decodeDataUri(source);
  }

  const response = await fetch(`/api/artwork-source?src=${encodeURIComponent(source)}`);
  if (!response.ok) {
    throw new Error("Unable to load the artwork source for download.");
  }

  const bytes = new Uint8Array(await response.arrayBuffer());
  const mimeType = normalizeMimeType(response.headers.get("content-type"));
  return { bytes, mimeType };
}

function decodeDataUri(source: string) {
  const [metadata, encoded] = source.split(",", 2);
  if (!metadata || !encoded) {
    throw new Error("Invalid image data received.");
  }

  const mimeType = normalizeMimeType(metadata.match(/^data:(.*?);base64$/)?.[1] ?? "image/png");
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return { bytes, mimeType };
}

async function renderWatermarkedPreview(source: { bytes: Uint8Array; mimeType: string }) {
  const canvas = await drawImageToCanvas(source);
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("Preview rendering is unavailable in this browser.");
  }

  context.fillStyle = "rgba(17, 17, 17, 0.64)";
  context.fillRect(canvas.width - 360, canvas.height - 110, 320, 58);
  context.fillStyle = "#FAFAF8";
  context.font = "600 26px Inter, Arial, sans-serif";
  context.fillText("LUMEA AI PREVIEW", canvas.width - 328, canvas.height - 72);

  const blob = await canvasToBlob(canvas, "image/jpeg", 0.9);
  return blob;
}

async function convertImageBytes(source: { bytes: Uint8Array; mimeType: string }, mimeType: "image/png" | "image/jpeg") {
  const canvas = await drawImageToCanvas(source);
  const blob = await canvasToBlob(canvas, mimeType, mimeType === "image/jpeg" ? 0.94 : 1);
  return new Uint8Array(await blob.arrayBuffer());
}

async function drawImageToCanvas(source: { bytes: Uint8Array; mimeType: string }) {
  const byteCopy = new Uint8Array(source.bytes.byteLength);
  byteCopy.set(source.bytes);
  const objectUrl = URL.createObjectURL(
    new Blob([byteCopy], { type: source.mimeType }),
  );

  try {
    const imageElement = await loadImageElement(objectUrl);
    const maxWidth = 1600;
    const ratio = Math.min(1, maxWidth / imageElement.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(imageElement.width * ratio);
    canvas.height = Math.round(imageElement.height * ratio);
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Canvas rendering is unavailable in this browser.");
    }

    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    return canvas;
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

async function buildArtworkPdf(
  imageBytes: Uint8Array,
  mimeType: "image/png" | "image/jpeg",
  widthCm: number,
  heightCm: number,
  title: string,
) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([widthCm * CM_TO_POINTS, heightCm * CM_TO_POINTS]);
  const embeddedImage = mimeType === "image/png" ? await pdf.embedPng(imageBytes) : await pdf.embedJpg(imageBytes);
  const margin = 36;
  const drawScale = Math.min(
    (page.getWidth() - margin * 2) / embeddedImage.width,
    (page.getHeight() - margin * 2) / embeddedImage.height,
  );
  const drawWidth = embeddedImage.width * drawScale;
  const drawHeight = embeddedImage.height * drawScale;
  const x = (page.getWidth() - drawWidth) / 2;
  const y = (page.getHeight() - drawHeight) / 2;

  page.drawRectangle({
    x: 0,
    y: 0,
    width: page.getWidth(),
    height: page.getHeight(),
    color: rgb(1, 1, 1),
  });
  page.drawImage(embeddedImage, { x, y, width: drawWidth, height: drawHeight });
  page.drawText(title, {
    x: margin,
    y: page.getHeight() - margin + 6,
    size: 10,
    color: rgb(0.42, 0.45, 0.5),
  });

  return pdf.save();
}

async function buildGuidePdf(title: string, lines: string[]) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const headingFont = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const bodyFont = await pdf.embedFont(StandardFonts.Helvetica);
  let cursorY = 760;

  page.drawText(title, {
    x: 56,
    y: cursorY,
    size: 28,
    font: headingFont,
    color: rgb(0.07, 0.07, 0.07),
  });

  cursorY -= 54;

  for (const line of lines) {
    page.drawText(line, {
      x: 56,
      y: cursorY,
      size: 12,
      lineHeight: 18,
      maxWidth: 480,
      font: bodyFont,
      color: rgb(0.42, 0.45, 0.5),
    });
    cursorY -= 44;
  }

  return pdf.save();
}

function normalizeMimeType(mimeType: string | null) {
  if (mimeType?.includes("jpeg")) {
    return "image/jpeg" as const;
  }

  return "image/png" as const;
}

function loadImageElement(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const imageElement = new window.Image();
    imageElement.onload = () => resolve(imageElement);
    imageElement.onerror = () => reject(new Error("Unable to render the generated artwork."));
    imageElement.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: "image/png" | "image/jpeg", quality: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Unable to prepare the artwork download."));
        return;
      }

      resolve(blob);
    }, mimeType, quality);
  });
}

function downloadBlob(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
