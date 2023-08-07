import { ChangeEvent, useState, ReactNode, FormEvent } from "react";
import { FaUpload } from "react-icons/fa";
import {BiSolidTrashAlt} from "react-icons/bi";
import {
    useGetTodosQuery, useAddTodoMutation,
    useDeleteTodoMutation,
    useUpdateTodoMutation,
} from "../api/apiSlice";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState<string>('');


    const {
        data: todos,
        isLoading,
        isSuccess,
        isError,
        // error
    } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addTodo({ userId: 1, title: newTodo, completed: false });
        setNewTodo('');
    }

    let newItemSection: ReactNode = (<form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Enter a new todo item</label>
        <div className="new-todo">
            <input type="text" id="new-todo"
                value={newTodo} onChange={handleChange} />
        </div>
        <button className="submit">
            <FaUpload />
        </button>
    </form>);


    let content;
    if (isLoading) {
        content = <p>Loading...</p>
    } else if (isSuccess) {
        content = todos.map((todo) => {
            return (
                <article key={todo.id}>
                    <div className="todo">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            id={todo.id}
                            onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                        />
                        <label htmlFor={todo.id}>{todo.title}</label>
                    </div>
                    <button className="trash" onClick={() => deleteTodo( todo.id)}>
                        <BiSolidTrashAlt/>
                    </button>
                </article>
            )
        })
    } else if (isError) {
        content = <p>Something went wrong</p>
    }


    return (
        <main>
            <h1>Todo List</h1>
            {newItemSection}
            {content}
        </main>
    )
}

export default TodoList;