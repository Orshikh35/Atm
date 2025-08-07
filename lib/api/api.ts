'use server';

const UNAVAILABLE_KEYS = [
  'SESSION_EXP',
  'NEXTAUTH_SECRET',
  'GITHUB_ID',
  'GITHUB_SECRET',
];

export const getEnvValue = async (key: string): Promise<string | null> => {
  if (UNAVAILABLE_KEYS.includes(key)) return null;
  return process.env[key] ?? null;
};
