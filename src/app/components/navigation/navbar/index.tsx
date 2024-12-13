import React from 'react';
import Link from 'next/link';
import Logo from "./Logo";
import Button from "./Button";

const NavBar = ({ toggle }: { toggle: () => void }) => {
  return (
    <>
    <div className="navbar-bg">
      <div className='sticky top-0 z-10 border-b border-zinc-950/10 px-6 sm:px-8 lg:z-10 lg:flex lg:min-h-[5rem] lg:items-center dark:border-white/10'>
        <div className='mx-auto flex w-full max-w-xl items-center justify-between py-2 lg:max-w-7xl'>
          <div className="flex items-center gap-2 sm:gap-4">
            <Logo />
          </div>
          <Button />
        </div>
      </div>
    </div>
  </>
  );
};

export default NavBar;