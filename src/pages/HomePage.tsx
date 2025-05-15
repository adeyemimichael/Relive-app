import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, BookText, Heart, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import ImageIbadan from '../assets/enjo.jpg';
import FamilyImage from '../assets/enj.jpg';
import SecondFamImage from '../assets/fam.jpg';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100/80 to-blue-100/70 dark:from-slate-900/90 dark:to-slate-800/80"></div>
          <img src={ImageIbadan} alt="Summer memories" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            {/* Left: Hero Text */}
            <div className="max-w-2xl">
              <div className="flex items-center mb-6 opacity-0 animate-fade-up animate-delay-200" style={{ animation: 'fadeUp 0.6s forwards' }}>
                <Sparkles className="text-amber-500 h-6 w-6 mr-2" />
                <span className="text-amber-700 dark:text-amber-400 font-medium">
                  AI-Powered Event Memory Journaling
                </span>
              </div>

              <h1
                className="font-serif text-4xl sm:text-2xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 opacity-0 leading-tight sm:mt-10"
                style={{ animation: 'fadeUp 0.8s 0.2s forwards' }}
              >
                Preserve your events, meetings and adventure <span className="text-amber-600 dark:text-amber-500">memories</span> that matter
              </h1>

              <p
                className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 opacity-0 max-w-xl"
                style={{ animation: 'fadeUp 0.8s 0.4s forwards' }}
              >
                ReLive helps you capture, organize, and reflect on your adventures and fun moments with AI-assisted journaling, emotion tagging, and beautiful visualizations.
              </p>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 opacity-0" style={{ animation: 'fadeUp 0.8s 0.6s forwards' }}>
                <Link to="/dashboard">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right">
                    Start Journaling
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Stacked Images */}
            <div className="flex flex-wrap justify-center items-start gap-4 mt-8">
              <ImageCard src={FamilyImage} label="Cherished Family Moment" rotation="rotate-[20deg]" />
              <ImageCard src={SecondFamImage} label="Unforgettable Adventures" rotation="-rotate-[30deg]" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white mb-6">
              Capture the essence of your enjoyment and fun
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Our AI-powered tools help you create meaningful journal entries that capture not just what happened, but how you felt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
            <FeatureCard icon={<Camera className="h-8 w-8 text-amber-500" />} title="Visual Memories" description="Organize photos and videos in meaningful collections tied to your written memories." />
            <FeatureCard icon={<Sparkles className="h-8 w-8 text-amber-500" />} title="AI Insights" description="Get thoughtful reflections and connections between your memories powered by AI." featured />
            <FeatureCard icon={<BookText className="h-8 w-8 text-amber-500" />} title="Emotion Tagging" description="Tag memories with emotions to track and reflect on your summer experiences." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-amber-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white text-center mb-16">
            Stories from our journalers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="MemoMuse has completely transformed how I document my summer. The AI insights help me see patterns in my experiences I never noticed before."
              author="Jessica T."
              image="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
            />
            <TestimonialCard
              quote="I love how the emotion tagging helps me track my summer moods. It's like having a personal therapist and journal all in one beautiful app."
              author="Michael R."
              image="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
            />
            <TestimonialCard
              quote="As someone who always struggled to keep a consistent journal, MemoMuse makes it easy and enjoyable. I've captured more memories this summer than ever before."
              author="Alexa K."
              image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-6">
              Start preserving your Memorable memories today
            </h2>
            <p className="text-lg text-amber-100 mb-8 max-w-xl mx-auto">
              Join thousands of people using MemoMuse to create meaningful journals of their adventures, events, meetings with friends and family.
            </p>
            <Link to="/dashboard">
              <Button variant="secondary" size="lg" icon={<Heart className="h-5 w-5" />}>
                Begin Your Journal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  featured?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, featured = false }) => (
  <div
    className={`rounded-xl p-8 transition-transform duration-300 hover:-translate-y-1 ${
      featured
        ? 'bg-gradient-to-br from-amber-50 to-blue-50 dark:from-amber-900/20 dark:to-blue-900/20 border border-amber-200 dark:border-amber-700/30 shadow-lg'
        : 'bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow'
    }`}
  >
    <div className="mb-5">{icon}</div>
    <h3 className="font-serif text-xl font-semibold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300">{description}</p>
  </div>
);

interface TestimonialCardProps {
  quote: string;
  author: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, image }) => (
  <div className="rounded-xl bg-white dark:bg-slate-900 p-6 shadow-md">
    <p className="text-slate-700 dark:text-slate-300 italic mb-4">"{quote}"</p>
    <div className="flex items-center gap-4">
      <img src={image} alt={author} className="w-10 h-10 rounded-full object-cover" />
      <span className="font-medium text-slate-900 dark:text-white">{author}</span>
    </div>
  </div>
);

interface ImageCardProps {
  src: string;
  label: string;
  rotation: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, label, rotation }) => (
  <div
    className={`
      relative 
      w-full sm:w-[280px] md:w-[360px] 
      h-56 sm:h-[320px] md:h-[400px] 
      rounded-xl overflow-hidden shadow-2xl 
      bg-white dark:bg-slate-900
      transform transition-transform duration-500
      md:-translate-y-18 md:${rotation}
      hover:scale-105 
      hover:md:-translate-y-2 
      hover:md:rotate-1
    `}
  >
    <img src={src} alt={label} className="w-full h-full object-cover" />
    <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-sm px-3 py-2 font-semibold">
      {label}
    </div>
  </div>
);

export default HomePage;
