export function Solution() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold">
          Every Problem Comes With an AI Video Tutor
        </h2>

        <p className="text-gray-400">
          Short, focused videos that explain the intuition first — then the code.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Intuition before implementation",
            "Visual explanation of the algorithm",
            "Line-by-line code walkthrough",
            "Clear time & space complexity",
          ].map((item) => (
            <div
              key={item}
              className="border border-zinc-800 p-4 rounded-lg text-gray-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
