"use client";

import { useState } from "react";
import { createTodo, deleteTodo, toggleTodoStatus } from "@/db/queries/todo-queries";
import type { Todo } from "@/db/schema/todo-schema";

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      const result = await createTodo({
        id: crypto.randomUUID(),
        title: newTodoTitle.trim(),
      });
      
      if (result.todo) {
        setTodos([...todos, result.todo]);
        setNewTodoTitle("");
      }
    } catch (error) {
      console.error("添加待办事项失败:", error);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const result = await toggleTodoStatus(id);
      if (result.todo) {
        setTodos(todos.map(todo => 
          todo.id === id ? result.todo : todo
        ));
      }
    } catch (error) {
      console.error("更新待办事项状态失败:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("删除待办事项失败:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">待办事项列表</h1>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="添加新的待办事项..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            添加
          </button>
        </div>
      </form>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <span className={todo.completed ? "line-through text-gray-500" : ""}>
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 