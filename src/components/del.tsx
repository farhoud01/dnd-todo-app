import React from "react"
import { useState , DragEvent } from "react"
import { FaFire } from "react-icons/fa"
import { FiTrash } from "react-icons/fi"

type CardsType = {
    title:string,
    id:string,
    colID:("holder"|"pending"|"doing" |"done")
    index: number
}
type delProps = {
    setcards: React.Dispatch<React.SetStateAction<CardsType[]>>
    cards:CardsType[],
}

export const DeleteCol = (props:delProps) => {
    const [active, setActive] = useState(false);
    const handleDragOver = (e:DragEvent<HTMLDivElement>)=> {
      e.preventDefault();
            setActive(true);
          
    }
    const handleDragLeave = () => {
        setActive(false);
      
        
    }
  function  handleDragend(e:DragEvent<HTMLDivElement>){
        
        const cardi = e.dataTransfer.getData("Index");
       
        
        props.setcards((cards)=> cards.filter((c)=> c.index !== cards[parseInt(cardi)].index))
        setActive(false);

  }
  function onremoveAll() {
    props.setcards((cards) => cards.filter((c) => !c));
  }
    return (
        <>
   <div className=" ml-3  sm-flex-col sm-ml-0 flex gap-3">


        <div onDrop={handleDragend} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className= {`mt-10 grid h-56 w-56 shrink-0 place-content-center border border-neutral-500 rounded-xl text-3xl ${active? "border-red-800 bg-red-800/20 text-red-500 " :"bg-neutral-500"}`}>
                {active ? <FaFire className="animate-bounce" />  : <FiTrash/>}
                
        </div>
        <div>
        <button className="mb-2" onClick={onremoveAll}>remove all</button>
        </div>
        </div>
        </>
    )
}