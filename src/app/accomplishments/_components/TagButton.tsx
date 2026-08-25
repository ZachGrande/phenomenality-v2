import React from 'react';
import './Tag.sass';

interface TagButtonItem {
  class: string;
  description: string;
}

interface TagButtonProps {
  item: TagButtonItem;
  toggleTag: (description: string) => void;
}

interface TagButtonListProps {
  items: TagButtonItem[];
  activeTags?: string[];
  toggleTag: (description: string) => void;
}

function TagButton(props: TagButtonProps) {
  const thisItem = props.item;

  const getClassName = () => {
    return 'tagBtnItem tag-item ' + thisItem.class;
  };

  function renderTagButton() {
    const handleClick = () => {
      props.toggleTag(thisItem.description);
    };

    return (
      <div>
        <input
          className={getClassName()}
          type="button"
          value={thisItem.description}
          onClick={handleClick}
        />
      </div>
    );
  }

  return <div>{renderTagButton(thisItem)}</div>;
}

function TagButtonList(props: TagButtonListProps) {
  const items = props.items;

  const tagBtnComponenets = items?.map((currentItem, index) => {
    return (
      <TagButton key={index} item={currentItem} toggleTag={props.toggleTag} />
    );
  });

  return <div className="tag-btn-list">{tagBtnComponenets}</div>;
}

export default TagButtonList;
