import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ei, James Manutenção - Gestão de Limpeza de Piscinas",
  description: "Sistema completo de gestão para empresas de limpeza e manutenção de piscinas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
