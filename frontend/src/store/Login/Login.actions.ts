import { PayloadAction } from "@reduxjs/toolkit";
import { LoginResponse } from "../../api/api";

export function Login(
  loginResponseData: LoginResponse
): PayloadAction<LoginResponse> {
  return {
    type: "LOGIN",
    payload: loginResponseData,
  };
}

export function MeiUpgrade(): PayloadAction<null> {
  return {
    type: "MEI_UPGRADE",
    payload: null,
  };
}

export function Logout(): PayloadAction<null> {
  return {
    type: "LOGOUT",
    payload: null,
  };
}
