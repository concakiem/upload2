import './globals.css';
import Navbar from '@/components/Navbar';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Quản Lý Sản Phẩm',
  description: 'Ứng dụng quản lý sản phẩm với Next.js, Node.js và MongoDB',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="vi">
      <body>
        <Navbar />
        <main className="container mx-auto py-8 px-4">{children}</main>
      </body>
    </html>
  );
}
