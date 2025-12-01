import { generateSeoMetadata } from '@/components/SeoMetaData';
import HeroBannerDomain from '@/components/domainSections/HeroBannerDomain/HeroBannerDomain';
import InspirationTextDomain from '@/components/domainSections/InspirationTextDomain/InspirationTextDomain';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { getTranslations } from 'next-intl/server';

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  return generateSeoMetadata({
    locale,
    namespace: 'Domain',
  });
};

export default async function DomainPage() {
  const t = await getTranslations('Domain');

  return (
    <>
      <Header />

      <main>
        <section id="home">
          <HeroBannerDomain />
        </section>

        <section id="about">
          <InspirationTextDomain />
        </section>
      </main>

      <footer id="contact">
        <Footer />
      </footer>
    </>
  );
}
