import Link from "next/link";
import React from "react";
import Image from "next/image";

const Success = () => {
  return (
    <div className='flex h-screen max-h-screen px-[5%]'>
      <div className='success-img'>
        <Link href='/'>

          <Image src="/assets/icons/logo-full.svg"

        
        
        </Link>
      </div>
    </div>
  );
};

export default Success;
