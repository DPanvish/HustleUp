"use client"

import Link from "next/link";


const SearchBarReset = () => {

  // This reset from is used in the client side cause of the fact that it's being rendered on a page
  // We can't use reset function on the server side cause we don't have access to the DOM

  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    
    if(form){
      form.reset();
    }
  }

  return (
    <div>
      <button type="reset" onClick={reset}>
        <Link href="/" className="text-white search-btn">
          X
        </Link>
      </button>
    </div>
  )
}

export default SearchBarReset
