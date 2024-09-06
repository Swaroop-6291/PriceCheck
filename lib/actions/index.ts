"use server"


import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { scrapeAmazonProduct } from "../Scrapper";
import { connectToDB } from "../Scrapper/mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody } from "@/lib/Nodemailer";
import { sendEmail } from "@/lib/Nodemailer";



export async function scrapeAndStoreProduct(Producturl:string)
{
    if(!Producturl)return null;

    try {
        connectToDB()
        const scrapeProduct=await scrapeAmazonProduct(Producturl)
        if(!scrapeProduct)return;

        let product=scrapeProduct;

        const existingProduct= await Product.findOne({url:scrapeProduct.url});

        if(existingProduct)
        {
            const updatedHistory:any=[
                ...existingProduct.priceHistory,
                {
                    price:scrapeProduct.currentPrice,
                    date:Date.now()
                }
            ]

            product={
                ...scrapeProduct,
                priceHistory:updatedHistory,
                lowestPrice:getLowestPrice(updatedHistory),
                highestPrice:getHighestPrice(updatedHistory),
                averagePrice:getAveragePrice(updatedHistory)
            }    
        }

        const newProduct=await Product.findOneAndUpdate({
            url:scrapeProduct.url},
            product,
            {upsert:true,new:true}
        )
        
        revalidatePath(`/Products/${newProduct._id}`)
        return { success: true, productId: newProduct._id };
    } catch (error:any) {
        throw new Error(`Failed to create/update product`)
    }
}

export async function getProductById(productId:string)
{
    try {
        connectToDB()

        const product=await Product.findOne({_id:productId});
        if(!product)return null

        return product
    
    } catch (error) {
        console.log(error)
    }
}

export async function getAllProduct() {
    try {
        connectToDB();
        const products = await Product.find();
        
        return products
    } catch (error) {
        console.log(error)
    }
}

export async function addUserEmailToProduct(productId:string,userEmail:string)
{
    try {
        const product=await Product.findById(productId)

        if(!product)return;

        const userExists=product.users.some((user:User)=> user.email===userEmail)

        if(!userExists)
        {
            product.users.push({email:userEmail});

            await product.save()

            const EmailContent=await generateEmailBody(product,"WELCOME")

            await sendEmail(EmailContent,[userEmail])
        }
    } catch (error) {
        
    }
}