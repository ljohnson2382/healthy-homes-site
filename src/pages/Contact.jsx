const Contact = () => (
  <section className="bg-navy">
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 lg:py-16">
      <h1 className="text-3xl font-bold text-orange mb-8 text-center">Contact Us</h1>
      <form className="max-w-md mx-auto space-y-4">
        <input type="text" placeholder="Name" className="w-full p-3 rounded border-2 border-midGray focus:border-orange text-black focus:outline-none" />
        <input type="email" placeholder="Email" className="w-full p-3 rounded border-2 border-midGray focus:border-orange text-black focus:outline-none" />
        <textarea placeholder="Message" rows="5" className="w-full p-3 rounded border-2 border-midGray focus:border-orange text-black focus:outline-none resize-vertical" />
        <button className="w-full bg-orange text-white px-6 py-3 rounded hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-orange transition-colors font-semibold">
          Send Message
        </button>
      </form>
    </div>
  </section>
);

export default Contact;
