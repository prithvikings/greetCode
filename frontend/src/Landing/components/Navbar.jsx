import { Button } from "../../components/ui/button"
import { ModeToggle } from '../../components/mode-toggle'
const Navbar = () => {
  return (
    <div className='max-w-4xl mx-auto flex justify-between items-center py-6 pb-1 px-6'>
      <div className='section-1'>

          <h1 className='text-2xl font-poppins cursor-pointer'>GreetCode<span className="text-sky-500 text-4xl">.</span></h1>
      
      </div>
        <div className='content hidden md:flex items-center gap-8 font-poppins text-sm text-zinc-500  font-medium'>
          <h1 className='hover:text-zinc-600 cursor-pointer transition duration-300'>Features</h1>
          <h1 className='hover:text-zinc-600 cursor-pointer transition duration-300'>FAQ</h1>
          <h1 className='hover:text-zinc-600 cursor-pointer transition duration-300'>Pricing</h1>
      </div>

        <div className='button flex items-center gap-4'>
          <ModeToggle />
          <Button
          className={'font-inter corner-squircel px-4 py-1 transition duration-300 bg-sky-500 hover:bg-sky-600 text-white hover:text-white cursor-pointer'}
          variant='outline'
          >Get started</Button>
        </div>
    </div>
  )
}

export default Navbar