import React from 'react'

const Navbar = () => {
  
    const handleGitHubClick = () => {
      window.open('https://github.com/Devikakachhawaha/PassSafe', '_blank');
    };
  
  return (
    
    <nav className='bg-slate-800 text-white w-full '>
        <div className="mycontainer flex justify-around items-center px-4 py-4 h-14">
        <div className="logo font-bold text-2xl">
            <span className="text-green-500"> &lt;</span>
            <span>Pass</span>
            <span className='text-green-500'>Safe/&gt;</span>
        </div>
      <button onClick={handleGitHubClick} className='flex gap-2 hover:bg-green-400 rounded-xl px-1 py-1'>
        <img className='text-white invert w-7' src="/icons/github.svg" alt="" /> 
        <span  className='font-bold'>GitHub</span>
      </button>
      
      </div>
    </nav>
  )
}

export default Navbar
