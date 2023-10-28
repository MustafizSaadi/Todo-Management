import React, { useState, useRef, useEffect } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { Todo } from '../model'
import './Styles.css'
import TodoList from './TodoList'

type Props = {
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editedTodo, setEditedTodo] = useState<string>(todo.todo);

    const handleEdit = () => {
        if(!edit && !todo.isDone) {
            setEdit(true)
        }
    }

    const handleDone = (id: number) => {
        if(!edit) {
            setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
        }
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleEditedText = (e:React.FormEvent<HTMLFormElement>, id:number) => {
        e.preventDefault()
        setTodos(todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editedTodo } : todo))
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <form className='todos__single' onSubmit={
            (e) => {handleEditedText(e, todo.id)}}>
            {
                edit ? (
                    <input ref={inputRef} className='todos__single--text' value={editedTodo} onChange={(e) => {
                        setEditedTodo(e.target.value)
                    }} />
                ) : (
                    todo.isDone ? (
                        <s className='todos__single--text'> {todo.todo} </s>
                    ) : (
                        <span className='todos__single--text'> {todo.todo} </span>
                    )
                )
            }


            <div>
                <span className='icon' onClick={() => { handleEdit() }}>
                    <AiFillEdit />
                </span>
                <span className='icon' onClick={() => { handleDelete(todo.id) }}>
                    <AiFillDelete />
                </span>
                <span className='icon' onClick={() => { handleDone(todo.id) }}>
                    <IoCheckmarkDoneSharp />
                </span>
            </div>
        </form>
    )
}

export default SingleTodo