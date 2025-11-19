'use client';

import Image from 'next/image';

interface SquareCardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export default function SquareCardAdapted({
  iconSrc,
  iconAlt,
  title,
  description,
}: SquareCardProps) {
  const accentColor = '#C227C3';

  return (
    <div
      className="relative flex h-[400px] max-h-[500px] max-w-[400px] flex-col justify-start rounded-md px-6 py-10 text-white transition-all duration-300 hover:shadow-[0_0_25px_#D72BD9]"
      style={{
        background: 'linear-gradient(to top, #3C1357, #270D38)',
      }}
    >
      {/* Borda + leve glow interno */}
      <div className="pointer-events-none absolute inset-0 rounded-md border border-[#D72BD9]/30 shadow-[0_0_12px_rgba(215,43,217,0.20)]" />

      {/* Ícone */}
      <div className="mb-6 flex items-center justify-start">
        <div
          className="flex h-20 w-20 items-center justify-center rounded-lg p-4"
          style={{ backgroundColor: accentColor }}
        >
          <Image src={iconSrc} alt={iconAlt} width={48} height={48} />
        </div>
      </div>

      {/* Texto */}
      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="font-open-sans text-3xl leading-snug font-semibold">{title}</h3>

        <p className="font-open-sans mt-4 text-base font-normal text-white/90">{description}</p>
      </div>
    </div>
  );
}
