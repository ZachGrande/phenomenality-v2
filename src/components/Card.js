import React from 'react';
import '../css/Card.css';

function Card(props) {
  let thisItem = props.item;

  const getClassName = () => {
    let className = "card-item ";
    if (thisItem.status == "success") {
      className += "success";
    } else if (thisItem.status == "question-unanswered") {
      className += "question-unanswered";
    }
    return className;
  }

  const tagItems = thisItem.tags.map((tag) =>
    <li>{tag}</li>
  );

  function renderItem() {
    const handleClick = (event) => {
      props.deleteCard(thisItem.id)
    }

    return (
      <div className={getClassName()}>
        <p>{thisItem.id}</p>
        <p>{thisItem.description}</p>
        <ul>{tagItems}</ul>
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
    <ol className="card-list">
      {cardComponents}
    </ol>
  )
}

export default CardList;
