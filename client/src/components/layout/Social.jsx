import React from 'react';

export default () => (
  <section className="contact bg-social mt-5 pt-5 pb-5" id="contact">
    <div className="container">
      <h2 className="brand-font">
        Nós
        {' '}
        <i className="fa fa-heart" />
        {' '}
        novos amigos!
      </h2>
      <ul className="list-inline list-social">
        <li className="list-inline-item social-instagram">
          <a href="/">
            <i className="fab fa-instagram" />
          </a>
        </li>
        <li className="list-inline-item social-facebook">
          <a href="http://www.facebook.com/bemnoivosmt">
            <i className="fab fa-facebook-f" />
          </a>
        </li>
        <li className="list-inline-item social-pinterest">
          <a href="/">
            <i className="fab fa-pinterest" />
          </a>
        </li>
      </ul>
    </div>
  </section>
);
