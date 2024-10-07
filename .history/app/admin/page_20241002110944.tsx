import React from "react";
import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/StatCard";

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

          <p className='text-16-semibold'>Admin Dashboard</p>
        </Link>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
          <h1 className='header'>Welcome </h1>
          <p className='text-dark-700'>
            Start the day with managing new appointements
          </p>
        </section>

        <section className='admin-stat'>
          <StatCard
            type='appointments'
            count={5}
            label='Scheduled Appointments'
          />
        </section>
      </main>
    </div>
  );
};

export default Admin;
