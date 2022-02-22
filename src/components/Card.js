import React from 'react';

function Card(props) {
  let thisItem = props.item;

  function renderItem() {
    return (
      <div>
        <p>{thisItem.id}</p>
        <p>{thisItem.description}</p>
      </div>
    )
  }

  return (
    <div>
      {renderItem(thisItem)}
    </div>
  )
}

function CardList(props) {
  let items = props.items;
  let cardComponents = items.map((currentItem) => {
    let cardElement = <Card key={currentItem.id} item={currentItem} />
    return cardElement;
  })

  return (
    <ol>
      {cardComponents}
    </ol>
  )
}

export default CardList;
