import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get("src");

  if (!src) {
    return NextResponse.json({ error: "Artwork source is required." }, { status: 400 });
  }

  let targetUrl: URL;

  try {
    targetUrl = new URL(src);
  } catch {
    return NextResponse.json({ error: "Artwork source must be a valid URL." }, { status: 400 });
  }

  if (targetUrl.protocol !== "https:") {
    return NextResponse.json({ error: "Only HTTPS artwork sources are supported." }, { status: 400 });
  }

  const response = await fetch(targetUrl, { cache: "no-store" });
  if (!response.ok) {
    return NextResponse.json({ error: "Unable to fetch the artwork source." }, { status: 502 });
  }

  return new NextResponse(await response.arrayBuffer(), {
    headers: {
      "content-type": response.headers.get("content-type") ?? "image/png",
      "cache-control": "no-store",
    },
  });
}
