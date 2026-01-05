const Contact = () => (
  <div className="min-h-screen bg-lightGray">
    {/* Hero Section */}
    <div className="relative h-64 md:h-80 bg-midGray overflow-hidden">
      <img 
        src="/images/contact-hero-exterior-landscaping.jpg" 
        alt="Professional landscaping and exterior services" 
        className="w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-navy bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">Ready to start your next project? Get in touch today!</p>
        </div>
      </div>
    </div>

    <div className="max-w-6xl mx-auto py-16 px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-navy mb-6">Get Your Free Quote</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-midGray mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" 
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-midGray mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" 
                  placeholder="Smith"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-midGray mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" 
                placeholder="john.smith@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-midGray mb-2">Phone Number</label>
              <input 
                type="tel" 
                className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" 
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-midGray mb-2">Service Needed</label>
              <select className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange">
                <option>Select a service...</option>
                <option>Kitchen Remodeling</option>
                <option>Bathroom Renovation</option>
                <option>Deck Construction</option>
                <option>Flooring Installation</option>
                <option>General Repairs</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-midGray mb-2">Project Details</label>
              <textarea 
                rows="4" 
                className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" 
                placeholder="Please describe your project, timeline, and any specific requirements..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full bg-orange text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange/90 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-orange/50"
            >
              Send Message & Get Free Quote
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          {/* Business Info */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-navy mb-6">Get In Touch</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-6 h-6 text-orange mt-1 mr-3">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy">Phone</h3>
                  <p className="text-midGray">(857) 207-2145</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 text-orange mt-1 mr-3">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy">Email</h3>
                  <p className="text-midGray">info@homefixandbuild.org</p>
                  <p className="text-midGray text-sm">Owner: nicky@homefixandbuild.org</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 text-orange mt-1 mr-3">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-navy">Address</h3>
                  <p className="text-midGray">23 Chaney Place<br />Manchester, NH</p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-navy mb-6">Business Hours</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-midGray">Monday - Friday</span>
                <span className="font-semibold text-navy">7:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-midGray">Saturday</span>
                <span className="font-semibold text-navy">8:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-midGray">Sunday</span>
                <span className="font-semibold text-navy">Emergency Only</span>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-navy mb-6">Why Choose Us</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange rounded-full mr-3"></span>
                <span className="text-midGray">15+ Years Experience</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange rounded-full mr-3"></span>
                <span className="text-midGray">Free Estimates</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange rounded-full mr-3"></span>
                <span className="text-midGray">Quality Guarantee</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-orange rounded-full mr-3"></span>
                <span className="text-midGray">Emergency Services Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Contact;
