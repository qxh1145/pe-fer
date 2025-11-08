import React, { useContext } from 'react';
import { HabitContext } from '../context/HabitContext';

const DayFilter = () => {
  const { dispatch } = useContext(HabitContext);

  const handleFilterChange = (e) => {
    dispatch({ type: 'SET_FILTER', payload: e.target.value });
  };

  return (
    <div className="mb-3">
      <label htmlFor="dayFilter" className="form-label">Filter by day: </label>
      <select id="dayFilter" className="form-select" onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </select>
    </div>
  );
};

export default DayFilter;
