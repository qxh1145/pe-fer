import React, { useState, useContext } from 'react';
import { HabitContext } from '../context/HabitContext';

const AddHabitForm = () => {
  const [title, setTitle] = useState('');
  const [day, setDay] = useState('Monday');
  const [goal, setGoal] = useState('');
  const { handleAddHabit } = useContext(HabitContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddHabit({ title, day, goal, completed: false });
    setTitle('');
    setDay('Monday');
    setGoal('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Habit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <select
          className="form-select"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
        <input
          type="text"
          className="form-control"
          placeholder="Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">
          Add Habit
        </button>
      </div>
    </form>
  );
};

export default AddHabitForm;
