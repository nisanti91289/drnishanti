import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Zap, Sparkles, Droplets, Smile, CheckCircle, ArrowRight } from "lucide-react";

export default function Treatments() {
  useEffect(() => {
    document.title = "Expert Skin Specialist in Isanpur |  Maninagar | Ahmedabad";
  }, []);

  const skinTreatments = [
    { name: "Acne & Scar Therapy", desc: "Targeted treatments for active acne and deepening scars." },
    { name: "Skin Brightening", desc: "Advanced Hydra and Ozone facials for instant radiance." },
    { name: "Anti-Aging", desc: "Non-surgical lifting and firming for a youthful appearance." },
    { name: "Psoriasis Management", desc: "Niche expertise in managing chronic skin flare-ups." },
    { name: "Pigmentation Treatment", desc: "Removing dark patches and evening out skin tone." },
  ];

  const hairTreatments = [
    { name: "Hair Fall Control", desc: "Deep scalp nourishment and clinical activation." },
    { name: "Dandruff Treatment", desc: "Permanent scalp cleansing and rebalancing." },
    { name: "Hair Regrowth (PRP/Ozone)", desc: "Stimulating dormant follicles for new growth." },
    { name: "Scalp Psoriasis", desc: "Relieving itchiness and restoring hair health." },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 bg-brand-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-gold/10 rounded-full blur-[120px] -mr-40 -mt-40" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">Expert <span className="text-brand-gold">Treatments</span></h1>
          <p className="text-white/70 max-w-2xl text-lg lg:text-xl font-light leading-relaxed">
            From clinical hair restoration to advanced ozone therapy & cosmetic treatment, we offer a curated range of services designed for precision and performance.
          </p>
        </div>
      </section>

      {/* Skin Care */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-brand-pink font-bold uppercase tracking-[0.2em] text-sm">Dermatological Care</h2>
              <h3 className="text-4xl font-bold flex items-center gap-4">
                <Sparkles className="text-brand-pink" size={32} /> Skin Treatments
              </h3>
              <p className="text-gray-500 leading-relaxed">Advanced solutions for all skin types, focusing on texture, tone and long-term health.</p>
            </div>
            
            <div className="grid gap-6">
              {skinTreatments.map((t, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ x: 10 }}
                  className="group flex justify-between items-center p-6 bg-brand-cream/50 rounded-2xl border border-transparent hover:border-brand-pink/20 hover:bg-white transition-all cursor-default"
                >
                  <div className="space-y-1">
                    <h4 className="font-bold text-lg group-hover:text-brand-pink transition-colors">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.desc}</p>
                  </div>
                  <CheckCircle className="text-brand-pink/20 group-hover:text-brand-pink" size={24} />
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            <div className="w-full aspect-square bg-brand-cream rounded-3xl overflow-hidden shadow-2xl relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 via-transparent to-brand-blue/20" />
               <div className="w-full h-full flex items-center justify-center p-12">
                  <div className="text-center space-y-6">
                     <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg animate-float">
                        <Smile size={48} className="text-brand-pink" />
                     </div>
                     <h4 className="text-2xl font-bold">Unveil Your Best Skin</h4>
                     <p className="text-gray-500 italic max-w-xs mx-auto">Clinical precision meeting Ozone grace for a glow that lasts.</p>
                  </div>
               </div>
            </div>
            {/* Decors */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/20 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Ozone Therapy Highlight */}
      <section className="py-24 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6">
          <div className="p-12 md:p-20 bg-brand-dark rounded-[3rem] text-white relative overflow-hidden">
            {/* BG Gradient */}
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_var(--color-brand-blue)_0%,_transparent_50%)] opacity-30 pointer-events-none" />
            
            <div className="grid md:grid-cols-2 gap-12 relative z-10 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-brand-gold font-bold uppercase tracking-[0.2em] text-sm italic">Innovation Showcase</h2>
                  <h3 className="text-4xl md:text-5xl font-bold">Ozone Therapy: The Future of Healing</h3>
                </div>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Ozone therapy is a unique form of medical treatment that uses ozone gas to stimulate healing. It increases oxygen levels in the blood, boosts immunity, and accelerates tissue repair.
                </p>
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <h4 className="text-brand-gold font-bold flex items-center gap-2"><Zap size={16} /> Fast Recovery</h4>
                      <p className="text-xs text-gray-500">Accelerates healing for skin and tissue damage.</p>
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-brand-gold font-bold flex items-center gap-2"><Droplets size={16} /> Pain Relief</h4>
                      <p className="text-xs text-gray-500">Effective for joint, nerve and muscle pains.</p>
                   </div>
                </div>
                 <Link to="/contact" className="px-10 py-4 bg-brand-gold text-brand-dark rounded-xl font-bold inline-flex items-center gap-2 hover:bg-white transition-all shadow-xl shadow-brand-gold/10">
                    Learn More About Ozone <ArrowRight size={18} />
                 </Link>
              </div>
              
              <div className="relative hidden md:block">
                 <div className="w-full aspect-video bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl p-10 flex flex-col justify-center space-y-6">
                    <div className="flex gap-4">
                       <div className="w-2 h-2 rounded-full bg-brand-gold" />
                       <div className="w-2 h-2 rounded-full bg-brand-gold opacity-50" />
                       <div className="w-2 h-2 rounded-full bg-brand-gold opacity-20" />
                    </div>
                    <h4 className="text-xl font-bold text-brand-gold italic tracking-tight">"One of Ahmedabad's only clinics providing medical-grade Ozone Therapy for skin, hair, and chronic pain management."</h4>
                    <div className="space-y-3">
                       <div className="h-2 w-3/4 bg-white/10 rounded-full" />
                       <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hair Care */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="aspect-[4/3] bg-brand-cream rounded-3xl p-8 relative overflow-hidden group">
               <div className="absolute inset-x-8 inset-y-12 border-2 border-dashed border-brand-blue/20 rounded-2xl group-hover:border-brand-blue/40 transition-colors" />
               <div className="relative h-full flex flex-col items-center justify-center text-center space-y-4">
                  <Droplets size={48} className="text-brand-blue animate-float" />
                  <h4 className="text-2xl font-bold">Ozonated Oil</h4>
                  <p className="text-gray-500 text-sm italic mb-[19px]">Reduce dandruff & Increase Hair Growth</p>
               </div>
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-12">
            <div className="space-y-4">
              <h2 className="text-brand-blue font-bold uppercase tracking-[0.2em] text-sm">Trichological Care</h2>
              <h3 className="text-4xl font-bold flex items-center gap-4">
                <Droplets className="text-brand-blue" size={32} /> Hair Treatments
              </h3>
              <p className="text-gray-500 leading-relaxed">Dedicated focus on scalp health and hair follicle reactivation using advanced medical ozone and DHT management.</p>
            </div>
            
            <div className="grid gap-6">
              {hairTreatments.map((t, i) => (
                <div key={i} className="flex items-start gap-4 p-4 hover:bg-brand-cream rounded-2xl transition-all">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
