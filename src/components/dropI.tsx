import { useState, useEffect } from 'react';

type DropIProps = {
  beforeID: string;
  colID: string;
  activeCard?: boolean;
};

export const DropIndicator = (props: DropIProps) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.activeCard === true);
  }, [props.activeCard]);

  if (!props.activeCard) return null;

  return (
    <div
      className={`my-3 h-0.5 w-full bg-pink-400 transition-opacity ${
        active ? 'opacity-100' : 'opacity-0'
      } `}
      data-before={props.beforeID || '-1'}
      data-col={props.colID}
    ></div>

  );
};