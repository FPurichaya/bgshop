import React from 'react';

const Price = ({ prices }) => (
  <span>
    {prices / 100} {prices < 3000 && '!'}
  </span>
);

export default Price;
