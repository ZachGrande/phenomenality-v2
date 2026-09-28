import { ViewTransition } from 'react';

import Link from 'next/link';

import { cacheAccomplishment } from './accomplishmentCache';
import CardButton, { cardActionClassName } from './CardButton';
import TagList from './Tag';

interface CardItem {
  date: string;
  description: string;
  descriptionDisplay: string;
  id: number;
  key: string;
  tags: string[];
  title: string;
}

interface CardProps {
  item: CardItem;
  deleteCard: (id: number) => void;
  editCard: (id: number) => void;
}

interface CardListProps {
  items: CardItem[];
  deleteCard: (id: number) => void;
  editCard: (id: number) => void;
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

    return (
      <ViewTransition
        name={`accomplishment-${thisItem.key}`}
        share="morph"
        default="none"
      >
        <div className="relative flex h-full flex-col rounded-card bg-cream p-5 font-sans shadow-card transition-shadow duration-150 hover:shadow-elevate">
          <CardButton
            variant="delete"
            aria-label="Delete accomplishment"
            onClick={handleClick}
          >
            ×
          </CardButton>
          <p className="pr-8 font-sans text-sm text-inactive-text">
            {thisItem.date}
          </p>
          <h2 className="pr-8 text-xl">{thisItem.title}</h2>
          <p className="mt-2 grow font-sans text-sm">
            {thisItem.descriptionDisplay}
          </p>
          <TagList items={thisItem.tags} />
          <div className="-mx-1.25 mt-4 flex justify-center gap-2 border-t border-border-subtle/20 pt-4">
            <CardButton onClick={handleEdit}>edit</CardButton>
            <Link
              className={cardActionClassName}
              href={`/bank/view?key=${encodeURIComponent(thisItem.key)}`}
              onClick={() => cacheAccomplishment(thisItem)}
              transitionTypes={['nav-forward']}
            >
              view
            </Link>
          </div>
        </div>
      </ViewTransition>
    );
  }

  return renderItem();
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
      />
    );
  });

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6 p-6">
      {cardComponents}
    </div>
  );
}

export default CardList;
