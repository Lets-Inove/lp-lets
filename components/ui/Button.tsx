'use client';

import { motion } from 'framer-motion';

interface GradientButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  text,
  onClick,
  className = '',
  disabled = false,
}: GradientButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`relative overflow-hidden rounded-lg bg-gradient-to-r from-[#D72BD9] to-[#721773] px-10 py-4 font-medium text-white shadow-[0_0_30px_-5px_rgba(168,85,247,0.6)] transition-all focus:ring-2 focus:ring-purple-400 focus:outline-none ${disabled ? 'cursor-not-allowed opacity-50 shadow-none' : 'hover:shadow-[0_0_40px_-5px_rgba(168,85,247,0.9)]'} ${className} `}
    >
      {text}

      {/* brilho interno sutil */}
      {!disabled && (
        <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-2xl" />
      )}
    </motion.button>
  );
}
