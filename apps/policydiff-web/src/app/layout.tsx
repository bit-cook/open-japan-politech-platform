import { NavigationBar, SmoothScrollProvider, ScrollReveal } from "@ojpp/ui";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" });

export const metadata: Metadata = {
  title: "PolicyDiff - 全政党の政策を、差分で比較する",
  description:
    "全政党のマニフェスト・政策をバージョン管理。AIエージェントが変更を追跡し、誰もが政策の違いと変遷を即座に把握できる。",
  openGraph: {
    title: "PolicyDiff - 全政党の政策を、差分で比較する",
    description:
      "全政党のマニフェスト・政策をバージョン管理。AIエージェントが変更を追跡し、誰もが政策の違いと変遷を即座に把握できる。",
    siteName: "Open Japan PoliTech Platform",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PolicyDiff - 全政党の政策を、差分で比較する",
    description:
      "全政党のマニフェスト・政策をバージョン管理。AIエージェントが変更を追跡し、誰もが政策の違いと変遷を即座に把握できる。",
  },
};

const NAV_ITEMS = [
  { href: "/", label: "ダッシュボード" },
  { href: "/category/教育", label: "カテゴリ別" },
  { href: "/compare", label: "政党比較" },
  { href: "/proposals", label: "提案" },
  { href: "/api-docs", label: "API" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        <NavigationBar
          brand="PolicyDiff"
          brandColor="text-green-600"
          items={NAV_ITEMS}
          accentColor="hover:text-green-600"
        />
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-800">
          v0.1 デモ版 —
          政策データは各党の公式マニフェストを参考にしたデモ用データです。公式の政策文書ではありません。
        </div>
        <SmoothScrollProvider>
          <main>{children}</main>
        </SmoothScrollProvider>
        <ScrollReveal>
          <footer className="border-t bg-white py-8 text-center text-sm text-gray-500">
            <p>AIエージェント時代の政策比較 — あなたのエージェントが全政党の政策を常時分析する</p>
            <p className="mt-1">政党にも企業にもよらない、完全オープンな政治テクノロジー基盤</p>
            <p className="mt-1">Open Japan PoliTech Platform v0.1 | AGPL-3.0</p>
          </footer>
        </ScrollReveal>
      </body>
    </html>
  );
}
