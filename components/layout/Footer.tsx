'use client';

import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('Footer');

  const handleScroll = (id: string) => {
    const offset = -80;

    const lenis = (window as any).lenis;
    const el = document.querySelector(id);

    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;

      if (lenis) {
        lenis.scrollTo(top);
      } else {
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <footer className="bg-black-normal text-white" id="contact">
      {/* Newsletter */}
      <div className="flex w-full items-center justify-center">
        <div className="container flex justify-center border-b border-gray-300 px-5 py-10 md:justify-start">
          <Image src="/svg/logo.svg" width={85} height={54} alt="icone" />
        </div>
      </div>

      {/* Links */}
      <div className="container mx-auto flex flex-col flex-wrap justify-between gap-12 border-b border-white px-6 py-16 md:flex-row md:gap-0 md:px-0">
        {/* Contato */}
        <div className="max-w-xs space-y-4">
          <h3 className="font-archivo font-bold">{t('contact.title')}</h3>
          <p className="text-base font-medium">{t('contact.subtitle')}</p>

          <div className="space-y-2">
            <p className="bg-gray-darker/50 flex items-center gap-2 rounded-md p-3">
              <EnvelopeIcon className="h-5 w-5" />
              <a href="mailto:suporte@letsinove.com" className="underline">
                suporte@letsinove.com
              </a>
            </p>

            <p className="bg-gray-darker/50 flex w-fit items-center gap-2 rounded-md p-3">
              <Image
                src="/svg/phone-icon.svg"
                alt="Telefone"
                width={20}
                height={20}
                className="opacity-90"
              />
              <a
                href="https://wa.me/351920406913"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                (45) 99958-7883
              </a>
            </p>
          </div>
        </div>

        {/* Links úteis */}
        <div className="max-w-xs space-y-4">
          <h3 className="font-archivo font-bold">{t('links.title')}</h3>
          <ul className="space-y-2">
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll('#home')}>
                {t('links.home')}
              </button>
            </li>
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll('#about')}>
                {t('links.about')}
              </button>
            </li>
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll('#solutions')}>
                {t('links.solutions')}
              </button>
            </li>
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll('#blog')}>
                {t('links.blog')}
              </button>
            </li>
            <li>
              <button className="cursor-pointer" onClick={() => handleScroll('#want')}>
                {t('links.want')}
              </button>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="max-w-xs space-y-4">
          <h3 className="font-archivo font-bold">{t('social.title')}</h3>

          <ul className="flex items-center gap-6 md:gap-8">
            <li>
              <Image
                src="/svg/facebook-icon.svg"
                alt="Facebook"
                width={38}
                height={38}
                className="md:h-12 md:w-12"
              />
            </li>
            <li>
              <Image
                src="/svg/instagram-icon.svg"
                alt="Instagram"
                width={38}
                height={38}
                className="md:h-12 md:w-12"
              />
            </li>
            <li>
              <Image
                src="/svg/linkedin-icon.svg"
                alt="LinkedIn"
                width={38}
                height={38}
                className="md:h-12 md:w-12"
              />
            </li>
          </ul>
        </div>
      </div>

      {/* Copy */}
      <div className="py-6 text-center text-sm text-white">
        © 2025 <span className="font-bold">LetsInove</span> | {t('rights')}
      </div>
    </footer>
  );
}
