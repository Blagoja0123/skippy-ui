'use server';
import { ReactNode } from 'react';
import { getSession, logout} from '@/lib/auth';
import Nav from '../components/Nav';
import { Logout } from '@/app/actions';

const DefaultLayout = async ({ children}: {children: ReactNode}) => {
  const session = await getSession();
  const response = await fetch("http://localhost:8000/categories").then(res => res.json());
  return (
    <>
        <Nav categories={response.data} user={session} logout={logout}/>
        <main>{children}</main>
    </>
  );
};

export default DefaultLayout;