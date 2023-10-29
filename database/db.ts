import { env } from '@/config';
import mongoose from 'mongoose';

/*
  0 = disconected
  1 = connected
  2 = connecting
  3 = disconnecting
*/

const mongoConecction = {
  isConnected: 0
}

export const connect = async () => {
  if (mongoConecction.isConnected) {
    console.log('ya estábamos conectados')
    return
  }

  if (mongoose.connections.length > 0) {
    mongoConecction.isConnected = mongoose.connections[0].readyState

    if (mongoConecction.isConnected === 1) {
      console.log('usando conexion anterior')
      return
    }

    await disconect()
  }
  await mongoose.connect(env.MONGO_URI ?? '')
  mongoConecction.isConnected = 1
  console.log('Conectado a MongoDB')
}

export const disconect = async () => {

  if (process.env.NODE_ENV === 'development') return

  if (mongoConecction.isConnected === 0) return
  await mongoose.disconnect()
  mongoConecction.isConnected === 0
  console.log('desconectado de MongoDB')
}