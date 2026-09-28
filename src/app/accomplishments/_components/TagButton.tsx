import clsx from 'clsx';

import {
  tagActiveClass,
  tagColorClass,
  tagItemBase,
} from '@/app/_components/tagStyles';

interface TagButtonItem {
  class: string;
  description: string;
}

interface TagButtonProps {
  item: TagButtonItem;
  isActive: boolean;
  toggleTag: (description: string) => void;
}

interface TagButtonListProps {
  items: TagButtonItem[];
  activeTags?: string[];
  toggleTag: (description: string) => void;
}

function TagButton({ item, isActive, toggleTag }: TagButtonProps) {
  return (
    <div>
      <input
        className={clsx(
          'm-2 content-center',
          tagItemBase,
          tagColorClass(item.class),
          isActive && tagActiveClass,
        )}
        type="button"
        value={item.description}
        onClick={() => toggleTag(item.description)}
      />
    </div>
  );
}

function TagButtonList({
  items,
  activeTags = [],
  toggleTag,
}: TagButtonListProps) {
  return (
    <div className="flex flex-wrap justify-center px-24">
      {items?.map((currentItem, index) => (
        <TagButton
          key={index}
          item={currentItem}
          isActive={activeTags.includes(currentItem.description)}
          toggleTag={toggleTag}
        />
      ))}
    </div>
  );
}

export default TagButtonList;
