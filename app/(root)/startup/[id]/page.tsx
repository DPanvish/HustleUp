import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import markdownit from "markdown-it";
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupCardType } from '@/components/StartupCard';


const md = markdownit();
export const experimental_ppr = true;

const page = async ({params}: {params: Promise<{id:string}>}) => {
  const id = (await params).id;

  // Parallel Fetching (It takes less time, Fetch time is max of both fetches)
  const [post, {select: editorPosts}] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, {id}),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: "editor-picks-new"})
  ])

  // Sequential Fetching (It takes more time, Fetch time is sum of both fetches)
  // const post = await client.fetch(STARTUP_BY_ID_QUERY, {id});
  // const {select: editorPosts} = await client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: "editor-picks-new"});

  if(!post){
      return notFound();
  }

  const parsedContent = md.render(post?.pitch || '');
  
  return (
    <>
        <section className="pink-container !min-h-[230px]">
          <p className="tag">{formatDate(post?._createdAt)}</p>
          <h1 className="heading">{post.title}</h1>
          <p className="sub-heading !max-w-5xl">{post.description}</p>
        </section>
        
        <section className="section-container">
          <img src={post.image} alt="thumbnail" className="w-full h-auto rounded-xl" />

          <div className="max-w-4xl mx-auto mt-10 space-y-5">
            <div className="gap-5 flex-between">
              <Link href={`/user/${post.author?._id}`} className="flex items-center gap-2 mb-3">
                <Image src={post.image} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg" />

                <div>
                  <p className="text-20-medium">{post.name}</p>
                  <p className="text-16-medium !text-black-300">
                    @{post.username}
                  </p>
                </div>
              </Link>

              <p className="category-tag">{post.category}</p>
            </div>

            <h3 className="text-30-bold">Pitch Details</h3>
            {parsedContent ? (
              <article className="max-w-4xl prose break-all font-work-sans" dangerouslySetInnerHTML={{__html: parsedContent}}/>
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </div>

          <hr className="divider" />

          {editorPosts?.length > 0 && (
            <div className="max-w-4xl mx-auto">
              <p className="text-30-semibold">Editor Picks</p>

              <ul className="mt-7 card-grid-sm">
                {editorPosts.map((post: StartupCardType, i: number) => (
                  <StartupCard key={i} post={post} />
                ))}
              </ul>
            </div>
          )}
          
          {/* 
              This is uses nextjs PPR to render the view component 
              Only this component is rendered dynamically based on the id param
          */}
          <Suspense fallback={<Skeleton className="view-skeleton"/>}>
            <View id={id} />
          </Suspense>
        </section>


    </>
  )
}

export default page
