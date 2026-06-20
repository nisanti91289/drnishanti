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
const RapidHeal1 = "/images/regenerated_image_1778183207659.webp";
const RapidHeal2 = "/images/regenerated_image_1778183209590.webp";
const RapidHeal3 = "/images/regenerated_image_1778245098856.png";
const RapidHeal4 = "/images/regenerated_image_1778245112770.png";

const images = [RapidHeal1, RapidHeal2, RapidHeal3, RapidHeal4];

export default function OzoneRapidHealLanding() {
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
      amount: 699,
      productName: "Ozone Rapid Heal",
      orderData: formData,
      onFailure: (err) => {
        setPaymentStatus("failed");
        setPaymentError(err);
      }
    });
  };

  useEffect(() => {
    document.title = "Ozone Rapid Heal | Skin Infection & Cold Sore Fighter | Dr. Nishanti's Clinic";
    window.scrollTo(0, 0);
    trackPixelEvent("ViewContent", {
      content_name: "Ozone Rapid Heal",
      content_ids: ["Ozone Rapid Heal"],
      content_type: "product",
      value: 699,
      currency: "INR"
    });
  }, []);

  const benefits = [
    { title: "Fights Viral & Bacterial Infections", desc: "Formulated with therapeutic ozone to speed up cell healing and prevent spread of microbes." },
    { title: "Treats Skin Infections & Rashes", desc: "Instantly targets localized inflammation, severe eczema flares, and allergic dermatitis." },
    { title: "Cold Sores & Blister Relief", desc: "Minimizes stinging sensations and accelerates tissue repair around sensitive skin zones." },
    { title: "Tackles Jock Itch & Toe Fungus", desc: "Eliminates root fungal spores, healing toes and skin creases quickly and cleanly." }
  ];

  const faqs = [
    {
      q: "Can Ozone Rapid Heal be applied to open skin scrapes?",
      a: "Yes, our therapeutic ozone formula is safe for superficial scrapes, small cuts, and blisters. It forms a clean, clinical barrier that defends against bacteria while encouraging rapid healing."
    },
    {
      q: "Is it effective for stubborn athlete's foot or toe fungus?",
      a: "Absolutely. Ozone is highly effective at neutralizing persistent fungal spores on the toes and nail beds. Apply daily after a thorough wash and dry."
    },
    {
      q: "Does it help soothe painful cold sores?",
      a: "Yes, it is designed to soothe the tingling, burning sensations or itching related to cold sores. Apply immediately at the first sign of flare up."
    },
    {
      q: "How many times a day of application is recommended?",
      a: "For acute skin infections or cold sores, apply gently on the clean target spot 2 to 3 times a day until the skin heals completely."
    }
  ];

  const reviews = [
    { name: "Rahul Verma", rating: 5, date: "Checked 3 days ago", text: "My stubborn toe fungus that didn't respond to months of standard creams cleared up in just three weeks of Ozone Rapid Heal!" },
    { name: "Deepanjali Sen", rating: 5, date: "Checked 5 days ago", text: "I kept getting cold sores before big events due to stress. Applying this immediately cools down the tingle and stops blisters in their track." },
    { name: "Meera Nair", rating: 5, date: "Checked 12 days ago", text: "Used this for a skin rash behind my knees. The itching stopped within 10 minutes and the patch faded away in days." }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const whatsappLink = `https://wa.me/919110839962?text=Hello%20Dr.%20Nishanti's%20Clinic,%20I%20am%20interested%20in%20buying%20Ozone%20Rapid%20Heal%20for%20the%20discounted%20price%20of%20%E2%82%B9699.%20Please%20guide%20me%20with%20the%20order%20process.`;

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
                id="rapid-heal-hero-img"
              >
                <img 
                  src={images[activeImage]} 
                  alt="Ozone Rapid Heal Formula" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-pink text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                  Rapid Healing
                </div>
              </motion.div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4" id="rapid-heal-thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === idx ? 'border-brand-pink shadow bg-white' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Rapid Heal Thum ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Purchase Right */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-pink/15 text-brand-pink rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={12} /> Activated Ozone Therapy
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark leading-tight" id="rapid-heal-title">
                  Ozone Rapid Heal
                </h1>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </span>
                  <span className="font-semibold text-brand-dark">4.9 / 5.0</span>
                  <span>(92 Patient Inquiries)</span>
                </p>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                Accelerate skin cell regeneration and fight off irritating infections. Our specialty Ozone Rapid Heal cream is formulated using medical-grade ozone lipids to clear cold sores, dermal fungus, rashes, and jock itch with unmatched speed.
              </p>

              {/* Price Details */}
              <div className="p-6 bg-white rounded-3xl border border-brand-cream/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 block mb-1 font-medium">Special Offer</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-brand-dark">₹699</span>
                    <span className="text-lg text-gray-400 line-through font-medium">₹799</span>
                    <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">Save 13%</span>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-end">
                    <CheckCircle2 size={12} /> Secure Online Checkout
                  </span>
                  <span className="text-xs text-gray-400 mt-1 block">Safe packaging & fast shipping</span>
                </div>
              </div>

              {/* BUY NOW CTA */}
              <div className="space-y-4">
                <button 
                  onClick={handleOpenOrderForm}
                  className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
                  id="rapid-heal-buy-btn"
                >
                  <Sparkles size={22} fill="currentColor" />
                  <span>Buy Now (Free Delivery Across India)</span>
                </button>
                
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-500">
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Rapid Skin Repair</div>
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Infection Antidote</div>
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Anti-Fungal Power</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-pink/30 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-12">
          <div className="space-y-4">
            <span className="text-brand-pink text-xs font-bold uppercase tracking-widest block">Struggling with Skin Distress?</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Uncomfortable Dermal Problems</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🦠</span>
              <h3 className="text-lg font-bold text-white">Infections & Stubborn Rashes</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Bacteria and micro-pathogens invade weak protective layers, leaving patchy rashes, itching, and dry inflamed areas that heal slowly.
              </p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🔥</span>
              <h3 className="text-lg font-bold text-white">Aggressive Cold Sores</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Painful, burning mouth blisters pop up during stress periods, causing discomfort and taking weeks to clear up naturally.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🥵</span>
              <h3 className="text-lg font-bold text-white">Jock Itch & Friction Burn</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Severe skin folds catch sweat and friction, nurturing angry rashes, continuous itching, and skin damage that affects active routines.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🍄</span>
              <h3 className="text-lg font-bold text-white">Toe & Nail Fungal Spread</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Warm, damp socks trap microscopic fungus on toe webbing and under nails, leading to thick, discolored layers that crack and hurt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-pink text-xs font-bold uppercase tracking-widest block">Ozone Science Breakthrough</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark leading-tight">
              Ozone Rapid Heal: Oxygenated Skin Recovery
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Ozone Rapid Heal delivers stabilized medical ozone directly to affected tissues. Highly oxygenated molecules immediately sanitize target skin folds and blister tissues, suppressing active fungal growth while prompting quick healthy cell division underneath.
            </p>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-pink shrink-0" size={18} />
                <span>Sanitizes localized fungal cultures on the feet or skin crevices</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-pink shrink-0" size={18} />
                <span>Quickly relieves fiery and painful skin surface burns</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-pink shrink-0" size={18} />
                <span>Forms organic micro-seal that guards wounds during daily work</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-brand-pink/10 rounded-3xl blur-[20px] scale-95" />
            <img 
              src={RapidHeal2} 
              alt="Ozone treatment in action" 
              className="relative w-full rounded-3xl shadow-lg border border-brand-cream/80 object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-brand-cream/30 border-y border-brand-cream/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-brand-pink text-xs font-bold uppercase tracking-widest block">Fast-Acting Results</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Clinical Grade Power</h2>
            <p className="text-gray-500 text-sm">Discover why skin professionals use Ozone Rapid Heal daily to combat stubborn pathogens.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-brand-cream/60 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-brand-pink/10 text-brand-pink rounded-2xl flex items-center justify-center font-bold mb-6">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs text-brand-pink font-bold">
                  <CheckCircle2 size={14} /> Certified Healing
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
              <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-brand-pink/20 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles size={12} fill="currentColor" /> Special Promotion
              </span>
              <h3 className="text-xl md:text-3xl font-display font-bold text-brand-dark">Ready to Accelerate Your Skin Healing?</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
                Purify tissue and trigger natural cellular repair. Order today and get direct online consultation with Dr. Nishanti, free of charge.
              </p>
              
              <div className="pt-2">
                <button 
                  onClick={handleOpenOrderForm}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1 mx-auto cursor-pointer"
                >
                  <Sparkles size={20} fill="currentColor" /> Order Now (₹699) & Get Free Online Doctor Consultation
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
              <span className="text-brand-pink text-xs font-bold uppercase tracking-widest block font-sans">True Recovery Stories</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Validated Comfort</h2>
              <p className="text-gray-600">
                Ozone Rapid Heal has assisted patients across our clinic in recovering from skin infections, athlete's foot and pesky rashes safely.
              </p>
              
              <div className="p-6 bg-brand-cream/20 rounded-3xl border border-brand-cream/50 space-y-2">
                <span className="text-4xl font-bold text-brand-dark">97.8%</span>
                <p className="text-sm font-bold text-brand-dark">Reporting Rapid Relief in Initial Application Weeks</p>
                <p className="text-xs text-gray-400">Based on structured reviews of local active infections.</p>
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
            <span className="text-brand-pink text-xs font-bold uppercase tracking-widest block">Clear Your Doubts</span>
            <h2 className="text-3xl font-display font-bold text-brand-dark">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-brand-cream/80 rounded-2xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left font-bold text-brand-dark flex justify-between items-center hover:bg-brand-pink/5 transition-colors duration-200"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-brand-pink transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} 
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
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-brand-pink/30 rounded-full blur-[70px] -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-2xl md:text-4xl font-display font-bold">Heal Stubborn Infections Safely</h2>
            <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
              Cleanse pathogen concerns and protect your body skin tissue today. Order your Ozone Rapid Heal today with our secure instant checkout portal and get reliable free door delivery across India.
            </p>
            
            <div className="pt-4">
              <button 
                onClick={handleOpenOrderForm}
                className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 mx-auto cursor-pointer"
              >
                <Sparkles size={20} fill="currentColor" /> Order Now (₹699) & Get Free Online Doctor Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <PaymentStatusModal
        status={paymentStatus}
        productName="Ozone Rapid Heal"
        amount={699}
        paymentId={paymentId}
        errorMessage={paymentError}
        onClose={() => setPaymentStatus("idle")}
        onRetry={handleOpenOrderForm}
      />

      <OrderFormModal
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        productName="Ozone Rapid Heal"
        amount={699}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}
