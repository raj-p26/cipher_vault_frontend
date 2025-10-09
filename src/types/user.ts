export interface LoginUser {
  email: string;
  password: string;
}

export type LoginErrors = Partial<LoginUser>;

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
}

export type RegisterErrors = Partial<RegisterUser>;

export type User = {
  id?: string;
  email?: string;
  username?: string;
  token?: string;
};
