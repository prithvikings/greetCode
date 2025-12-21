export function Audience() {
  return (
    <section className="bg-zinc-900 text-white py-24 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="font-bold text-xl mb-4">This is for you if:</h3>
          <ul className="text-gray-400 space-y-2">
            <li>• You want DSA to actually click</li>
            <li>• You’re done pretending editorials help</li>
            <li>• You care about fundamentals</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4">Not for you if:</h3>
          <ul className="text-gray-400 space-y-2">
            <li>• You copy-paste solutions</li>
            <li>• You skip thinking</li>
            <li>• You want shortcuts</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
