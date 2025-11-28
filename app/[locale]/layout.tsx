import { LenisProvider } from '@/components/providers/LenisProvider';
import { NextIntlClientProvider } from 'next-intl';
import { Archivo, Open_Sans } from 'next/font/google';
import './globals.css';

type Props = {
  children: React.ReactNode;
};

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
});

export default async function RootLayout({ children }: Props) {
  return (
    <html lang="pt" className={`${openSans.variable} ${archivo.variable}`}>
      <body>
        <NextIntlClientProvider>
          <LenisProvider>{children}</LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
