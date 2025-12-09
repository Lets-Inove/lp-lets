'use client';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function About() {
  const t = useTranslations('About.about');

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative mt-14 flex w-full items-center justify-center pt-16 pb-44"
    >
      {/* Animação de fundo */}

      <div className="absolute inset-0 bg-[url('/images/bg-inspiration.png')] bg-cover bg-top bg-no-repeat opacity-40 grayscale"></div>

      <div className="relative z-10 space-y-48 bg-contain bg-bottom bg-no-repeat text-gray-800 md:bg-right">
        <div className="container mx-auto flex justify-between py-20 md:flex-row md:items-center md:gap-18 md:py-0">
          {/* Imagem à esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="w-full flex-1"
          >
            <div className="border-violet-normal relative flex max-h-[415px] w-full max-w-[660px] items-center justify-center overflow-hidden rounded-4xl border shadow-[0_0_12px_#D72BD9]">
              <Image src="/images/bg-card-about.png" width={2048} height={2048} alt="icon" />
            </div>
          </motion.div>

          {/* Texto à direita */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6 text-center md:items-start md:text-left"
          >
            <p className="font-open-sans mt-2 max-w-xl px-5 text-base leading-relaxed font-semibold text-white sm:text-lg">
              {t('text-one')}
            </p>

            <p className="font-open-sans mt-2 max-w-xl px-5 text-base leading-relaxed font-semibold text-white sm:text-lg">
              {t('text-two')}
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="flex w-full max-w-[1440px] flex-col items-center justify-center gap-10 text-center text-white"
        >
          <h2 className="font-open-sans px-5 text-4xl leading-tight font-semibold sm:text-5xl lg:text-6xl">
            {t('inspirationTitle')}
          </h2>

          <p className="font-open-sans max-w-[1109px] px-5 text-lg font-semibold">
            {t('inspirationText')}
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
