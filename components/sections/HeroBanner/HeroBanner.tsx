"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function HeroBanner() {
  const t = useTranslations("HomePage");
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (v) => {
      const video = videoRef.current;
      if (video && video.duration) {
        video.currentTime = video.duration * v;
      }
    });
    return () => unsubscribe();
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      className="neon-bottom-border relative flex min-h-svh w-full flex-col justify-center overflow-hidden text-white"
    >
      {/* Vídeo de fundo */}
      <div className="absolute inset-0 -z-10">
        <video
          // ref={videoRef}
          src="/animations/dna-looping.mp4"
          className="h-full w-full object-cover"
          preload="auto"
          autoPlay
          loop
          muted
        />

        {/* Overlay sutil para legibilidade do texto */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Partículas */}
      <DotLottiePlayer
        src="/animations/particles_1.lottie"
        autoplay
        loop
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: 0,
          opacity: 0.4,
        }}
      />

      {/* Conteúdo */}
      <div className="container mx-auto flex flex-wrap justify-between py-20 md:flex-row md:items-center md:py-0">
        <div className="z-10 max-w-xl text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-open-sans text-2xl leading-tight font-semibold text-white md:text-3xl lg:text-5xl"
          >
            {t("hero.title")}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-base text-white md:text-xl"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="hidden items-center justify-center md:flex"
        >
          <Image
            src="/images/icon-3d.png"
            alt="icone-3d"
            width={500}
            height={500}
            className="h-auto w-[200px] object-contain md:w-[300px] lg:w-[500px]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
