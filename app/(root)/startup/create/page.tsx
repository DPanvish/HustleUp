import StartupForm from '@/components/StartupForm'
import React from 'react'

const page = () => {
  return (
    <>
      <section className="pink-container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  )
}

export default page
