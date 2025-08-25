import { Response } from "express";
import { env } from "../config/env.config";

interface IToken {
  accessToken?: string;
  refreshToken?: string;
}

export const setToken = (res: Response, token: IToken) => {
  if (token.accessToken) {
    res.cookie("accessToken", token.accessToken, {
      httpOnly: true,
      secure: env.node_env === "production",
      sameSite: env.node_env === "production" ? "none" : "strict",
    });
  }

  if (token.refreshToken) {
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      secure: env.node_env === "production",
      sameSite: env.node_env === "production" ? "none" : "strict",
    });
  }
};

export const clearCookie = (res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: env.node_env === "production",
    sameSite: env.node_env === "production" ? "none" : "strict",
  });
  res.clearCookie("refreshToken");
};
