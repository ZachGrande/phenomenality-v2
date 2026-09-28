import clsx from 'clsx';

import {
  tagColorClass,
  tagItemBase,
  tagSlug,
} from '@/app/_components/tagStyles';

interface TagProps {
  item: string;
}

interface TagListProps {
  items: string[];
}

function Tag({ item }: TagProps) {
  return (
    <div>
      <div
        className={clsx(
          'm-[0.2rem]',
          tagItemBase,
          tagColorClass(tagSlug(item)),
        )}
      >
        {item}
      </div>
    </div>
  );
}

function TagList({ items }: TagListProps) {
  return (
    <div className="flex flex-wrap justify-center">
      {items?.map((currentItem, index) => (
        <Tag item={currentItem} key={index} />
      ))}
    </div>
  );
}

export default TagList;
