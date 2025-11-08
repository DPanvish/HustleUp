import Image from "next/image";
import SearchBar from "../../components/SearchBar";
import { title } from "process";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  
  // This is a hack to get the query param from the URL.
  // In Next.js, you can't use useRouter() or useParams() inside of a server component. So we have to pass it as a prop.
  const query = (await searchParams).query;
  const params = {search: query || null};

  const session = await auth();
  // The session.id will be undefined to get it clear the cache
  // Logout and login again
  console.log(session?.id);


  // This will fetch all the posts from Sanity.io using the query defined in queries.ts
  // const posts = await client.fetch(STARTUPS_QUERY);

  // This will also fetch all the posts from Sanity.io using the query defined in queries.ts but this time it will be live updated.
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});

  // const posts = [{
  //   _createdAt: new Date(),
  //   views: 55,
  //   author: {_id: 1, name: "Panvish"},
  //   _id: 1,
  //   description: "This is a description",
  //   image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   category: "BlockChain",
  //   title: "Web3 Startup",
  // }]

  return (
    <>
      <section className="pink-container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect with Entrepreneurs</h1>

        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>

        <SearchBar query={query}/>
      </section>

      <section className="section-container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card-grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ):(
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
