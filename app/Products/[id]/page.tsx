import { getProductById } from '@/lib/actions'
import { redirect } from 'next/dist/server/api-utils'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types'
import { formatNumber } from '@/lib/utils'
import PriceInfo from '@/components/PriceInfo'
import { getSimilarProducts } from '@/lib/Scrapper'
import ProductCard from '@/components/ProductCard'
import Modal from '@/components/Modal'
//import { useRouter } from 'next/navigation'

type props={
    params:{
        id:string
    }
}

const ProductDetails = async ({params:{id}}:props) => {
  const product:Product= await getProductById(id);

  if(!product) redirect('/');
  const similarProducts:any = await getSimilarProducts(id);

  return (
    <div className='flex flex-col gap-16 flex-wrap px-6 md:px-20 py-24'>
        <div className="flex gap-28 xl:flex-row flex-col">
            <div className='flex-grow xl:max-w-[50%] max-w-full py-16  rounded-[17px]'>
                <Image 
                  src={product?.image}
                  alt={product?.title}
                  width={580}
                  height={400}
                />
            </div>
            <div className='flex-1 flex flex-col'>
                <div className='flex justify-between items-start gap-5 flex-wrap pb-6'>
                    <div className='flex flex-col gap-3'>
                        <p className='text-[28px] text-secondary font-semibold'>
                            {product.title}
                        </p>
                        <Link href={product.url} 
                         target='_blank'
                         className='text-base text-black opacity-50'
                        >
                          Visit Product
                        </Link>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-10'>
                           <Image
                             src='/assets/icons/red-heart.svg'
                             alt='heart'
                             width={20}
                             height={20}
                           />

                           <p className='text-base font-semibold text-[#D46F77]'>
                            {product.reviewsCount}
                           </p>
                        </div>

                        <div className='p-2 bg-white-200 rounded-10'>
                           <Image
                            src="/assets/icons/bookmark.svg"
                            alt='bookmark'
                            width={20}
                            height={20}
                           />
                        </div>

                        <div className='p-2 bg-white-200 rounded-10'>
                           <Image
                            src="/assets/icons/share.svg"
                            alt='bookmark'
                            width={20}
                            height={20}
                           />
                        </div>
                    </div>
                </div>
                <div className='flex items-center flex-wrap gap-10 py-6 border-y border-y-[#E4E4E4]'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-[34px] text-secondary font-bold'>
                            {product.currency} {formatNumber(product.currentPrice)}
                        </p>
                        <p className='text-[21px] text-black opacity-50 line-through font-bold'>
                            {product.currency} {formatNumber(product.originalPrice)}
                        </p>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-3'>
                            <div className='flex items-center gap-2 px-3 py-2 bg-[#FBF3EA] rounded-[27px]'>
                                <Image
                                 src='/assets/icons/star.svg'
                                 alt='star'
                                 width={16}
                                 height={16}
                                />
                                <p className='text-sm text-primary-orange font-semibold'>
                                    {product.stars || '25'}
                                </p>
                            </div>

                            <div className=' flex items-center gap-2 px-3 py-2 bg-white-200 rounded-[27px]'>
                                <Image
                                 src="/assets/icons/comment.svg"
                                 alt='comment'
                                 width={16}
                                 height={16}
                                />
                                <p className='text-sm text-secondary font-semibold'>
                                    {product.reviewsCount} Reviews
                                </p>
                            </div>
                        </div>

                        <p className='text-sm text-black opacity-50'>
                            <span className='text-primary-green font-semibold'>93%</span> of buyers have recommend this
                        </p>
                    </div>
                </div>

                <div className='my-7 flex flex-col gap-5'>
                   <div className='flex gap-5 flex-wrap'>
                       <PriceInfo
                        title='Current Price'
                        iconSrc='/assets/icons/price-tag.svg'
                        value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                        
                       />
                       <PriceInfo
                        title='Average Price'
                        iconSrc='/assets/icons/chart.svg'
                        value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                        
                       />
                       <PriceInfo
                        title='Highest Price'
                        iconSrc='/assets/icons/arrow-up.svg'
                        value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                        
                       />
                       <PriceInfo
                        title='Lowest Price'
                        iconSrc='/assets/icons/arrow-down.svg'
                        value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                        
                       />
                   </div>
                </div>
                <div>
                    <Modal productId={id}/>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-16 '>
           <div className='flex flex-col gap-5'>
              <h3 className='text-2xl text-secondary font-semibold'>
                Product Description
              </h3>
              <div className='flex flex-col gap-4'>
                 {product?.description?.split('/n')}
              </div>
           </div>
           <button className='w-fit mx-auto flex items-center
           justify-center gap-3 min-w-[200px]
           '>
             <Image
              src="/assets/icons/bag.svg"
              alt='check'
              width={22}
              height={22}
             />
             <Link href={`${product.url}`} target='_blank' className='py-4 px-4 bg-secondary hover:bg-opacity-70 rounded-[30px] text-white text-lg font-semibold text-base text-white'>
               Buy Now
             </Link>
           </button>
        </div>
        {similarProducts && similarProducts?.length>0 && (
            <div className='py-14 flex flex-col gap-2 w-full'>
               <p className='text-secondary text-[32px] font-semibold'>Similar Products</p>

               <div className='flex flex-wrap gap-10 mt-7 w-full'>
                  {similarProducts.map((product:Product)=>(
                    <ProductCard
                     key={product._id}
                     product={product}
                    />
                  ))}
               </div>
            </div>
        )}
    </div>
  )
}

export default ProductDetails