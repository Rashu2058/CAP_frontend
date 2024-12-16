// src/app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Hotel Grace Inn',
  description: 'Ease your work',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
