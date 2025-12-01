'use client';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRef } from 'react';

export default function HeroBannerDomain() {
  const t = useTranslations('Domain');
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh w-full flex-col justify-center overflow-hidden text-white"
    >
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={'/images/bg-circles.png'}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          width={1920}
          height={1080}
          alt="img"
        />
      </div>

      {/* Partículas */}

      {/* Conteúdo */}
      <div className="container mx-auto flex flex-wrap justify-between py-20 md:flex-row md:items-center md:py-0">
        <div className="z-10 space-y-8 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-open-sans mb-12 max-w-5xl text-2xl leading-tight font-semibold text-white md:text-3xl lg:text-7xl"
          >
            {t('hero.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 px-5 text-base text-white md:px-0 md:text-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-1 flex-col items-center gap-6 px-5 text-center md:items-start md:px-0 md:text-left"
          >
            <input
              type="text"
              className="bg-violet-dark-hover mt-4 h-12 w-full rounded-xl p-3 font-semibold"
              placeholder={t('hero.placeholder')}
              // onClick={() => alert('Clicou!')}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left"
          >
            <Button
              text={t('hero.btn')}
              className="mt-4 max-w-[280px] cursor-pointer"
              onClick={() => alert('Clicou!')}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="hidden items-center justify-center md:flex"
        ></motion.div>
      </div>
    </section>
  );
}
