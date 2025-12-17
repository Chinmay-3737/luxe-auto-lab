// HPI 1.6-G
import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Palette, Calendar, ChevronRight, Gauge, Shield, Zap } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Image } from '@/components/ui/image';

// --- Utility Components ---

const AnimatedReveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          element.classList.add('is-visible');
        }, delay * 1000);
        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal-base ${className || ''}`}>
      {children}
    </div>
  );
};

const NeonButton: React.FC<{ to: string; children: React.ReactNode; variant?: 'primary' | 'outline' }> = ({ to, children, variant = 'primary' }) => {
  return (
    <Link
      to={to}
      className={`group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-paragraph text-sm uppercase tracking-widest transition-all duration-300 ${
        variant === 'primary' 
          ? 'bg-primary text-white hover:bg-red-700' 
          : 'bg-transparent text-white border border-white/30 hover:border-primary hover:text-primary'
      }`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </Link>
  );
};

// --- Main Component ---

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Canonical Data Sources
  const categories = [
    { title: 'VIP Cars', slug: 'vip-cars', id: 'category-vip-cars' },
    { title: 'Luxury Cars', slug: 'luxury-cars', id: 'category-luxury-cars' },
    { title: 'Branded Sports', slug: 'branded-sports-cars', id: 'category-branded-sports-cars' },
    { title: '4×4 Vehicles', slug: '4x4-vehicles', id: 'category-4x4-vehicles' },
    { title: 'Monster Trucks', slug: 'monster-trucks', id: 'category-monster-trucks' },
  ];

  const features = [
    {
      icon: Sparkles,
      title: 'Premium Selection',
      description: 'Curated collection of VIP cars, luxury vehicles, branded sports cars, 4×4s, and monster trucks.',
    },
    {
      icon: Palette,
      title: 'Full Customization',
      description: 'Expert color charts, interior/exterior design, and complete body customization services.',
    },
    {
      icon: Calendar,
      title: 'Test Drive Booking',
      description: 'Experience luxury firsthand with our seamless test drive scheduling system.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white overflow-x-clip">
      <style>{`
        .reveal-base {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-base.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          color: transparent;
        }
        .text-stroke-primary {
          -webkit-text-stroke: 1px #FF0000;
          color: transparent;
        }
        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
      `}</style>

      <Header />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/04c535_b4e79ab9c667433988738eb88367d2fe~mv2.png?originWidth=1920&originHeight=1024"
            alt="Premium luxury car dark aesthetic"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
          <div className="absolute inset-0 grid-bg opacity-20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 flex flex-col items-center">
          <AnimatedReveal className="text-center space-y-2">
            <h2 className="font-paragraph text-primary tracking-[0.5em] text-sm md:text-base uppercase mb-4">
              The Future of Automotive Luxury
            </h2>
            <div className="relative">
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-heading font-bold leading-[0.8] tracking-tighter text-white mix-blend-overlay opacity-50 select-none">
                PRECISION
              </h1>
              <h1 className="absolute top-0 left-0 w-full text-7xl md:text-9xl lg:text-[12rem] font-heading font-bold leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0">
                PRECISION
              </h1>
            </div>
            <div className="relative mt-[-2vw]">
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-heading font-bold leading-[0.8] tracking-tighter text-stroke-primary opacity-80">
                PERFORMANCE
              </h1>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={0.3} className="mt-12 flex flex-col md:flex-row gap-6 items-center">
            <NeonButton to="/categories">Explore Collection</NeonButton>
            <NeonButton to="/customization" variant="outline">Customization Studio</NeonButton>
          </AnimatedReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] uppercase tracking-widest font-paragraph">Scroll</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* MARQUEE TICKER */}
      <div className="w-full bg-primary/10 border-y border-primary/20 overflow-hidden py-4 backdrop-blur-sm">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 text-lg font-heading font-bold text-primary/80 uppercase tracking-widest flex items-center gap-4">
              VIP Cars <span className="w-2 h-2 bg-white rounded-full" /> 
              Monster Trucks <span className="w-2 h-2 bg-white rounded-full" /> 
              Custom Builds <span className="w-2 h-2 bg-white rounded-full" />
            </span>
          ))}
        </div>
      </div>

      {/* MANIFESTO - STICKY SCROLL SECTION */}
      <section className="relative py-32 px-6 bg-black">
        <div className="max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky Title */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <AnimatedReveal>
                <div className="w-12 h-1 bg-primary mb-8" />
                <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 leading-none">
                  BEYOND<br />
                  <span className="text-stroke">ORDINARY</span>
                </h2>
                <p className="font-paragraph text-secondary/60 text-lg leading-relaxed max-w-md">
                  We don't just sell cars. We curate experiences. From the roar of a monster truck to the silent glide of a VIP sedan, every vehicle in our collection is a masterpiece of engineering.
                </p>
              </AnimatedReveal>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="lg:col-span-8 space-y-32 pt-12 lg:pt-0">
            {features.map((feature, index) => {
              const featureImages = [
                'https://static.wixstatic.com/media/04c535_a948e600af30481999ba86515d73e75c~mv2.png?originWidth=896&originHeight=448',
                'https://static.wixstatic.com/media/04c535_a6304e7ea1ee415483debc80c589fbf7~mv2.png?originWidth=896&originHeight=448',
                'https://static.wixstatic.com/media/04c535_963d0b77a899476d80bf856ad24c7bb0~mv2.png?originWidth=896&originHeight=448'
              ];
              return (
                <AnimatedReveal key={index} className="group relative">
                  <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-white/10 group-hover:bg-primary/50 transition-colors duration-500" />
                  <div className="relative overflow-hidden rounded-2xl aspect-[16/9] mb-8 border border-white/10 group-hover:border-primary/30 transition-colors">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <Image
                      src={featureImages[index]}
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 p-8 z-20">
                      <feature.icon className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-3xl font-heading font-bold text-white mb-2">{feature.title}</h3>
                      <p className="font-paragraph text-secondary/80 max-w-lg">{feature.description}</p>
                    </div>
                  </div>
                </AnimatedReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIES GRID - ASYMMETRICAL */}
      <section className="py-32 px-6 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <AnimatedReveal>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">
                THE <span className="text-primary">COLLECTION</span>
              </h2>
            </AnimatedReveal>
            <AnimatedReveal delay={0.2}>
              <Link to="/categories" className="group flex items-center gap-2 text-white/60 hover:text-primary transition-colors font-paragraph text-sm uppercase tracking-widest mt-6 md:mt-0">
                View Full Inventory
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
            {/* Large Featured Item */}
            <div className="md:col-span-8 row-span-1 md:row-span-2 relative group overflow-hidden rounded-xl border border-white/10">
              <Link to="/categories" className="block w-full h-full">
                <Image
                  src={'https://static.wixstatic.com/media/04c535_3e460bb9eb0842fdba4b1323158e697f~mv2.png?originWidth=1152&originHeight=768'}
                  alt={categories[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-10">
                  <span className="text-primary font-paragraph text-xs uppercase tracking-widest mb-2 block">Flagship Series</span>
                  <h3 className="text-5xl font-heading font-bold text-white group-hover:text-primary transition-colors">{categories[0].title}</h3>
                </div>
              </Link>
            </div>

            {/* Secondary Items */}
            {categories.slice(1).map((category, idx) => {
              const categoryImages = [
                'https://static.wixstatic.com/media/04c535_73aa591ed3284e138f65029b4320cfb6~mv2.png?originWidth=1152&originHeight=768',
                'https://static.wixstatic.com/media/04c535_3598601e9d4b4b119aa5367b64a56c7f~mv2.png?originWidth=1152&originHeight=768',
                'https://static.wixstatic.com/media/04c535_6fd23c04e6674bcb8fcb17d55bb54557~mv2.png?originWidth=1152&originHeight=768',
                'https://static.wixstatic.com/media/04c535_de8c24aaaedc414087d8e4a79f02133a~mv2.png?originWidth=1152&originHeight=768'
              ];
              return (
                <div key={category.slug} className={`md:col-span-4 relative group overflow-hidden rounded-xl border border-white/10 ${idx === 2 ? 'md:col-span-4' : ''}`}>
                  <Link to="/categories" className="block w-full h-full">
                    <Image
                      src={categoryImages[idx]}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-heading font-bold text-white mb-2">{category.title}</h3>
                        <div className="h-[1px] w-0 group-hover:w-full bg-primary transition-all duration-500" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CUSTOMIZATION STUDIO - INTERACTIVE TEASER */}
      <section className="relative py-32 bg-black overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="max-w-[120rem] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-paragraph uppercase tracking-widest mb-8">
                <Palette className="w-4 h-4" />
                Customization Studio
              </div>
              <h2 className="text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-tight">
                YOUR VISION.<br />
                <span className="text-stroke">OUR EXPERTISE.</span>
              </h2>
              <p className="font-paragraph text-secondary/70 text-lg mb-12 max-w-xl">
                From custom paint jobs to complete body modifications, our studio brings your dream vehicle to life. Access our full color chart, interior materials, and performance upgrades.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-12">
                {[
                  { label: 'Paint Selection', val: '500+' },
                  { label: 'Material Options', val: 'Premium' },
                  { label: 'Body Kits', val: 'Custom' },
                  { label: 'Turnaround', val: 'Fast' }
                ].map((stat, i) => (
                  <div key={i} className="border-l border-white/20 pl-6">
                    <div className="text-2xl font-heading font-bold text-white mb-1">{stat.val}</div>
                    <div className="text-xs font-paragraph text-secondary/50 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              <NeonButton to="/customization">Start Customizing</NeonButton>
            </AnimatedReveal>

            <AnimatedReveal delay={0.2} className="relative">
              <div className="relative aspect-square rounded-full border border-white/10 p-12 animate-[spin_60s_linear_infinite]">
                <div className="absolute inset-0 rounded-full border border-dashed border-white/20" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full aspect-[4/3] bg-zinc-900 rounded-xl overflow-hidden border border-white/10 shadow-2xl transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="https://static.wixstatic.com/media/04c535_a9c3963c4cb24cc89aa854281e87d420~mv2.png?originWidth=768&originHeight=768"
                    alt="Customization Interface"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                    <div className="w-full">
                      <div className="flex justify-between items-end mb-4">
                        <span className="font-heading text-white text-xl">Matte Black Finish</span>
                        <span className="font-paragraph text-primary text-sm">SELECTED</span>
                      </div>
                      <div className="flex gap-2">
                        {['#000', '#333', '#1a1a1a', '#FF0000'].map((color, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedReveal>
            <h2 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight">
              READY TO <span className="text-primary">DRIVE?</span>
            </h2>
            <p className="font-paragraph text-xl text-secondary/60 mb-12 max-w-2xl mx-auto">
              Book a test drive today or start building your custom vehicle in our digital studio.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <NeonButton to="/categories">View Inventory</NeonButton>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-paragraph text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}