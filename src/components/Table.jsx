import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <table border="1">

        <thead>

          <tr>

            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>

          </tr>

        </thead>

        <tbody>
          { expenses.map((expense, index) => (
            <tr key={ index }>
              <td>
                { expense.description }
              </td>
              <td>
                { expense.tag }
              </td>
              <td>
                { expense.method }
              </td>
              <td>
                { Number(expense.value).toFixed(2) }
              </td>
              <td>
                { expense
                  .exchangeRates[expense.currency]
                  .name }
              </td>
              <td>
                { Number(expense
                  .exchangeRates[expense.currency]
                  .ask).toFixed(2) }
              </td>
              <td>
                { Number(Number(expense
                  .exchangeRates[expense.currency]
                  .ask) * Number(expense.value))
                  .toFixed(2) }
              </td>
              <td>
                Real
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    );
  }
}

const mapStateToProps = (state) => ({ expenses:
  state.wallet.expenses });

Table.propTypes = { expenses: Proptypes
  .arrayOf(Proptypes.shape(Proptypes.any.isRequired)
    .isRequired).isRequired };

export default connect(mapStateToProps)(Table);
