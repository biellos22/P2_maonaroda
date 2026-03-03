import "./globals.css";

export const metadata = {
  title: "Maricá Service",
  description: "Encontre os melhores prestadores de serviço em Maricá",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}