import { generateSeoMetadata } from '@/components/SeoMetaData';
import About from '@/components/aboutSections/About/About';
import HeroBannerAbout from '@/components/aboutSections/HeroBannerAbout/HeroBannerAbout';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  return generateSeoMetadata({
    locale,
    namespace: 'About',
  });
};

export default async function AboutPage() {
  // const t = await getTranslations('About');

  return (
    <>
      <Header />

      <main>
        <section id="home">
          <HeroBannerAbout />
        </section>

        <section id="about">
          <About />
        </section>
      </main>

      <footer id="contact">
        <Footer />
      </footer>
    </>
  );
}
