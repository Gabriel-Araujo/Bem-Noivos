import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';

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
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-center">
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
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
                  <button type="submit" className="btn btn-lg btn-danger mr-2">
                    Quero ficar por dentro de tudo
                  </button>
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
