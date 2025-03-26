import { createRoot } from "react-dom/client";
import App from "./App";
import { QuaxProvider } from "./quax/useQuaxStore";
import { configureStore } from "./store";

const store = configureStore();

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <QuaxProvider store={store}>
      <App />
    </QuaxProvider>
  );
}
