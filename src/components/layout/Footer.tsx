import footer from '../../assets/footer.svg'
import { TfiEmail } from "react-icons/tfi";
import { LuInstagram } from "react-icons/lu";
import { LuFacebook } from "react-icons/lu";
import { AiOutlineYoutube } from "react-icons/ai";

export default function Footer() {
  return (
    <div className='mt-15'>
      <div className='relative flex justify-center'>
        <img src={footer} alt="" className='w-full' />
        <div className='absolute top-40 flex flex-col items-center justify-center'>
          <p className='text-6xl mb-3'>Join Our Newsletter</p>
          <p className='text-2xl'>Sign up for deals, new products and promotions</p>
          <div className='flex items-center gap-4 pt-4 border-b-2 border-black'>
            <TfiEmail className='text-2xl' />
            <input type="text" placeholder='Email address' className='h-10 w-100 outline-0' />
            <button className='p-2'>Signup</button>
          </div>
        </div>
      </div>
      <div className='bg-[#141718] text-white pt-20 pb-13'>
        <div className='max-w-280 mx-auto font-inter'>
          <div className='flex justify-between pb-13'>
            <div className='flex gap-10'>
              <p>3legant.</p>
              <p className='text-gray-300'>|</p>
              <p className='text-gray-300'>Gift & Decoration Store</p>
            </div>
            <ul className='flex items-center gap-5 text-gray-300'>
              <li>Home</li>
              <li>Shop</li>
              <li>Product</li>
              <li>Blog</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className='flex justify-between pt-4 border-t'>
            <ul className='flex items-center gap-10'>
              <li className='text-gray-300'>Copyright © 2023 3legant. All rights reserved</li>
              <li>Privacy Policy</li>
              <li>Terms of Use</li>
            </ul>
            <div className='flex gap-5'>
              <LuInstagram className='text-2xl' />
              <LuFacebook className='text-2xl' />
              <AiOutlineYoutube className='text-3xl' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
