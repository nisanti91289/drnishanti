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

// Image references mapped to existing WebP files for reliability
const AntiAgeing1 = "/images/regenerated_image_1778182655790.webp";
const AntiAgeing2 = "/images/regenerated_image_1778182657668.webp";
const AntiAgeing3 = "/images/regenerated_image_1778182659916.webp";
const AntiAgeing4 = "/images/regenerated_image_1778182662171.webp";

const images = [AntiAgeing1, AntiAgeing2, AntiAgeing3, AntiAgeing4];

export default function AntiAgeingLanding() {
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
      amount: 949,
      productName: "Anti Ageing Cream",
      orderData: formData,
      onFailure: (err) => {
        setPaymentStatus("failed");
        setPaymentError(err);
      }
    });
  };

  useEffect(() => {
    document.title = "Anti Ageing Cream | Expert Wrinkle & Fine Line Repair | Dr. Nishanti's Clinic";
    window.scrollTo(0, 0);
    trackPixelEvent("ViewContent", {
      content_name: "Anti Ageing Cream",
      content_ids: ["Anti Ageing Cream"],
      content_type: "product",
      value: 949,
      currency: "INR"
    });
  }, []);

  const benefits = [
    { title: "Active Anti Ageing Therapy", desc: "Stimulates deep skin surface cycles, restoring youthful bounce and cellular density." },
    { title: "Dynamic Wrinkle reduction", desc: "Visibly tightens and smooths creases around eyes, mouth, and forehead lines." },
    { title: "Fine Line Repair & Hydration", desc: "Plumps microscopic fissures with rich peptides and hydration-locking clinical moisturizers." },
    { title: "Deep Barrier Defense", desc: "Shields your skin from oxidising stress factors that accelerate cell collapse." }
  ];

  const faqs = [
    {
      q: "What makes this Anti Ageing cream different?",
      a: "Our Anti Ageing Cream is clinically formulated under Dr. Nishanti's supervision. It combines high-performance micro-peptides and active botanical nutrients that deeply restructure aging skin rather than just temporarily hydrating the surface."
    },
    {
      q: "At what age should I start using this cream?",
      a: "While fine lines usually begin to clear or become visible in your late 20s or early 30s, this cream is suitable for anyone aged 25 or above who wishes to defend against or repair cellular signs of aging."
    },
    {
      q: "Can I apply this under sunscreen or makeup?",
      a: "Absolutely. Our lightweight formula absorbs swiftly into the skin without leaving an oily film, making it an excellent base under daytime sunblock or night gels."
    },
    {
      q: "How fast will I see improvement for deeper wrinkles?",
      a: "Fine lines begin looking smoother within 2 weeks due to active hydration recovery. For deeper wrinkles, visible tightening and structural enhancement are noticed over 4-6 weeks of regular applications."
    }
  ];

  const reviews = [
    { name: "Kiran Shah", rating: 5, date: "Checked 3 days ago", text: "The fine lines around my eyes have dramatically faded within three weeks. It does not feel greasy at all, which I love." },
    { name: "Meena Joshi", rating: 5, date: "Checked 10 days ago", text: "Truly a miracle cream. My sagging neck skin feels firmer, and my face looks fresh and rested every single morning." },
    { name: "Rajesh Trivedi", rating: 5, date: "Checked 2 weeks ago", text: "I bought this for my skin texture and wrinkles. The difference is real. Highly recommend Dr. Nishanti's formulation!" }
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const whatsappLink = `https://wa.me/919110839962?text=Hello%20Dr.%20Nishanti's%20Clinic,%20I%20am%20interested%20in%20buying%20the%20Anti%20Ageing%20Cream%20for%20the%20discounted%20price%20of%20%E2%82%B9949.%20Please%20guide%20me%20with%2520the%20order%20process.`;

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
                id="anti-ageing-hero-img"
              >
                <img 
                  src={images[activeImage]} 
                  alt="Anti Ageing Restorative Cream" 
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-gold text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                  Doctor Specialized
                </div>
              </motion.div>
              
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4" id="anti-ageing-thumbnails">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === idx ? 'border-brand-gold shadow bg-white' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Anti Ageing Thum ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-gold/15 text-brand-gold rounded-full text-xs font-bold uppercase tracking-wider">
                  <Sparkles size={12} /> Clinical Youth Restorative
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark leading-tight" id="anti-ageing-title">
                  Anti Ageing Restorative Cream
                </h1>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <span className="flex text-amber-400 border-none outline-none">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </span>
                  <span className="font-semibold text-brand-dark">4.9 / 5.0</span>
                  <span>(115 Patient Ratings)</span>
                </p>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                Rejuvenate collagen elasticity and restore essential firmness. This specialty clinic-grade cream is engineered directly to combat saggy textures, reverse visible fine lines, and speed up cellular rejuvenation.
              </p>

              {/* Price Details */}
              <div className="p-6 bg-white rounded-3xl border border-brand-cream/80 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500 block mb-1 font-medium">Limited Time Clinical Offer</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-extrabold text-brand-dark">₹949</span>
                    <span className="text-lg text-gray-400 line-through font-medium">₹1,149</span>
                    <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">Save 17%</span>
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
                  id="anti-ageing-buy-btn"
                >
                  <Sparkles size={22} fill="currentColor" />
                  <span>Buy Now (Free Delivery Across India)</span>
                </button>
                
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-gray-500">
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Reduces Wrinkles</div>
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Restores Elasticity</div>
                  <div className="p-2 border border-brand-cream/50 rounded-xl bg-white/50">Peptide Complex</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/25 rounded-full blur-[80px]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-12">
          <div className="space-y-4">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block">The Signs of Natural Wear</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Why Your Skin Loses Its Youthful Glow</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">⏳</span>
              <h3 className="text-lg font-bold text-white">Slowing Derm-Cycle Turnover</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                As cell reproduction cycles slow down over the years, the outer skin layers retain dead skin, resulting in a dull, uneven, and exhausted look.
              </p>
            </div>
            
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">📉</span>
              <h3 className="text-lg font-bold text-white">Collagen & Elasticity Fall</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                The loss of deep supportive elastin makes structural skin drop, forming permanent creases around eyes and cheeks.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">💧</span>
              <h3 className="text-lg font-bold text-white">Critical Moisture Loss</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Aging lipid barriers fail to store healthy moisture, exaggerating fine surface lines and making skin vulnerable to dryness.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 space-y-3">
              <span className="text-2xl">🍂</span>
              <h3 className="text-lg font-bold text-white">Oxidative UV Stress</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Free radicals from pollution and UV exposure breakdown skin structures continuously, causing lines to deepen over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block">The Restorative Answer</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark leading-tight">
              Anti Ageing: Dermal Cellular Rejuvenation
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Designed as a professional peptide-infused repair treatment, our Anti Ageing Cream works directly with your skin's nocturnal recovery cycles. By nourishing deep layers with moisture-locking active oils, it visibly lifts, smooths, and firms saggy textures, restoring soft natural elasticity.
            </p>
            
            <div className="space-y-4 text-sm text-gray-700">
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-gold shrink-0" size={18} />
                <span>Restructures skin contours for a firmer, tighter-looking profile</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-gold shrink-0" size={18} />
                <span>Significantly minimizes the visibility of crow's feet and smile creases</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="text-brand-gold shrink-0" size={18} />
                <span>Slowly restores natural thickness, leaving skin elastic and resilient</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-brand-gold/10 rounded-3xl blur-[20px] scale-95" />
            <img 
              src={AntiAgeing2} 
              alt="Clinical Formulation Texture" 
              className="relative w-full rounded-3xl shadow-lg border border-brand-cream/80 object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20 bg-brand-cream/30 border-y border-brand-cream/70">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block">Dermatologist-Approved Science</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Clinical Action & Benefits</h2>
            <p className="text-gray-500 text-sm">Engineered with high-performing repair molecules for outstanding outcome history.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-brand-cream/60 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center font-bold mb-6">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
                <div className="pt-4 flex items-center gap-1.5 text-xs text-brand-gold font-bold">
                  <CheckCircle2 size={14} /> Proven Formulation
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
              <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-brand-gold/20 rounded-full blur-[60px] -translate-x-1/2 -translate-y-1/2" />
            </div>
            
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                <Sparkles size={12} fill="currentColor" /> Special Promotion
              </span>
              <h3 className="text-xl md:text-3xl font-display font-bold text-brand-dark">Ready to Restore Your Young Radiance?</h3>
              <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto">
                Reverse cellular oxidative stress. Order today and get direct online consultation with Dr. Nishanti, free of charge.
              </p>
              
              <div className="pt-2">
                <button 
                  onClick={handleOpenOrderForm}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1 mx-auto cursor-pointer"
                >
                  <Sparkles size={20} fill="currentColor" /> Order Now (₹949) & Get Free Online Doctor Consultation
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
              <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block">Verified Clinic Results</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Validated by True Patients</h2>
              <p className="text-gray-600">
                Witness real transformations. Our patients report significant texture refinements and line reductions with sustained application.
              </p>
              
              <div className="p-6 bg-brand-cream/20 rounded-3xl border border-brand-cream/50 space-y-2">
                <span className="text-4xl font-bold text-brand-dark">96.5%</span>
                <p className="text-sm font-bold text-brand-dark">Reporting Refined Neck & Jawline Tightening</p>
                <p className="text-xs text-gray-400">Based on structured patient self-assessments at day 45.</p>
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
            <span className="text-brand-gold text-xs font-bold uppercase tracking-widest block">Your Concerns Resolved</span>
            <h2 className="text-3xl font-display font-bold text-brand-dark">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-brand-cream/80 rounded-2xl overflow-hidden shadow-2xs">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left font-bold text-brand-dark flex justify-between items-center hover:bg-brand-gold/5 transition-colors duration-200"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-brand-gold transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} 
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
            <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-brand-gold/20 rounded-full blur-[70px] -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="relative z-10 space-y-8">
            <h2 className="text-2xl md:text-4xl font-display font-bold">Invest in Everlasting Dermal Radiance</h2>
            <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto">
              Give your skin back its firm, youthful contours. Order your Anti Ageing Cream today with our secure instant checkout portal and get reliable free door delivery across India.
            </p>
            
            <div className="pt-4">
              <button 
                onClick={handleOpenOrderForm}
                className="inline-flex items-center gap-3 px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition-all shadow-xl hover:shadow-emerald-500/20 hover:-translate-y-1 mx-auto cursor-pointer"
              >
                <Sparkles size={20} fill="currentColor" /> Order Now (₹949) & Get Free Online Doctor Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      <PaymentStatusModal
        status={paymentStatus}
        productName="Anti Ageing Cream"
        amount={949}
        paymentId={paymentId}
        errorMessage={paymentError}
        onClose={() => setPaymentStatus("idle")}
        onRetry={handleOpenOrderForm}
      />

      <OrderFormModal
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        productName="Anti Ageing Cream"
        amount={949}
        onSubmit={handleOrderSubmit}
      />
    </div>
  );
}
