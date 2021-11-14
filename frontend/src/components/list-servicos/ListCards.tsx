import "./ListCard.css";

export interface ListCardsComponentProps {
  children?: React.ReactNode;
}

function ListCardsComponent(props: ListCardsComponentProps) {
  return (
    <div className="list-card-component">
      <div className="list">{props.children}</div>
    </div>
  );
}

export default ListCardsComponent;
