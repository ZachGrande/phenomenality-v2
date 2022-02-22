import React from 'react';

function Card(props) {
  let thisItem = props.item;

  function renderItem() {
    const handleClick = (event) => {
      props.deleteCard(thisItem.id)
    }

    return (
      <div>
        <p>{thisItem.id}</p>
        <p>{thisItem.description}</p>
        <button onClick={handleClick}>Delete accomplishment {thisItem.id}</button>
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
    let cardElement = <Card key={currentItem.id} item={currentItem} deleteCard={props.deleteCard} />
    return cardElement;
  })

  return (
    <ol>
      {cardComponents}
    </ol>
  )
}

export default CardList;
