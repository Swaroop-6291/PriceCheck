"use server"
import mongoose from 'mongoose'

let isConnected=false;

export const connectToDB=async()=>
{
   mongoose.set('strictQuery',true)

   if(!process.env.MONGODB_URI)console.log(`Mongodb uri is not defined`)

   if(isConnected)console.log('Using existed database connected')

   try {
     await mongoose.connect(process.env.MONGODB_URI);
     isConnected=true
     console.log('MongoDB connected')
   } catch (error) {
    console.log(error)
   }
}