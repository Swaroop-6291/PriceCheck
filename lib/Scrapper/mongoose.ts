"use server"
import mongoose from 'mongoose'

let isConnected=false;

export const connectToDB=async()=>
{
   mongoose.set('strictQuery',true)

   if(!process.env.MONGODB_URI)console.log(`Mongodb uri is not defined`)

   if(isConnected)console.log('Using existed database connected')
   const uri:string=process.env.MONGODB_URI ||  ""
   try {
     await mongoose.connect(uri);
     isConnected=true
     console.log('MongoDB connected')
   } catch (error) {
    console.log(error)
   }
}