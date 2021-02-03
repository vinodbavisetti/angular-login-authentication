export type loginData = {
  token: string;
  email: string;
};

export type formData = {
  name?: string;
  email: string;
  password: string;
  gender?: string;
  dob?: { year: number; month: number; day: number };
};

export type authData = {
  msg: string;
};

export type listItems = { name: string; quantity: number }[];
