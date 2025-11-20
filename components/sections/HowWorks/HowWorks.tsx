'use client';

import SquareCardAdapted from '@/components/ui/SquareCardLong';
import { useIsDesktop } from '@/utils/useIsDesktop';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { motion } from 'framer-motion';
import 'keen-slider/keen-slider.css';
import { useKeenSlider } from 'keen-slider/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function HowWorks() {
  const t = useTranslations('HomePage.how');
  const isDesktop = useIsDesktop();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      '(min-width: 1024px)': {
        slides: { perView: 3, spacing: 24 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Componente condicional
  const SlideWrapper = isDesktop ? motion.div : 'div';

  return (
    <section className="relative w-full py-12 text-white before:absolute before:top-0 before:right-0 before:h-full before:w-[600px] before:bg-[url('/images/bg-howorks.png')] before:bg-contain before:bg-right before:bg-no-repeat before:opacity-40 before:grayscale">
      <DotLottiePlayer
        src="/animations/particles_4.lottie"
        autoplay
        loop
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: -250,
          zIndex: 0,
          opacity: 0.1,
        }}
      />
      {/* Content */}
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-20">
        <motion.div
          className="container flex items-center justify-start space-y-4 px-5 text-start md:px-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="font-open-sans max-w-[682px] text-3xl font-semibold text-white md:text-3xl lg:text-6xl">
            <span className="inline-block pb-1">{t('title')}</span>
          </h2>
        </motion.div>

        {/* Steps → vira slider no mobile */}
        <div className="flex w-full flex-col items-center justify-center px-4 lg:px-0">
          <div
            ref={sliderRef}
            className="keen-slider container flex w-full items-center justify-between"
          >
            <SlideWrapper
              className="keen-slider__slide flex h-full items-stretch justify-center py-8"
              {...(isDesktop && {
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6 },
                viewport: { once: true },
              })}
            >
              <SquareCardAdapted
                iconSrc="/svg/code.svg"
                iconAlt={t('steps.step1.alt')}
                title={t('steps.step1.title')}
                description={t('steps.step1.description')}
              />
            </SlideWrapper>

            <SlideWrapper
              className="keen-slider__slide flex h-full items-stretch justify-center py-8"
              {...(isDesktop && {
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.2 },
                viewport: { once: true },
              })}
            >
              <SquareCardAdapted
                iconSrc="/svg/report-icon.svg"
                iconAlt={t('steps.step2.alt')}
                title={t('steps.step2.title')}
                description={t('steps.step2.description')}
              />
            </SlideWrapper>

            <SlideWrapper
              className="keen-slider__slide flex h-full items-stretch justify-center py-8"
              {...(isDesktop && {
                initial: { opacity: 0, y: 40 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.4 },
                viewport: { once: true },
              })}
            >
              <SquareCardAdapted
                iconSrc="/svg/support.svg"
                iconAlt={t('steps.step3.alt')}
                title={t('steps.step3.title')}
                description={t('steps.step3.description')}
              />
            </SlideWrapper>
          </div>

          {/* Bullets */}
          <div className="mt-6 flex justify-center gap-3 lg:hidden">
            {[...Array(instanceRef.current?.track.details.slides.length || 0)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`h-3 w-3 rounded-full transition ${
                  currentSlide === idx ? 'bg-violet-dark' : 'bg-gray-300/50'
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
