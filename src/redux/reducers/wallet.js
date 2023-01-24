import { GET_CURRENCIES, NEW_EXPENSES, CLEAR_EXPENSES } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES: {
    const allCurrencies = [...Object.keys(action.currencies)];
    allCurrencies.splice(1, 1);
    return {
      ...state,
      currencies: allCurrencies,
    };
  }

  case NEW_EXPENSES: {
    return {
      ...state,
      expenses: [...state.expenses, action.state],
      idToEdit: action.state.id,
    };
  }

  case CLEAR_EXPENSES: {
    const currentExpenses = [...state.expenses];
    return {
      ...state,
      expenses: currentExpenses.filter((e) => e.id !== action.expense.id),
    };
  }

  default:
    return state;
  }
};

export default wallet;
