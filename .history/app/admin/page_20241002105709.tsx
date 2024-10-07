import React from "react";
import Link from "next/link";
import Image from "next/image";

const Admin = () => {
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href='/' className='cursor-pointer'>
          <Image
            src='assets/icons/logo-full.svg'
            alt='logo'
            height={32}
            width={162}
            className='h-8 w-fit'
          />

          <p className="text-16-semibold"
        </Link>
      </header>
    </div>
  );
};

export default Admin;
