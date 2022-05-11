import React, { useEffect } from 'react';
// import '../css/TagButton.css';
import '../css/Tag.css';

function TagButton(props){
  let thisItem = props.item;
  let activeTags = props.activeTags;

  useEffect(() => {
    renderTagButton();
  }, [activeTags]);

  const getClassName = () => {
    /*let className = "tag-item " + thisItem.class;
    if (activeTags.includes(thisItem.description)) {
      className = className + " active";
    } else {
      className = className + " inactive";
    }
    if (!activeTags.includes(thisItem.description)) {
      className = className + " inactive";
    }
    console.log("Getting class name for", className);
    return className;*/
    return "tag-btn-item tag-item " + thisItem.class;
  }
    
  function renderTagButton(){
    /*const handleEditTag = (event) => {
        props.editTag(thisItem);
    }*/

    const handleClick = (event) => {
      // console.log("Clicked", thisItem.class);
      props.toggleTag(thisItem.description);
    }

    // let idName = thisItem.replace(/\s+/g, '');

    return (
      <div>
        <input
        // id={idName}
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