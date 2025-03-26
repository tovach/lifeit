import React from "react";
import { Heading } from "./features/heading";
import { InputControls } from "./features/input-controls";
import { StepControls } from "./features/step-controls";

import "./styles.css";

export default function App() {
  React.useEffect(() => {
    console.log("render");
  });

  return (
    <div className="app">
      <Heading />
      <StepControls />
      <InputControls />
    </div>
  );
}
