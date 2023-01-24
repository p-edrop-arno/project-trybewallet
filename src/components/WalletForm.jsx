import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { newExpense, fullEdit, fetchCurrencies } from '../redux/actions';

const food = 'Alimentação';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: food,
    exchangeRates: '',
    id: -1,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  componentDidUpdate(prevProps) {
    const { expenses, idToEdit, editor } = this.props;
    if (editor !== prevProps.editor) {
      const expenseToEdit = expenses.find((expense) => expense.id === idToEdit);
      this.setState((prevState) => ({
        ...expenseToEdit,
        id: prevState.id,
      }));
      if (editor === false) {
        this.setState({
          value: '',
          description: '',
          method: 'Dinheiro',
          tag: food,
          currency: 'USD',
        });
      }
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch, editor } = this.props;
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => {
        delete currencies.USDT;
        this.setState({
          exchangeRates: currencies,
        }, () => {
          if (editor) {
            dispatch(fullEdit(this.state));
          } else {
            const { id } = this.state;
            dispatch(newExpense({ ...this.state, id: id + 1 }));
            this.setState((prevState) => ({
              id: prevState.id + 1,
              value: '',
              description: '',
              currency: 'USD',
              method: 'Dinheiro',
              tag: food,
            }));
          }
        });
      });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>

        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            id="value"
            data-testid="value-input"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            id="description"
            data-testid="description-input"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          onChange={ this.handleChange }
          value={ currency }
        >
          {
            currencies.map((currencyTX, index) => (
              <option
                key={ index }
                value={ currencyTX }
              >
                {currencyTX}
              </option>
            ))
          }
        </select>

        <select
          name="method"
          id="method"
          data-testid="method-input"
          onChange={ this.handleChange }
          value={ method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito"> Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>

        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          onChange={ this.handleChange }
          value={ tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>

        {
          editor ? (
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Editar despesa
            </button>
          )
            : (
              <button
                type="button"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>
            )
        }

      </form>
    );
  }
}

WalletForm.propTypes = ({
  dispatch: Proptypes.func.isRequired,
  currencies: Proptypes.arrayOf(Proptypes.string.isRequired).isRequired,
  editor: Proptypes.bool.isRequired,
  expenses: Proptypes
    .arrayOf(Proptypes.shape(Proptypes.any.isRequired).isRequired).isRequired,
  idToEdit: Proptypes.number.isRequired,
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseId: state.wallet.expenses.length,
  editor: state.wallet.editor,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
