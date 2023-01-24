// ACTIONS TYPES
export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const NEW_EXPENSES = 'NEW_EXPENSES';

// ACTIONS CREATORS
export const loginEmail = (email) => ({
  type: LOGIN_EMAIL,
  email,
});

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  currencies,
});

export const newExpenses = (state) => ({
  type: NEW_EXPENSES,
  state,
});

export function catchAllCurrencies() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currencies) => dispatch(getCurrencies(currencies)));
}
