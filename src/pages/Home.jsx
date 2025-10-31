import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="fade-in">
      <Hero />
      <Stats />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;