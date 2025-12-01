'use client';

import Button from '@/components/ui/Button';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('HomePage.about');

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-20">
      {/* Animação de fundo */}
      <DotLottiePlayer
        src="/animations/particles_4.lottie"
        autoplay
        loop
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 250,
          zIndex: 0,
          opacity: 0.1,
        }}
      />

      <div className="relative z-10 bg-contain bg-bottom bg-no-repeat text-gray-800 md:bg-right">
        <div className="container mx-auto flex flex-col items-center gap-12 px-6 md:flex-row md:gap-20 md:px-12">
          {/* Imagem à esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full flex-1"
          >
            <div className="relative overflow-hidden rounded-xl">
              {/* Imagem */}
              <Image
                src="/images/bg-title.png"
                alt={t('imageAlt')}
                width={800}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />

              {/* Texto centralizado sobre a imagem */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-open-sans px-4 ps-12 text-start text-2xl font-semibold text-white drop-shadow-lg sm:text-3xl md:ps-16 md:text-5xl lg:text-5xl">
                  {t('title')}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Texto à direita */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left"
          >
            <p className="font-open-sans mt-2 max-w-xl text-base leading-relaxed font-semibold text-white sm:text-lg md:text-xl">
              {t('text')}
            </p>

            <Button
              text={t('btn')}
              className="mt-4 max-w-[220px] cursor-pointer"
              onClick={() => alert('Clicou!')}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
