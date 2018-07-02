import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const { email } = this.state;
    const newUser = { email };

    console.log(email);

    axios.post('/api/newsletter', newUser)
      .then(res => console.log(res))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { email, errors } = this.state;
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container col-md-6">
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
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group text-center">
                    <input
                      type="email"
                      className={classnames('form-control form-control-lg text-center', { 'is-invalid': errors.email })}
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
                  <AwesomeButton type="primary">
                    Quero ficar por dentro de tudo
                  </AwesomeButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
