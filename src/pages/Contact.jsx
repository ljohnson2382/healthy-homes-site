import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    projectDetails: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          projectDetails: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
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
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              Sorry, there was an error sending your message. Please try again or call us directly at (857) 207-2145.
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-midGray mb-2">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" 
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-midGray mb-2">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" 
                  placeholder="Smith"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-midGray mb-2">Email Address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" 
                placeholder="john.smith@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-midGray mb-2">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" 
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-midGray mb-2">Service Needed</label>
              <select 
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange"
              >
                <option value="">Select a service...</option>
                <option value="Kitchen Remodeling">Kitchen Remodeling</option>
                <option value="Bathroom Renovation">Bathroom Renovation</option>
                <option value="Deck Construction">Deck Construction</option>
                <option value="Flooring Installation">Flooring Installation</option>
                <option value="General Repairs">General Repairs</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-midGray mb-2">Project Details</label>
              <textarea 
                rows="4" 
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                required
                className="w-full p-3 border border-midGray rounded-lg focus:ring-2 focus:ring-orange focus:border-orange" 
                placeholder="Please describe your project, timeline, and any specific requirements..."
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full font-semibold py-3 px-6 rounded-lg transition shadow-lg focus:outline-none focus:ring-2 focus:ring-orange/50 ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-orange text-white hover:bg-orange/90'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message & Get Free Quote'}
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
};

export default Contact;
