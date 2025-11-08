
import React, { createContext, useReducer, useEffect } from 'react';
import { habitReducer, initialState } from '../reducer/habitReducer';
import { getHabits, addHabit, updateHabit, deleteHabit } from '../api/habits';

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [state, dispatch] = useReducer(habitReducer, initialState);

  useEffect(() => {
    getHabits().then((res) => {
      dispatch({ type: 'SET_HABITS', payload: res.data });
    });
  }, []);

  const handleAddHabit = async (habit) => {
    const res = await addHabit(habit);
    dispatch({ type: 'ADD_HABIT', payload: res.data });
  };

  const handleToggleHabit = async (habit) => {
    const res = await updateHabit(habit.id, { completed: !habit.completed });
    dispatch({ type: 'TOGGLE_HABIT', payload: { id: habit.id } });
  };

  const handleResetHabits = async () => {
    state.habits.forEach(async (habit) => {
      await deleteHabit(habit.id);
    });
    dispatch({ type: 'RESET_HABITS' });
  };

  return (
    <HabitContext.Provider
      value={{
        state,
        dispatch,
        handleAddHabit,
        handleToggleHabit,
        handleResetHabits,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};
