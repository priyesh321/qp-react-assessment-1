import React, { useState, useMemo } from "react";
import { FixedSizeList as List } from "react-window";

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TodoItem: React.FC<{
  todo: Todo;
  index: number;
  style: React.CSSProperties;
  toggleTodoCompletion: (id: number) => void;
}> = ({ todo, toggleTodoCompletion, index, style }) => {
  return (
    <div
      style={style}
      className={`${
        index % 2 === 0 ? "bg-gray-100" : "bh-gray-white"
      } border-b border-gray-200`}
    >
      <li
        key={todo.id}
        className={`flex items-center justify-between py-2 border-b border-gray-200 ${
          todo.completed ? "bg-green-100" : "bg-red-100"
        }`}
      >
        <input
          type="checkbox"
          className="mr-2"
          checked={todo.completed}
          onChange={() => toggleTodoCompletion(todo.id)}
        />
        <span
          className={`font-semibold${
            todo.completed ? "text-green-700" : "text-red-700"
          }`}
        >
          {todo.title}
        </span>
        <p className="ml-4 text-gray-600">{todo.description}</p>
      </li>
    </div>
  );
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addTodo = () => {
    if (title.trim() === "") return;
    const newTodo: Todo = {
      id: todos.length + 1,
      title,
      description,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
  };

  const toggleTodoCompletion = (id: number) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const MemoizedTodoItem = useMemo(() => React.memo(TodoItem), []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Todo App</h1>

      <div className="mb-4">
        <input
          type="text"
          className="border border-gray-300 rounded px-4 py-2 w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border border=gray-300 rounded px-4 py-2 w-full mt-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{resize:'none'}}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        onClick={addTodo}
      >
        Add Todo
      </button>
        <List
          height={400}
          itemCount={todos.length}
          itemSize={50}
          width={300}
          className="mt-4"
        >
          {({ index, style }) => (
            <MemoizedTodoItem
              key={todos[index].id}
              index={index}
              style={style}
              todo={todos[index]}
              toggleTodoCompletion={toggleTodoCompletion}
            />
          )}
        </List>
    </div>
  );
};

export default TodoList;
