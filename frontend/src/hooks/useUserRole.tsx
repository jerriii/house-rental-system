import useUserAuthStore from "../contexts/useUserAuthContext";

// Dummy function to simulate fetching the user role from authentication context or API
// const fetchUserRole = (): Promise<string> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(""); // or 'tenant'
//     }, 1000);
//   });
// };

export const useUserRole = (): string => {
  const userRole = useUserAuthStore((state) => state.user?.role);
  return userRole || "";
};
