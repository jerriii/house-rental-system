export type ProtectedRouteProps = {
  requiredRole: string;
  redirectPath?: string;
  children: React.ReactNode;
};
