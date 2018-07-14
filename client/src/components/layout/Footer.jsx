import React from 'react';
import Social from './Social';

export default () => (
  <footer className="bg-dark text-white p-4 text-center mt-5">
    <Social />
    <hr />
    <span className="damion-font">
      Bem Noivos
    </span>
    {' '}
    &copy;
    {' '}
    {new Date().getFullYear()}
  </footer>
);
