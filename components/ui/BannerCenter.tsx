import Image from 'next/image';

const BannerCenter = () => {
  return (
    <div className="border-violet-normal relative flex max-h-[280px] w-4/5 max-w-[1142px] items-center justify-center overflow-hidden rounded-4xl border shadow-[0_0_12px_#D72BD9]">
      <Image src="/images/people.png" width={2048} height={2048} alt="icon" />
    </div>
  );
};
export default BannerCenter;
