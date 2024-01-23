import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center justify-content p-24">

        <header className='absolute top-0 h-10 w-screen bg-transparent flex flex-row justify-between '>
          <Link className='m-2' href="/login-page">Log In </Link>
          <a className='m-2' href="">Menu </a>

         </header>
         

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-red-200 after:via-red-400 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-red-700 before:dark:opacity-20 after:dark:from-red-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <h1 className='text-5xl'>
          Chang.site
        </h1>
      </div>

    </main>
  )
}
