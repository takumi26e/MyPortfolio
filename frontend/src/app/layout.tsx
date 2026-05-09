import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sagara Takumi — Portfolio",
  description:
    "Sagara Takumi のポートフォリオサイト。Web技術の学習や趣味のイラスト・映像制作の記録。",
  keywords: ["portfolio", "web", "illust", "movie", "Sagara Takumi"],
  openGraph: {
    title: "Sagara Takumi — Portfolio",
    description: "Sagara Takumi のポートフォリオサイト。",
    url: "https://sagaratakumi.com",
    siteName: "Sagara Takumi Portfolio",
    images: [
      {
        url: "https://sagaratakumi.com/images/ogp.png",
        width: 1200,
        height: 630,
        alt: "Sagara Takumi Portfolio",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Sagara Takumi — Portfolio",
    description: "Sagara Takumi のポートフォリオサイト。",
    images: ["https://sagaratakumi.com/images/ogp-square.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={inter.variable}>
      <body>
        <Navigation />
        <main
          style={{
            marginLeft: "var(--nav-width)",
            minHeight: "100dvh",
          }}
        >
          {children}
        </main>

        {/* Mobile: bottom nav offset */}
        <style>{`
          @media (max-width: 767px) {
            main {
              margin-left: 0 !important;
              padding-bottom: var(--nav-height-mobile);
            }
          }
        `}</style>
      </body>
    </html>
  );
}
