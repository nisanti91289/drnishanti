import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { 
  MessageCircle, Star, CheckCircle2, ChevronDown, ShieldCheck, 
  Sparkles, Award, ArrowLeft, Heart, Zap, Play, PlayCircle 
} from "lucide-react";
import { triggerInstamojoCheckout } from "../utils/instamojo";
import PaymentStatusModal, { PaymentStatus } from "../components/PaymentStatusModal";
import OrderFormModal, { OrderFormData } from "../components/OrderFormModal";
import { trackPixelEvent } from "../utils/pixel";

// Image references
const SkinBlossom1 = "/images/regenerated_image_1778182243725.webp";
const SkinBlossom2 = "/images/regenerated_image_1778182396887.webp";
const SkinBlossom3 = "/images/regenerated_image_1778182398841.webp";
const SkinBlossom4 = "/images/regenerated_image_1778182401054.webp";

const images = [SkinBlossom1, SkinBlossom2, SkinBlossom3, SkinBlossom4];

export default function SkinBlossomLanding() {
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
      amount: 649,
      productName: "Skin Blossom Cream",
      orderData: formData,
      onFailure: (err) => {
        setPaymentStatus("failed");
        setPaymentError(err);
      }
    });
  };

  useEffect(() => {
    document.title = "Skin Blossom | Clinical Skin Rejuvenation | Dr. Nishanti's Clinic";
    window.scrollTo(0, 0);
    trackPixelEvent("ViewContent", {
      content_name: "Skin Blossom Cream",
      content_ids: ["Skin Blossom Cream"],
      content_type: "product",
      value: 649,
      currency: "INR"
    });
  }, []);

  const benefits = [
    { title: "Complete Skin Rejuvenation", desc: "Awakens tired, dull-looking skin, promoting cells turnover and a natural clinical glow." },
    { title: "Target Pimples & Excess Sebum", desc: "Regulates pore clogging and clears blemishes while managing stubborn stress acne flare-ups." },
    { title: "High-Performance Sun Protection", desc: "Blocks UV rays with a breathable shield, preventing premature cellular aging." },
    { title: "Dark Spots & Pigmentation Control", desc: "Fades stubborn blemishes and targets patchy skin tone for an even, balanced complexion." }
  ];

  const faqs = [
    {
      q: "What skin types is Skin Blossom suitable for?",
      a: "Skin Blossom is clinically tested and formulated for all skin types, including sensitive, combination, and acne-prone skin. It contains soothing active ingredients that minimize irritation."
    },
    {
      q: "How often should I apply Skin Blossom?",
      a: "For best results, apply a small, even layer twice daily—once during your morning routine and once before bedtime after cleansing."
    },
    {
      q: "Is this safe to use with other medical skin treatments?",
      a: "Yes, it is formulated to be compatible with standard routines. However, if you are undergoing active in-clinic treatments (like Ozone Therapy or Chemical Peels), we recommend consulting Dr. Nishanti first."
    },
    {
      q: "How soon can I expect to notice visible differences?",
      a: "While hydration starts immediately, improvements in pimples and pigmentation are usually visible within 3-4 weeks of consistent twice-daily usage."
    }
  ];

  const reviews = [
    { name: "Pooja Shah", rating: 5, date: "Checked 1 week ago", text: "Skin Blossom completely transformed my patchy cheek pigmentation in less than a month! My skin feels incredibly hydrated and soft." },
    { name: "Amit Patel", rating: 5, date: "Checked 2 weeks ago", text: "As someone with oily skin, it is hard to find a product that manages pimples without causing intense dryness. This does exactly that. Highly recommended!" },
    { name: "Sneha Sharma", rating: 5, date: "Checked 3 weeks ago", text: "Dr. Nishanti suggested this after my clinic visit, and I am amazed. The sun protection has saved my skin during hot Ahmedabad afternoons." }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const whatsappLink = `https://wa.me/919110839962?text=Hello%20Dr.%20Nishanti's%20Clinic,%20I%20am%20interested%20in%20buying%20Skin%20Blossom%20for%20the%20discounted%20price%20of%20%E2%82%B9649.%20Please%20guide%20me%2520with%2520the%20order%20process.`;

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
                id="skin-blossom-hero-img"
              >
                <img 
                  src={images[activeImage]} 
                  alt="Skin Blossom Natural Formula" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-pink text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                  Best Seller
                </div>
              </motion.div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4" id="skin-blossom-thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === idx ? 'border-brand-pink shadow bg-white' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Skin Blossom Thum ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Purchase Right */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-pink/15 text-brand-pink rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={12} /> Clinical Skincare Formulation
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark leading-tight" id="skin-blossom-title">
                  Skin Blossom Cream
                </h1>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </span>
                  <span className="font-semibold text-brand-dark">4.9 / 5.0</span>
                  <span>(138 Clinical Reviews)</span>
                </p>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                Unlock radiant, spot-free, and healthy-looking skin with our high-performance dermatological blend. Specially suggested by Dr. Nishanti to combat excess sebum, heal painful breakouts, and correct modern skin conditions.
              </p>

              {/* Price Details */}
              <div className="p-6 bg-white rounded-3xl border border-brand-cream/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 block mb-1 font-medium">Limited Time Clinical Offer</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-brand-dark">₹649</span>
                    <span className="text-lg text-gray-400 line-through font-medium">₹799</span>
                    <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">Save 18%</span>
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
                  id="skin-blossom-buy-btn"
                >
                  <Sparkles size={22} fill="currentColor" />
                  <span>Buy Now (Free Delivery Across India)</span>
                </button>
                
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-500">
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">100% Doctor Approved</div>
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Safe for All Skin Types</div>
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Instant Order Status</div>
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
            <span className="text-brand-pink text-xs font-bold uppercase tracking-widest block">Are you facing these issues?</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Unveiling the Hidden Causes of Skin Stress</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">⚡</span>
              <h3 className="text-lg font-bold text-white">Breakouts & Recurring Acne</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Tired of stubborn pimples that heal slowly and leave long-lasting marks, especially during periods of stress or dietary changes?
              </p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">☀️</span>
              <h3 className="text-lg font-bold text-white">UV & Environmental Degradation</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Direct solar radiation creates active oxygen species in the dermis, speeding up collagen degradation and dark spot visibility.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🍂</span>
              <h3 className="text-lg font-bold text-white">Loss of Natural Radiance</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Dead skin cell buildup and slow-turning cellular health leave your skin feeling dry, uneven, patchy, and lacking vital shine.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🧬</span>
              <h3 className="text-lg font-bold text-white">Uneven Skin Pigmentation</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Overactive melanocytes stimulated by hormones or solar exposure generate patchy skin, leading to long-standing hyperpigmentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-pink text-xs font-bold uppercase tracking-widest block">The Ultimate Remedy</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark leading-tight">
              Skin Blossom: Modern Clinical Restoration
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Formulated as an elegant daily lotion, Skin Blossom blends high-efficacy derm ingredients with skin-barrier-strengthening botanical lipids. Rather than temporarily masking acne or dry textures, it repairs deep dermal layers, neutralizing inflammation while providing real-life physical defenses.
            </p>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-pink shrink-0" size={18} />
                <span>Provides immediate cooling texture that calms active pimple zones</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-pink shrink-0" size={18} />
                <span>Integrates light, non-pore-clogging sunscreens for dual daily shielding</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-pink shrink-0" size={18} />
                <span>Boosts dermal turnover to safely lift off layers of stubborn pigmentation</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-brand-pink/10 rounded-3xl blur-[20px] scale-95" />
            <img 
              src={SkinBlossom3} 
              alt="Clinical Application" 
              className="relative w-full rounded-3xl shadow-lg border border-brand-cream/80 object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-brand-cream/30 border-y border-brand-cream/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-brand-pink text-xs font-bold uppercase tracking-widest block">Deep-Dive Performance</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Clinical Grade Benefits</h2>
            <p className="text-gray-500 text-sm">Discover why skin professionals and patients trust Skin Blossom daily.</p>
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
              <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-brand-pink/20 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles size={12} fill="currentColor" /> Special Promotion
              </span>
              <h3 className="text-xl md:text-3xl font-display font-bold text-brand-dark">Ready to Start Your Clinical Journey?</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
                Take the guesswork out of skincare. Order today and get direct online consultation with Dr. Nishanti, free of charge.
              </p>
              
              <div className="pt-2">
                <button 
                  onClick={handleOpenOrderForm}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1 mx-auto cursor-pointer"
                >
                  <Sparkles size={20} fill="currentColor" /> Order Now (₹649) & Get Free Online Doctor Consultation
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
              <span className="text-brand-pink text-xs font-bold uppercase tracking-widest block">Real Patient Feedback</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Loved by Patients</h2>
              <p className="text-gray-600">
                Skin Blossom has assisted hundreds of patients at Dr. Nishanti's Isanpur & Maninagar clinic, keeping acne dormant and fading UV pigmentation.
              </p>
              
              <div className="p-6 bg-brand-cream/20 rounded-3xl border border-brand-cream/50 space-y-2">
                <span className="text-4xl font-bold text-brand-dark">98.2%</span>
                <p className="text-sm font-bold text-brand-dark">Reporting Visible Complexion Tone Equalization</p>
                <p className="text-xs text-gray-400">Based on consistent twice-daily client usage over 30 days.</p>
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
            <span className="text-brand-pink text-xs font-bold uppercase tracking-widest block">Doubts Clarified</span>
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
            <h2 className="text-2xl md:text-4xl font-display font-bold">Secure Your Radiant Complexion Today</h2>
            <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
              Give your skin the professional care it deserves. Order your Skin Blossom Cream today with our secure instant checkout portal and get reliable free door delivery across India.
            </p>
            
            <div className="pt-4">
              <button 
                onClick={handleOpenOrderForm}
                className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 mx-auto cursor-pointer"
              >
                <Sparkles size={20} fill="currentColor" /> Order Now (₹649) & Get Free Online Doctor Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <PaymentStatusModal
        status={paymentStatus}
        productName="Skin Blossom Cream"
        amount={649}
        paymentId={paymentId}
        errorMessage={paymentError}
        onClose={() => setPaymentStatus("idle")}
        onRetry={handleOpenOrderForm}
      />

      <OrderFormModal
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        productName="Skin Blossom Cream"
        amount={649}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}
