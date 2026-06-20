import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight, Star, ShieldCheck, Zap, Sparkles, CheckCircle2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    document.title = "Best Skin Clinic In Isanpur | Maninagar | Ahmedabad";
  }, []);

  const treatments = [
    { title: "Acne Control", desc: "Advanced therapies for clear, scar-free skin.", icon: <Sparkles className="text-brand-pink" /> },
    { title: "Hair Regrowth", desc: "Combat hair fall and stimulate natural growth.", icon: <Zap className="text-brand-gold" /> },
    { title: "Skin Glow", desc: "Ozone and Advance Hydra facials for radiant skin.", icon: <Star className="text-brand-pink" /> },
    { title: "Ozone Therapy", desc: "Fast healing and pain relief via medical ozone.", icon: <Zap className="text-brand-blue" /> },
  ];

  const highlights = [
    { title: "Visible Results", text: "See the change and feel real confidence.", icon: <Zap /> },
    { title: "Ozone Expert", text: "One of Ahmedabad's leading Ozone Therapy practitioners.", icon: <ShieldCheck /> },
    { title: "Modern Techniques", text: "Effective Solutions in Pain Relief", icon: <CheckCircle2 /> },
  ];

  const reviews = [
    { name: "Rahul S.", text: "Significant change in my hair density in just 3 months. Highly recommended!", rating: 5 },
    { name: "Priya M.", text: "The Ozone Therapy helped my chronic skin issues like nothing else could. Fast and safe.", rating: 5 },
    { name: "Ankit P.", text: "Professional clinic with visible results. Dr. Nishanti is truly an expert.", rating: 5 },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 premium-gradient overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--color-brand-gold)_0%,_transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-pink/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-white text-xs font-bold tracking-widest uppercase">Trusted Clinic in Ahmedabad</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1]">
              Advanced <span className="text-brand-gold">Skin, Hair</span> & Ozone Therapy
            </h1>
            
            <p className="text-lg text-white/80 leading-relaxed max-w-lg font-light">
              Experience the perfect blend of modern cosmetic techniques and Ozone Treatment for visible, lasting results.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-brand-gold text-brand-dark rounded-xl font-bold flex items-center gap-2 hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-brand-gold/20"
              >
                Book Appointment <ArrowRight size={20} />
              </Link>
              <Link
                to="/treatments"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                Explore Treatments
              </Link>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">10+</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">Years Exp.</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">7k+</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">Happy Patients</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">30+</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">Treatments</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative hidden md:block"
          >
            <div className="aspect-[4/5] bg-brand-cream/10 rounded-[4rem] overflow-hidden border border-white/10 shadow-3xl">
               <div className="w-full h-full bg-gradient-to-br from-brand-blue/40 to-brand-pink/40 flex items-center justify-center">
                  <div className="text-center p-8">
                     <p className="text-white/60 italic text-sm mb-4">"Restoring confidence through holistic excellence"</p>
                     <div className="w-48 h-px bg-white/20 mx-auto" />
                  </div>
               </div>
               {/* Overlay Image Placeholder */}
               <div className="absolute inset-x-8 bottom-8 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl">
                  <p className="text-white font-bold text-sm">Dr. Nishanti Prajapati</p>
                  <p className="text-white/70 text-xs">BAMS, DCC, DCT (Expert Practitioner)</p>
               </div>
            </div>
            {/* Floating floating elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-gold/10 backdrop-blur-md rounded-2xl flex items-center justify-center animate-float">
               <Zap className="text-brand-gold" size={32} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treatments Highlights */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16 space-y-4">
          <h2 className="text-brand-pink font-bold uppercase tracking-[0.2em] text-sm italic">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-brand-dark">Specialized Treatments</h3>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          {treatments.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-brand-cream border border-brand-cream hover:border-brand-blue/20 transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-3">{item.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-brand-blue font-bold uppercase tracking-[0.2em] text-sm">Why Choose Us</h2>
              <h3 className="text-4xl font-bold leading-tight">Visible and Safe Results For Our Patient.</h3>
              <p className="text-gray-600 leading-relaxed italic border-l-4 border-brand-blue pl-6">
                "Our philosophy is simple: we optimize your natural healing processes using the most advanced science available today."
              </p>
            </div>
            
            <div className="grid gap-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-brand-blue/5">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-brand-blue rounded-3xl p-1 overflow-hidden">
              <div className="w-full h-full bg-brand-dark rounded-[calc(1.5rem-4px)] flex items-center justify-center overflow-hidden">
                 {/* Visual decoration */}
                 <div className="grid grid-cols-8 gap-4 opacity-10">
                    {Array.from({length: 64}).map((_, i) => (
                       <div key={i} className="w-2 h-2 rounded-full bg-white" />
                    ))}
                 </div>
                 <div className="absolute inset-0 flex items-center justify-center flex-col text-white p-12 text-center space-y-4">
                    <div className="p-4 bg-brand-gold rounded-full mb-4">
                       <ShieldCheck size={48} className="text-brand-dark" />
                    </div>
                    <h4 className="text-2xl font-bold tracking-tight uppercase">Ahmedabad's Ozone Pioneer</h4>
                    <p className="text-sm text-white/60">Experience the revolutionary healing power of medical ozone therapy.</p>
                 </div>
              </div>
            </div>
            {/* Absolute badge */}
            <div className="absolute -bottom-10 -left-10 p-8 bg-brand-pink text-white rounded-3xl shadow-2xl flex flex-col items-center">
              <span className="text-4xl font-bold">98%</span>
              <span className="text-xs uppercase font-bold tracking-widest mt-1">Success Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center mb-16 space-y-4">
          <h2 className="text-brand-gold font-bold uppercase tracking-[0.2em] text-sm">Testimonials</h2>
          <h3 className="text-4xl font-bold">Hear From Our Happy Patients</h3>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <motion.div
              key={idx}
              className="p-10 rounded-3xl bg-white border border-brand-cream shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({length: 5}).map((_, i) => (
                  <Star key={i} size={16} fill="#F8C300" className="text-brand-gold" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-8 leading-relaxed">"{item.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center font-bold text-brand-blue">
                  {item.name[0]}
                </div>
                <span className="font-bold">{item.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-brand-blue relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Ready for your transformation?</h2>
            <p className="text-white/70">Connect with Dr. Nishanti today for a personalized consultation.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a href="tel:+919110839962" className="px-10 py-5 bg-white text-brand-blue rounded-2xl font-bold text-center hover:scale-105 transition-transform">Call Now</a>
            <a href="https://wa.me/919110839962" className="px-10 py-5 bg-brand-pink text-white rounded-2xl font-bold text-center hover:scale-105 transition-transform flex items-center justify-center gap-3">
              <MessageCircle size={20} /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
