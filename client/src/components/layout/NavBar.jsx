import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-pink-base mb-4">
        <div className="container">
          <Link className="brand-bn-nav centered" to="/">
            Bem Noivos
          </Link>
          <Link className="navbar-brand brand-font" to="/">
            {' '}
            Bem Noivos
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/fornecedores">
                  {' '}
                  Fornecedores
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Registre-se
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Acesse
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
