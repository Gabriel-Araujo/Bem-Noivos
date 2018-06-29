import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      // errors: {},
    };
  }

  render() {
    const { name, email, password, password2 } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center brand-font">
                Registre-se
              </h1>
              <p className="lead text-center cambo-font">
                O seu novo usuário
              </p>
              <form action="create-profile.html">
                <div className="form-group">
                  <small className="form-text lead cambo-font">
                    Nome
                  </small>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Seu nome"
                    name="name"
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <small className="form-text lead">
                    E-mail
                  </small>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Seu e-mail"
                    name="email"
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <small className="form-text lead">
                    Senha
                  </small>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Senha"
                    name="password"
                    value={password}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirme a Senha"
                    name="password2"
                    value={password2}
                  />
                </div>
                <input type="submit" className="btn btn-danger btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
