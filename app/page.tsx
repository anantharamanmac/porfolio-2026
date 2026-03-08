"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Sun, Moon, Github, ExternalLink, ArrowRight, Code2, Paintbrush, ShoppingCart, Star } from 'lucide-react';

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [repos, setRepos] = useState<any[]>([]);
  const [visibleRepos, setVisibleRepos] = useState(4);
  const [loading, setLoading] = useState(true);

  // Parallax scroll effect for the hero section
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setMounted(true);
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    try {
      const response = await fetch('https://api.github.com/users/anantharamanmac/repos?sort=updated');
      const data = await response.json();
      setRepos(data.filter((repo: any) => !repo.fork)); 
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch repos", error);
      setLoading(false);
    }
  };

  const services = [
    { 
      title: 'Full-Stack Engineering', 
      desc: 'Building responsive, scalable web applications using modern frameworks like Next.js and robust backends like Firebase.',
      icon: <Code2 size={28} className="text-blue-500 dark:text-blue-400" />
    },
    { 
      title: 'Brand Identity & UI/UX', 
      desc: 'Crafting bespoke logos, typography, and intuitive user interfaces that create memorable, high-converting digital experiences.',
      icon: <Paintbrush size={28} className="text-purple-500 dark:text-purple-400" />
    },
    { 
      title: 'E-Commerce Solutions', 
      desc: 'Developing custom online storefronts tailored to specific brand aesthetics, ensuring a frictionless path from product discovery to checkout.',
      icon: <ShoppingCart size={28} className="text-emerald-500 dark:text-emerald-400" />
    }
  ];

  // Featured Clients Data (Unique List Only)
  const clients = [
    "Elite Glow Cleaning Services (Dubai)",
    "Anne Signature Saree Store",
    "Kaipattoor Kalavedi",
    "TKM Industry Connect Cell"
  ];

  // Upgraded Framer Motion Variants
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 80, 
        damping: 15,
        mass: 1.2
      } 
    }
  };

  const scaleHoverVariant: Variants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.03, 
      y: -8, 
      transition: { type: "spring", stiffness: 400, damping: 25 } 
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#050505] text-gray-900 dark:text-gray-50 font-sans transition-colors duration-500 selection:bg-blue-500/30">
      
      {/* Navbar - Glassmorphism */}
      <nav className="fixed w-full top-0 z-50 backdrop-blur-2xl bg-white/50 dark:bg-[#050505]/50 border-b border-gray-200/50 dark:border-gray-800/50 supports-[backdrop-filter]:bg-white/20">
        <div className="flex items-center justify-between p-5 max-w-6xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-xl font-bold tracking-tighter"
          >
            Anantharaman J.
          </motion.h1>
          <div className="flex items-center space-x-8">
            <a href="#clients" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Clients</a>
            <a href="#services" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Services</a>
            <a href="#work" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Work</a>
            
            {/* Theme Toggle */}
            {mounted && (
              <motion.button 
                whileHover={{ rotate: 15, scale: 1.1 }} whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </motion.button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <motion.main 
        style={{ y, opacity }}
        className="max-w-6xl mx-auto px-6 pt-48 pb-32 relative flex flex-col items-center text-center"
      >
        {/* Designer Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-4xl relative z-10">
          <motion.div variants={fadeUpVariant} className="inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border border-gray-200 dark:border-gray-800 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            Available for Freelance Projects
          </motion.div>
          <motion.h2 variants={fadeUpVariant} className="text-6xl md:text-[5.5rem] font-extrabold tracking-tighter mb-8 text-gray-900 dark:text-white leading-[1.05]">
            Bridging complex logic with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-emerald-500 dark:from-blue-400 dark:via-purple-400 dark:to-emerald-400">flawless aesthetics.</span>
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12 max-w-3xl mx-auto font-light">
            I engineer high-performance web applications and craft visually striking brand identities that help businesses scale.
          </motion.p>
          <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4 justify-center">
            <motion.a 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href="mailto:eliteglowservices@gmail.com" 
              className="bg-gray-900 dark:bg-white text-white dark:text-gray-950 px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all flex items-center gap-3"
            >
              Start a Project <ArrowRight size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.main>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            <motion.h3 variants={fadeUpVariant} className="text-5xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">Expertise</motion.h3>
            <motion.p variants={fadeUpVariant} className="text-gray-600 dark:text-gray-400 mb-20 max-w-2xl text-xl font-light">Delivering a multidisciplinary approach to digital creation, combining technical architecture with pixel-perfect design.</motion.p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} variants={fadeUpVariant} whileHover="hover" initial="rest" animate="rest"
                className="group p-10 bg-white dark:bg-[#0a0a0a] rounded-[2rem] border border-gray-200 dark:border-gray-800/80 shadow-lg shadow-gray-200/50 dark:shadow-none hover:border-gray-300 dark:hover:border-gray-700 transition-colors duration-500 relative overflow-hidden"
              >
                {/* Subtle hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900/50 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div variants={scaleHoverVariant} className="w-16 h-16 bg-gray-50 dark:bg-[#111] rounded-2xl flex items-center justify-center mb-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                    {service.icon}
                  </motion.div>
                  <h4 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{service.title}</h4>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* REPAIRED Client Marquee Section (Framer Motion) */}
      <section id="clients" className="py-20 bg-white dark:bg-[#0a0a0a] border-y border-gray-200 dark:border-gray-800/50 overflow-hidden relative flex flex-col">
        
        {/* Side fade gradients for smooth entering/exiting */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center w-full z-20">
          <p className="text-sm font-semibold tracking-widest text-gray-400 dark:text-gray-500 uppercase">Trusted by forward-thinking brands</p>
        </div>

        {/* The Infinite Scrolling Container */}
        <div className="flex w-full overflow-hidden">
          <motion.div 
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              repeat: Infinity, 
              ease: "linear", 
              duration: 25 // Speed of the scroll. Lower is faster.
            }}
          >
            {/* Duplicating array 4 times to ensure it never runs empty on ultra-wide screens */}
            {[...clients, ...clients, ...clients, ...clients].map((client, index) => (
              <div key={index} className="flex items-center justify-center px-8 shrink-0">
                <span className="text-3xl md:text-4xl font-extrabold text-gray-300 dark:text-gray-800 whitespace-nowrap hover:text-gray-900 dark:hover:text-white transition-colors duration-300 cursor-default">
                  {client}
                </span>
                <span className="mx-8 text-gray-200 dark:text-gray-800/60">•</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dynamic GitHub Repositories Section */}
      <section id="work" className="bg-gray-100 dark:bg-[#0a0a0a] py-32 border-t border-gray-200 dark:border-gray-800/50 relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
          >
            <div>
              <motion.h3 variants={fadeUpVariant} className="text-5xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight">Featured Work</motion.h3>
              <motion.p variants={fadeUpVariant} className="text-gray-600 dark:text-gray-400 max-w-2xl text-xl font-light">Live repositories pulled directly from my GitHub. Open source contributions, client solutions, and digital experiments.</motion.p>
            </div>
            <motion.a 
              variants={fadeUpVariant} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              href="https://github.com/anantharamanmac" target="_blank" rel="noreferrer" 
              className="px-8 py-4 rounded-full font-bold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:shadow-lg transition-all flex items-center gap-3 w-fit"
            >
              <Github size={20} /> View All on GitHub
            </motion.a>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
            </div>
          ) : (
            <motion.div 
              variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {repos.slice(0, visibleRepos).map((repo) => (
                <motion.a 
                  href={repo.html_url} key={repo.id} target="_blank" rel="noreferrer" 
                  variants={fadeUpVariant} whileHover="hover" initial="rest" animate="rest"
                  className="block group"
                >
                  <motion.div variants={scaleHoverVariant} className="h-full bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-[2rem] p-10 hover:shadow-2xl dark:hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <ExternalLink size={28} className="text-blue-500" />
                    </div>
                    
                    <div className="flex justify-between items-start mb-6 pr-10">
                      <h4 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-emerald-500 transition-all duration-300">
                        {repo.name.replace(/-/g, ' ')}
                      </h4>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed line-clamp-3">
                      {repo.description || 'A creative engineering project built with clean architecture and modern tech.'}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-gray-100 dark:border-gray-800/80">
                      {repo.language && (
                        <span className="text-sm font-bold px-5 py-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-800">
                          {repo.language}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-500 flex items-center gap-2">
                        <Star size={16} className="text-yellow-500" /> {repo.stargazers_count}
                      </span>
                    </div>
                  </motion.div>
                </motion.a>
              ))}
            </motion.div>
          )}

          {/* Show More Button */}
          {!loading && repos.length > visibleRepos && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mt-20 flex justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => setVisibleRepos(prev => prev + 4)}
                className="px-10 py-5 rounded-full font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-xl hover:shadow-2xl transition-all"
              >
                Load More Projects
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>


      {/* Footer */}
      <footer className="py-16 text-center text-gray-500 dark:text-gray-500 text-base border-t border-gray-200 dark:border-gray-800/50 bg-white dark:bg-[#050505]">
        <p className="mb-2">© {new Date().getFullYear()} Anantharaman J. All rights reserved.</p>
        <p className="text-sm font-light">Engineered with Next.js & Framer Motion.</p>
      </footer>
    </div>
  );
}