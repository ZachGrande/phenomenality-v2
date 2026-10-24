export const navLinks = [
  { href: '/accomplishments', label: 'accomplishments' },
  { href: '/bank', label: 'your bank' },
  { href: '/quiz', label: 'quiz' },
  { href: '/more-info', label: 'imposter phenomenon' },
] as const;

export function isActiveLink(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
