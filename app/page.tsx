import HeroCarousel from '@/components/HeroCarousel'
import SearchBar from '@/components/SearchBar'
import Image from 'next/image'
import React from 'react'
import { getAllProduct } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const page = async() => {
  const allProduct= await getAllProduct();
  return (
      <>
      <section className='px-6 md:px-20 py-24'>
        <div className='flex max-xl:flex-col  gap-16'>
          <div className='flex flex-col justify-center '>
            <p className='flex gap-2 text-sm font-medium text-primary'>
              Smart Shopping Start here <Image 
               src='/assets/icons/arrow-right.svg'
               alt='arrow-right'
               width={16}
               height={16}
              />
            </p>
            <h1 className='mt-4 text-6xl leading-[72px] font-bold tracking-[-1.2px] text-gray-900'>
              Unleash the power of <span className='text-primary'>PriceCheck</span>
            </h1>
            <p className='mt-6'>
              Powerful, self-serve product and growth analytics to help you convert,engage, and retain more
            </p>
            <SearchBar/>

          </div>
          <HeroCarousel/>
        </div>
      </section>
      <section className='lex flex-col gap-10 px-6 md:px-20 py-24'>
        <h2 className='text-secondary text-[32px] font-semibold'>Trending</h2>
        <div className='flex flex-wrap gap-x-8 gap-y-16'>
            {allProduct?.map(product => <ProductCard key={product._id} product={product} /> )}
        </div>
      </section>
      </>
  )
}

export default page
