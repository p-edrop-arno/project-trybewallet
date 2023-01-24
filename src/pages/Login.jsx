import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginEmail } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  validates = () => {
    const { email, password } = this.state;
    const reEmail = /\S+@\S+\.\S+/;
    const minLength = 6;

    if (reEmail.test(email) && password.length >= minLength) return true;
  };

  onHandleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  onClickChange = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(loginEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;

    return (
      <form>

        <label htmlFor="email">
          <input
            type="text"
            id="email"
            data-testid="email-input"
            name="email"
            placeholder="Email"
            value={ email }
            onChange={ this.onHandleChange }
            required
          />
        </label>

        <label htmlFor="password">
          <input
            type="password"
            id="password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ this.onHandleChange }
            required
          />
        </label>

        <button
          type="button"
          disabled={ !this.validates() }
          onClick={ this.onClickChange }
        >
          Entrar
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape(PropTypes.any.isRequired).isRequired,
};

export default connect(mapStateToProps)(Login);
