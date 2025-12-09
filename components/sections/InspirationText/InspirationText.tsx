'use client';

import BannerCenter from '@/components/ui/BannerCenter';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function InspirationText() {
  const t = useTranslations('HomePage.inspiration');

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mt-14 flex w-full items-center justify-center pt-16 pb-44 lg:mt-48"
    >
      {/* BG com opacidade só no background */}
      <div className="absolute inset-0 bg-[url('/images/bg-inspiration.png')] bg-cover bg-top bg-no-repeat opacity-40 grayscale"></div>

      {/* CONTEÚDO */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center space-y-16 px-6">
        {/* Banner animado */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <BannerCenter />
        </motion.div>

        {/* Texto + botão */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-10 text-center"
        >
          <h2 className="font-open-sans text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
            {t('title')}
          </h2>

          <p className="font-open-sans max-w-[1109px] text-lg font-semibold sm:text-xl">
            {t('subtitle')}{' '}
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
          >
            <Button
              text={t('btn')}
              onClick={() =>
                window.open(
                  'https://wa.me/5545999587883?text=Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os.'
                )
              }
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
