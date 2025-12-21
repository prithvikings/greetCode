export function HowItWorks() {
  return (
    <section className="bg-zinc-900 text-white py-24 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-4 gap-6">
        {[
          "Pick a problem",
          "Try solving it",
          "Watch AI explanation",
          "Re-solve with confidence",
        ].map((step, i) => (
          <div
            key={step}
            className="border border-zinc-800 p-6 rounded-lg"
          >
            <span className="text-indigo-400 font-bold">0{i + 1}</span>
            <p className="mt-2 text-gray-300">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
