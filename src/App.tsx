import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, BookOpen, Brain, Activity, 
  ShieldCheck, Smartphone, Mail, MessageCircle, Trash2, FileText,
  CheckCircle2, BarChart3, Bookmark, Clock, Moon, Sun, ChevronRight, ArrowRight
} from 'lucide-react';

// --- Components ---

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    } else {
      // Default to light mode
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

const Logo = () => (
  <Link to="/" className="flex items-center gap-3 z-50 relative group">
    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20 overflow-hidden">
      <img 
        src="https://drive.google.com/thumbnail?id=1aGLnqe6m6Jas-P4SSjpsfTMDT52_kHGy&sz=w1000" 
        alt="Medical Apps Nepal" 
        className="w-full h-full object-contain scale-110 group-hover:scale-100 transition-transform duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
    <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
      Medical Apps Nepal
    </span>
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
    { name: 'Our Apps', path: '/#apps' },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/70 dark:bg-[#050505]/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-white/5 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo />
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center bg-slate-100/50 dark:bg-white/5 rounded-full p-1 border border-slate-200/50 dark:border-white/5 backdrop-blur-md mr-4">
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
                        ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a 
                href="https://invite.viber.com/?g2=AQBkEKfTmFmouFXxYmkpvfDbRExRanwU88ZyGGUTHPHiJWPmOi5W85NQa9hNdy%2BV"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Join Viber</span>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button 
              className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 rounded-full"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-[#050505]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10"
          >
            <div className="px-6 py-6 space-y-2">
              {links.map((link) => {
                const isActive = link.path.includes('#') 
                  ? location.pathname + location.hash === link.path
                  : location.pathname === link.path && !location.hash;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10">
                <a 
                  href="https://invite.viber.com/?g2=AQBkEKfTmFmouFXxYmkpvfDbRExRanwU88ZyGGUTHPHiJWPmOi5W85NQa9hNdy%2BV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium"
                >
                  <MessageCircle className="w-5 h-5" />
                  Join Viber Channel
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
  <footer className="bg-white dark:bg-[#050505] pt-24 pb-12 border-t border-slate-200 dark:border-white/5">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
        <div className="md:col-span-5 lg:col-span-4">
          <Logo />
          <p className="mt-6 text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
            Empowering medical students in Nepal with premium, high-yield preparation tools for CEE MDMS and beyond.
          </p>
        </div>
        <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-6">CEE MDMS App</h3>
          <ul className="space-y-4">
            <li>
              <Link to="/cee-mdms/privacy-policy" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cee-mdms/delete-account" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors">
                Delete Account
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          <h3 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-6">Connect</h3>
          <ul className="space-y-4">
            <li>
              <a href="mailto:medicalappsnepal@gmail.com" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> Support Email
              </a>
            </li>
            <li>
              <a href="https://invite.viber.com/?g2=AQBkEKfTmFmouFXxYmkpvfDbRExRanwU88ZyGGUTHPHiJWPmOi5W85NQa9hNdy%2BV" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> Viber Channel
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 dark:text-slate-500 text-sm">
          © {new Date().getFullYear()} Medical Apps Nepal. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-slate-500 dark:text-slate-400">Systems Operational</span>
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
    <div className="min-h-screen bg-white dark:bg-[#050505]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 dark:bg-indigo-500/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-violet-500/20 dark:bg-violet-500/10 blur-[120px]" />
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/noise/1000/1000')] opacity-[0.015] dark:opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-8"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300 tracking-wide uppercase">Past Questions</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white mb-6 leading-[1.05]"
            >
              Master your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-violet-500 to-indigo-500 animate-gradient-x">
                medical exams.
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed"
            >
              The definitive preparation platform for medical students in Nepal. High-yield past questions, expert rationales, and predictive analytics.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a 
                href="https://play.google.com/store/apps/details?id=com.mdmsnepal"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:scale-105 transition-all duration-300"
              >
                <Smartphone className="w-5 h-5" />
                <span>Download App</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#apps"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-full bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
              >
                Explore Features
              </a>
            </motion.div>
          </div>

          {/* Hero Image / Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#050505] z-20 h-full w-full pointer-events-none" />
            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-slate-200/50 dark:border-white/10 bg-slate-100 dark:bg-white/5 p-2 md:p-4 shadow-2xl">
              <img 
                src="https://drive.google.com/thumbnail?id=1HB4MiRRCZqfqnd7QUxFBcn9wXBowZtzI&sz=w2000" 
                alt="App Interface Preview" 
                className="w-full h-auto rounded-[1.5rem] md:rounded-[2.5rem] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Feature Viewer */}
      <section className="py-24 bg-slate-50 dark:bg-[#0a0a0a]" id="features">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 md:text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
              Engineered for retention.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl md:mx-auto">
              Every feature is designed to optimize your study time and maximize your score on the actual exam.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Left side: Feature list */}
            <div className="w-full lg:w-1/2 flex flex-col gap-2">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`text-left p-6 rounded-2xl transition-all duration-300 border ${
                    activeFeature === index
                      ? 'bg-white dark:bg-[#111] border-indigo-500/30 shadow-lg shadow-indigo-500/5'
                      : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      activeFeature === index
                        ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400'
                        : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400'
                    }`}>
                      {feature.icon}
                    </div>
                    <h3 className={`text-xl font-semibold ${
                      activeFeature === index ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
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
                        className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed pl-14"
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
              <div className="relative w-[280px] md:w-[320px] aspect-[1/2.1] bg-slate-100 dark:bg-white/5 rounded-[2.5rem] p-2 shadow-2xl border border-slate-200 dark:border-white/10">
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-white dark:bg-[#0a0a0a] relative">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeFeature}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
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
      <section className="py-32 relative overflow-hidden" id="apps">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
                CEE MDMS: Nepal Past Questions
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                The ultimate companion for medical students in Nepal. Master 20 subjects with memory-based past questions, in-depth explanations, and smart analytics designed for your success.
              </p>
              
              <ul className="space-y-4 mb-10">
                {['20+ Subjects Covered', 'Detailed Rationales', 'Performance Tracking', 'Smart Review'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              <a 
                href="https://play.google.com/store/apps/details?id=com.mdmsnepal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
              >
                <Smartphone className="w-5 h-5" />
                Download on Google Play
              </a>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 blur-3xl rounded-full" />
              <div className="relative flex justify-center">
                <div className="w-[280px] md:w-[320px] rounded-[2.5rem] bg-slate-900 p-2 shadow-2xl border border-slate-800 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://drive.google.com/thumbnail?id=1_xfcw3ZPsbI6-BPupyrytmCnrf5Pbdmo&sz=w1000" 
                    alt="App Logo" 
                    className="w-full h-auto rounded-[2rem]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative border-t border-slate-200 dark:border-white/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Ready to start practicing?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
            Join thousands of medical students who are already using our platform to prepare smarter.
          </p>
          <a 
            href="https://play.google.com/store/apps/details?id=com.mdmsnepal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold hover:scale-105 transition-transform"
          >
            Get the App Free
          </a>
        </div>
      </section>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-a:text-indigo-600 dark:prose-a:text-indigo-400"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">CEE MDMS: Nepal Past Questions</h1>
          <h2 className="text-2xl text-slate-600 dark:text-slate-400 mb-2 font-normal">Privacy Policy & Terms of Service</h2>
          <p className="text-sm text-slate-500 dark:text-slate-500 mb-12">Last updated: December 28, 2025</p>
          
          <div className="space-y-10 text-slate-600 dark:text-slate-300">
            <p className="text-lg leading-relaxed">This document describes how <strong>Medical Apps Nepal</strong> ("we", "us", or "our") handles your information and the rules for using the <strong>CEE MDMS: Nepal Past Questions</strong> mobile application (the "App").</p>

            <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-6 rounded-2xl">
              <p className="text-amber-800 dark:text-amber-200 font-medium m-0 flex gap-4 items-start text-sm leading-relaxed">
                <span className="text-xl">⚠️</span>
                <span><strong>MEDICAL DISCLAIMER:</strong> This App is an educational tool for exam preparation and is NOT a medical device. It does not provide clinical diagnosis or professional medical advice.</span>
              </p>
            </div>

            <section>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">1. Privacy Policy & Information Collection</h3>
              <p>We collect only the minimum information necessary to provide educational features and secure access:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-slate-400">
                <li><strong>Personal Identifiers:</strong> Name and Email Address provided via secure Google Authentication.</li>
                <li><strong>Academic Data:</strong> Your affiliated medical college and year of study (optional).</li>
                <li><strong>Study Progress:</strong> Quiz scores, bookmarks, and subject-wise completion rates to sync across your devices.</li>
                <li><strong>Technical Data:</strong> Device model and OS version for crash reporting and app optimization.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">2. Data Usage and Tracking</h3>
              <p>We use your data to personalize your study experience. Tracking technologies are used only to save your progress and analyze app performance. We do not sell your data to third parties.</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">3. Data Security & Third-Party Services</h3>
              <p>We use industry-standard encryption (SSL/TLS) to protect your data. We work with trusted partners like Google Firebase for secure authentication and hosting. These partners are legally bound to protect your information.</p>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">4. Data Deletion & Your Rights</h3>
              <p>In accordance with the <strong>Individual Privacy Act, 2075 (Nepal)</strong>, you have full control over your data:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-slate-400">
                <li><strong>Account Deletion:</strong> You can request account deletion at any time via the App settings or by emailing us.</li>
                <li><strong>Processing:</strong> Once requested, all your personally identifiable data will be wiped from our servers within <strong>24 hours</strong>.</li>
                <li><strong>Contact:</strong> <a href="mailto:medicalappsnepal@gmail.com">medicalappsnepal@gmail.com</a></li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">5. Terms of Service & User Rules</h3>
              <p>By using this App, you agree to the following conditions:</p>
              <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-slate-400">
                <li><strong>Personal Use:</strong> The content is for your individual study only. Sharing accounts or commercial redistribution of content is prohibited.</li>
                <li><strong>Accuracy:</strong> While we aim for 100% accuracy, we are not liable for any errors in MCQs or explanations.</li>
                <li><strong>No Affiliation:</strong> This app is an independent project and is NOT affiliated with the Medical Education Commission (MEC) or Nepal Medical Council (NMC).</li>
              </ul>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DeleteAccount = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#111] rounded-[2rem] p-6 md:p-10 border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/20 dark:shadow-none"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">CEE MDMS: Nepal Past Questions</h1>
            <h2 className="text-2xl text-slate-600 dark:text-slate-400 mb-3 font-normal">Delete Account</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Request account deletion for <strong>CEE MDMS: Nepal Past Questions</strong>.
            </p>
          </div>
          
          <div className="w-full h-[800px] md:h-[900px] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/5 relative bg-slate-50 dark:bg-[#0a0a0a]">
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
      <div className="min-h-screen flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-900 dark:selection:text-indigo-100">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cee-mdms/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cee-mdms/delete-account" element={<DeleteAccount />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
