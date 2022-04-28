import React from 'react';

function Tag(props){
  let thisItem = props.item;

  function renderItem() {

    return (
      <div>
        <p>{thisItem}</p>
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
    let tagComponents = items?.map((currentItem) => {
        return <Tag item={currentItem}
        />
    })

    return (
        <div>
            {tagComponents}
        </div>
    )
}

export default TagList;