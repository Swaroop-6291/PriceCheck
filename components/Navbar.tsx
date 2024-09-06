import { headers } from 'next/headers'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navIcons = [
    { src: '/assets/icons/search.svg', alt: 'search' },
    { src: '/assets/icons/black-heart.svg', alt: 'heart' },
    { src: '/assets/icons/user.svg', alt: 'user' },
  ]

const Navbar = () => {
  return (
    <header className='w-full'>
        <nav className='flex justify-between items-center px-6 md:px-20 py-4'>
           <Link href='/' className='flex items-center gap-1'>
              <Image src="/assets/icons/logo.svg" width={27} height={27} alt='logo'/> 
              <p>
                Price<span className='text-primary'>Check</span>
              </p>
           </Link>
           <div className='flex items-center gap-5'>
              {navIcons.map((icon)=>{
                return <Image src={icon.src} key={icon.alt} alt={icon.alt} width={28} height={28}
                className='object-contain'
                />
              })}
           </div>
        </nav>
    </header>
  )
}

export default Navbar
