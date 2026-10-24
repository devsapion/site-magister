import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted copies of the Google Fonts files the source page loads.
const sora = localFont({
  src: "../../public/sites/magister/fonts/sora-latin.woff2",
  variable: "--font-sora-src",
  weight: "100 800",
  display: "swap",
});

const roboto = localFont({
  src: "../../public/sites/magister/fonts/roboto-latin.woff2",
  variable: "--font-roboto-src",
  weight: "100 900",
  display: "swap",
});

const poppins = localFont({
  src: [
    { path: "../../public/sites/magister/fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/sites/magister/fonts/poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins-src",
  display: "swap",
});

const description =
  "Transformamos a formação de professores por meio da empatia, personalização e gamificação. Conheça as trilhas de aprendizagem da Sapion Magister.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL to the deployed origin so Open Graph image URLs resolve correctly.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Maior Plataforma de Formação de Professores do Brasil - Sapion Magister",
  description,
  icons: { icon: "/sites/magister/images/favicon.png" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Sapion Magister",
    title: "Maior Plataforma de Formação de Professores do Brasil - Sapion Magister",
    description,
    images: [{ url: "/sites/magister/images/sparkle.png", width: 176, height: 176 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${sora.variable} ${roboto.variable} ${poppins.variable} antialiased`}
    >
      <body className="min-h-full bg-mg-violet font-sans text-[#333]">{children}</body>
    </html>
  );
}
