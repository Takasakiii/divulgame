import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { Logout } from "../../store/Login/Login.actions";

import LoginFormComponent from "./LoginForm";
import FloatFormComponent from "./FloatForm";
import LinkFormComponent from "./LinkForm";

function LoginButtonComponent() {
  const loginData = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch();

  const [menuOpened, setMenuOpened] = useState(false);

  function handleMenuOpened() {
    setMenuOpened(!menuOpened);
  }

  function handleLogout() {
    handleMenuOpened();
    dispatch(Logout());
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
          {!loginData.user.isMei ? (
            <LinkFormComponent
              to="/cadastro-mei"
              onClick={handleMenuOpened}
              className="mb-2"
            >
              Atualizar Para Mei
            </LinkFormComponent>
          ) : (
            <>
              <LinkFormComponent
                type="link"
                onClick={handleMenuOpened}
                to="anuncios/adicionar"
                className="mb-2"
              >
                Adicionar Serviço / Produto
              </LinkFormComponent>
              <LinkFormComponent
                className="mb-2"
                onClick={handleMenuOpened}
                type="link"
                to="anuncios/@me"
              >
                Meus Anuncios
              </LinkFormComponent>
            </>
          )}
          <LinkFormComponent type="button" onClick={handleLogout}>
            Deslogar
          </LinkFormComponent>
        </FloatFormComponent>
      )}
    </div>
  );
}

export default LoginButtonComponent;
