import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function InputContainer({ addTodo, clearTodos }) {
	const [newTodo, setNewTodo] = useState("");
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			addTodo(newTodo);
			setNewTodo("");
		}
	};
	return (
		<div className="input-container">
			<input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} onKeyDown={handleKeyDown} className="input-text" placeholder="New item" />
			<div className="input-buttons">
				<button
					onClick={() => {
						addTodo(newTodo);
						setNewTodo("");
					}}
					className="add-button">
					<FontAwesomeIcon icon={faPlus} />
				</button>
				<button onClick={() => clearTodos()} className="clear-button">
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</div>
		</div>
	);
}

export default InputContainer;
