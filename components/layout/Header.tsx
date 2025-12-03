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
  const menuRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    const path = pathname || '';
    const segments = path.split('/').filter(Boolean);

    if (!languages.some((l) => l.code === segments[0])) {
      router.push(`/${newLocale}${path}`);
    } else {
      segments[0] = newLocale;
      router.push('/' + segments.join('/'));
    }

    setLangOpen(false);
    setIsOpen(false);
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      handleScroll(href);
    } else {
      router.push(`/${locale}${href}`);
    }
    setIsOpen(false);
  };

  const handleScroll = (id: string) => {
    const offset = -80;
    const el = document.querySelector(id);
    const lenis = (window as any).lenis;

    if (!el) return;

    const top = el.getBoundingClientRect().top + window.scrollY + offset;

    if (lenis) lenis.scrollTo(top);
    else window.scrollTo({ top, behavior: 'smooth' });

    setIsOpen(false);
  };

  // Fecha menu lateral ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
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
          <div className="relative">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="flex items-center gap-2 text-white"
            >
              <Image src={currentLang.flag} alt="" width={20} height={14} />
            </button>

            {langOpen && (
              <div className="absolute right-0 z-10 mt-2 w-40 rounded-md bg-black p-2 shadow-md">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="hover:bg-violet-dark z-20 flex w-full cursor-pointer items-center gap-2 p-2 text-left"
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

      {/* BACKDROP */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDE MENU */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-black text-white shadow-xl transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="mt-6 flex flex-col space-y-6 p-6">
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
            {t('mySite')}
          </button>

          {/* Idiomas mobile */}
          <div className="border-t border-gray-700 pt-4" ref={langRef}>
            <button onClick={() => setLangOpen((v) => !v)} className="flex items-center gap-3">
              <Image src={currentLang.flag} width={24} height={16} alt="" />
              <span>{currentLang.label}</span>
            </button>

            {langOpen && (
              <div className="mt-3 flex flex-col gap-3 bg-black">
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
