import React from 'react';
import '../css/Card.css';
import TagList from './Tag.js';

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
        <div className='first-row'>
        <p className='date'>{thisItem.date}</p>
        <h2 className='title'>{thisItem.title}</h2>
        </div>
        <button className="btn-delete" onClick={handleClick}>x</button>
        {/* <p>{thisItem.id}</p> */}
        <p>{thisItem.description}</p>
        {/* <ul>{tagItems}</ul> */}
        <TagList items={thisItem.tags} />
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
    <div className="card-list card-item-container">
      {cardComponents}
    </div>
  )
}

export default CardList;
