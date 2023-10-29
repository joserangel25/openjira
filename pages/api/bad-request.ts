// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  msg: string | string[]
  error: true
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { msg = 'Bad request' } = req.query
  res.status(400).json({ msg, error: true })
}
