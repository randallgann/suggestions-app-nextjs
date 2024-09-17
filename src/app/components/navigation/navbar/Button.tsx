// const Button = () => {
//     return (
//       <a className="h-12 rounded-lg bg-white font-bold px-5" href="/api/auth/login">Sign In</a>
//     );
//   };
  
//   export default Button;

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Button() {
  const { user, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    user 
      ? <a className="h-12 navbar-bg rounded-lg font-bold px-5 flex items-center justify-center" href="/api/auth/logout">Sign Out</a>
      : <a className="h-12 navbar-bg rounded-lg font-bold px-5 flex items-center justify-center" href="/api/auth/login">Sign In</a>
  );
}