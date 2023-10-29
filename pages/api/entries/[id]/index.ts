import { db } from "@/database";
import { Entry } from "@/models";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string }
  // Esta validación no se hace necesaria ya porque estamos usando el middleware
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ msg: 'El ID no es válido' })
  }

  switch (req.method) {
    case 'GET':
      return getEntryByID(id, res)
    case 'PUT':
      return updateEntry(req, res)
    case 'DELETE':
      return deleteEntry(id, res)
    default:
      return res.status(400).json({ msg: 'El método no es pérmitido' })
  }
}

const getEntryByID = async (id: string, res: NextApiResponse) => {
  try {
    await db.connect()
    const entry = await Entry.findById(id)

    if (!entry) {
      return res.status(400).json({ msg: 'No existe una entrada con este ID ' + id })
    }
    await db.disconect()
    res.status(200).json(entry)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Ocurrió un error con el servidor' })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  await db.connect()
  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconect()
    return res.status(400).json({ msg: 'No existe entrada con ese ID' })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
    await db.disconect()
    res.status(202).json(updatedEntry)
  } catch (error: any) {
    console.log(error)
    await db.disconect()
    return res.status(400).json({ msg: 'La actualización no se pudo realizar', razon: error.errors.status })
  }
}

const deleteEntry = async (id: string, res: NextApiResponse) => {
  try {
    await Entry.findByIdAndDelete(id)
    res.status(200).json({ msg: 'Entrada eliminada con éxito' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Ocurrió un error con el servicio.' })
  }
}