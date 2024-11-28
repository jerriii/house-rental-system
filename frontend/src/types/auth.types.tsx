import { Inputs } from "./loginsignupform.types";
export type UserRole = "landlord" | "tenant" | "admin" | "";

export type RouteProps = {
  isAuthenticated: boolean;
  role: UserRole;
  requiredRole: string;
  redirectPath?: string;
};

export type UserAuthState = {
  user: Inputs | null;
  isAuthenticated: boolean;
  userLogin: (user: Inputs) => void;
  logout: () => void;
};
