import { useEffect } from "react";
import { motion } from "motion/react";
import { ShieldCheck, GraduationCap, Award, HeartHandshake } from "lucide-react";

export default function About() {
  useEffect(() => {
    document.title = "Best Skin Doctor in Isanpur | Ozone Therapy";
  }, []);

  const certifications = [
    { title: "BAMS", desc: "Bachelor of Ayurvedic Medicine and Surgery", icon: <GraduationCap /> },
    { title: "DCC", desc: "Diploma in Cosmetology", icon: <Award /> },
    { title: "DCT", desc: "Diploma in Clinical Trichology", icon: <ShieldCheck /> },
  ];

  return (
    <div className="pt-20">
      {/* Hero Header */}
      <section className="py-20 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
          <h1 className="text-5xl lg:text-7xl font-bold text-brand-dark">Building Trust Through <span className="text-brand-blue">Expertise</span></h1>
          <p className="max-w-2xl mx-auto text-gray-500 lg:text-lg">Meet Dr. Nishanti Prajapati, a visionary practitioner combining Ozone roots with cutting-edge cosmetic science.</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-brand-blue/5 rounded-[4rem] overflow-hidden border border-brand-blue/10 flex items-center justify-center relative">
               <div className="flex flex-col items-center text-center p-10 space-y-4">
                  <div className="w-32 h-32 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark font-black text-4xl mb-6">
                    NP
                  </div>
                  <h2 className="text-3xl font-bold">Dr. Nishanti Prajapati</h2>
                  <p className="text-brand-pink font-semibold uppercase tracking-widest text-xs">Expert Cosmetic Practitioner</p>
                  <p className="text-gray-500 leading-relaxed italic">"My mission is to provide safe, chemical-minimal, and result-oriented treatments for every patient."</p>
               </div>
            </div>
            <div className="absolute -bottom-10 -right-10 p-10 bg-brand-dark text-white rounded-3xl shadow-2xl flex flex-col items-center">
               <span className="text-4xl font-bold text-brand-gold">10+</span>
               <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/50 mt-1">Years Experince</span>
            </div>
          </div>
          
          <div className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-brand-pink font-bold uppercase tracking-[0.2em] text-sm">A Visionary Approach</h2>
              <h3 className="text-4xl font-bold">The Science of Holistic Healing</h3>
              <p className="text-gray-600 leading-relaxed">
                With a background in Ayurvedic Medicine (BAMS) and specialized diplomas in Cosmetology (DCC) and Trichology (DCT), Dr. Nishanti brings a unique 360-degree perspective to hair and skin health.
              </p>
              <p className="text-gray-600 leading-relaxed">
                She specializes in integrating Ozone Therapy—a revolutionary medical advancement—with traditional healing methods. This ensures that while we address the symptoms on the surface, we also optimize the deep biological factors contributing to the condition.
              </p>
            </div>

            <div className="space-y-6">
               <h4 className="text-xl font-bold flex items-center gap-3">
                  <HeartHandshake className="text-brand-blue" /> Clinic Philosophy
               </h4>
               <ul className="grid gap-4">
                  <li className="flex gap-4 p-4 bg-brand-cream/50 rounded-2xl border border-brand-blue/5">
                     <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-xs shrink-0">1</div>
                     <p className="text-sm font-medium">Fast, visible results using safe and modern techniques.</p>
                  </li>
                  <li className="flex gap-4 p-4 bg-brand-cream/50 rounded-2xl border border-brand-blue/5">
                     <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-xs shrink-0">2</div>
                     <p className="text-sm font-medium">Minimal downtime with non-invasive clinical procedures.</p>
                  </li>
                  <li className="flex gap-4 p-4 bg-brand-cream/50 rounded-2xl border border-brand-blue/5">
                     <div className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center font-bold text-xs shrink-0">3</div>
                     <p className="text-sm font-medium">Personalized care plans for chronic conditions like Psoriasis and Hair Fall.</p>
                  </li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-brand-gold font-bold uppercase tracking-[0.2em] text-sm">Credentials</h2>
              <h3 className="text-3xl font-bold">Specializations & Certifications</h3>
           </div>
           
           <div className="grid md:grid-cols-3 gap-10">
              {certifications.map((item, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center space-y-4 hover:bg-brand-blue/10 transition-colors group">
                  <div className="w-16 h-16 rounded-2xl bg-brand-blue/20 flex items-center justify-center mx-auto text-brand-gold group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-brand-gold">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
