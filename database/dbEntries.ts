import { isValidObjectId } from "mongoose"
import { db } from "."
import { Entry as EntryModel } from "@/models"
import type { Entry } from "@/interfaces"

export const getEntries = async (id: string): Promise<Entry | null> => {
  if (!isValidObjectId(id)) return null

  await db.connect()
  const entry = await EntryModel.findById(id).lean()
  await db.disconect()

  const { __v, ...rest } = JSON.parse(JSON.stringify(entry))
  return rest
}