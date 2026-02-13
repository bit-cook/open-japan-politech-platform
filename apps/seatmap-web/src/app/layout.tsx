import { NavigationBar, SmoothScrollProvider, ScrollReveal } from "@ojpp/ui";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" });

export const metadata: Metadata = {
  title: "SeatMap - 国会の議席勢力図を可視化",
  description: "衆議院・参議院の議席構成を一目で把握。過去10年の選挙結果を比較し、政治勢力の変遷を可視化する。",
  openGraph: {
    title: "SeatMap - 国会の議席勢力図を可視化",
    description: "衆議院・参議院の議席構成を一目で把握。過去10年の選挙結果を比較し、政治勢力の変遷を可視化する。",
    siteName: "Open Japan PoliTech Platform",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SeatMap - 国会の議席勢力図を可視化",
    description: "衆議院・参議院の議席構成を一目で把握。過去10年の選挙結果を比較し、政治勢力の変遷を可視化する。",
  },
};

const NAV_ITEMS = [
  { href: "/", label: "勢力図" },
  { href: "/elections", label: "選挙一覧" },
  { href: "/compare", label: "比較" },
  { href: "/api-docs", label: "API" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        <NavigationBar
          brand="SeatMap"
          brandColor="text-orange-600"
          items={NAV_ITEMS}
          accentColor="hover:text-orange-600"
        />
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-800">
          v0.1 デモ版 — 選挙データは総務省公開資料に基づいています
        </div>
        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
        <ScrollReveal>
          <footer className="border-t bg-white py-8 text-center text-sm text-gray-500">
            <p>国会の勢力図を誰でも見える形に — AIエージェント時代の政治インフラ</p>
            <p className="mt-1">Open Japan PoliTech Platform v0.1 | AGPL-3.0</p>
          </footer>
        </ScrollReveal>
      </body>
    </html>
  );
}
