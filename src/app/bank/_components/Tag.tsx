import React from 'react';

import '@/app/_styles/tags.css';

interface TagProps {
  item: string;
}

interface TagListProps {
  items: string[];
}

function Tag(props: TagProps) {
  const thisItem = props.item;

  const getClassName = () => {
    return 'tag-list tag-item ' + thisItem.toLowerCase().replace(/\s+/g, '-');
  };

  function renderItem() {
    return (
      <div>
        <div className={getClassName()}>{thisItem}</div>
      </div>
    );
  }

  return <div>{renderItem(thisItem)}</div>;
}

function TagList(props: TagListProps) {
  const items = props.items;
  let index = -1;
  const tagComponents = items?.map((currentItem) => {
    index++;
    return <Tag item={currentItem} key={index} />;
  });
  return <div className="tag-list">{tagComponents}</div>;
}

export default TagList;
