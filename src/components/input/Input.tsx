import React, { forwardRef } from 'react';
import './input.styles.css';

interface Props {
  placeholder?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ placeholder, ...rest }, ref) => {

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      const current = e.currentTarget;
      current.value = current.value.replace(/[^0-9]/g, '');
    };

    return (
      <input
        ref={ref}
        className="input"
        placeholder={placeholder}
        onInput={handleInput}
        {...rest}
      />
    );
  }
);
