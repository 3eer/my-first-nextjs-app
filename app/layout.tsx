import Link from 'next/link';
import { inter } from '@/app/ui/fonts';
import '@/app/ui/global.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <footer className="flex items-center justify-center p-4">
          ©
          <Link href="/" className="pr-2">
            3eer
          </Link>
          Copyright {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
