import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const adminInit = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.headers.authorization as string;
    jwt.verify(token, process.env.JWT_SECRET!) as {
      author: string;
    };
    return res.json({ status: 'success' });
  } catch {
    return res.status(401).send({ message: '管理员鉴权失败' });
  }
};

export default adminInit;
