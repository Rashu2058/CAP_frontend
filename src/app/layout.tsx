// src/app/layout.tsx
import './globals.css';
import { LogoProvider } from './LogoContext';

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
       <body>
        {/* Wrap children with LogoProvider */}
        <LogoProvider>
          {children}
        </LogoProvider>
      </body>
    </html>
  );
}
