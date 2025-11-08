
export const initialState = {
  habits: [],
  filter: 'All',
};

export const habitReducer = (state, action) => {
  switch (action.type) {
    case 'SET_HABITS':
      return {
        ...state,
        habits: action.payload,
      };
    case 'ADD_HABIT':
      return {
        ...state,
        habits: [...state.habits, { ...action.payload, completed: false }],
      };
    case 'TOGGLE_HABIT':
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.id
            ? { ...habit, completed: !habit.completed }
            : habit
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'RESET_HABITS':
      return {
        ...state,
        habits: [],
      };
    default:
      return state;
  }
};
