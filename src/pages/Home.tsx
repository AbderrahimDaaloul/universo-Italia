import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Services from '../sections/Services';
import Pricing from '../sections/Pricing';
import Statistics from '../sections/Statistics';
import Contact from '../sections/Contact';

/**
 * Home Page
 * Main landing page composing all sections
 */
const Home = () => {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Statistics />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;