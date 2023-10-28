import { Todo } from "../model"

type Actions = 
    | {type: "add", payload:string}
    | {type: "remove", payload: number}
    | {type: "done", payload:number};
    
const TodoReducer = (state: Todo[], actions: Actions) => {

}