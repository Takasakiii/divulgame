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
