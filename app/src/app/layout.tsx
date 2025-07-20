import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/session-provider";

export const metadata: Metadata = {
  title: "TL Practice - Professional Dashboard",
  description: "A professional dashboard application with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Fira+Code:wght@400;500;600&family=Outfit:wght@400;500;600;700&family=Source+Serif+Pro:wght@400;600&family=Space+Mono:wght@400;700&family=Libre+Baskerville:wght@400;700&family=Open+Sans:wght@400;500;600;700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
