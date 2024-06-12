import React, { useState } from 'react';
import './App.css';

function App() {

	const [inputValue, setInputValue] = useState<string>("");
	const [todos, setTodos] = useState<Todo[]>([]);

	type Todo = {
		inputValue: string;
		id: number;
		checked: boolean;
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newTodo: Todo = {
			inputValue: inputValue,
			id: todos.length,
			checked: false,
		};

		setTodos([newTodo, ...todos]);
		setInputValue("");
	};

	const handleEdit = (id: number, inputValue: string) => {
		const newTodo = todos.map((todo) => {
			if (todo.id === id) {
				todo.inputValue = inputValue;
			}
			return todo;
		});
		setTodos(newTodo);
	};

	const handleChecked = (id: number) => {
		const newTodo = todos.map((todo) => {
			if (todo.id === id) {
				todo.checked = !todo.checked;
			}
			return todo;
		});
		setTodos(newTodo);
	};

	const handleDelete = (id: number) => {
		const newTodo = todos.filter((todo) => todo.id !== id);
		setTodos(newTodo);
	};

	return (
	<div className="App">
		<div>
			<h2>To Do List with TypeScript</h2>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => handleChange(e)}
					className="inputText"
				/>
				<input type="submit" value="作成" className="submitButton" />
			</form>
			<ul className="todoList">
				{todos.map((todo) => (
					<li key={todo.id}>
						<input
							type="text"
							value={todo.inputValue}
							onChange={(e) => handleEdit(todo.id, e.target.value)}
							disabled={todo.checked}
						/>
						<input type="checkbox" onChange={() => handleChecked(todo.id)} />
						<input type="submit" value="削除" onClick={() => handleDelete(todo.id)} />
					</li>
				))}
			</ul>
		</div>
	</div>
	);
}

export default App;
