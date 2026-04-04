import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, BookOpen, Brain, 
  ShieldCheck, Smartphone, Mail, MessageCircle, FileText,
  CheckCircle2, BarChart3, Bookmark, Clock, Moon, Sun, ArrowRight,
  Star, ChevronRight, Download
} from 'lucide-react';

import { Boxes } from './background-boxes';
import RealismButton from './shiny-borders-button';
import GlowingShadow from './glowing-shadow';

// --- Components ---

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
      if (!savedTheme) {
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all duration-300"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

const Logo = () => (
  <Link to="/" className="flex items-center gap-3 z-50 relative group">
    <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white dark:bg-zinc-900 shadow-xl shadow-indigo-500/10 border border-slate-100 dark:border-zinc-800 overflow-hidden transition-transform duration-500 group-hover:scale-105">
      <img 
        src="https://drive.google.com/thumbnail?id=1xi9A5n3MaHT5LxqlewfrI6kI67OAur8A&sz=w1000" 
        alt="Medical Apps Nepal" 
        className="w-full h-full object-contain p-1"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-lg md:text-xl tracking-tight text-slate-900 dark:text-white leading-tight">
        Medical Apps
      </span>
      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 leading-tight">
        Nepal
      </span>
    </div>
  </Link>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/#features' },
    { name: 'Our Apps', path: '/#apps' },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-500 pointer-events-none ${
      scrolled 
        ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-zinc-800/50 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pointer-events-auto">
        <div className="flex justify-between items-center">
          <Logo />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1 bg-white/50 dark:bg-zinc-900/50 rounded-full p-1.5 border border-slate-200/50 dark:border-zinc-800/50 backdrop-blur-md">
              {links.map((link) => {
                const isActive = link.path.includes('#') 
                  ? location.pathname + location.hash === link.path
                  : location.pathname === link.path && !location.hash;
                
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md' 
                        : 'text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a 
                href="https://invite.viber.com/?g2=AQBkEKfTmFmouFXxYmkpvfDbRExRanwU88ZyGGUTHPHiJWPmOi5W85NQa9hNdy%2BV"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-medium transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Viber</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              className="p-2.5 text-slate-600 dark:text-zinc-300 bg-slate-100 dark:bg-zinc-800 rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 overflow-hidden shadow-2xl"
          >
            <div className="px-6 py-6 flex flex-col gap-2 pointer-events-auto">
              {links.map((link) => {
                const isActive = link.path.includes('#') 
                  ? location.pathname + location.hash === link.path
                  : location.pathname === link.path && !location.hash;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-5 py-4 rounded-2xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                        : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-6 mt-4 border-t border-slate-100 dark:border-zinc-800">
                <a 
                  href="https://invite.viber.com/?g2=AQBkEKfTmFmouFXxYmkpvfDbRExRanwU88ZyGGUTHPHiJWPmOi5W85NQa9hNdy%2BV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-4 rounded-2xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-500/25"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Viber Community
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-slate-50/80 dark:bg-zinc-950/80 backdrop-blur-sm pt-24 pb-12 border-t border-slate-200/50 dark:border-zinc-800/50 pointer-events-none">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pointer-events-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
        <div className="md:col-span-5 lg:col-span-4">
          <Logo />
          <p className="mt-6 text-slate-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">
            Empowering medical students in Nepal with premium, high-yield preparation tools for CEE MDMS and beyond.
          </p>
        </div>
        <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">CEE MDMS</h3>
          <ul className="space-y-4">
            <li>
              <Link to="/ceemdms/privacy-policy" className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/ceemdms/delete-account" className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors">
                Delete Account
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Connect</h3>
          <ul className="space-y-4">
            <li>
              <a href="mailto:medicalappsnepal@gmail.com" className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300">
                  <Mail className="w-4 h-4" />
                </div>
                Support Email
              </a>
            </li>
            <li>
              <a href="https://invite.viber.com/?g2=AQBkEKfTmFmouFXxYmkpvfDbRExRanwU88ZyGGUTHPHiJWPmOi5W85NQa9hNdy%2BV" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#7360f2]/10 text-[#7360f2]">
                  <MessageCircle className="w-4 h-4" />
                </div>
                Viber Channel
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium">
          © {new Date().getFullYear()} Medical Apps Nepal. All rights reserved.
        </p>
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Systems Operational</span>
        </div>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const Home = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Practice By Subject",
      description: "Master 20 different subjects with dedicated question banks and progress tracking.",
      icon: <BookOpen className="w-5 h-5" />,
      image: "https://drive.google.com/thumbnail?id=1vrsMDCsfsTdpoeAdh7CrKOM4KuJkEk_T&sz=w1000"
    },
    {
      title: "Exclude Mastered",
      description: "Focus your time efficiently by filtering out questions you already know.",
      icon: <CheckCircle2 className="w-5 h-5" />,
      image: "https://drive.google.com/thumbnail?id=1-4mzPCciiBOvP3q5LrK-moHjuqbCmaYo&sz=w1000"
    },
    {
      title: "Performance Analytics",
      description: "Track your score history, accuracy by subject, and identify weak areas.",
      icon: <BarChart3 className="w-5 h-5" />,
      image: "https://drive.google.com/thumbnail?id=1Ia-_DkZWTkOHFODa9f_XwE8jpj3f7xAB&sz=w1000"
    },
    {
      title: "Memory Based MCQs",
      description: "Access past year questions to understand the exam pattern and trends.",
      icon: <Brain className="w-5 h-5" />,
      image: "https://drive.google.com/thumbnail?id=1rkOQ_XXj1tfdNGrxMibi5E4A4iZ1GPxC&sz=w1000"
    },
    {
      title: "In Depth Explanations",
      description: "Understand the 'why' behind every answer with detailed rationales.",
      icon: <FileText className="w-5 h-5" />,
      image: "https://drive.google.com/thumbnail?id=1SI8wA1qN3vQYn_dZbreQcyLcbm-9KRLT&sz=w1000"
    },
    {
      title: "Mock Exams",
      description: "Simulate the real exam environment with authentic question distribution.",
      icon: <Clock className="w-5 h-5" />,
      image: "https://drive.google.com/thumbnail?id=1dT7A_qGMdXbbAPFdx2DPrTstiyejtkfE&sz=w1000"
    },
    {
      title: "Smart Review",
      description: "Save difficult questions and review them smartly based on your goals.",
      icon: <Bookmark className="w-5 h-5" />,
      image: "https://drive.google.com/thumbnail?id=1Nl0SBwtpgNalWVS3kRkyeDfGdz948b2k&sz=w1000"
    },
    {
      title: "Verified By Experts",
      description: "Content curated, reviewed, and verified by top medical professionals.",
      icon: <ShieldCheck className="w-5 h-5" />,
      image: "https://drive.google.com/thumbnail?id=1Xk9z_X86ckKmi6ktcxwURu3Q39IXfedI&sz=w1000"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent pointer-events-none">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden pointer-events-none">
        {/* Modern Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 dark:bg-blue-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/noise/1000/1000')] opacity-[0.015] dark:opacity-[0.02] mix-blend-overlay" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pointer-events-auto">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm mb-8"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-zinc-300 tracking-wide uppercase">Updated for 2026 Exams</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]"
            >
              Master your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-400">
                medical exams.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 mb-10 max-w-2xl leading-relaxed font-medium"
            >
              The definitive preparation platform for medical students in Nepal. High-yield past questions, expert rationales, and predictive analytics.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <RealismButton 
                text="Visit Store"
                href="https://play.google.com/store/apps/dev?id=6711800083996272321&hl=en-US"
                target="_blank"
                rel="noopener noreferrer"
                icon={<Download className="w-5 h-5" />}
                className="w-full sm:w-auto"
              />
              <a 
                href="#features"
                className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Explore Features
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-12 flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-zinc-400"
            >
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1594824436951-7f1267da4c1d?q=80&w=100&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=100&auto=format&fit=crop"
                ].map((imgUrl, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-950 bg-slate-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                    <img src={imgUrl} alt="Nepali Doctor" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span>Trusted by Ace Students</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Image / Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 z-20 h-1/3 pointer-events-none" />
            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm p-3 md:p-5 shadow-2xl shadow-indigo-500/5">
              <img 
                src="https://drive.google.com/thumbnail?id=1HB4MiRRCZqfqnd7QUxFBcn9wXBowZtzI&sz=w2000" 
                alt="App Interface Preview" 
                className="w-full h-auto rounded-[1.5rem] md:rounded-[2.5rem] object-contain border border-slate-100 dark:border-zinc-800"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Feature Viewer */}
      <section className="py-32 bg-slate-50/80 dark:bg-zinc-900/30 border-y border-slate-200/50 dark:border-zinc-800/50 backdrop-blur-sm pointer-events-none" id="features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pointer-events-auto">
          <div className="mb-20 md:text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
              Engineered for retention.
            </h2>
            <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 font-medium leading-relaxed">
              Every feature is meticulously designed to optimize your study time and maximize your score on the actual exam.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
            {/* Left side: Feature list */}
            <div className="w-full lg:w-1/2 flex flex-col gap-3">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`text-left p-6 rounded-3xl transition-all duration-300 border ${
                    activeFeature === index
                      ? 'bg-white dark:bg-zinc-900 border-indigo-500/30 shadow-xl shadow-indigo-500/5 scale-[1.02]'
                      : 'bg-transparent border-transparent hover:bg-slate-200/50 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  <div className="flex items-center gap-5 mb-2">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${
                      activeFeature === index
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                        : 'bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400'
                    }`}>
                      {feature.icon}
                    </div>
                    <h3 className={`text-xl font-bold ${
                      activeFeature === index ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-zinc-400'
                    }`}>
                      {feature.title}
                    </h3>
                  </div>
                  <AnimatePresence>
                    {activeFeature === index && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-slate-600 dark:text-zinc-400 text-base font-medium leading-relaxed pl-[4.25rem] pt-2"
                      >
                        {feature.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              ))}
            </div>

            {/* Right side: Phone Mockup */}
            <div className="w-full lg:w-1/2 lg:sticky lg:top-32 flex justify-center">
              <div className="relative w-[300px] md:w-[340px] aspect-[1/2.1] bg-white dark:bg-zinc-900 rounded-[3rem] p-3 shadow-2xl shadow-indigo-500/10 border border-slate-200 dark:border-zinc-800">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-zinc-950 relative border border-slate-100 dark:border-zinc-800">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeFeature}
                      initial={{ opacity: 0, scale: 1.05, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      src={features[activeFeature].image}
                      alt={features[activeFeature].title}
                      className="absolute inset-0 w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <section className="py-32 relative overflow-hidden bg-slate-900/90 dark:bg-zinc-950/80 backdrop-blur-sm pointer-events-none" id="apps">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 pointer-events-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-8 backdrop-blur-md">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-bold text-white tracking-wide uppercase">Top Rated Medical App</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                CEE MDMS: Nepal Past Questions
              </h2>
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                The ultimate companion for medical students in Nepal. Master 20 subjects with memory-based past questions, in-depth explanations, and smart analytics designed for your success.
              </p>
              
              <ul className="space-y-5 mb-12">
                {['20+ Subjects Covered', 'Detailed Rationales', 'Performance Tracking', 'Smart Review'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-200 font-medium text-lg">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <GlowingShadow>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.mdmsnepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-bold transition-all duration-300"
                >
                  <Smartphone className="w-6 h-6" />
                  Download on Google Play
                </a>
              </GlowingShadow>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-[300px] md:w-[360px] rounded-[3rem] bg-slate-800 p-3 shadow-2xl shadow-indigo-500/20 border border-slate-700 rotate-[-4deg] hover:rotate-0 transition-transform duration-700 ease-out group">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-blue-500 rounded-[3rem] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
                <img 
                  src="https://drive.google.com/thumbnail?id=1_xfcw3ZPsbI6-BPupyrytmCnrf5Pbdmo&sz=w1000" 
                  alt="App Logo" 
                  className="w-full h-auto rounded-[2.5rem] relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm pointer-events-none">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center pointer-events-auto">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8">
            Ready to start practicing?
          </h2>
          <p className="text-xl text-slate-600 dark:text-zinc-400 mb-12 font-medium max-w-2xl mx-auto">
            Join thousands of medical students who are already using our platform to prepare smarter and score higher.
          </p>
          <RealismButton 
            text="Visit Store"
            href="https://play.google.com/store/apps/dev?id=6711800083996272321&hl=en-US"
            target="_blank"
            rel="noopener noreferrer"
            icon={<ArrowRight className="w-5 h-5" />}
          />
        </div>
      </section>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24 pointer-events-none">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200 dark:border-zinc-800"
        >
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">CEE MDMS: Nepal Past Questions</h1>
            <h2 className="text-2xl text-slate-500 dark:text-zinc-400 mb-4 font-medium mt-0">Privacy Policy & Terms of Service</h2>
            <div className="inline-block px-3 py-1 bg-slate-100 dark:bg-zinc-800 rounded-full text-sm font-semibold text-slate-600 dark:text-zinc-300 mb-12">
              Last updated: December 28, 2025
            </div>
            
            <div className="space-y-10 text-slate-600 dark:text-zinc-300 font-medium">
              <p className="text-lg leading-relaxed">This document describes how <strong>Medical Apps Nepal</strong> ("we", "us", or "our") handles your information and the rules for using the <strong>CEE MDMS: Nepal Past Questions</strong> mobile application (the "App").</p>

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-6 rounded-2xl">
                <p className="text-amber-800 dark:text-amber-200 font-semibold m-0 flex gap-4 items-start text-sm leading-relaxed">
                  <span className="text-xl">⚠️</span>
                  <span><strong>MEDICAL DISCLAIMER:</strong> This App is an educational tool for exam preparation and is NOT a medical device. It does not provide clinical diagnosis or professional medical advice.</span>
                </p>
              </div>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Privacy Policy & Information Collection</h3>
                <p>We collect only the minimum information necessary to provide educational features and secure access:</p>
                <ul className="list-disc pl-5 mt-4 space-y-3 marker:text-indigo-500">
                  <li><strong>Personal Identifiers:</strong> Name and Email Address provided via secure Google Authentication.</li>
                  <li><strong>Academic Data:</strong> Your affiliated medical college and year of study (optional).</li>
                  <li><strong>Study Progress:</strong> Quiz scores, bookmarks, and subject-wise completion rates to sync across your devices.</li>
                  <li><strong>Technical Data:</strong> Device model and OS version for crash reporting and app optimization.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. Data Usage and Tracking</h3>
                <p>We use your data to personalize your study experience. Tracking technologies are used only to save your progress and analyze app performance. We do not sell your data to third parties.</p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Data Security & Third-Party Services</h3>
                <p>We use industry-standard encryption (SSL/TLS) to protect your data. We work with trusted partners like Google Firebase for secure authentication and hosting. These partners are legally bound to protect your information.</p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Data Deletion & Your Rights</h3>
                <p>In accordance with the <strong>Individual Privacy Act, 2075 (Nepal)</strong>, you have full control over your data:</p>
                <ul className="list-disc pl-5 mt-4 space-y-3 marker:text-indigo-500">
                  <li><strong>Account Deletion:</strong> You can request account deletion at any time via the App settings or by emailing us.</li>
                  <li><strong>Processing:</strong> Once requested, all your personally identifiable data will be wiped from our servers within <strong>24 hours</strong>.</li>
                  <li><strong>Contact:</strong> <a href="mailto:medicalappsnepal@gmail.com" className="font-semibold">medicalappsnepal@gmail.com</a></li>
                </ul>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Terms of Service & User Rules</h3>
                <p>By using this App, you agree to the following conditions:</p>
                <ul className="list-disc pl-5 mt-4 space-y-3 marker:text-indigo-500">
                  <li><strong>Personal Use:</strong> The content is for your individual study only. Sharing accounts or commercial redistribution of content is prohibited.</li>
                  <li><strong>Accuracy:</strong> While we aim for 100% accuracy, we are not liable for any errors in MCQs or explanations.</li>
                  <li><strong>No Affiliation:</strong> This app is an independent project and is NOT affiliated with the Medical Education Commission (MEC) or Nepal Medical Council (NMC).</li>
                </ul>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DeleteAccount = () => {
  return (
    <div className="min-h-screen bg-transparent pt-32 pb-24 pointer-events-none">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-10 border border-slate-200 dark:border-zinc-800 shadow-xl shadow-slate-200/40 dark:shadow-none"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">CEE MDMS: Nepal Past Questions</h1>
            <h2 className="text-xl md:text-2xl text-slate-500 dark:text-zinc-400 mb-4 font-medium">Delete Account</h2>
            <p className="text-slate-600 dark:text-zinc-400 font-medium">
              Request account deletion for <strong>CEE MDMS: Nepal Past Questions</strong>.
            </p>
          </div>
          
          <div className="w-full h-[800px] md:h-[900px] overflow-hidden rounded-2xl border border-slate-200 dark:border-zinc-800 relative bg-slate-50 dark:bg-zinc-950 shadow-inner">
            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSdYYw8PYNON2bq3Zy0Y-52C0d0khn4d80a5cW6W3sbkpcUJ-A/viewform?embedded=true" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              marginHeight={0} 
              marginWidth={0} 
              className="absolute top-0 left-0 w-full h-full"
              title="Delete Account Form"
            >
              Loading…
            </iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// --- Main App ---

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-100 bg-transparent relative">
        <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-slate-50 dark:bg-slate-950 pointer-events-auto">
          <div className="absolute inset-0 w-full h-full bg-slate-50 dark:bg-slate-950 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          <Boxes />
        </div>
        <div className="relative z-10 flex flex-col flex-grow pointer-events-none">
          <Navbar />
          <main className="flex-grow pointer-events-none">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ceemdms/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/ceemdms/delete-account" element={<DeleteAccount />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
