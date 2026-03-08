export const ADMIN_EMAIL = 'admin@bhashasetu.ai';
export const ADMIN_PASSWORD = 'admin123';

export function isAdmin(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}
