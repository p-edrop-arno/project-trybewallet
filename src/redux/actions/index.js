export const GET_EMAIL = 'GET_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const NEW_EXPENSE = 'NEW_EXPENSE';
export const CLEAR_EXPENSE = 'CLEAR_EXPENSE';
export const EDITING_EXPENSE = 'EDITING_EXPENSE';
export const FULL_EDIT = 'FULL_EDIT';

export const getEmail = (email) => ({
  type: GET_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const newExpense = (state) => ({
  type: NEW_EXPENSE,
  state,
});

export const clearExpense = (expenseId) => ({
  type: CLEAR_EXPENSE,
  expenseId,
});

export const editingExpense = (expense) => ({
  type: EDITING_EXPENSE,
  expense,
});
export const fullEdit = (expense) => ({
  type: FULL_EDIT,
  expense,
});

export function fetchCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => {
      delete currencies.USDT;
      dispatch(getCurrencies(currencies));
    });
}
