import React from 'react'
import TodoCard from './TodoCard'

const Weekn = () => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Current Week</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {daysOfWeek.map((day) => (
          <TodoCard 
            key={day} 
            dayName={day} 
            todos={[]} // You will pass your DB data here
          />
        ))}
      </div>
    </div>
  )
}

export default Weekn