export type JwtPayload = {
  userId: number;
  email: string;
  username: string;
  isAdmin: boolean;
  isLoggedIn?: boolean;
};
