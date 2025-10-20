import React from 'react'

const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-primary"></span>
          <span className="relative inline-flex size-[11px] rounded-full bg-primary"></span>
        </span>
      </div>
    </div>
  )
}

export default Ping
