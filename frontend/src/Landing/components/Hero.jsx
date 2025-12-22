import { CodeXml } from "lucide-react";
import { Video } from "lucide-react";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="max-w-4xl flex flex-col items-center my-24 mx-auto px-4 text-center">
      
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-instrument  leading-tight text-zinc-500 dark:text-white ">
          Stop Staring at <span className="text-zinc-900 italic">Editorials.</span>
          
          <br />
          Watch the
          <span className="text-zinc-900 italic"> Solution </span>
          Make Sense.
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-snug">
          Solve DSA problems with AI-generated video explanations that actually
          explain the logic not just dump code.
        </p>

        <div className="flex justify-center gap-4">
          <button className="font-inter flex items-center justify-center rounded px-4 py-2 corner-squircel transition duration-300 bg-sky-500 hover:bg-sky-600 text-white cursor-pointer text-sm font-medium gap-2 shadow-xl">Start Solving Free
            <CodeXml className="size-4" />
</button>
          

          <button className="border border-gray-300 shadow-md font-medium flex items-center justify-center gap-2 font-inter rounded px-4 py-2 corner-squircel transition duration-300 hover:bg-gray-100 text-gray-800 cursor-pointer text-sm">
            Watch Sample
            <Play className="size-4 text-zinc-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
