import { ViewTransition } from 'react';

import Link from 'next/link';

import CardButton, { cardActionClassName } from './CardButton';
import TagList from './Tag';

import type { Accomplishment } from '@/types/accomplishment';

interface CardProps {
  item: Accomplishment;
  deleteCard: (id: number) => void;
  editCard: (id: number) => void;
}

interface CardListProps {
  items: Accomplishment[];
  deleteCard: (id: number) => void;
  editCard: (id: number) => void;
}

function Card({ item, deleteCard, editCard }: CardProps) {
  return (
    <ViewTransition
      name={`accomplishment-${item.key}`}
      share="morph"
      default="none"
    >
      <div className="relative flex h-full flex-col rounded-card bg-cream p-5 font-sans shadow-card transition-shadow duration-150 hover:shadow-elevate">
        <CardButton
          variant="delete"
          aria-label="Delete accomplishment"
          onClick={() => deleteCard(item.id)}
        >
          ×
        </CardButton>
        <p className="pr-8 font-sans text-sm text-inactive-text">{item.date}</p>
        <h2 className="pr-8 text-xl">{item.title}</h2>
        <p className="mt-2 grow font-sans text-sm">{item.descriptionDisplay}</p>
        <TagList items={item.tags} />
        <div className="-mx-1.25 mt-4 flex justify-center gap-2 border-t border-border-subtle/20 pt-4">
          <CardButton onClick={() => editCard(item.id)}>edit</CardButton>
          <Link
            className={cardActionClassName}
            href={`/bank/view?key=${encodeURIComponent(item.key)}`}
            transitionTypes={['nav-forward']}
          >
            view
          </Link>
        </div>
      </div>
    </ViewTransition>
  );
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
