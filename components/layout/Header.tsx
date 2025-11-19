'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'solutions', href: '#solutions' },
  { key: 'blog', href: '#blog' },
];

const languages = [
  { code: 'pt', flag: 'https://flagcdn.com/br.svg', label: 'Português (BR)' },
  { code: 'pt-pt', flag: 'https://flagcdn.com/pt.svg', label: 'Português (PT)' },
  { code: 'en', flag: 'https://flagcdn.com/us.svg', label: 'English' },
  { code: 'es', flag: 'https://flagcdn.com/es.svg', label: 'Español' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Header');

  const langRef = useRef<HTMLDivElement>(null);

  // Detecta idioma atual
  const locale = useLocale();
  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleLanguageChange = (locale: string) => {
    const segments = pathname.split('/').filter(Boolean);
    segments[0] = locale;
    router.push('/' + segments.join('/'));
    setLangOpen(false);
  };

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    <header className="top-0 z-50 bg-black shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="#home" onClick={() => handleScroll('#home')}>
          <Image src="/svg/logo.svg" alt="Lets Inove" width={70} height={40} />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center space-x-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleScroll(item.href)}
              className="font-archivo cursor-pointer text-lg font-normal text-white hover:text-gray-300"
            >
              {t(item.key)}
            </button>
          ))}
          <button className="bg-violet-normal hover:bg-violet-normal-hover cursor-pointer rounded-full px-4 py-2 transition duration-300 ease-out hover:scale-110">
            {' '}
            Quero meu site
          </button>
        </nav>

        {/* <div className="relative flex items-center gap-4">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              aria-label="Mudar idioma"
              className="flex items-center gap-2 rounded-md border px-2 py-1 shadow-sm hover:bg-gray-50"
            >
              <Image
                src={currentLang.flag}
                alt={currentLang.label}
                width={24}
                height={24}
                unoptimized
              />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 flex flex-col rounded-md border bg-white shadow-md">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    <Image src={lang.flag} alt={lang.label} width={32} height={32} unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <GradientButton href="/download" variant="blueGreen">
              {t("download")}
            </GradientButton>
          </div>

          <button
            className="rounded-full bg-[image:var(--gradient-blue-green)] p-3 text-white transition hover:opacity-90 lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-7 w-7" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-7 w-7" aria-hidden="true" />
            )}
          </button>
        </div> */}
      </div>
      {/* 
      {isOpen && (
        <nav className="flex flex-col space-y-3 bg-white px-4 py-4 shadow-lg lg:hidden">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleScroll(item.href)}
              className="text-gray-dark hover:text-blue-normal text-sm font-semibold uppercase"
            >
              {t(item.key)}
            </button>
          ))}
          <GradientButton href="/download" className="text-center text-sm">
            {t("download")}
          </GradientButton>
        </nav>
      )} */}
    </header>
  );
}
