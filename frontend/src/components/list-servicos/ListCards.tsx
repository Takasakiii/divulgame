import style from "./ListCard.module.css";

export interface ListCardsComponentProps {
  children?: React.ReactNode;
}

function ListCardsComponent(props: ListCardsComponentProps) {
  return (
    <div className={style.listCardComponent}>
      <div className={style.list}>{props.children}</div>
    </div>
  );
}

export default ListCardsComponent;
