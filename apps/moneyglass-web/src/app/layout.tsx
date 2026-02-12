import { NavigationBar } from "@ojpp/ui";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto-sans-jp" });

export const metadata: Metadata = {
  title: "MoneyGlass - 政治資金を、ガラスのように透明に",
  description:
    "全政党・全政治団体の資金の流れを可視化。AIエージェントが24時間監視・分析し、誰もが政治資金の実態にアクセスできる。",
};

const NAV_ITEMS = [
  { href: "/", label: "ダッシュボード" },
  { href: "/organizations", label: "団体一覧" },
  { href: "/parties", label: "政党別" },
  { href: "/api-docs", label: "API" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-gray-50 font-sans text-gray-900 antialiased">
        <NavigationBar
          brand="MoneyGlass"
          brandColor="text-blue-600"
          items={NAV_ITEMS}
          accentColor="hover:text-blue-600"
        />
        <main>{children}</main>
        <footer className="border-t bg-white py-8 text-center text-sm text-gray-500">
          <p>AIエージェント時代の政治資金監視 — 人間が見ていなくても、エージェントが見ている</p>
          <p className="mt-1">政党にも企業にもよらない、完全オープンな政治テクノロジー基盤</p>
          <p className="mt-1">Open Japan PoliTech Platform | AGPL-3.0</p>
        </footer>
      </body>
    </html>
  );
}
