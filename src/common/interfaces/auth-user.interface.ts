export interface AuthUser {
  sub: number; // user id
  email: string;
  role: 'USER' | 'ADMIN' | 'PSYCHOLOGIST';
  psychologistId?: number; // wajib ada untuk role psikolog
}
