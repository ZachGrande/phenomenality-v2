import React from 'react';
import '../css/Card.css';

function Card(props) {
  let thisItem = props.item;

  const tagItems = thisItem.tags?.map((tag) =>
    <li key={tag}>{tag}</li>
  );

  function renderItem() {
    const handleClick = (event) => {
      props.deleteCard(thisItem.id)
    }

    const handleEdit = (event) => {
      props.editCard(thisItem.id)
    }

    const handleView = (event) => {
      props.viewCard(thisItem.id)
    }

    return (
      <div className="card-item">
        <h2>{thisItem.title}</h2>
        {/* <p>{thisItem.id}</p> */}
        <p>{thisItem.date}</p>
        <p>{thisItem.description}</p>
        <ul>{tagItems}</ul>
        <button className="btn-delete" onClick={handleClick}>Delete</button>
        <button className="btn-edit" onClick={handleEdit}>Edit</button>
        <button className="btn-view" onClick={handleView}>View More</button>
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
    return <Card key={currentItem.id} item={currentItem}
                 deleteCard={props.deleteCard}
                 editCard={props.editCard} 
                 viewCard={props.viewCard}/>
  })

  return (
    <ol className="card-list">
      {cardComponents}
    </ol>
  )
}

export default CardList;
