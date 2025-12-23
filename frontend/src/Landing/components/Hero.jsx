
import { CodeXml } from "lucide-react";
import { Play } from "lucide-react";
import Contribution from "../../components/ui/Contribution";

export default function Hero() {
  return (
    <section className="max-w-4xl flex flex-col items-center my-24 mx-auto px-4 text-center relative">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-instrument leading-tight text-zinc-500 dark:text-zinc-400 ">
          Stop Staring at <span className="text-zinc-900 dark:text-zinc-50 italic">Editorials.</span>
          
          <br />
          Watch the
          <span className="text-zinc-900 dark:text-zinc-50 italic"> Solution </span>
          Make Sense.
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-snug">
          Solve DSA problems with AI-generated video explanations that actually
          explain the logic not just dump code.
        </p>

        <div className="flex justify-center gap-4">
          <button className="font-spacegrotesk flex items-center justify-center rounded px-4 py-2 corner-squircel transition duration-300 bg-sky-500 hover:bg-sky-600 text-white cursor-pointer text-sm font-medium gap-2 shadow-xl">Start Solving Free
            <CodeXml className="size-4" />
</button>
          

          <button className="border border-gray-300 shadow-md font-medium flex items-center justify-center gap-2 font-spacegrotesk rounded px-4 py-2 corner-squircel transition duration-300 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-800 dark:text-gray-200 cursor-pointer text-sm">
            Watch Sample
            <Play className="size-4 text-zinc-600 dark:text-zinc-200" />
          </button>
        </div>
         <div className="w-full hidden md:flex items-center justify-center [mask-image:linear-gradient(black_40%,transparent_90%)]">
            {/* Scale it up slightly to cover more area if needed */}
            <div className="scale-95 opacity-65">
                <Contribution />
            </div>
      </div>
      </div>
    </section>
  );
}

