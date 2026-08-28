// Full literal class strings so Tailwind's source scanner emits each utility.
const tagColorBySlug: Record<string, string> = {
  technical: 'bg-tag-technical',
  'soft-skills': 'bg-tag-soft-skills',
  kudos: 'bg-tag-kudos',
  award: 'bg-tag-award',
  training: 'bg-tag-training',
  'special-projects': 'bg-tag-special-projects',
  volunteer: 'bg-tag-volunteer',
  promotion: 'bg-tag-promotion',
  idea: 'bg-tag-idea',
  innovation: 'bg-tag-innovation',
  miscellaneous: 'bg-tag-miscellaneous',
};

export const tagItemBase =
  'rounded-[10%] border-none px-6 py-2.5 text-center text-base';

export const tagActiveClass = 'opacity-100 outline-2 outline-focus-ring';

export function tagSlug(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '-');
}

export function tagColorClass(slug: string): string {
  return tagColorBySlug[slug] ?? '';
}
