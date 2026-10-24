import Image from 'next/image';

import leafActive from '../_assets/icons/leaf-active.svg';
import leafInactive from '../_assets/icons/leaf-inactive.svg';

interface ProfileAvatarProps {
  initials: string;
  size: number;
}

/** Signed-in users see their initials; everyone else sees a leaf that fills on hover. */
export default function ProfileAvatar({ initials, size }: ProfileAvatarProps) {
  if (initials) {
    return (
      <span
        className="inline-flex items-center justify-center rounded-full border-[3px] border-solid border-accent align-middle text-base leading-none font-semibold"
        style={{ width: size, height: size }}
      >
        {initials}
      </span>
    );
  }

  return (
    <span className="group inline-block align-middle">
      <Image
        className="group-hover:hidden"
        src={leafInactive}
        width={size}
        height={size}
        alt="profile"
      />
      <Image
        className="hidden group-hover:block"
        src={leafActive}
        width={size}
        height={size}
        alt=""
        aria-hidden
      />
    </span>
  );
}
