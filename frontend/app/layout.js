import "./globals.css";

export const metadata = {
  title: "Mão na Roda",
  description: "Encontre os melhores prestadores de serviço em Maricá",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}