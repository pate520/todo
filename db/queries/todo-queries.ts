"use server";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { todoTable, type NewTodo } from "../schema/todo-schema";

// 创建新的待办事项
export async function createTodo(data: NewTodo) {
  try {
    const [newTodo] = await db.insert(todoTable).values(data).returning();
    return { todo: newTodo };
  } catch (error) {
    console.error("创建待办事项失败:", error);
    throw new Error("创建待办事项失败");
  }
}

// 获取所有待办事项
export async function getAllTodos() {
  try {
    const todos = await db.query.todoTable.findMany({
      orderBy: (todo) => todo.createdAt,
    });
    return { todos };
  } catch (error) {
    console.error("获取待办事项失败:", error);
    throw new Error("获取待办事项失败");
  }
}

// 更新待办事项状态
export async function toggleTodoStatus(id: string) {
  try {
    const todo = await db.query.todoTable.findFirst({
      where: eq(todoTable.id, id),
    });
    
    if (!todo) {
      throw new Error("待办事项不存在");
    }

    const [updatedTodo] = await db
      .update(todoTable)
      .set({ completed: !todo.completed })
      .where(eq(todoTable.id, id))
      .returning();

    return { todo: updatedTodo };
  } catch (error) {
    console.error("更新待办事项状态失败:", error);
    throw new Error("更新待办事项状态失败");
  }
}

// 删除待办事项
export async function deleteTodo(id: string) {
  try {
    await db.delete(todoTable).where(eq(todoTable.id, id));
    return { success: true };
  } catch (error) {
    console.error("删除待办事项失败:", error);
    throw new Error("删除待办事项失败");
  }
} 