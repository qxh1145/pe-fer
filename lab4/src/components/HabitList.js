import React, { useContext } from 'react';
import { HabitContext } from '../context/HabitContext';

const HabitList = () => {
  const { state, dispatch, handleToggleHabit, handleResetHabits } = useContext(HabitContext);

    const allDays = [

      'Monday',

      'Tuesday',

      'Wednesday',

      'Thursday',

      'Friday',

      'Saturday',

      'Sunday',

    ];

  

    const daysToDisplay = state.filter === 'All' ? allDays : [state.filter];

  

  return (
    <div className="mt-4">
      {daysToDisplay.map((day) => (
        <div key={day} className="card mb-3">
          <div className="card-header">
            <h3 className="mb-0">{day}</h3>
          </div>
          <ul className="list-group list-group-flush">
            {state.habits
              .filter((habit) => habit.day === day)
              .map((habit) => (
                <li
                  key={habit.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span
                    style={{
                      textDecoration: habit.completed ? 'line-through' : 'none',
                    }}
                  >
                    <strong>{habit.title}</strong> - {habit.goal}
                  </span>
                  <input
                    type="checkbox"
                    checked={habit.completed}
                    onChange={() => handleToggleHabit(habit)}
                    className="form-check-input"
                  />
                </li>
              ))}
          </ul>
        </div>
      ))}
      <button onClick={handleResetHabits} className="btn btn-danger mt-3">
        Reset All Habits
      </button>
    </div>
  );

  
};

export default HabitList;
