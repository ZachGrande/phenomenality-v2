import React from 'react';
import '../styles/Tag.sass';

function Tag(props){
  let thisItem = props.item;

  const getClassName = () => {
    return "tag-list tag-item " + thisItem.toLowerCase().replace(/\s+/g, '-');
  }

  function renderItem() {
    return (
      <div>
        <div className={getClassName()}>{thisItem}</div>
      </div>
    )
  }

    return (
      <div>
        {renderItem(thisItem)}
      </div>
    )

}

function TagList(props){
    let items = props.items;
    let index = -1;
    let tagComponents = items?.map((currentItem) => {
      index++;
      return <Tag item={currentItem} key={index}
      />
    })
    return (
      <div className="tag-list">
        {tagComponents}
      </div>
    )
}

export default TagList;