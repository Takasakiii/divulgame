import { useState } from "react";

import LoginFormComponent from "./LoginForm";

export interface LoginButtonComponentProps {
  isLoggedIn?: boolean;
}

function LoginButtonComponent(props: LoginButtonComponentProps) {
  const [menuOpened, setMenuOpened] = useState(false);

  function handleMenuOpened() {
    setMenuOpened(!menuOpened);
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
