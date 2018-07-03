import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classnames from 'classnames';
import swal from 'sweetalert';
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

    if (!email) {
      swal('Quase lá', 'Faltou informar o seu e-mail', 'warning');
      return;
    }

    axios.post('/api/newsletter', newUser)
      .then(() => {
        this.setState({ email: '' });
        swal('Enviado!', 'Excelente, seu e-mail foi parar na nossa lista de contatinhos!', 'success');
      })
      .catch(err => {
        this.setState({ errors: err.response.data });
        if (err.response.data.email) {
          swal('Oops!', 'O e-mail informado tem algo estranho...', 'error');
        } else {
          swal('Oops!', 'Algo deu muito errado!', 'error');
        }
      });
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
                  Você vai encontrar aqui
                </h2>
                <h2 className="brand-font">
                  tudo para o dia
                </h2>
                <h2 className="brand-font">
                  mais feliz da sua vida
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
                  </div>
                  <AwesomeButton type="primary">
                    Quero ficar por dentro
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
