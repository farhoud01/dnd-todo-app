import { useState } from 'react';
import { DropIndicator } from './dropI';
import { motion } from 'framer-motion';

type CardsType = {
  title: string;
  id: string;
  colID: 'holder' | 'pending' | 'doing' | 'done';
  index:number;
};

type CardProps = {
  title: string;
  id: string;
  colID: 'holder' | 'pending' | 'doing' | 'done';
  index:number;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, card: CardsType) => void;
};

export const Card = (props: CardProps) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <DropIndicator beforeID={props.id} colID={props.colID} activeCard={active} />
      <motion.div layout layoutId={props.id} >
        <div
          draggable
          onDragStart={(event: React.DragEvent<HTMLDivElement>) =>
            props.handleDragStart(event, {
              title: props.title,
              id: props.id,
              colID: props.colID,
              index:props.index,
            })
          }
          className={`cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing active:opacity-75 ${
            active ? 'active' : ''
          }`}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <h5 className="text-sm text-neutral-100">{props.title}</h5>
        </div>
      </motion.div>
    </>
  );
};