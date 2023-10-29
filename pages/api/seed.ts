import type { NextApiRequest, NextApiResponse } from "next"
import { db, seedData } from "@/database"
import { Entry } from "@/models"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ msg: 'Servicio no disponible en producción.' })
  }

  await db.connect()
  await Entry.deleteMany()
  await Entry.insertMany(seedData.entries)
  await db.disconect()
  res.status(200).json({ msg: 'Proceso de conexion y desconexión con éxito' })
}