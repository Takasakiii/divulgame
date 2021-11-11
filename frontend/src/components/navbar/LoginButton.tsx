import { useState } from "react";

import { LoginResponse } from "../../api/api";

import LoginFormComponent from "./LoginForm";

export interface LoginButtonComponentProps {
  isLoggedIn?: boolean;
}

function LoginButtonComponent(props: LoginButtonComponentProps) {
  const [menuOpened, setMenuOpened] = useState(false);

  function handleMenuOpened() {
    setMenuOpened(!menuOpened);
  }

  function handleLogin(data: LoginResponse) {
    console.log(data);
  }

  return (
    <div className="relative">
      <button type="button" onClick={handleMenuOpened}>
        Login
      </button>
      {menuOpened && <LoginFormComponent />}
    </div>
  );
}

export default LoginButtonComponent;
