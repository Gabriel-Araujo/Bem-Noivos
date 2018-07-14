import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
      redirect: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;
    const newUser = { name, email, password, password2 };

    axios.post('/api/users/register', newUser)
      .then(() => this.setState({ redirect: true }))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { name, email, password, password2, errors, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto mb-5">
              <h1 className="display-4 text-center brand-font">
                Registre-se
              </h1>
              <p className="lead text-center cambo-font">
                O seu novo usuário
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <small className="form-text lead">
                    Nome
                  </small>
                  <input
                    type="text"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.name })}
                    placeholder="Seu nome"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                  />
                  { errors.name && (
                    <div className="invalid-feedback">
                      { errors.name }
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <small className="form-text lead">
                    E-mail
                  </small>
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })}
                    placeholder="Seu e-mail"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                  />
                  { errors.email && (
                    <div className="invalid-feedback">
                      { errors.email }
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <small className="form-text lead">
                    Senha
                  </small>
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })}
                    placeholder="Senha"
                    name="password"
                    value={password}
                    onChange={this.onChange}
                  />
                  { errors.password && (
                    <div className="invalid-feedback">
                      { errors.password }
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.password2 })}
                    placeholder="Confirme a Senha"
                    name="password2"
                    value={password2}
                    onChange={this.onChange}
                  />
                  { errors.password2 && (
                    <div className="invalid-feedback">
                      { errors.password2 }
                    </div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
