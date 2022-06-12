import db from '../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export type CreateStudentRequestBody = {
  name: string;
  gender: 'boy' | 'girl';
  class: number;
  school: string;
  qq?: string;
  wechat?: string;
  message?: string;
  key: string;
};

const createStudent = async (req: NextApiRequest, res: NextApiResponse) => {
  const { key, ...data } = req.body as CreateStudentRequestBody;
  if (key !== process.env.REGISTER_KEY) {
    return res.status(401).send({ message: '登记口令错误' });
  }
  await db.student.create({ data });
  return res.json({ message: '登记成功, 请等待审核' });
};

export default createStudent;
