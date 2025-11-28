import { LenisProvider } from '@/components/providers/LenisProvider';

type Props = {
  children: React.ReactNode;
};

export default async function AboutLayout({ children }: Props) {
  return <LenisProvider>{children}</LenisProvider>;
}
