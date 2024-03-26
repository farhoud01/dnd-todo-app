import { useState } from "react"
import { Column } from "./col";
import { DeleteCol } from "./del";

export const Board = () => {

    type CardsType = {
        title:string,
        id:string,
        colID:("holder"|"pending"|"doing" |"done"),
        index: number;
    }
   
    const [cards,setCards] = useState<CardsType[]>([]);
    return (
        <div className="flex flex-col sm:flex-row h-screen text-neutral-50 w-full overflow-x-clip gap-2 p-12">
            <Column title="Holder Log" heading_color="text-neutral-500" colID="holder"cards={cards} setcards={setCards} ></Column>
            <Column title="Pending list" heading_color="text-yellow-200" colID="pending"cards={cards} setcards={setCards} ></Column>
            <Column title="doing list" heading_color="text-blue-200" colID="doing"cards={cards} setcards={setCards} ></Column>
            <Column title="done list" heading_color="text-emerald-200" colID="done" cards={cards} setcards={setCards} ></Column>
            <DeleteCol cards={cards} setcards={setCards} />
        </div>
    )
}