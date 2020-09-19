export class User {
  id: number;
  username: string;
  password: string; // never shown
  role: string;
  email: string;
  mobile: string;
  token?: string;
}

export class UserData {
  data: User[];
  skipped: number;
  limited: number;
  page: number;
  count: number;
}

export class AuthUser {
  exp: string;
  iat: string;
  role: string;
  userId: number;
  username: string;
}

export class UserLog {
  username: string;
  sessionStart: string;
  sessionEnd: string;
  duration: string;
}
