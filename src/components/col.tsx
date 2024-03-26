import { useState, DragEvent } from "react";
import { Card } from "./Card";
import { DropIndicator } from "./dropI";
import { AddCard } from "./Add";

type PropsType = {
  title: string;
  heading_color: string;
  colID: "holder" | "pending" | "doing" | "done";
  cards: CardsType[];
  setcards: React.Dispatch<React.SetStateAction<CardsType[]>>;
};

type CardsType = {
  title: string;
  id: string;
  colID: "holder" | "pending" | "doing" | "done";
  index :number;

};

export const Column = (props: PropsType) => {
  const [active, setActive] = useState(false);

  const filteredCards = props.cards.filter((e) => e.colID === props.colID);

  function handleDragStart(e: DragEvent<HTMLDivElement>, card: CardsType) {
    e.dataTransfer.setData("Index", card.index.toString());
  }
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(true);
  }
 
  function handleDragLeave(){
    setActive(false);

  }
  function handleDrop(e:DragEvent<HTMLDivElement>){
    setActive(false); //styling
      const cardRef=  e.dataTransfer.getData("Index");
      const updatedCards = [...props.cards];
      updatedCards[parseInt(cardRef)].colID = props.colID;
      props.setcards(updatedCards);
      e.dataTransfer.clearData();
     
  }
  return (
    <div style={{ height: '90%' }} className="w-80 sm-shrink shrink-0">
      <div className="mb-3 sm-h-50 sm-gap-2 sm-flex-col-rev flex items-center justify-between text-center">
        <h2 className={`font-medium pl-12 ${props.heading_color}`}>{props.title}</h2>
        <span className="rounded text-sm text-neutral-400 p-2 bg-neutral-600/550">{filteredCards.length}</span>
      </div>
      <div onDrop={handleDrop} onDragLeave={handleDragLeave} onDragOver={handleDragOver} className={`h-full w-full  tranisiton-colors rounded-md ${active ? "bg-neutral-800/50" : "bg-neutral-800   "}`}>
        {filteredCards.map((e) => {
          return <Card key={e.id} {...e} colID={props.colID} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeID="-1" colID={props.colID} />
        <AddCard cards={props.cards} col={props.colID} set={props.setcards} />
      </div>
    </div>
  );
};