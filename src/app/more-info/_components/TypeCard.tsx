import Image from 'next/image';
import Link from 'next/link';

import type { StaticImageData } from 'next/image';

interface TypeCardProps {
  href: string;
  src: StaticImageData;
  alt: string;
  label: string;
}

export default function TypeCard({ href, src, alt, label }: TypeCardProps) {
  return (
    <Link
      href={href}
      className="relative flex max-w-62.5 grow-2 flex-col items-center rounded-card bg-cream p-4 text-center text-ink no-underline shadow-card"
    >
      <Image
        src={src}
        alt={alt}
        className="size-40 object-contain md:size-56"
      />
      <div className="font-display font-bold">{label}</div>
    </Link>
  );
}
