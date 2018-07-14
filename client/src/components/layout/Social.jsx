import React from 'react';

export default () => (
  <div className="contact pt-2 pb-2">
    <h2 className="brand-font">
        Nós
      {' '}
      <i className="fa fa-heart" />
      {' '}
        novos amigos!
    </h2>
    <ul className="list-inline list-social">
      <li className="list-inline-item social-instagram">
        <a href="http://www.instagram.com/bemnoivos">
          <i className="fab fa-instagram" />
        </a>
      </li>
      <li className="list-inline-item social-facebook">
        <a href="http://www.facebook.com/bemnoivos">
          <i className="fab fa-facebook-f" />
        </a>
      </li>
      <li className="list-inline-item social-pinterest">
        <a href="https://br.pinterest.com/bemnoivos/">
          <i className="fab fa-pinterest" />
        </a>
      </li>
    </ul>
  </div>
);
