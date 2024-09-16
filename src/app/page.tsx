
import Head from 'next/head';
import Scroller from './components/Scroller';
import DefaultLayout from './layouts/DefaultLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SKIPPY",
  description: "The homepage for all your news"
}

export default function Home() {
  

  return (
      <DefaultLayout>
        <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
          <title>Skippy | Landing</title>
        </Head>
        <div className='w-full flex h-[70vh] flex-col gap-12 justify-center items-center leading-10'>
            <h1 className='text-5xl font-bold'>Read everything from everywhere, all at once</h1>
            <h3 className='text-3xl font-semibold'>Skippy is your ticket to track your interests all in one place</h3>
            <div className='flex gap-5'>
              <a href="/feed/home">
                <button className='bg-tertiary p-2 px-3 rounded-md font-semibold hover:bg-highlight'>Get started</button>
              </a>
              <a href='/login'>
                <button className='bg-foreground-dark p-2 px-3 rounded-md font-semibold hover:shadow-slate-600 hover:shadow-md'>Log in to existing account</button>
              </a>
            </div>
        </div>
        <Scroller/>
      </DefaultLayout>

  );
}
