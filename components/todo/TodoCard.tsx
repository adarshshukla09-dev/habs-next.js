import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Checkbox } from '../ui/checkbox'

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

function TodoCard({ dayName, todos }: { dayName: string, todos: Todo[] }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase">
          {dayName}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center space-x-2">
            <Checkbox id={todo.id} checked={todo.completed} />
            <label htmlFor={todo.id} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {todo.title}
            </label>
          </div>
        ))}
        {todos.length === 0 && <p className="text-xs text-slate-400 italic">No tasks</p>}
      </CardContent>
    </Card>
  )
}

export default TodoCard