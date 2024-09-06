"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import { Product } from '@/types';
import { redirect,useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'



const SearchBar = () => {
  const router = useRouter();
  const isValidAmazonURL=(url:string)=>{
    try {
      const parsedURL=new URL(url);
      const hostname=parsedURL.hostname;

      if(hostname.includes('amazon.com') || hostname.includes('amazon.') || hostname.endsWith('amazon'))
      {
        return true;
      }
      return false
    } catch (error) {
      return false
    }
  }
  const handleSubmit= async(event:FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const isValidLink=isValidAmazonURL(searchPrompt);
      if(!isValidLink)
      {
        setMessage('Enter valid amazon product link')
      }
      else
      {
        setMessage('');
      }
      try {
        setLoading(true)
        const product:any=await scrapeAndStoreProduct(searchPrompt)
        if(product)
        {
          router.push(`/Products/${product.productId}`);
        }
        else throw new Error("Product not found")
        console.log(product)
        setLoading(false)
      } catch (error:any) {
        setLoading(false)
        setMessage(error?.message)
      }
  }
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState('')
  const [searchPrompt,setSearchPrompt]=useState('');
  return (
    <div>
      <form className='flex flex-wrap  mt-12 ' onSubmit={handleSubmit}>
       <input type="text"
       value={searchPrompt}
       onChange={(e)=> setSearchPrompt(e.target.value)}
       placeholder='Enter the product link' className='w-4/5 p-3 h-12 outline-none shadow-sm'/>
       <button type='submit' disabled={searchPrompt===""}  className={`p-3 h-12 rounded-md text-white ${
            searchPrompt === ''
              ? 'bg-gray-400 cursor-not-allowed' // Disabled button color
              : 'bg-black cursor-pointer' // Active button color
          }`}>{loading?'Searching...':'Search'}</button>
    </form>
    <div className='p-1 text-red-500'>{message}</div>
    </div>
  )
}

export default SearchBar