'use client';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

export default function HeroBanner() {
  const t = useTranslations('About');
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);

  const playlist = ['/animations/black-star.mp4', '/animations/black-star-reverse.mp4'];

  const [index, setIndex] = useState(0);
  const [active, setActive] = useState<'A' | 'B'>('A');

  useEffect(() => {
    const currentVideo = active === 'A' ? videoA.current : videoB.current;

    if (!currentVideo) return;

    const handleEnded = () => {
      const nextIndex = (index + 1) % playlist.length;
      setIndex(nextIndex);

      const nextVideo = active === 'A' ? videoB.current : videoA.current;
      if (!nextVideo) return;

      // prepara o próximo vídeo
      nextVideo.src = playlist[nextIndex];

      nextVideo.onloadeddata = () => {
        nextVideo.play();

        // faz crossfade
        if (active === 'A') {
          videoA.current!.style.opacity = '0';
          videoB.current!.style.opacity = '1';
          setActive('B');
        } else {
          videoB.current!.style.opacity = '0';
          videoA.current!.style.opacity = '1';
          setActive('A');
        }
      };
    };

    currentVideo.addEventListener('ended', handleEnded);
    return () => currentVideo.removeEventListener('ended', handleEnded);
  }, [index, active]);

  return (
    <section
      ref={sectionRef}
      className="neon-bottom-border relative flex min-h-svh w-full flex-col justify-center overflow-hidden text-white"
    >
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoA}
          src={playlist[0]}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          autoPlay
          muted
          preload="auto"
          style={{ opacity: 1 }}
        />
        <video
          ref={videoB}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          autoPlay
          muted
          preload="auto"
          style={{ opacity: 0 }}
        />

        {/* Overlay sutil para legibilidade do texto */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Partículas */}

      {/* Conteúdo */}
      <div className="container mx-auto flex flex-wrap justify-between py-20 md:flex-row md:items-center md:py-0">
        <div className="z-10 max-w-xl space-y-8 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-open-sans mb-12 text-2xl leading-tight font-semibold text-white md:text-3xl lg:text-7xl"
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 px-5 text-base text-white md:px-0 md:text-2xl"
          >
            {t('hero.subtitle-two')}
          </motion.p>
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
              onClick={() =>
                window.open(
                  'https://wa.me/5545999587883?text=Gostaria%20de%20saber%20mais%20sobre%20os%20servi%C3%A7os.'
                )
              }
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
