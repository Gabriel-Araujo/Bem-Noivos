import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email:'',
      password:'',
      password2:'',
      errors: {}
    }
  }
  

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center brand-font">Registre-se</h1>
              <p className="lead text-center">O seu novo usuário :)</p>
              <form action="create-profile.html">
                <div className="form-group">
                <small className="form-text lead">Nome</small>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    placeholder="Seu nome" 
                    name="name" 
                    value={this.state.name}
                  />
                </div>
                <div className="form-group">
                  <small className="form-text lead">E-mail</small>
                  <input 
                    type="email" 
                    className="form-control form-control-lg" 
                    placeholder="Email Address" 
                    name="email"
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                <small className="form-text lead">Senha</small>
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Senha" 
                    name="password" 
                    value={this.state.password}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="password" 
                    className="form-control form-control-lg" 
                    placeholder="Confirme a Senha" 
                    name="password2" 
                    value={this.state.password2}
                  />
                </div>
                <input type="submit" className="btn btn-danger btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default Register;