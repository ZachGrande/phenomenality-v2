import React from 'react';

import './Card.sass';
import TagList from './Tag';

interface CardItem {
  date: string;
  descriptionDisplay: string;
  id: number;
  tags: string[];
  title: string;
}

interface CardProps {
  item: CardItem;
  deleteCard: (id: number) => void;
  editCard: (id: number) => void;
  viewCard: (id: number) => void;
}

interface CardListProps {
  items: CardItem[];
  deleteCard: (id: number) => void;
  editCard: (id: number) => void;
  viewCard: (id: number) => void;
}

function Card(props: CardProps) {
  const thisItem = props.item;

  function renderItem() {
    const handleClick = () => {
      props.deleteCard(thisItem.id);
    };

    const handleEdit = () => {
      props.editCard(thisItem.id);
    };

    const handleView = () => {
      props.viewCard(thisItem.id);
    };

    return (
      <div className="card-item">
        <div className="first-row">
          <p className="date">{thisItem.date}</p>
          <h2 className="title">{thisItem.title}</h2>
        </div>
        <button className="btn-delete" onClick={handleClick}>
          x
        </button>
        <p className="description">{thisItem.descriptionDisplay}</p>
        <TagList items={thisItem.tags} />
        <button className="btn-edit" onClick={handleEdit}>
          edit
        </button>
        <button className="btn-view" onClick={handleView}>
          view more
        </button>
      </div>
    );
  }

  return <div>{renderItem(thisItem)}</div>;
}

function CardList(props: CardListProps) {
  const items = props.items;
  const cardComponents = items.map((currentItem) => {
    return (
      <Card
        key={currentItem.id}
        item={currentItem}
        deleteCard={props.deleteCard}
        editCard={props.editCard}
        viewCard={props.viewCard}
      />
    );
  });

  return <div className="card-list card-item-container">{cardComponents}</div>;
}

export default CardList;
