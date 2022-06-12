import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export type AdminLoginRequestBody = {
  username: string;
  password: string;
};

const adminLogin = (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body as AdminLoginRequestBody;
  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).send({ message: '用户名错误' });
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).send({ message: '密码错误' });
  }
  const token = jwt.sign({ author: 'jsun969' }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  });
  return res.json({ message: '登录成功', token });
};

export default adminLogin;
