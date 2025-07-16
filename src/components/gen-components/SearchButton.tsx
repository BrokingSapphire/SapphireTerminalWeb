import { Search } from 'lucide-react'
import React from 'react'

function SearchButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={`flex items-center justify-center w-[18px] h-[18px] p-0 bg-transparent border-none focus:outline-none ${props.className || ''}`.trim()}>
      <Search className="w-[18px] h-[18px] text-[#686868] dark:text-[#c9cacc]" />
    </button>
  )
}

export default SearchButton