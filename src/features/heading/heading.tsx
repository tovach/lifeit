import React from "react";
import { Button } from "../../components/button";
import { Spinner } from "../../components/spinner";
import { Value } from "../../components/value";
import { cancelOperation } from "../../ducks/actions";
import { AppState } from "../../ducks/reducer";
import { useQuaxDispatch, useQuaxSelector } from "../../quax/useQuaxStore";

import "./heading.styles.css";

export const Heading: React.FC = () => {
  const dispatch = useQuaxDispatch();
  const value = useQuaxSelector((state: AppState) => state.value);
  const loading = useQuaxSelector((state: AppState) => state.loading);

  return (
    <div className="heading">
      {loading ? (
        <Button><Spinner /></Button>
      ) : null}
      <Value value={value} />
      {loading ? (
        <Button onClick={() => dispatch(cancelOperation())}>X</Button>
      ) : null}
    </div>
  );
};
