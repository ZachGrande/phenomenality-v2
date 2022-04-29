import React from 'react';
import '../css/TagButton.css'

function TagButton(props){
  let thisItem = props.item;
  let activeTags = props.activeTags;

  // useEffect(() => {

  // }, [activeTags])

  const getClassName = () => {
    let className = "tag-test " + thisItem.class;
    if (activeTags.includes(thisItem.description)) {
      className = className + " active";
    } else {
      className = className + " inactive";
    }
    console.log(className);
    return className;
  }
    
  function renderTagButton(){
    /*const handleEditTag = (event) => {
        props.editTag(thisItem);
    }*/

    const handleClick = (event) => {
      console.log("Clicked", thisItem.class);
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
      color={props.color[index]}
      />
  })

  return (
      <div className='tag-btn-list'>
          {tagBtnComponenets}
      </div>
  )
}

export default TagButtonList;