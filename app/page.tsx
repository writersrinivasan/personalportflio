import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Method from '@/components/Method'
import Audience from '@/components/Audience'
import Curriculum from '@/components/Curriculum'
import SocialProof from '@/components/SocialProof'
import BookingForm from '@/components/BookingForm'
import Footer from '@/components/Footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://srinivasanramanujam-portfolio.vercel.app/#person',
      name: 'Srinivasan Ramanujam',
      jobTitle: 'GenAI & Agentic AI Educator, Consultant & Speaker',
      description:
        '25+ years of industry experience. Trained 40,000+ professionals and 1,000+ educators across 50+ institutions in GenAI and Agentic AI.',
      url: 'https://srinivasanramanujam-portfolio.vercel.app',
      image: 'https://srinivasanramanujam-portfolio.vercel.app/srinivasan.png',
      email: 'writersrinivasan@gmail.com',
      sameAs: [
        'https://linkedin.com/in/writersrinivasan',
        'https://github.com/writersrinivasan',
        'https://www.youtube.com/@srinivasanramanujam7534',
        'https://www.oneyoto.in/#/founder',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Yoto',
        url: 'https://www.oneyoto.in',
      },
      knowsAbout: [
        'Generative AI',
        'Agentic AI',
        'Large Language Models',
        'RAG',
        'LangChain',
        'LangGraph',
        'AI Product Development',
        'Prompt Engineering',
      ],
    },
    {
      '@type': 'Course',
      '@id': 'https://srinivasanramanujam-portfolio.vercel.app/#course',
      name: 'End to End GenAI & Agentic AI Product Development',
      description:
        "India's only GenAI & Agentic AI course where you ship your first product on Day 1. 3-month live course covering LLMs, RAG, multi-agent systems, and full-stack AI product development.",
      url: 'https://srinivasanramanujam-portfolio.vercel.app',
      provider: {
        '@type': 'Person',
        name: 'Srinivasan Ramanujam',
        '@id': 'https://srinivasanramanujam-portfolio.vercel.app/#person',
      },
      educationalLevel: 'Beginner to Advanced',
      courseMode: ['online', 'onsite'],
      duration: 'P3M',
      inLanguage: 'en-IN',
      teaches: [
        'Generative AI fundamentals',
        'Prompt Engineering',
        'Retrieval-Augmented Generation (RAG)',
        'AI Agents and multi-agent orchestration',
        'LangChain, LangGraph, CrewAI',
        'FastAPI and React AI product development',
        'AI product architecture and deployment',
        'Career strategy for AI roles',
      ],
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        duration: 'P3M',
        inLanguage: 'en-IN',
        instructor: {
          '@type': 'Person',
          name: 'Srinivasan Ramanujam',
        },
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://srinivasanramanujam-portfolio.vercel.app/#organization',
      name: 'Yoto',
      url: 'https://www.oneyoto.in',
      founder: {
        '@type': 'Person',
        name: 'Srinivasan Ramanujam',
        '@id': 'https://srinivasanramanujam-portfolio.vercel.app/#person',
      },
    },
  ],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  )
}
