'use client';

import SquareCard from '@/components/ui/SquareCard';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { motion } from 'framer-motion';
import 'keen-slider/keen-slider.css';
import { useKeenSlider } from 'keen-slider/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Benefits() {
  const t = useTranslations('HomePage.benefits');

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const autoplay = (slider: any) => {
    if (window.innerWidth >= 768) return;
    let timeout: any;
    let mouseOver = false;

    function clearNextTimeout() {
      clearTimeout(timeout);
    }

    function nextTimeout() {
      clearTimeout(timeout);
      if (mouseOver) return;
      timeout = setTimeout(() => {
        slider.next();
      }, 2000);
    }

    slider.on('created', () => {
      slider.container.addEventListener('mouseover', () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener('mouseout', () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });

    slider.on('dragStarted', clearNextTimeout);
    slider.on('animationEnded', nextTimeout);
    slider.on('updated', nextTimeout);
  };

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: 'snap',
      slides: { perView: 1.2, spacing: 16 },
      breakpoints: {
        '(min-width: 768px)': {
          disabled: true,
        },
      },
    },
    [autoplay]
  );

  const cards = [
    {
      src: '/svg/code.svg',
      alt: t('cards.card1.alt'),
      title: t('cards.card1.title'),
      desc: t('cards.card1.description'),
    },
    {
      src: '/svg/code.svg',
      alt: t('cards.card2.alt'),
      title: t('cards.card2.title'),
      desc: t('cards.card2.description'),
    },
    {
      src: '/svg/code.svg',
      alt: t('cards.card3.alt'),
      title: t('cards.card3.title'),
      desc: t('cards.card3.description'),
    },
    {
      src: '/svg/code.svg',
      alt: t('cards.card4.alt'),
      title: t('cards.card4.title'),
      desc: t('cards.card4.description'),
    },
    {
      src: '/svg/code.svg',
      alt: t('cards.card5.alt'),
      title: t('cards.card5.title'),
      desc: t('cards.card5.description'),
    },
    {
      src: '/svg/code.svg',
      alt: t('cards.card6.alt'),
      title: t('cards.card6.title'),
      desc: t('cards.card6.description'),
    },
  ];

  return (
    <section className="w-full py-30 text-black">
      <DotLottiePlayer
        src="/animations/particles_4.lottie"
        autoplay
        loop
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',

          zIndex: 0,
          opacity: 0.1,
        }}
      />

      <div className="mx-auto flex w-full flex-col items-center justify-center gap-20">
        {/* Cabeçalho */}
        <motion.div
          className="container flex w-full flex-col items-start justify-center space-y-6 px-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-start text-2xl font-semibold md:text-3xl lg:text-5xl">
            <span className="font-open-sans inline-block pb-1 text-white">{t('title')}</span>
          </h2>
          <p className="font-open-sans text-sm font-medium text-white md:text-xl md:font-semibold">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid no desktop / Slider no mobile */}
        <div className="container">
          <div
            ref={sliderRef}
            className="keen-slider grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-3"
          >
            {cards.map((card, idx) =>
              isDesktop ? (
                <motion.div
                  key={idx}
                  className="keen-slider__slide flex items-center justify-center px-2 py-10 md:!transform-none"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                >
                  <SquareCard
                    iconSrc={card.src}
                    iconAlt={card.alt}
                    title={card.title}
                    description={card.desc}
                  />
                </motion.div>
              ) : (
                <div key={idx} className="keen-slider__slide px-2 py-10 md:!transform-none">
                  <SquareCard
                    iconSrc={card.src}
                    iconAlt={card.alt}
                    title={card.title}
                    description={card.desc}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
