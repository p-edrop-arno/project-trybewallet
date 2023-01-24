import {
  GET_CURRENCIES,
  NEW_EXPENSE,
  CLEAR_EXPENSE,
  EDITING_EXPENSE,
  FULL_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES: {
    return {
      ...state,
      currencies: [...Object.keys(action.currencies)],
    };
  }

  case NEW_EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  }

  case CLEAR_EXPENSE: {
    const expensesList = [...state.expenses];

    return {
      ...state,
      expenses: expensesList.filter((expense) => expense.id !== action.expenseId),
    };
  }

  case EDITING_EXPENSE: {
    return {
      ...state,
      editor: true,
      idToEdit: action.expense.id,
    };
  }

  case FULL_EDIT: {
    const expensesList = [...state.expenses];
    const expensesListUpdated = expensesList.map((expense) => {
      if (expense.id === state.idToEdit) {
        return { ...action.expense, id: expense.id };
      } return expense;
    });

    return {
      ...state,
      editor: false,
      expenses: expensesListUpdated,
    };
  }

  default:
    return state;
  }
};

export default wallet;
