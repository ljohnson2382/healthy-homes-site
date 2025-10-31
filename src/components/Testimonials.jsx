import { useState } from "react";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([
    { quote: "They did an amazing job on my kitchen remodel!", name: "Sarah M.", location: "Somerville, MA" },
    { quote: "Reliable and skilled — I’ll definitely hire them again.", name: "David R.", location: "Waltham, MA" },
  ]);

  const [formData, setFormData] = useState({ quote: "", name: "", location: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.quote || !formData.name) return;
    setTestimonials((prev) => [...prev, formData]);
    setFormData({ quote: "", name: "", location: "" });
  };

  return (
    <section className="bg-white text-black py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-orange text-center">
          What Our Customers Say
        </h2>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="bg-lightGray border border-midGray/10 rounded-2xl p-6 h-full shadow-md"
          >
            <p className="text-navy text-lg md:text-xl">“{t.quote}”</p>
            <div className="mt-4 font-semibold text-navy">
              {t.name}
              <span className="block text-sm text-midGray/80">{t.location}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Testimonial Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto mt-12 bg-lightGray border border-midGray/10 rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-navy mb-4 text-center">
            Share Your Experience
          </h3>
          <textarea
            name="quote"
            placeholder="Your testimonial..."
            value={formData.quote}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded border border-midGray bg-white text-navy"
            rows="3"
          />
          <input
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded border border-midGray bg-white text-navy"
          />
          <input
            name="location"
            placeholder="City, State"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded border border-midGray bg-white text-navy"
          />
          <button
            type="submit"
            className="bg-orange px-4 py-2 rounded hover:bg-yellow transition w-full font-semibold text-white"
          >
            Submit Testimonial
          </button>
        </form>
      </div>
    </section>
  );
};

export default Testimonials;