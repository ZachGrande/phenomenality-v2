import React from 'react';
import '../css/Card.css';

function Card(props) {
  let thisItem = props.item;

  const getClassName = () => {
    let className = "card-item ";
    if (thisItem.status === "success") {
      className += "success";
    } else if (thisItem.status === "question-unanswered") {
      className += "question-unanswered";
    }
    return className;
  }

  const tagItems = thisItem.tags?.map((tag) =>
    <li key={tag}>{tag}</li>
  );

  function renderItem() {
    const handleClick = (event) => {
      // where does this live?
      props.deleteCard(thisItem.id)
    }

    // does this seem right ? idk what to do with editCard though
    const handleEdit = (event) => {
      props.editCard(thisItem.id)
    }

    return (
      <div className={getClassName()}>
        <p>{thisItem.id}</p>
        <p>{thisItem.description}</p>
        <ul>{tagItems}</ul>
        <button onClick={handleClick}>Delete accomplishment {thisItem.id}</button>
        <button onClick={handleEdit}>Edit accomplishment (broken) {thisItem.id}</button>
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
    // will something for editCard need to be added? 
    return <Card key={currentItem.id} item={currentItem} deleteCard={props.deleteCard} />
  })

  return (
    <ol className="card-list">
      {cardComponents}
    </ol>
  )
}

export default CardList;
