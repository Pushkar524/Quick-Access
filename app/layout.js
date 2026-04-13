import "./globals.css";

export const metadata = {
  title: "Quick Access File Manager",
  description: "Browse files and folders in the current directory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
