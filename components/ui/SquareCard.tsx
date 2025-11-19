'use client';

import Image from 'next/image';

interface SquareCardProps {
  iconSrc: string;
  iconAlt: string;
  title: string;
  description: string;
}

export default function SquareCard({ iconSrc, iconAlt, title, description }: SquareCardProps) {
  return (
    <div className="relative flex h-full max-h-[400px] max-w-[400px] flex-col justify-start rounded-md bg-[#19161C] px-6 py-10 text-white transition-all hover:shadow-[0_0_20px_#D72BD9]">
      {/* Glow border effect */}
      <div className="absolute inset-0 rounded-md border border-[#D72BD9]/30 shadow-[0_0_15px_#D72BD9]/20"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col gap-6">
        <div className="mb-4 flex items-center justify-start">
          <div className="flex items-center justify-center rounded-md bg-[#C227C3] md:h-32 md:w-32">
            <Image className="p-4 md:p-0" src={iconSrc} alt={iconAlt} width={74} height={66} />
          </div>
        </div>

        <h3 className="font-open-sans text-2xl font-semibold md:text-4xl">{title}</h3>
        <p className="font-open-sans mt-2 text-base text-white md:text-2xl">{description}</p>
      </div>
    </div>
  );
}
