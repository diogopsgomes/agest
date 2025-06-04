import { Metadata } from "next";

import "../globals.css";

export const metadata: Metadata = {
  title: "AGEST",
  description: "Gestão de Agências",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
