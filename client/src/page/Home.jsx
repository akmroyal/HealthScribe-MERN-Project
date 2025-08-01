import Features from "../component/Features"
import HeroSection from "../component/hero/Hero"
import HowItWorks from "../component/HowItWorks"
import Testimonials from "../component/Testimonials"
import CTA from "../component/CTA"
import Footer from "../component/shared/Footer"

const Home = () => {
    return (
        <div className="min-h-screen bg-background">
            <HeroSection />
            <HowItWorks />
            <Features />
            <Testimonials />
            <CTA />
            <Footer />
        </div>
    )
}

export default Home