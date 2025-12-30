import React from 'react';
import './Tag.sass';

function Tag(props) {
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

function TagList(props) {
  const items = props.items;
  let index = -1;
  const tagComponents = items?.map((currentItem) => {
    index++;
    return <Tag item={currentItem} key={index} />;
  });
  return <div className="tag-list">{tagComponents}</div>;
}

export default TagList;
