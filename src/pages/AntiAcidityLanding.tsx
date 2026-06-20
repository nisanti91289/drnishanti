import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  MessageCircle, Star, CheckCircle2, ChevronDown, ShieldCheck, 
  Sparkles, Award, ArrowLeft, Heart, Zap, PlayCircle 
} from "lucide-react";
import { triggerInstamojoCheckout } from "../utils/instamojo";
import PaymentStatusModal, { PaymentStatus } from "../components/PaymentStatusModal";
import OrderFormModal, { OrderFormData } from "../components/OrderFormModal";
import { trackPixelEvent } from "../utils/pixel";

// Image references
const AntiAcidity1 = "/images/regenerated_image_1778181782220.webp";
const AntiAcidity2 = "/images/regenerated_image_1778181783807.webp";
const AntiAcidity3 = "/images/regenerated_image_1778181785434.webp";
const AntiAcidity4 = "/images/regenerated_image_1778181787483.webp";

const images = [AntiAcidity1, AntiAcidity2, AntiAcidity3, AntiAcidity4];

export default function AntiAcidityLanding() {
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
 
  // Razorpay states
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [paymentId, setPaymentId] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const handleOpenOrderForm = () => {
    setIsOrderFormOpen(true);
  };

  const handleOrderSubmit = (formData: OrderFormData) => {
    setIsOrderFormOpen(false);
    setPaymentStatus("processing");
    triggerInstamojoCheckout({
      amount: 449,
      productName: "Anti Acidity Formula",
      orderData: formData,
      onFailure: (err) => {
        setPaymentStatus("failed");
        setPaymentError(err);
      }
    });
  };

  useEffect(() => {
    document.title = "Anti Acidity | Relief from Acid Reflux, Ulcers & Gut Issues | Dr. Nishanti's Clinic";
    window.scrollTo(0, 0);
    trackPixelEvent("ViewContent", {
      content_name: "Anti Acidity Formula",
      content_ids: ["Anti Acidity Formula"],
      content_type: "product",
      value: 449,
      currency: "INR"
    });
  }, []);

  const benefits = [
    { title: "Soothes Severe Acid Reflux", desc: "Instantly targets stomach lining heat, raising mucosal protection and stopping acid backup." },
    { title: "Speeds up Peptic Ulcer Healing", desc: "Creates a gentle alkaline, protective buffer over stomach walls so micro-ulcers can heal naturally." },
    { title: "Improves Active Gut Health", desc: "Regulates gut flora composition and improves digestive breakdown without suppressing gut enzymes." },
    { title: "Reduces Chronic Bloating", desc: "Relieves uncomfortable pressure lines and calms cramping caused by highly acidic diets." }
  ];

  const faqs = [
    {
      q: "How does Anti Acidity differ from standard antiacids?",
      a: "Standard antacids temporarily neutralize acid, which can cause severe rebound hyperacidity. Our clinic-formulated Anti Acidity cream/solution supports deep mucosal repair, working gently to restore biological digestive balance over time."
    },
    {
      q: "When is the best time to consume / use Anti Acidity?",
      a: "For sustained comfort, have it consistently as suggested—usually early mornings on an empty stomach or just before heavy meals. Connect on WhatsApp to get the precise plan for your digestion profile."
    },
    {
      q: "Is it safe for pregnant women or elderly patients?",
      a: "Our formula uses gentle prebiotic and soothing therapeutic minerals. However, we advise pregnant mothers or patients undergoing systemic medical treatments to outline details with Dr. Nishanti before use."
    },
    {
      q: "Does this require long-term continuous intake?",
      a: "Many patients notice active bloating and acid relief in 3-5 days. For chronic peptic ulcers or deep GERD repair, we suggested continuous daily cycles for 4 to 6 weeks."
    }
  ];

  const reviews = [
    { name: "Siddharth Mehta", rating: 5, date: "Checked 4 days ago", text: "Dr. Nishanti's Anti Acidity changed everything for me. My continuous chest burns and burping went completely silent in a week." },
    { name: "Janaki Vyas", rating: 5, date: "Checked 8 days ago", text: "As someone who struggled with chronic peptic ulcers, I had to be very careful. This formula feels gentle on the gut and clears burning pain instantly." },
    { name: "Gautam Shah", rating: 5, date: "Checked 18 days ago", text: "No more morning bloating! I feel much more energetic and my digestion has stabilized. Truly a medical grade solution." }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const whatsappLink = `https://wa.me/919110839962?text=Hello%20Dr.%20Nishanti's%20Clinic,%20I%20am%20interested%20in%20buying%20Anti%20Acidity%20for%20the%20discounted%20price%20of%20%E2%82%B9449.%20Please%20guide%20me%20with%2520the%20order%20process.`;

  return (
    <div className="bg-brand-cream/10 min-h-screen text-brand-dark pt-24 font-sans">
      {/* Hero Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Gallery Left */}
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-md border border-brand-cream/80"
                id="anti-acidity-hero-img"
              >
                <img 
                  src={images[activeImage]} 
                  alt="Anti Acidity Natural Formula" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-blue text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                  Gut Protection
                </div>
              </motion.div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4" id="anti-acidity-thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === idx ? 'border-brand-blue shadow bg-white' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Anti Acidity Thum ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Purchase Right */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-blue/15 text-brand-blue rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={12} /> Digestive & Gut Wellness
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark leading-tight" id="anti-acidity-title">
                  Anti Acidity
                </h1>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </span>
                  <span className="font-semibold text-brand-dark">4.9 / 5.0</span>
                  <span>(108 Happy Patients)</span>
                </p>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                Restore organic digestive peace and comfort. Suggested by Dr. Nishanti to combat chronic GERD reflex, heal irritable stomach ulcers, and balance overall microflora health without harmful medical chemical dependencies.
              </p>

              {/* Price Details */}
              <div className="p-6 bg-white rounded-3xl border border-brand-cream/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 block mb-1 font-medium">Limited Time Clinical Offer</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-brand-dark">₹449</span>
                    <span className="text-lg text-gray-400 line-through font-medium">₹599</span>
                    <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">Save 25%</span>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-end">
                    <CheckCircle2 size={12} /> Secure Online Checkout
                  </span>
                  <span className="text-xs text-gray-400 mt-1 block">Free delivery all over India</span>
                </div>
              </div>

              {/* BUY NOW CTA */}
              <div className="space-y-4">
                <button 
                  onClick={handleOpenOrderForm}
                  className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
                  id="anti-acidity-buy-btn"
                >
                  <Sparkles size={22} fill="currentColor" />
                  <span>Buy Now (Free Delivery Across India)</span>
                </button>
                
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-500">
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Cures Reflux</div>
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Heals Peptic Ulcers</div>
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Gentle Gut Relief</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/30 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-12">
          <div className="space-y-4">
            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest block">Are you facing these issues?</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">The Silent Impact of Digestive Stress</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🔥</span>
              <h3 className="text-lg font-bold text-white">Aggressive Acid Reflux & GERD</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Stomach acid routinely rises up your throat, causing severe chest burn, sour burps, and fitful, disrupted sleep at night.
              </p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">⚡</span>
              <h3 className="text-lg font-bold text-white">Painful Peptic Ulcers</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                An compromised stomach lining leaves active tissues unprotected from continuous digest liquids, forming painful lesions.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🍂</span>
              <h3 className="text-lg font-bold text-white">Slow, Disrupted Gut Health</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Intestinal flora imbalance compromises food breakdown, leading to gas accumulation, continuous fatigue, and bad nutrient extraction.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🎈</span>
              <h3 className="text-lg font-bold text-white">Chronic Bloating & Cramps</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Fermenting food and heavy stomach gas release build distressing abdominal pressure and uncomfortable cramps after meals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest block">Your Path to Internal Calm</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark leading-tight">
              Anti Acidity: Deep Biological Restoration
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our clinical Anti Acidity formulation does not just mask stomach pH temporarily. Instead, it coats the peptic system, nourishing cellular wall defenses and lowering heavy inflammatory parameters. This speeds up natural ulcer closure while supporting digestive flora.
            </p>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-blue shrink-0" size={18} />
                <span>Provides a soothing botanical coat that shields sensitive sores</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-blue shrink-0" size={18} />
                <span>Encourages healthy natural stomach cycles, preventing gas traps</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-blue shrink-0" size={18} />
                <span>Speeds up tissue repair in patients on heavy prescription routines</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-brand-blue/10 rounded-3xl blur-[20px] scale-95" />
            <img 
              src={AntiAcidity3} 
              alt="Clinical Digestive Support" 
              className="relative w-full rounded-3xl shadow-lg border border-brand-cream/80 object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-brand-cream/30 border-y border-brand-cream/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest block">Systemic Care & Science</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Clinical Grade Gut Rejuvenation</h2>
            <p className="text-gray-500 text-sm">Discover why digestion professionals and patients suggest Dr. Nishanti's Anti Acidity.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-brand-cream/60 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center font-bold mb-6">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs text-brand-blue font-bold">
                  <CheckCircle2 size={14} /> Certified Formulation
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Middle CTA Section */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-brand-cream/35 border border-brand-cream rounded-[2.5rem] p-8 md:p-10 space-y-6 shadow-xs relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-brand-blue/20 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles size={12} fill="currentColor" /> Special Promotion
              </span>
              <h3 className="text-xl md:text-3xl font-display font-bold text-brand-dark">Ready to Start Your Gut Wellness Journey?</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
                No more painful stomach bloating. Order today and get direct online consultation with Dr. Nishanti, free of charge.
              </p>
              
              <div className="pt-2">
                <button 
                  onClick={handleOpenOrderForm}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1 mx-auto cursor-pointer"
                >
                  <Sparkles size={20} fill="currentColor" /> Order Now (₹449) & Get Free Online Doctor Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="space-y-6">
              <span className="text-brand-blue text-xs font-bold uppercase tracking-widest block">Patient Journeys</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Validated by Patients</h2>
              <p className="text-gray-600">
                Anti Acidity has helped hundreds of patients at Dr. Nishanti's Sanjivani Clinic, silencing painful GERD reflux and treating stomach micro-ulcers.
              </p>
              
              <div className="p-6 bg-brand-cream/20 rounded-3xl border border-brand-cream/50 space-y-2">
                <span className="text-4xl font-bold text-brand-dark">98.5%</span>
                <p className="text-sm font-bold text-brand-dark">Reporting Substantial Reduction in Reflux Within 10 Days</p>
                <p className="text-xs text-gray-400">Based on active clinical client feedback registers.</p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {reviews.map((r, idx) => (
                <div key={idx} className="bg-brand-cream/10 p-8 rounded-3xl border border-brand-cream/40 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-brand-dark">{r.name}</h4>
                      <span className="text-[11px] text-gray-400 block font-medium">{r.date}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(r.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed italic">
                    "{r.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-brand-cream/20 border-t border-brand-cream/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest block">Doubts Clarified</span>
            <h2 className="text-3xl font-display font-bold text-brand-dark">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-brand-cream/80 rounded-2xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left font-bold text-brand-dark flex justify-between items-center hover:bg-brand-blue/5 transition-colors duration-200"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-brand-blue transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {openFaq === idx && (
                  <div className="p-6 pt-0 border-t border-brand-cream/40 text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bottom Banner */}
      <section className="py-16 text-center max-w-4xl mx-auto px-6 mb-12">
        <div className="bg-brand-dark text-white rounded-[3rem] p-8 md:p-12 space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-brand-blue/30 rounded-full blur-[70px] -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-2xl md:text-4xl font-display font-bold">Treat Your Gut to Clinical Peace</h2>
            <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
              Say goodbye to painful burning and bloating. Order your Anti Acidity formulation today with our secure instant checkout portal and get reliable free door delivery across India.
            </p>
            
            <div className="pt-4">
              <button 
                onClick={handleOpenOrderForm}
                className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 mx-auto cursor-pointer"
              >
                <Sparkles size={20} fill="currentColor" /> Order Now (₹449) & Get Free Online Doctor Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <PaymentStatusModal
        status={paymentStatus}
        productName="Anti Acidity Formula"
        amount={449}
        paymentId={paymentId}
        errorMessage={paymentError}
        onClose={() => setPaymentStatus("idle")}
        onRetry={handleOpenOrderForm}
      />

      <OrderFormModal
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        productName="Anti Acidity Formula"
        amount={449}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}
