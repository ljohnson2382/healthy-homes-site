const Contact = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-orange mb-4">Contact Us</h1>
    <form className="max-w-md mx-auto space-y-4">
      <input type="text" placeholder="Name" className="w-full p-2 rounded text-black" />
      <input type="email" placeholder="Email" className="w-full p-2 rounded text-black" />
      <textarea placeholder="Message" rows="5" className="w-full p-2 rounded text-black" />
      <button className="bg-orange px-4 py-2 rounded hover:bg-midGray transition-colors">
        Send Message
      </button>
    </form>
  </div>
);

export default Contact;
