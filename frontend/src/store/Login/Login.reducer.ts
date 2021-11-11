import { PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "../../api/api";

function LoginReducer(
  state: LoginResponse | null = null,
  action: PayloadAction<LoginResponse>
): LoginResponse | null {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "MEI_UPGRADE":
      if (!state) return null;
      return {
        user: {
          ...state.user,
          isMei: true,
        },
        token: state.token,
      };
    default:
      return state;
  }
}

export default LoginReducer;
