'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'solutions', href: '/#solutions' },
  { key: 'domain', href: '/domain' },
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
  const locale = useLocale();

  const langRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    const path = pathname || '';
    const segments = path.split('/').filter(Boolean);

    console.log('caiu aqui:', newLocale);

    // Se NÃO existe locale no path, adiciona
    if (!languages.some((l) => l.code === segments[0])) {
      router.push(`/${newLocale}${path}`);
      setLangOpen(false);
      return;
    }

    // Se já existe locale no path, troca
    segments[0] = newLocale;
    router.push('/' + segments.join('/'));

    setLangOpen(false);
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      handleScroll(href); // scroll para seção
    } else {
      router.push(`/${locale}${href}`); // rota com locale
    }
    setIsOpen(false);
  };

  const handleScroll = (id: string) => {
    const offset = -80;
    const el = document.querySelector(id);
    const lenis = (window as any).lenis;

    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;

      if (lenis) lenis.scrollTo(top);
      else window.scrollTo({ top, behavior: 'smooth' });

      setIsOpen(false); // Fecha menu mobile ao clicar
    }
  };

  // Fecha dropdown e mobile ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="top-0 z-50 bg-black shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="#home" onClick={() => handleScroll('#home')}>
          <Image src="/svg/logo.svg" alt="Lets Inove" width={70} height={40} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center space-x-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.href)}
              className="font-archivo text-lg text-white transition hover:text-gray-300"
            >
              {t(item.key)}
            </button>
          ))}

          <button className="bg-violet-normal hover:bg-violet-normal-hover cursor-pointer rounded-full px-4 py-2 transition duration-300 hover:scale-110">
            {t('mySite')}
          </button>

          {/* Language selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-2 text-white"
            >
              <Image src={currentLang.flag} alt="" width={20} height={14} />
            </button>

            {langOpen && (
              <div className="absolute right-0 z-20 mt-2 w-40 rounded-md bg-black p-2 shadow-md">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => console.log('brn')}
                    className="hover:bg-violet-dark flex w-full items-center gap-2 p-2 text-left"
                  >
                    <Image src={lang.flag} width={20} height={14} alt={lang.label} />
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button className="flex flex-col gap-1 lg:hidden" onClick={() => setIsOpen((v) => !v)}>
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
          <span className="block h-0.5 w-6 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileRef}
        className={`overflow-hidden bg-black text-white transition-all duration-300 lg:hidden ${
          isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col space-y-6 p-6">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => handleNavigation(item.href)}
              className="text-xl font-light hover:text-gray-300"
            >
              {t(item.key)}
            </button>
          ))}

          <button className="bg-violet-normal hover:bg-violet-normal-hover rounded-full px-4 py-2 transition">
            Quero meu site
          </button>

          {/* Idiomas mobile */}
          <div className="z-20 border-t border-gray-700 pt-4" ref={langRef}>
            <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-3">
              <Image src={currentLang.flag} width={24} height={16} alt="" />
              <span>{currentLang.label}</span>
            </button>

            {langOpen && (
              <div className="z-20 mt-3 flex flex-col gap-3 bg-black">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="flex items-center gap-3 text-left"
                  >
                    <Image src={lang.flag} width={24} height={16} alt="" />
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
