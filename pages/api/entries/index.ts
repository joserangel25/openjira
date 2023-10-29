import { db } from "@/database";
import { Entry, IEntry } from "@/models";
import type { NextApiRequest, NextApiResponse } from "next";

type Data =
  | { msg: string }
  | IEntry[]
  | IEntry

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return getEntries(res)
    case 'POST':
      return addNewEntry(req, res)
    default:
      return res.status(400).json({ msg: 'El método solicitado no existe' })
  }

}

const getEntries = async (res: NextApiResponse<Data>) => {
  await db.connect()
  const entries = await Entry.find().sort({ createdAt: 'ascending' })
  res.status(200).json(entries)

  await db.disconect()
}
const addNewEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body

  if (!description) {
    return res.status(404).json({ msg: 'Descripción no enviada. Proceso inválido.' })
  }

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  })

  try {
    await db.connect()
    await newEntry.save()
    await db.disconect()
    res.status(201).json(newEntry)
  } catch (error) {
    await db.disconect()
    console.log(error)
    return res.status(500).json({ msg: 'El proceso falló. Intente más tarde' })
  }
}