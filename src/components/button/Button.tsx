import React from 'react';
import './button.styles.css';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
}

export const Button: React.FC<Props> = ({ type = 'button', onClick, isLoading = false, children, ...rest }) => {

  return (
    <button
      className='button'
      onClick={onClick}
      disabled={isLoading}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
