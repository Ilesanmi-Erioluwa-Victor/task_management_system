import * as bcrypt from 'bcrypt';

export const hashedPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
