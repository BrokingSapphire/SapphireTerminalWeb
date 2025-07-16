import React from 'react'
import { Download } from 'lucide-react'

function DownloadButton() {
  return (
    <>
        <button className="flex items-center justify-center w-[18px] h-[18px] text-[#686868] text-[18px]">
            <Download strokeWidth={1.5} className="text-[#686868] dark:text-[#c9cacc] w-[18px] h-[18px] text-[18px]" />
        </button>
    </>
  )
}

export default DownloadButton