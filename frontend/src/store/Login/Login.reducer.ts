import { PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "../../api/api";

function LoginReducer(
  state: LoginResponse | null = null,
  action: PayloadAction<LoginResponse>
) {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    default:
      return state;
  }
}

export default LoginReducer;
