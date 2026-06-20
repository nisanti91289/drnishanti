import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Phone, MessageCircle, MapPin, Clock, Copy, Check, ExternalLink } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Contact | Best Skin Doctor in Isanpur | Ozone Therapy for Skin | Dr. Nishanti's Clinic";
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText("F-31, Savita Park, Sanjivani Clinic, Infront of, near Govindwadi, Isanpur, Ahmedabad, Gujarat 380028");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-24 bg-brand-cream relative">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold">Get In <span className="text-brand-pink">Touch</span></h1>
          <p className="text-gray-500 max-w-2xl mx-auto">We are here to answer your questions and start your wellness journey. Visit us or reach out via WhatsApp for immediate assistance.</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="space-y-12">
            <div className="space-y-8">
              <h2 className="text-brand-blue font-bold uppercase tracking-[0.2em] text-sm">Contact Information</h2>
              
              <div className="grid gap-8">
                <div className="flex gap-6 items-start">
                   <div className="w-14 h-14 rounded-2xl bg-brand-cream flex items-center justify-center text-brand-blue shrink-0 shadow-sm transition-transform hover:scale-110">
                      <Phone size={24} />
                   </div>
                   <div className="space-y-2">
                      <p className="text-xs uppercase font-bold tracking-widest text-gray-400">Call Us</p>
                      <p className="text-xl font-bold text-brand-dark">+91 91108 39962</p>
                      <a href="tel:+919110839962" className="text-brand-blue text-sm font-semibold flex items-center gap-1 hover:underline">Click to call <ExternalLink size={14} /></a>
                   </div>
                </div>

                <div className="flex gap-6 items-start">
                   <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 shrink-0 shadow-sm transition-transform hover:scale-110">
                      <MessageCircle size={24} />
                   </div>
                   <div className="space-y-2">
                      <p className="text-xs uppercase font-bold tracking-widest text-gray-400">WhatsApp</p>
                      <p className="text-xl font-bold text-brand-dark">+91 91108 39962</p>
                      <a href="https://wa.me/919110839962" className="text-green-600 text-sm font-semibold flex items-center gap-1 hover:underline">Chat on WhatsApp <ExternalLink size={14} /></a>
                   </div>
                </div>

                <div className="flex gap-6 items-start bg-brand-cream/30 p-6 rounded-3xl border border-brand-cream transition-colors hover:bg-brand-cream/50">
                   <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-pink shrink-0 shadow-sm">
                      <MapPin size={24} />
                   </div>
                   <div className="space-y-3 flex-1">
                      <p className="text-xs uppercase font-bold tracking-widest text-gray-400">Clinic Address</p>
                      <p className="text-lg font-medium leading-relaxed">
                        F-31, Savita Park, Sanjivani Clinic, Infront of Govindwadi, Isanpur, Ahmedabad, Gujarat 380028
                      </p>
                      <button 
                        onClick={copyAddress}
                        className="flex items-center gap-2 py-2 px-4 bg-white text-gray-600 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
                      >
                        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                        {copied ? "Copied!" : "Copy Address"}
                      </button>
                   </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-brand-blue text-white rounded-[2rem] space-y-6 shadow-2xl shadow-brand-blue/20">
               <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Clock className="text-brand-gold" /> Operating Hours
               </h3>
               <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                     <span className="font-medium">Mon, Tue, Wed, Fri</span>
                     <span className="font-bold text-brand-gold">12:00 PM - 06:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 opacity-50">
                     <span className="font-medium">Thu, Sat, Sun</span>
                     <span className="font-bold uppercase text-[10px] tracking-widest text-brand-pink">Closed</span>
                  </div>
               </div>
               <p className="text-xs text-white/60 italic">Please book your appointment at least 24 hours in advance for priority care.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
