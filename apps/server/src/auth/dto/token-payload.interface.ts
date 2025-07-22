export interface TokenPayload {
  sub: string; // user id
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
