import { useState } from "react";

export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
}

export function StrictTodoApp() {
  // 1. Explicitly type our collection state as an array of Todos
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // 2. String primitive state can rely safely on automatic inference
  const [inputText, setInputText] = useState('');

  // 3. Extracted Input Change Handler
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value); // TypeScript guarantees target.value is a string
  };

  // 4. Extracted Form Submission Handler
  const handleFormSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault(); // Safe because FormEvent includes standard browser controls
    
    if (!inputText.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(), // Generates a secure, strict string ID
      text: inputText.trim(),
      isCompleted: false,
    };

    // Use a functional state update to preserve data integrity
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputText('');
  };

  // 5. Toggling Completeness with safe array transformations
  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Type-Safe Task Manager</h1>
      
      <form onSubmit={handleFormSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="What needs to be done?"
          className="flex-1 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      <ul className="space-y-3">
        {todos.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No tasks remaining. Good work!</p>
        ) : (
          todos.map((todo: any) => (
            <li
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                todo.isCompleted 
                  ? 'bg-gray-50 border-gray-200 line-through text-gray-400' 
                  : 'bg-white border-gray-200 text-gray-800 hover:border-blue-300'
              }`}
            >
              <input
                type="checkbox"
                checked={todo.isCompleted}
                readOnly
                className="mr-3 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="break-all">{todo.text}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}