import { LenisProvider } from '@/components/providers/LenisProvider';
import { NextIntlClientProvider } from 'next-intl';
import { Archivo, Open_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import './globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // 👈 AQUI é o principal ajuste
};

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
});

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params; // 👈 OBRIGATÓRIO no Next 15

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} className={`${openSans.variable} ${archivo.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LenisProvider>{children}</LenisProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
