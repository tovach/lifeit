import React from "react";
import { Button } from "../../components/button";
import { incrementAsync, decrementAsync } from "../../ducks/actions";
import { AppState } from "../../ducks/reducer";
import { useQuaxDispatch, useQuaxSelector } from "../../quax/useQuaxStore";

import "./step-controls.styles.css";

export const StepControls: React.FC = () => {
  const dispatch = useQuaxDispatch();
  const value = useQuaxSelector((state: AppState) => state.value);
  const isLoading = useQuaxSelector((state: AppState) => state.loading);

  return (
    <div className="step-controls">
      <Button
        isLoading={isLoading}
        onClick={() => dispatch(incrementAsync(value))}
      >
        Увеличить
      </Button>
      <Button
        isLoading={isLoading}
        onClick={() => dispatch(decrementAsync(value))}
      >
        Уменьшить
      </Button>
    </div>
  );
};
