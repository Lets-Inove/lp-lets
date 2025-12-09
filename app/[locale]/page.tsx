import { generateSeoMetadata } from '@/components/SeoMetaData';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import About from '@/components/sections/About/About';
import Benefits from '@/components/sections/Benefits.tsx/Benefits';
import HeroBanner from '@/components/sections/HeroBanner/HeroBanner';
import HowWorks from '@/components/sections/HowWorks/HowWorks';
import InspirationText from '@/components/sections/InspirationText/InspirationText';

export const generateMetadata = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;

  return generateSeoMetadata({
    locale,
    namespace: 'HomePage',
  });
};

export default async function HomePage() {
  // const t = await getTranslations('HomePage');

  return (
    <>
      <Header />

      <main>
        <section id="home">
          <HeroBanner />
        </section>

        <section id="about">
          <About />
        </section>
        <section id="benefits">
          <Benefits />
        </section>

        <section id="solutions">
          <HowWorks />
        </section>
        <section id="inspiration">
          <InspirationText />
        </section>
      </main>

      <footer id="contact">
        <Footer />
      </footer>
    </>
  );
}
