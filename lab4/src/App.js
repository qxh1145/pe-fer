import React from 'react';
import AddHabitForm from './components/AddHabitForm';
import HabitList from './components/HabitList';
import DayFilter from './components/DayFilter';
import { HabitProvider } from './context/HabitContext';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';function App() {
  return (
    <HabitProvider>
      <div className="App container mt-4">
        <h1 className="mb-4">Daily Habit Tracker</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <AddHabitForm />
            <DayFilter />
            <HabitList />
          </div>
        </div>
      </div>
    </HabitProvider>
  );
}

export default App;
