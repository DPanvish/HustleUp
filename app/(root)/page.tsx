import Image from "next/image";
import Navbar from "../../components/navbar";
import SearchBar from "../../components/SearchBar";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {
  
  // This is a hack to get the query param from the URL.
  // In Next.js, you can't use useRouter() or useParams() inside of a server component. So we have to pass it as a prop.
  const query = (await searchParams).query;


  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pitch Your Startup, <br /> Connect with Entrepreneurs</h1>

        <p className="sub-heading !max-w-3xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.</p>

        <SearchBar query={query}/>
      </section>
    </>
  );
}
