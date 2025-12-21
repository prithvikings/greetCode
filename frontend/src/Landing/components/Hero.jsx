export default function Hero() {
  return (
    <section className="min-h-screen flex items-center bg-black text-white px-6">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Stop Staring at Editorials.
          <br />
          <span className="text-indigo-400">Watch the Solution Make Sense.</span>
        </h1>

        <p className="text-gray-400 text-lg">
          Solve DSA problems with AI-generated video explanations that actually
          explain the logic — not just dump code.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-indigo-500 hover:bg-indigo-600 px-6 py-3 rounded-lg font-medium">
            Start Solving Free
          </button>

          <button className="border border-gray-700 px-6 py-3 rounded-lg text-gray-300 hover:border-gray-500">
            Watch Sample
          </button>
        </div>
      </div>
    </section>
  );
}
