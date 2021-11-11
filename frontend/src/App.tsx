import Router from "./Router";
import NavbarComponent from "./components/navbar";

import store from "./store";
import { Provider } from "react-redux";

import "./Index.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <NavbarComponent />
      </Router>
    </Provider>
  );
}

export default App;
