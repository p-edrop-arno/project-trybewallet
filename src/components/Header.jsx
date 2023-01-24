import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const currencyField = 'BRL';
    return (

      <header>

        <p data-testid="email-field">
          Email:
          {' '}
          {email}
        </p>

        <p data-testid="total-field">
          {
            expenses.length > 0 ? expenses.map((expense) => (
              Number(expense.exchangeRates[expense.currency].ask)
                * Number(expense.value))).reduce((a, b) => a + b).toFixed(2) : 0
          }
        </p>

        <p data-testid="header-currency-field">
          {currencyField}
        </p>

      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.shape(
      PropTypes.any.isRequired,
    )
      .isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Header);
