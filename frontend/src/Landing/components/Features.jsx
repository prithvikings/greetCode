export function Features() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {[
          "AI video explanations",
          "Multiple solution approaches",
          "Algorithm visualizations",
          "Interview-focused problems",
          "Zero-distraction UI",
        ].map((feature) => (
          <div key={feature} className="text-gray-300">
            → {feature}
          </div>
        ))}
      </div>
    </section>
  );
}
