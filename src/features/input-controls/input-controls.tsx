import React, { useRef } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import {
    incrementByValueAsync,
    decrementByValueAsync,
} from "../../ducks/actions";
import { AppState } from "../../ducks/reducer";
import { useQuaxDispatch, useQuaxSelector } from "../../quax";

import "./input-controls.styles.css";

export const InputControls: React.FC = () => {
  const dispatch = useQuaxDispatch();
  const value = useQuaxSelector((state: AppState) => state.value);
  const loading = useQuaxSelector((state: AppState) => state.loading);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = (operation: 'increment' | 'decrement') => {
    const inputValue = inputRef.current?.value;
    
    if (!inputValue || inputValue.trim() === '') {
      alert('Поле не может быть пустым');
      return;
    }
    
    const numValue = Number(inputValue);
    
    if (operation === 'increment') {
      dispatch(incrementByValueAsync(value, numValue));
    } else {
      dispatch(decrementByValueAsync(value, numValue));
    }
  };

  return (
    <div className="input-controls">
      <Button
        isLoading={loading}
        onClick={() => handleClick('increment')}
      >
        Увеличить на значение
      </Button>
      <Input 
        ref={inputRef} 
        placeholder="Изменить на значение" 
      />
      <Button 
        isLoading={loading}
        onClick={() => handleClick('decrement')}
      >
        Уменьшить на значение
      </Button>
    </div>
  );
};
