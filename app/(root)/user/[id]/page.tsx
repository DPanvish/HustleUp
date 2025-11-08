import { auth } from '@/auth'
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react'

export const experimental_ppr = true

const page = async ({params} : {params: Promise<{id: string}>}) => {
  const id = (await params).id
  const session = await auth();

  const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id});

  if(!user){
    return notFound();
  }

  return (
    <section className="profile-container">
      <div className="profile-card">
        <div className="profile-title">
          <h3 className="text-center uppercase text-24-black line-clamp-1">
            {user.name}
          </h3>
        </div>

        <Image 
          src={user.image}
          alt={user.name}
          width={220}
          height={220}
          className="profile-image"
        />

        <p className="text-center text-30-extrabold mt-7">
          @{user?.username}
        </p>

        <p className="mt-1 text-center text-14-normal">{user?.bio}</p>
      </div>
      
      <div className="flex flex-col flex-1 gap-5 lg:-mt-5">
        <p className="text-30-bold">
          {session?.id === id ? "Your" : "All"} Startups
        </p>

        <ul className="card-grid-sm">
          {/* Startups */}
        </ul>
      </div>
    </section>
  )
}

export default page
