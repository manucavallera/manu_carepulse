import React from "react";
import Link from "next/link";

const Admin = () => {
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href='/' className='cursor-pointer'>
          <Image
            src='assets/icons/logo-full.svg'
            alt='logo'
            height={1000}
            width={1000}
          />
        </Link>
      </header>
    </div>
  );
};

export default Admin;
