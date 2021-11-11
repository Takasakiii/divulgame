import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import LoginFormComponent from "./LoginForm";
import FloatFormComponent from "./FloatForm";
import LinkFormComponent from "./LinkForm";

function LoginButtonComponent() {
  const loginData = useSelector((state: RootState) => state.login);

  const [menuOpened, setMenuOpened] = useState(false);

  function handleMenuOpened() {
    setMenuOpened(!menuOpened);
  }

  if (!loginData)
    return (
      <div className="relative">
        <button type="button" onClick={handleMenuOpened}>
          Login
        </button>
        {menuOpened && <LoginFormComponent onCloseForm={handleMenuOpened} />}
      </div>
    );

  return (
    <div className="relative">
      <button type="button" onClick={handleMenuOpened}>
        {loginData.user.username}
      </button>
      {menuOpened && (
        <FloatFormComponent>
          {!loginData.user.isMei && (
            <LinkFormComponent to="/cadastro-mei">
              Atualizar Para Mei
            </LinkFormComponent>
          )}
        </FloatFormComponent>
      )}
    </div>
  );
}

export default LoginButtonComponent;
