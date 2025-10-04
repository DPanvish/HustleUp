import React from 'react'
import Form from "next/form"
import SearchBarReset from './SearchBarReset'
import { Search } from 'lucide-react'

const SearchBar = ({query} : {query?: string}) => {

  
  return (
    // This From element is a wrapper for the form element
    // It allows us to use the Next.js router to navigate to the search page.
    <Form action="/" scroll={false} className="search-form">
      <input 
        name="query"
        defaultValue=""
        className="search-input"
        placeholder="Search Startups"
      />

      <div className="flex gap-2">
        {query && <SearchBarReset />}

        <button type="submit" className="text-white search-btn">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  )
}

export default SearchBar
