import React from 'react';
import './value.styles.css';

type Props = {
  value: number;
}

export const Value: React.FC<Props> = ({ value }) => {
  return <h1 className='value'>Значение: {value}</h1>;
};
