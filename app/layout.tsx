import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title:
    "URDUME · Tecelagem digital: gerar ligamentos e exportar matriz e tecido SVG",
  description:
    "Tecelagem digital: gerar ligamentos e exportar matriz e tecido SVG",
  metadataBase: new URL("https://urdume-gustapaz.starrylinen.chatgpt.site"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "URDUME",
    description:
      "Tecelagem digital: gerar ligamentos e exportar matriz e tecido SVG",
    type: "website",
    locale: "pt_BR",
  },
  icons: { icon: "/favicon.svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
