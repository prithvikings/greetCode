import { Button } from "../../components/ui/button"
import {Togglebtn} from "../../components/themetoggle"
import { smoothScrollTo } from "../../utils/smoothScroll";
import { useNavigate } from "react-router-dom";
const Navbar = ({ featuresRef, faqRef }) => {

  const navigate = useNavigate();
   const handleScroll = (ref) => {
    if (!ref?.current) return;

    const y =
      ref.current.getBoundingClientRect().top + window.scrollY - 80; // offset for navbar

    smoothScrollTo(y);
  };

  return (
    <div className='max-w-4xl mx-auto flex justify-between items-center py-6 pb-1 px-6'>
      <div className='section-1'>

          <h1 className='text-2xl font-poppins cursor-pointer'>GreetCode<span className="text-sky-500 text-4xl">.</span></h1>
      
      </div>
        <div className='content hidden md:flex items-center gap-8 font-spacegrotesk text-sm text-zinc-500 dark:text-zinc-200  font-medium'>
          <h1 
          onClick={() => handleScroll(featuresRef)}
          className='hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer transition duration-300'>Features</h1>
          <h1 
          onClick={() => handleScroll(faqRef)}
          className='hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer transition duration-300'>FAQ</h1>
          <h1 className='hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer transition duration-300'>Pricing</h1>
      </div>

        <div className='button flex items-center gap-4'>
          <Togglebtn />
<Button
  variant="default"
  onClick={() => navigate('/home')}
  className="
    font-inter corner-squircel px-4 py-1
    bg-sky-500 hover:bg-sky-600
    cursor-pointer text-white
    [text-shadow:0_1px_1px_rgba(0,0,0,0.25)]
    shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-2px_0_rgba(0,0,0,0.15)]
    hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.25)]
    active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.35)]
    active:translate-y-[1px]
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-sky-400/60
    focus-visible:ring-offset-2
    focus-visible:ring-offset-transparent
    transition-all duration-200
  "
>
  Get started
</Button>


        </div>
    </div>
  )
}

export default Navbar