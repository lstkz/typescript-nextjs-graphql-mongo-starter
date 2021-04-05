export const IS_SSR = typeof document === 'undefined';

export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not set');
}
