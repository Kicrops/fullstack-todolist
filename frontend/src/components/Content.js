import React, { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask, editText, editCompleted, clearList } from "../services/todoService";
import InputContainer from "./InputContainer";
import TodoList from "./TodoList";

function Content() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		getTasks().then((data) => setTodos(data));
	}, []);

	const addTodo = (text) => {
		if (text === "") {
			alert("Please enter a task.");
			return;
		}
		const newTodo = {
			text,
			date: Date.now(),
			beingEdited: false,
			completed: false,
		};
		createTask(newTodo).then((data) => setTodos((prevTodos) => [...prevTodos, data]));
	};

	const editTodo = (id, text) => {
		if (text === "") {
			alert("Please enter a task.");
			return;
		}
		editText(id, text).then((data) => setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, text, beingEdited: false } : todo))));

	};

	const deleteTodo = (id) => {
		deleteTask(id).then(() => setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)));
	};

	const toggleComplete = (id) => {
		const todo = todos.find((todo) => todo.id === id);
		editCompleted(id, !todo.completed).then((data) => setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))));
	};

	const clearTodos = () => {
		clearList().then(() => setTodos([]));
	};
	

	return (
		<div className="main-container">
			<InputContainer addTodo={addTodo} clearTodos={clearTodos} />
			<TodoList todos={todos} setTodos={setTodos} toggleComplete={toggleComplete} editTodo={editTodo} deleteTodo={deleteTodo} />
		</div>
	);
}

export default Content;
