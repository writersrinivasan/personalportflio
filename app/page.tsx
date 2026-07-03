import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Method from '@/components/Method'
import Audience from '@/components/Audience'
import Curriculum from '@/components/Curriculum'
import SocialProof from '@/components/SocialProof'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <Stats />
      <Method />
      <Audience />
      <Curriculum />
      <SocialProof />
      <BookingForm />
      <Footer />
    </main>
  )
}
