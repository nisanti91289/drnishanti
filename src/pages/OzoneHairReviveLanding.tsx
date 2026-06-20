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
const HairRevive1 = "/images/regenerated_image_1778182921229.webp";
const HairRevive2 = "/images/regenerated_image_1778182923489.webp";
const HairRevive3 = "/images/regenerated_image_1778182926154.webp";
const HairRevive4 = "/images/regenerated_image_1778182928815.webp";

const images = [HairRevive1, HairRevive2, HairRevive3, HairRevive4];

export default function OzoneHairReviveLanding() {
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
      amount: 599,
      productName: "Ozone Hair Revive",
      orderData: formData,
      onFailure: (err) => {
        setPaymentStatus("failed");
        setPaymentError(err);
      }
    });
  };

  useEffect(() => {
    document.title = "Ozone Hair Revive | Advanced Hair Loss & Thinning Therapy | Dr. Nishanti's Clinic";
    window.scrollTo(0, 0);
    trackPixelEvent("ViewContent", {
      content_name: "Ozone Hair Revive",
      content_ids: ["Ozone Hair Revive"],
      content_type: "product",
      value: 599,
      currency: "INR"
    });
  }, []);

  const benefits = [
    { title: "Deep Hair Rejuvenation", desc: "Awakens dormant hair roots and speeds up cell oxygen supply with bio-available activated ozone." },
    { title: "Combats Heavy Hair Loss", desc: "Regulates heavy fallout triggers, anchoring individual strands firmly into their dermal beds." },
    { title: "Defeats Chronic Dandruff", desc: "Eliminates root yeast spores on the dry scalp, putting an end to irritating dry flakes." },
    { title: "Solves Thinning & Alopecia", desc: "Re-thickens fragile, malnourished hair fibers, encouraging dense, healthy follicle clusters." }
  ];

  const faqs = [
    {
      q: "What makes Ozone Hair Revive effective against hair fall?",
      a: "Ozone Hair Revive utilizes activated medical-grade ozone lipids to deliver concentrated singlet oxygen deep into the hair follicles. This instantly sanitizes the scalp, boosts local blood circulation, and triggers inactive roots back into the active anagen growing phase."
    },
    {
      q: "How should I apply this formulation?",
      a: "Part your hair and apply directly onto a dry or clean scalp. Gently massage using your fingertips for 2-3 minutes to allow complete absorption. Recommended for use 3 to 4 times a week, or as outlined by Dr. Nishanti."
    },
    {
      q: "Can I use this alongside PRP or other clinical hair therapies?",
      a: "Absolutely. Ozone Hair Revive acts as an exceptional home-care companion that maintains scalp hygiene and oxygenation between clinic-based treatments like PRP (Platelet-Rich Plasma) or Mesotherapy."
    },
    {
      q: "How soon can I expect to see new hair growth?",
      a: "Dandruff and itchiness usually resolve in 7-10 days. Hair loss stabilizes substantially within 3 to 4 weeks, and visible thickening or new baby hair sprouts can be noticed around the 2-month mark of disciplined application."
    }
  ];

  const reviews = [
    { name: "Meera Prajapati", rating: 5, date: "Checked 2 days ago", text: "My postpartum hair loss was so scary. Dr. Nishanti suggested Ozone Hair Revive, and I'm amazed. My hair fall has reached absolute normal counts!" },
    { name: "Rohan Patel", rating: 5, date: "Checked 1 week ago", text: "Struggled with severe dry flakes and thinning at the crown. Dandruff cleared up in just three washes, and my scalp feels incredibly healthy now." },
    { name: "Heena Vyas", rating: 5, date: "Checked 2 weeks ago", text: "I bought this for my alopecia patches. I can already see tiny baby hair covers growing back. This is truly high performance science." }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const whatsappLink = `https://wa.me/919110839962?text=Hello%20Dr.%20Nishanti's%20Clinic,%20I%20am%20interested%20in%20buying%20Ozone%20Hair%20Revive%20for%20the%20discounted%20price%20of%20%E2%82%B9599.%20Please%20guide%20me%20with%2520the%20order%20process.`;

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
                id="hair-revive-hero-img"
              >
                <img 
                  src={images[activeImage]} 
                  alt="Ozone Hair Revive Formula" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-blue text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                  Follicle Oxygenation
                </div>
              </motion.div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4" id="hair-revive-thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === idx ? 'border-brand-blue shadow bg-white' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Hair Revive Thum ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Purchase Right */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-blue/15 text-brand-blue rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={12} /> Activated Ozone Hair Care
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark leading-tight" id="hair-revive-title">
                  Ozone Hair Revive
                </h1>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </span>
                  <span className="font-semibold text-brand-dark">4.9 / 5.0</span>
                  <span>(124 Clinical Patient Records)</span>
                </p>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                Rebuild robust volume and anchor your hair strands cleanly. Suggested by Dr. Nishanti, this highly oxygenated hair elixir rejuvenates hair loss zones, defeats stubborn dry dandruff flakes, and treats thinning of hair or patches of alopecia.
              </p>

              {/* Price Details */}
              <div className="p-6 bg-white rounded-3xl border border-brand-cream/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 block mb-1 font-medium">Limited Time Clinical Offer</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-brand-dark">₹599</span>
                    <span className="text-lg text-gray-400 line-through font-medium">₹699</span>
                    <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">Save 14%</span>
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
                  id="hair-revive-buy-btn"
                >
                  <Sparkles size={22} fill="currentColor" />
                  <span>Buy Now (Free Delivery Across India)</span>
                </button>
                
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-500">
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Stop Hair Fall</div>
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Dandruff Shield</div>
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Follicle Reborn</div>
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
            <h2 className="text-3xl md:text-5xl font-display font-bold">The Frustrating Cycle of Hair & Scalp Decline</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">📉</span>
              <h3 className="text-lg font-bold text-white">Continuous Hair Loss & Thinning</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Witnessing alarming pillow residue or heavy comb collections, leaving hair limp, thin, and exposing patches on the scalp.
              </p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">❄️</span>
              <h3 className="text-lg font-bold text-white">Aggressive, Flaky Dandruff</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Overactive micro-fungi thrive on excess sebum oils, causing severe flaking, visible shoulder dust, and continuous scalp itching.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🍂</span>
              <h3 className="text-lg font-bold text-white">Dormant & Malnourished Roots</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Follicles deprived of rich micro-circulation shrink over time, producing weak and brittle hair strands that snap under slight friction.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🧬</span>
              <h3 className="text-lg font-bold text-white">Alopecia & Patchy Baldness</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Localized immune or stress factors target healthy follicle cells, resulting in circular patches of hair fall that heal slowly on their own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest block">The Ultimate Scalp Oxygenator</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark leading-tight">
              Ozone Hair Revive: Advanced Follicle Fuel
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Ozone Hair Revive works by infusing biological active ozone molecules directly around weak hair roots. This high-oxygen exposure immediately sanitizes the scalp micro-environment, driving away stubborn dandruff yeast while supplying rich cellular nutrition to encourage strong keratin growth.
            </p>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-blue shrink-0" size={18} />
                <span>Deeply sanitizes scalp beds, stopping dandruff triggers</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-blue shrink-0" size={18} />
                <span>Nourishes the anagen hair growth phase to stop abrupt hair loss</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-blue shrink-0" size={18} />
                <span>Encourages new dense baby hair sprouts in previous alopecia zones</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-brand-blue/10 rounded-3xl blur-[20px] scale-95" />
            <img 
              src={HairRevive3} 
              alt="Clinical Scalp Hydration Application" 
              className="relative w-full rounded-3xl shadow-lg border border-brand-cream/80 object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-brand-cream/30 border-y border-brand-cream/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest block">Deep-Dive Hair Recovery</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Dermal-Tested Performance</h2>
            <p className="text-gray-500 text-sm">Discover why hair professionals trust Ozone Hair Revive to stimulate clinical growth.</p>
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
                  <CheckCircle2 size={14} /> Certified Outcome
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
              <h3 className="text-xl md:text-3xl font-display font-bold text-brand-dark">Ready to Nourish Your Hair Follicles?</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
                Replenish oxygen starvation deep in your scalp. Order today and get direct online consultation with Dr. Nishanti, free of charge.
              </p>
              
              <div className="pt-2">
                <button 
                  onClick={handleOpenOrderForm}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1 mx-auto cursor-pointer"
                >
                  <Sparkles size={20} fill="currentColor" /> Order Now (₹599) & Get Free Online Doctor Consultation
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
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Loved by Patients</h2>
              <p className="text-gray-600">
                Ozone Hair Revive has assisted hundreds of patients at Dr. Nishanti's Isanpur & Maninagar clinic, halting hair fall and re-triggering healthy scalp cycles.
              </p>
              
              <div className="p-6 bg-brand-cream/20 rounded-3xl border border-brand-cream/50 space-y-2">
                <span className="text-4xl font-bold text-brand-dark">97.2%</span>
                <p className="text-sm font-bold text-brand-dark">Reporting Reduced Fallout in 3 Weeks of Usage</p>
                <p className="text-xs text-gray-400">Based on regular home compliance journals.</p>
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
            <span className="text-brand-blue text-xs font-bold uppercase tracking-widest block font-sans">Doubts Clarified</span>
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
            <h2 className="text-2xl md:text-4xl font-display font-bold">Reclaim Malnourished Hair Density</h2>
            <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
              Give your hair follicles the high oxygen replenishment they deserve. Order your Ozone Hair Revive formulation today with our secure instant checkout portal and get reliable free door delivery across India.
            </p>
            
            <div className="pt-4">
              <button 
                onClick={handleOpenOrderForm}
                className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 mx-auto cursor-pointer"
              >
                <Sparkles size={20} fill="currentColor" /> Order Now (₹599) & Get Free Online Doctor Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <PaymentStatusModal
        status={paymentStatus}
        productName="Ozone Hair Revive"
        amount={599}
        paymentId={paymentId}
        errorMessage={paymentError}
        onClose={() => setPaymentStatus("idle")}
        onRetry={handleOpenOrderForm}
      />

      <OrderFormModal
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        productName="Ozone Hair Revive"
        amount={599}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}
