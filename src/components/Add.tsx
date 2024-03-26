import { useState } from "react"
import { FiPlus } from "react-icons/fi"
import {motion} from 'framer-motion';
type CardsType = {
    title:string,
    id:string,
    colID:("holder"|"pending"|"doing" |"done")
    index:number;
}
type  addPorps = {
    col:("holder"|"pending"|"doing" |"done"),
    cards:CardsType[],
    set: React.Dispatch<React.SetStateAction<CardsType[]>>
} 
 export const AddCard = (props:addPorps) =>{
    const [name , setName] = useState("");
    const  [adding,SetAdding] = useState(false);
    function handleSubmit(e: React.FormEvent){
            e.preventDefault()
            if(!name.trim().length) {
                SetAdding(false)
                return;
            }
            const newTask:CardsType = {
                title:name.trim(),
                id:Math.random().toString(),
                colID : props.col,
                index:props.cards.length
            }
            props.set((cards) => [...cards,newTask])
            SetAdding(false);
    }
    return (
            <>
                {adding?<motion.form layout action="" onSubmit={handleSubmit}>
                    <textarea placeholder="add a new task" className="text-xl w-full rounded border border-pink-400 resize-none bg-pink-400/20 p-3 text-neutral-50 placeholder-pink-300 outline-0" onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => setName(e.target.value)}/>
                    <div className="mt-2 flex items-center justify-end gap-2">
                        <button onClick={() => SetAdding(false)} className="px-3 py-1.5  text-neutral-400 transition-colors hover:text-neutral-50">close</button>
                        <button type="submit" className="px-3 py-1.5  text-neutral-400 transition-colors   hover:text-neutral-500"><span> add + </span> </button>
                        
                    </div>
                </motion.form> : <motion.button layout className="flex w-full items-center gap-2 px-3 text-xs text-neutral-300 transition-colors hover:text-neutral-50 " onClick={()=> SetAdding(true)}> <span>add Task </span> <FiPlus/></motion.button>}
            </>
    )
}