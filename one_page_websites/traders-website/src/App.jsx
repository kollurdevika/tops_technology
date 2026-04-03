import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatsStrip from './components/StatsStrip'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <Portfolio />
        <Services />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
