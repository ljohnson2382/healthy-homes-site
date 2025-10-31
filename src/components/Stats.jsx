const Stat = ({ value, label }) => (
  <div className="bg-navy border border-midGray/40 rounded-2xl p-6 text-center">
  <div className="text-3xl md:text-4xl font-extrabold text-orange">{value}</div>
    <div className="mt-2 text-lightGray">{label}</div>
  </div>
);

const Stats = () => {
  return (
    <section className="bg-navy">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <Stat value="50+" label="Projects Completed" />
          <Stat value="15+ Years" label="Experience" />
          <Stat value="100%" label="Satisfaction Rate" />
        </div>
      </div>
    </section>
  );
};

export default Stats;