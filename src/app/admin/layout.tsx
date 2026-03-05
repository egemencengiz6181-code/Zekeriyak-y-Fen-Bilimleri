import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Renee Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="bg-[#09060f] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
