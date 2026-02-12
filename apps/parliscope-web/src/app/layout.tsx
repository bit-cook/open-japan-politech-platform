import { NavigationBar } from "@ojpp/ui";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" });

export const metadata: Metadata = {
  title: "ParliScope - 議会を、すべての人とエージェントに開く",
  description:
    "国会・地方議会の全データをAPI化。AIエージェントが法案を要約・分析し、誰もが議会の動きをリアルタイムに把握できる。",
};

const NAV_ITEMS = [
  { href: "/", label: "ダッシュボード" },
  { href: "/bills", label: "法案" },
  { href: "/sessions", label: "会期" },
  { href: "/politicians", label: "議員" },
  { href: "/api-docs", label: "API" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        <NavigationBar
          brand="ParliScope"
          brandColor="text-purple-600"
          items={NAV_ITEMS}
          accentColor="hover:text-purple-600"
        />
        <main>{children}</main>
        <footer className="border-t bg-white py-8 text-center text-sm text-gray-500">
          <p>AIエージェント時代の議会監視 — エージェントが全法案を読み、あなたに届ける</p>
          <p className="mt-1">政党にも企業にもよらない、完全オープンな政治テクノロジー基盤</p>
          <p className="mt-1">Open Japan PoliTech Platform | AGPL-3.0</p>
        </footer>
      </body>
    </html>
  );
}
