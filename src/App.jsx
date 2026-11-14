import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Disclosure from './components/layout/Disclosure';
import FloatingWhatsApp from './components/layout/FloatingWhatsApp';
import ScrollProgressBar from './components/motion/ScrollProgressBar';
import Hero from './components/sections/Hero';
import Markets from './components/sections/Markets';
import Stats from './components/sections/Stats';
import Classroom from './components/sections/Classroom';
import About from './components/sections/About';
import Courses from './components/sections/Courses';
import Faq from './components/sections/Faq';
import Contact from './components/sections/Contact';

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollProgressBar />
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Markets />
        <Stats />
        <Classroom />
        <About />
        <Courses />
        <Faq />
        <Contact />
      </main>
      <Disclosure />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
