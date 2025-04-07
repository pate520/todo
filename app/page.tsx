import TodoList from "./components/Todo";
import { getAllTodos } from "@/db/queries/todo-queries";

// 强制触发新的部署
export const runtime = 'edge';

export default async function Home() {
  const { todos } = await getAllTodos();
  
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <TodoList initialTodos={todos} />
    </main>
  );
}
