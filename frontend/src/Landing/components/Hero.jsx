import { CodeXml } from "lucide-react";
import { Play } from "lucide-react";
import Contribution from "../../components/ui/Contribution";
import { Button } from "../../components/ui/button";
export default function Hero() {
  return (
    <section className="max-w-4xl flex flex-col items-center my-24 mx-auto px-4 text-center relative">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-spacegrotesk font-medium leading-tight text-zinc-600 dark:text-zinc-400 ">
          Stop Staring at{" "}
          <span className="text-zinc-900 dark:text-zinc-50 font-instrument italic">
            Editorials.
          </span>
          <br />
          Watch the
          <span className="text-zinc-900 dark:text-zinc-50 font-instrument italic">
            {" "}
            Solution{" "}
          </span>
          Make Sense.
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mx-auto leading-snug">
          Solve DSA problems with AI-generated video explanations that actually
          explain the logic not just dump code.
        </p>

        <div className="flex justify-center gap-4">
          <Button
            variant="default"
            className="
    font-spacegrotesk corner-squircel px-4 py-1
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
            Start Solving Free
            <CodeXml className="size-4" />
          </Button>

          <button
            className="
    font-spacegrotesk text-sm font-medium
    flex items-center justify-center gap-2
    px-4 py-2 corner-squircel rounded
    cursor-pointer

    border border-zinc-200 dark:border-zinc-700
    bg-white/70 dark:bg-zinc-900/60
    backdrop-blur-sm

    text-zinc-800 dark:text-zinc-200

    shadow-[0_1px_2px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.6)]
    hover:shadow-[0_2px_6px_rgba(0,0,0,0.12)]
    hover:bg-zinc-100/80 dark:hover:bg-zinc-800/70

    active:translate-y-[1px]
    active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
hover:text-zinc-900 dark:hover:text-zinc-100

    transition-all duration-200
  "
          >
            Watch Sample
            <Play className="size-4 text-zinc-600 dark:text-zinc-300" />
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
