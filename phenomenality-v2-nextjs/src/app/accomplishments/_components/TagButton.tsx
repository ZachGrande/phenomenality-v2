import React from 'react';
import './Tag.sass';

function TagButton(props){
  let thisItem = props.item;

  const getClassName = () => {
    return "tag-btn-item tag-item " + thisItem.class;
  }
    
  function renderTagButton() {
    const handleClick = (event) => {
      props.toggleTag(thisItem.description);
    }

    return (
      <div>
        <input
        className={getClassName()}
        type='button'
        value={thisItem.description}
        onClick={handleClick}
        />
      </div>
    )
  }

    return (
        <div>
            {renderTagButton(thisItem)}
        </div>
    )
}

function TagButtonList(props){
  let items = props.items;

  let tagBtnComponenets = items?.map((currentItem, index) => {
      return <TagButton key={index} item={currentItem}
      activeTags={props.activeTags}
      toggleTag={props.toggleTag}
      />
  })

  return (
      <div className='tag-btn-list'>
          {tagBtnComponenets}
      </div>
  )
}

export default TagButtonList;