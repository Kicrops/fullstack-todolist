import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

function TodoList({ todos, setTodos, toggleComplete, editTodo, deleteTodo }) {
	const [newName, setNewName] = useState("");
	const handleKeyDown = (e, id) => {
		if (e.key === "Enter") {
			saveChanges(id);
		}
	};
	const editMode = (id) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) => ({
				...todo,
				beingEdited: todo.id === id, 
			}))
		);
		setNewName(todos.find((todo) => todo.id === id).text);
	};
	const saveChanges = (id) => {
		if (newName === "") {
			alert("Please enter a task.");
			return;
		}
		editTodo(id, newName); 
	};	
	return (
		<ul className="todo-list">
			{todos.map((todo) => (
				<li key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
					{todo.beingEdited ? (
						<div className="edit-mode">
							<input type="text" defaultValue={todo.text} onChange={(e) => setNewName(e.target.value)} autoFocus onKeyDown={(e) => {handleKeyDown(e, todo.id)}}/>
							<button onClick={() => saveChanges(todo.id)}>
								<FontAwesomeIcon icon={faCheck} />
							</button>
						</div>
					) : (
						<>
							<input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />
							<span>{todo.text}</span>
							<div className="todo-item-buttons">
								<button onClick={() => editMode(todo.id)} className="edit-button">
									<FontAwesomeIcon icon={faPencil} />
								</button>
								<button onClick={() => deleteTodo(todo.id)} className="delete-button">
									<FontAwesomeIcon icon={faXmark} />
								</button>
							</div>
						</>
					)}
				</li>
			))}
		</ul>
	);
}

export default TodoList;
