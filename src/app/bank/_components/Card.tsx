import CardButton from './CardButton';
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
      <div className="relative m-4 w-3/5 min-w-100 max-w-100 rounded-card bg-cream p-5 text-center font-sans shadow-card">
        <div>
          <p className="flex justify-center font-sans">{thisItem.date}</p>
          <h2>{thisItem.title}</h2>
        </div>
        <CardButton
          variant="delete"
          aria-label="Delete accomplishment"
          onClick={handleClick}
        >
          x
        </CardButton>
        <p className="flex flex-wrap justify-center font-sans">
          {thisItem.descriptionDisplay}
        </p>
        <TagList items={thisItem.tags} />
        <CardButton onClick={handleEdit}>edit</CardButton>
        <CardButton onClick={handleView}>view more</CardButton>
      </div>
    );
  }

  return <div>{renderItem()}</div>;
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

  return (
    <div className="flex flex-row flex-wrap content-between items-center justify-center p-12">
      {cardComponents}
    </div>
  );
}

export default CardList;
