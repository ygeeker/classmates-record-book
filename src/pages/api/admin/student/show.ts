import db from '../../../../lib/prisma';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export type AdminModifyStudentShowRequestBody = { id: string; show: boolean };

const adminModifyStudentShow = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const token = req.headers.authorization as string;
    jwt.verify(token, process.env.JWT_SECRET!) as {
      author: string;
    };
  } catch {
    return res.status(401).send({ message: '管理员鉴权失败' });
  }

  const { id, show } = req.body as AdminModifyStudentShowRequestBody;
  const { name } = await db.student.update({
    where: { id },
    data: { show },
    select: { name: true },
  });
  return res.json({ message: `修改 ${name} 显示状态成功` });
};

export default adminModifyStudentShow;
