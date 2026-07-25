import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { StoreProvider } from "@/components/providers/store-provider";
import { BackToTop } from "@/components/back-to-top";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ToastCenter } from "@/components/toast-center";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumea-ai.example"),
  title: {
    default: "LUMEA AI | Create Museum-Quality Wall Art with AI",
    template: "%s | LUMEA AI",
  },
  description:
    "LUMEA AI is a premium static MVP for generating custom wall art from a prompt, previewing it in refined interiors, and downloading polished visual concepts.",
  keywords: [
    "AI wall art generator",
    "custom wall art",
    "generate wall art with AI",
    "digital wall art creator",
    "printable wall art generator",
    "luxury AI art",
  ],
  openGraph: {
    title: "LUMEA AI",
    description: "Create museum-quality wall art in seconds, then preview it in curated room mockups.",
    images: ["https://picsum.photos/seed/ai-wall-art-og/1200/630"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMEA AI",
    description: "Create museum-quality wall art in seconds.",
    images: ["https://picsum.photos/seed/ai-wall-art-og/1200/630"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-[#FAFAF8] text-[#111111]">
        <ThemeProvider>
          <StoreProvider>
            <Navbar />
            <main className="mx-auto w-[min(1240px,92%)] flex-1 py-10 md:py-12">{children}</main>
            <Footer />
            <BackToTop />
            <ToastCenter />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
