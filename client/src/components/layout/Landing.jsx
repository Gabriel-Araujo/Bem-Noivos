import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <Link className="brand-bn center-block" to="/">
                  Bem Noivos
                </Link>
                <h1 className="display-3 mb-4 damion-font">
                  Bem Noivos
                </h1>
                <h2 className="brand-font">
                  Tudo para o dia mais feliz da sua vida
                </h2>
                <Link className="btn btn-lg btn-danger mr-2" to="/register">
                  Registre-se
                </Link>
                <Link className="btn btn-lg btn-light" to="/login">
                  Acesse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
