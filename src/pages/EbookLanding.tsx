import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, Star, CheckCircle2, ChevronLeft, ChevronRight, 
  ShieldCheck, Sparkles, Heart, Zap, PlayCircle, X, HelpCircle, 
  ArrowLeft, CreditCard, MessageCircle, GraduationCap, Award,
  ChevronDown
} from "lucide-react";
import { EBOOKS_DATA, EBook } from "./Ebooks";
import { triggerInstamojoCheckout } from "../utils/instamojo";
import PaymentStatusModal, { PaymentStatus } from "../components/PaymentStatusModal";
import { trackPixelEvent } from "../utils/pixel";

export default function EbookLanding() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find Ebook matching either exact ID or ID without prefix
  const ebook = EBOOKS_DATA.find(e => 
    e.id === id || 
    e.id.replace("eb-", "") === id ||
    id?.replace("eb-", "") === e.id
  );

  // States
  const [activeTab, setActiveTab] = useState<"about" | "chapters" | "demo">("about");
  const [demoPage, setDemoPage] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  
  // Checkout States
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Razorpay states
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [paymentId, setPaymentId] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [hasTrackedAddToCart, setHasTrackedAddToCart] = useState(false);

  useEffect(() => {
    if (ebook) {
      document.title = `${ebook.title} | Dr. Nishanti's Clinical Series`;
      trackPixelEvent("ViewContent", {
        content_name: ebook.title,
        content_ids: [ebook.id],
        content_type: "product",
        value: ebook.price,
        currency: "INR"
      });
    } else {
      document.title = "eBook Not Found | Dr. Nishanti's Clinic";
    }
    window.scrollTo(0, 0);
  }, [ebook]);

  useEffect(() => {
    if ((fullName || phoneNumber) && !hasTrackedAddToCart && ebook) {
      setHasTrackedAddToCart(true);
      trackPixelEvent("AddToCart", {
        content_name: ebook.title,
        content_ids: [ebook.id],
        content_type: "product",
        value: ebook.price,
        currency: "INR"
      });
    }
  }, [fullName, phoneNumber, hasTrackedAddToCart, ebook]);

  if (!ebook) {
    return (
      <div className="bg-brand-cream/10 min-h-screen text-brand-dark pt-32 font-sans flex flex-col justify-center items-center px-6 text-center">
        <HelpCircle size={64} className="text-red-500 mb-4 animate-pulse" />
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-brand-dark">eBook Program Not Found</h1>
        <p className="text-gray-500 mt-2 max-w-md">
          The requested clinical eBook guide could not be located in our verified digital catalog.
        </p>
        <Link 
          to="/ebooks" 
          className="mt-8 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md"
        >
          View All eBook Programs
        </Link>
      </div>
    );
  }

  // Bespoke assets per book (Reviews & FAQs) mapping cleanly to context
  const getBespokeReviews = (ebookId: string) => {
    if (ebookId === "eb-impress-partner") {
      return [
        { name: "Priya Sharma", rating: 5, date: "4 days ago", text: "Dr. Nishanti's relationship workbook is a miracle. My husband and I completed the 21 days together and we uncovered love languages we never discussed in 7 years of marriage. Highly recommend!" },
        { name: "Meera Deshmukh", rating: 5, date: "1 week ago", text: "The concept of creating a safe, zero-judgment space really helped. It reduced unnecessary conflicts and taught us how to communicate boundaries with more calmness and understanding." },
        { name: "Kunal Gupta", rating: 5, date: "2 weeks ago", text: "As a man, I initially hesitated, but the daily tasks are extremely practical. Takes just 10 mins post dinner. Genuinely restored emotional safety." }
      ];
    } else if (ebookId === "eb-better-sleep") {
      return [
        { name: "Rohan Kapoor", rating: 5, date: "3 days ago", text: "I had chronic sleep struggles for 4 years, relying on pills. This 21-day routine reset my circadian rhythm. The 4-7-8 breathing and digital curfew instructions are life changing." },
        { name: "Ananya Iyer", rating: 5, date: "5 days ago", text: "This guide helped me create a better sleep routine. The simple bedtime habits and relaxation techniques made it easier to sleep peacefully and wake up feeling more refreshed." },
        { name: "Suresh Patil", rating: 5, date: "12 days ago", text: "Mind-blowingly simple yet highly structured. My daily sleep score tracked rose from 4.5 to 8.8 based on the workbook scorecard." }
      ];
    } else if (ebookId === "eb-diabetes-care") {
      return [
        { name: "Viral Patel", rating: 5, date: "2 days ago", text: "Very useful ebook. The daily guidance and simple tips make diabetes care easier to understand and follow." },
        { name: "Suman Joshi", rating: 5, date: "6 days ago", text: "My fasting sugar levels stabilized down from 165 to 110 within 3 weeks of following the daily protocol steps. Extremely useful and accurate." },
        { name: "Vikas Saxena", rating: 5, date: "15 days ago", text: "Simple, realistic dietary swaps that do not starve you. The Karela, cinnamon, and ginger mucosal soothers recommended work like magic." }
      ];
    } else if (ebookId === "eb-failure-comeback") {
      return [
        { name: "Aarav Rawat", rating: 5, date: "1 day ago", text: "This workbook gave me holding ground during a massive career setback. The cognitive reframing prompts stopped my negative spirals. A pure mental fitness manual." },
        { name: "Tanya Sen", rating: 5, date: "4 days ago", text: "The Emergency Mindset Reset and Box Breathing protocol help calm physical anxiety almost instantly. It helped me separate my identity from external failures." },
        { name: "Radha Nair", rating: 5, date: "10 days ago", text: "Reclaimed my personal power and self-trust step-by-step. The writing reflection blocks make you look at your strengths rather than weaknesses." }
      ];
    } else {
      // Weight loss programs (en / hi)
      return [
        { name: "Sunita Kapur", rating: 5, date: "Yesterday", text: "No more crash diets! Lost 3 inches off my waist by just balancing morning proteins, hydrations, and passive metabolic triggers as Dr. Nishanti suggested. Outstanding Hindi/English guides." },
        { name: "Deepak Chawla", rating: 4, date: "4 days ago", text: "The explanation regarding thyroid speed and visceral fat preservation is highly diagnostic. Very easy to follow daily actions." },
        { name: "Sushma Swamy", rating: 5, date: "9 days ago", text: "Gently nourished my body instead of starving. My daily energy index jumped from 4 to 9. Safe, stable, and highly scientific weight management." }
      ];
    }
  };

  const getBespokeFaqs = (ebookId: string) => {
    if (ebookId === "eb-impress-partner") {
      return [
        { q: "Do both partners need to actively read this guide?", a: "No. While following it together can be beneficial, even one partner applying these daily actions can help improve communication, reduce misunderstandings, and create a stronger emotional connection." },
        { q: "Is this a theoretical guide or a workbook?", a: "This is a highly practical workbook. Daily relationship tips with journaling prompts and practical action steps to build a stronger connection." },
        { q: "How soon can we feel the changes?", a: "Many couples notice positive shifts in communication, understanding, and emotional connection within the first few days by practicing simple daily relationship exercises." }
      ];
    } else if (ebookId === "eb-better-sleep") {
      return [
        { q: "Can this plan replace sleeping medications?", a: "This guide focuses on improving natural sleep habits and lifestyle practices. If you are taking any medication, consult your personal doctor before making any changes." },
        { q: "I work late-night shifts. Can I still follow this plan?", a: "Yes. The routine can be adapted according to your schedule to help improve sleep quality and create healthier sleep patterns." },
        { q: "What is the Mind Dump technique?", a: "It is a simple journaling practice where you write down your thoughts, worries, and pending tasks before bedtime to relax your mind and prepare for better sleep." }
      ];
    } else if (ebookId === "eb-diabetes-care") {
      return [
        { q: "Q1: Can lifestyle changes help in diabetes management?", a: "A: Yes. Healthy eating habits, regular physical activity, proper sleep, and consistent monitoring can support better diabetes management." },
        { q: "Q2: Is this plan suitable for everyone with diabetes?", a: "A: This guide provides general lifestyle guidance. People should follow their doctor's advice based on their individual health condition and treatment plan." },
        { q: "Q3: How long does it take to see improvements?", a: "A: Results can vary from person to person. Consistent healthy habits over time can help improve overall wellness and support better health outcomes." }
      ];
    } else if (ebookId === "eb-failure-comeback") {
      return [
        { q: "Q: Is this guide only about motivation?", a: "A: No. This guide focuses on practical exercises, self-reflection, and daily actions that help you develop a positive mindset and improve your confidence." },
        { q: "Q: How much time do I need to spend on this guide daily?", a: "A: The guide is designed with simple daily activities that can be completed in a short time while creating consistent progress over 21 days." },
        { q: "Q: How does this 21-day journey help in personal growth?", a: "A: It encourages daily reflection, helps identify challenges, builds positive habits, and guides you toward developing confidence and emotional strength." }
      ];
    } else if (ebookId === "eb-weight-loss-en") {
      return [
        { q: "Does this involve dangerous calorie starvation?", a: " No. This approach avoids extreme dieting and focuses on balanced meals, mindful eating, proper nutrition, and consistent habits to support healthy and sustainable weight management." },
        { q: "What exercises are listed in the Workout Library?", a: "Basic, highly effective bodyweight resistance moves: bodyweight squats, knee/regular pushups, forearm planks, and reverse lunges outlined step-by-step with proper alignments of the spine." },
        { q: "Is this workbook available in both English and Hindi?", a: "Yes. Dr. Nishanti's Clinical weight loss program has been fully customized with bilingual guides so you can choose the language you digest best." }
      ];
    } else if (ebookId === "eb-weight-loss-hi") {
      return [
        { q: "How much weight can I expect to lose in 21 days?", a: "Weight loss results vary from person to person depending on age, metabolism, current weight, activity level, food choices, and consistency. This plan focuses on creating healthy habits that support gradual and sustainable progress." },
        { q: "Does this involve extreme dieting or starvation methods?", a: "No. This program focuses on balanced nutrition, mindful eating habits, adequate protein intake, hydration, and healthy lifestyle modifications instead of extreme calorie restriction or unhealthy shortcuts." },
        { q: "How much time do I need daily to follow the plan?", a: "The daily commitment depends on your routine, but most activities are structured to be practical and manageable within a busy lifestyle." }
      ];
    } else {
      // Weight loss
      return [
        { q: "Does this involve dangerous caloric starvations?", a: "No. Severe calorie restriction triggers the thyroid starvation response, halting fat loss and causing weight rebound. We use cellular nourishment, protein alignments, and hydration variables." },
        { q: "What exercises are listed in the Workout Library?", a: "Basic, highly effective bodyweight resistance moves: bodyweight squats, knee/regular pushups, forearm planks, and reverse lunges outlined step-by-step with proper alignments of the spine." },
        { q: "Is this workbook available in both English and Hindi?", a: "Yes. Dr. Nishanti's Clinical weight loss program has been fully customized with bilingual guides so you can choose the language you digest best." }
      ];
    }
  };

  const reviews = getBespokeReviews(ebook.id);
  const faqs = getBespokeFaqs(ebook.id);

  // Form Submission
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Please enter your name");
      return;
    }

    const cleanPhone = phoneNumber.trim();
    if (!cleanPhone || cleanPhone.length < 8 || cleanPhone.length > 12 || isNaN(Number(cleanPhone))) {
      setErrorMessage("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      date: new Date().toISOString(),
      orderId: `ORDER_${Date.now()}`,
      paymentId: `PAY_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      productName: `${ebook.title} eBook manual`,
      amount: ebook.price,
      name: fullName,
      mobile: cleanPhone,
      address: `Digital PDF Download Link (${ebook.id})`,
      area: "Active Clinic Core Database",
      city: "Instant PDF Deliverables",
      pincode: "PDF_EBOOK",
      state: "Digital Delivery Protocol",
      status: "SUCCESS"
    };

    try {
      trackPixelEvent("InitiateCheckout", {
        content_name: ebook.title,
        content_ids: [ebook.id],
        content_type: "product",
        value: ebook.price,
        currency: "INR"
      });
      setPaymentStatus("processing");
      await triggerInstamojoCheckout({
        amount: ebook.price,
        productName: `${ebook.title} Dedicated Program`,
        orderData,
        isEbook: true,
        ebookId: ebook.id,
        ebookTheme: ebook.colorTheme,
        onFailure: (err) => {
          setIsSubmitting(false);
          setPaymentStatus("failed");
          setPaymentError(err);
        }
      });
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage("Instamojo payment gateway failed to respond. Please try again.");
    }
  };

  const whatsappLink = `https://wa.me/919110839962?text=Hello%20Dr.%20Nishanti's%20Clinic,%20I%20am%20interested%20in%20buying%20the%20premium%20eBook%20program%20"${encodeURIComponent(ebook.title)}"%20for%20the%20discounted%20price%20of%20%E2%82%B9${ebook.price}.%20Please%20guide%20me%20with%20the%20order%20process.`;

  return (
    <div className="bg-brand-cream/10 min-h-screen text-brand-dark pt-24 font-sans antialiased pb-20">
      
      {/* Top Floating back context header */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link 
          to="/ebooks" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 hover:text-emerald-700 transition-colors group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
          Back to all eBook Programs
        </Link>
        <div className="hidden md:flex items-center gap-1.5 text-xs text-brand-gold font-bold">
          <Award size={15} /> Verified Dr. Nishanti Clinical Series
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-4">
        {/* Main Hero Bento Grid Split */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* LEFT: Book Mockup and Info Tabs (Column: 5/12) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Highly Realistic 3D Interactive CSS Book Display Frame */}
            <div className="py-12 px-8 bg-white rounded-3xl border border-brand-cream/75 shadow-sm flex flex-col items-center relative overflow-hidden group select-none">
              <div className="absolute top-12 right-12 w-48 h-48 bg-gradient-to-tr from-brand-pink/5 to-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Specialized 3D Book Layout Frame */}
              <div className="relative w-[180px] h-[250px] transform group-hover:scale-[1.03] group-hover:rotate-1 duration-300 transition-transform">
                {/* 3D Spine Depth Highlight */}
                <div className={`absolute top-0 -left-[6px] w-[6px] h-full ${ebook.colorTheme.spineColor || "bg-black/40"} rounded-l opacity-90`} />
                {/* Book cover visual block */}
                <div className={`w-full h-full rounded-r-lg shadow-2xl relative flex flex-col justify-between p-4 overflow-hidden border-l border-white/10`}>
                  <div className={`absolute inset-0 bg-gradient-to-tr ${ebook.colorTheme.from} ${ebook.colorTheme.to} opacity-95`} />
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                  {/* Gloss shine cover layers */}
                  <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-r from-white/20 via-transparent to-transparent z-20" />
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 z-20" />

                  {/* Header */}
                  <div className="relative z-10 space-y-1">
                    <span className="text-[7px] text-white/70 font-black uppercase tracking-widest block border-b border-white/10 pb-0.5">
                      21-DAY CHRONO SERIES
                    </span>
                    <span className="text-[6.5px] text-white/50 block font-bold font-mono">
                      By Dr. Nishanti Prajapati
                    </span>
                  </div>

                  {/* Core display */}
                  <div className="relative z-10 text-center space-y-1.5 py-4">
                    <BookOpen size={20} className="text-white/80 mx-auto" />
                    <h3 className="text-[11px] font-display font-black text-white text-center leading-tight tracking-tight drop-shadow-md">
                      {ebook.title}
                    </h3>
                  </div>

                  {/* Footer */}
                  <div className="relative z-10 flex justify-between items-center text-[6px] text-white/60 font-semibold uppercase tracking-wider">
                    <span>Vol. III</span>
                    <span className="bg-white/15 px-1.5 py-0.5 rounded text-white text-[5.5px]">21 Day Plan</span>
                  </div>
                </div>
              </div>

              {/* Specs Indicators */}
              <div className="grid grid-cols-3 gap-2 mt-8 w-full border-t border-gray-100 pt-7 text-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Format</span>
                  <span className="text-xs text-brand-dark font-black">Secure PDF</span>
                </div>
                <div className="space-y-0.5 border-x border-gray-100">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Structure</span>
                  <span className="text-xs text-brand-dark font-black">Step-by-Step Plan</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">Delivery</span>
                  <span className="text-xs text-emerald-500 font-black flex items-center gap-0.5 justify-center">
                    <Zap size={11} /> Instant
                  </span>
                </div>
              </div>
            </div>

            {/* TAB INTERFACE FOR READERS Preview Details */}
            <div className="bg-white rounded-3xl border border-brand-cream/80 overflow-hidden shadow-xs">
              <div className="grid grid-cols-3 bg-gray-50 border-b border-brand-cream/50 text-center font-bold text-xs">
                <button 
                  onClick={() => setActiveTab("about")}
                  className={`py-3.5 cursor-pointer border-b-2 transition-all ${
                    activeTab === "about" ? "border-emerald-500 text-emerald-600 bg-white" : "border-transparent text-gray-400 hover:text-brand-dark"
                  }`}
                >
                  Overview
                </button>
                <button 
                  onClick={() => setActiveTab("chapters")}
                  className={`py-3.5 cursor-pointer border-b-2 transition-all ${
                    activeTab === "chapters" ? "border-emerald-500 text-emerald-600 bg-white" : "border-transparent text-gray-400 hover:text-brand-dark"
                  }`}
                >
                  Syllabus
                </button>
                <button 
                  onClick={() => setActiveTab("demo")}
                  className={`py-3.5 cursor-pointer border-b-2 transition-all ${
                    activeTab === "demo" ? "border-emerald-500 text-emerald-600 bg-white" : "border-transparent text-gray-400 hover:text-brand-dark"
                  }`}
                >
                  Free Demo
                </button>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  
                  {/* OVERVIEW PANEL */}
                  {activeTab === "about" && (
                    <motion.div 
                      key="about"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-4"
                    >
                      <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider">About This Practical Program</h4>
                      <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-semibold">
                        {ebook.introduction}
                      </p>

                    </motion.div>
                  )}

                  {/* SYLLABUS PANEL */}
                  {activeTab === "chapters" && (
                    <motion.div 
                      key="chapters"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-3.5"
                    >
                      <h4 className="text-xs font-black text-brand-dark uppercase tracking-wider">21-Day Syllabus Curation</h4>
                      <div className="space-y-2">
                        {ebook.chapters.map((ch, idx) => (
                          <div key={idx} className="flex gap-2.5 items-start text-xs text-gray-500 font-semibold">
                            <span className="text-emerald-500 font-black text-[11px] bg-emerald-50 px-1.5 py-0.5 rounded">Ch {idx+1}</span>
                            <span className="mt-0.5 leading-relaxed">{ch}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* DEMO DIGITAL READER */}
                  {activeTab === "demo" && (
                    <motion.div 
                      key="demo"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-5"
                    >
                      <div className="border border-brand-cream/60 rounded-2xl overflow-hidden bg-gray-50 shadow-xs">
                        <div className="bg-white border-b border-brand-cream/50 px-4 py-2.5 flex items-center justify-between text-[10px] text-gray-400 font-extrabold uppercase tracking-widest">
                          <span>Verified Reader Mockup</span>
                          <span className="text-brand-pink">Page {demoPage} of 3</span>
                        </div>

                        {/* Page 1, 2, 3 content rendering */}
                        <div className="p-5 min-h-[170px] bg-white text-xs text-gray-600 leading-relaxed">
                          {demoPage === 1 && (
                            <div className="space-y-3">
                              <h5 className="font-extrabold text-brand-dark text-center uppercase tracking-wider text-[11px]">Welcome note</h5>
                              <p className="font-semibold italic text-rose-800 text-center">
                                "{ebook.introduction}"
                              </p>
                            </div>
                          )}

                          {demoPage === 2 && (
                            <div className="space-y-3">
                              <h5 className="font-extrabold text-brand-dark uppercase tracking-wider text-[11px] border-b border-gray-100 pb-1">
                                {ebook.page2Content.heading}
                              </h5>
                              <ul className="space-y-2">
                                {ebook.page2Content.bullets.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex gap-1.5 items-start">
                                    <span className="text-emerald-500 font-black select-none">•</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide border-t border-gray-100 pt-1.5 italic">
                                {ebook.page2Content.note}
                              </p>
                            </div>
                          )}

                          {demoPage === 3 && (
                            <div className="space-y-3">
                              <h5 className="font-extrabold text-brand-dark uppercase tracking-wider text-[11px] border-b border-gray-100 pb-1 text-emerald-600">
                                {ebook.page3Content.heading}
                              </h5>
                              <div className="space-y-1.5">
                                {ebook.page3Content.protocolSteps.map((step, sIdx) => (
                                  <div key={sIdx} className="flex gap-1.5 items-start">
                                    <span className="font-extrabold text-emerald-500 text-[10px]">{sIdx + 1}.</span>
                                    <span>{step}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="p-3 bg-amber-50 rounded-xl text-[10.5px] text-amber-800 leading-relaxed font-bold border-l-4 border-amber-500">
                                {ebook.page3Content.doctorAdvice}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Page turn controllers */}
                        <div className="bg-gray-50/50 p-3 border-t border-brand-cream/40 flex items-center justify-between text-xs font-bold">
                          <button
                            onClick={() => setDemoPage(p => Math.max(1, p - 1))}
                            disabled={demoPage === 1}
                            className={`flex items-center gap-0.5 text-gray-400 hover:text-brand-dark transition-colors cursor-pointer ${
                              demoPage === 1 ? "opacity-30 pointer-events-none" : ""
                            }`}
                          >
                            <ChevronLeft size={14} /> Prev
                          </button>
                          <span className="text-[9.5px] font-bold font-mono text-gray-400">DEMO CURRICULUM</span>
                          <button
                            onClick={() => setDemoPage(p => Math.min(3, p + 1))}
                            disabled={demoPage === 3}
                            className={`flex items-center gap-0.5 text-emerald-600 hover:text-emerald-700 transition-colors cursor-pointer ${
                              demoPage === 3 ? "opacity-30 pointer-events-none" : ""
                            }`}
                          >
                            Next <ChevronRight size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* RIGHT: Header, Details, and Checkout Card (Column: 7/12) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header titles */}
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-600 rounded-full text-xs font-extrabold uppercase tracking-wider">
                <Sparkles size={12} className="animate-spin-slow" /> Doctor Guided 21-Day Plan
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-extrabold text-brand-dark leading-tight" id="ebook-landing-title">
                {ebook.title}
              </h1>
              <p className="text-gray-400 text-xs md:text-sm font-semibold flex items-center gap-2.5">
                <span className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                </span>
                <span className="font-extrabold text-brand-dark">4.9 / 5.0 Rating</span>
                <span>•</span>
                <span>{["eb-impress-partner", "eb-better-sleep"].includes(ebook.id) ? "Based on verified customer reviews" : ebook.id === "eb-diabetes-care" ? "Based on verified Buyer's reviews" : ["eb-failure-comeback", "eb-weight-loss-en", "eb-weight-loss-hi"].includes(ebook.id) ? "Based on verified buyers reviews" : "Based on verified clinical results"}</span>
              </p>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed font-semibold">
              {ebook.id === "eb-impress-partner" ? (
                "This 21-day guide provides practical daily actions, communication strategies, relationship-building activities, and confidence-enhancing habits to create a stronger emotional connection."
              ) : ebook.id === "eb-better-sleep" ? (
                "बेहतर नींद के लिए 21 दिनों का आसान और practical routine plan. Designed by Dr. Nishanti Prajapati, this guide includes daily sleep habits, relaxation techniques, lifestyle tips, and simple trackers to help you create a consistent and healthy sleep routine "
              ) : ebook.id === "eb-diabetes-care" ? (
                "मधुमेह देखभाल और बेहतर जीवनशैली के लिए 21 दिनों का आसान और practical routine plan. Designed by Dr. Nishanti Prajapati, this guide includes daily lifestyle habits, balanced meal ideas, activity guidance, and simple trackers to support better diabetes management."
              ) : ebook.id === "eb-failure-comeback" ? (
                "Emotional strength, confidence और personal growth के लिए 21 दिनों की practical journey. Designed by Dr. Nishanti Prajapati, this guide includes daily mindset exercises, self-improvement activities, reflection prompts, and progress trackers to help you build a stronger version of yourself."
              ) : ebook.id === "eb-weight-loss-hi" ? (
                "21 दिनों का वजन घटाने का रूपांतरण प्लान - अपने शरीर को बदलें. Beautifully constructed by Dr. Nishanti Prajapati, this textbook series maps precise daily actions, dietary recipes, and trackers directly to your metabolic profile. Bypasses dangerous starvations."
              ) : (
                `${ebook.subInfo}. Beautifully constructed by Dr. Nishanti Prajapati (Skin Hair Ayurveda Clinic, Bangalore), this textbook series maps precise daily actions, dietary recipes, and trackers directly to your metabolic profile. Bypasses dangerous starvations.`
              )}
            </p>

            {/* Premium, Interactive Checkout Card */}
            <div className="bg-white rounded-3xl border border-brand-cream/80 overflow-hidden shadow-sm">
              <div className="p-6 md:p-8 bg-gray-50/50 border-b border-brand-cream/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div>
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider mb-1">Standard Clinic Price</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-gray-950">₹{ebook.price}</span>
                    <span className="text-base text-gray-400 line-through font-bold">₹{ebook.originalPrice}</span>
                    <span className="text-[10.5px] px-2 py-0.5 bg-brand-pink text-white font-extrabold rounded-full uppercase tracking-wider">
                      {ebook.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 font-bold">
                  <ShieldCheck size={18} className="text-emerald-500" />
                  <span>Includes Doctor-Designed eBook with Practical Strategies</span>
                </div>

              </div>

              {/* Checkout Form */}
              <div className="p-6 md:p-8 text-brand-dark">
                <h3 className="text-xs font-black uppercase text-brand-dark tracking-wider mb-6 flex items-center gap-2">
                  🔒 Secure Program Curation & Purchase Form
                </h3>

                <form onSubmit={handlePurchase} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    
                    <div className="space-y-1.5">
                      <label className="text-[10.5px] text-gray-400 font-black uppercase tracking-wider block">FullName / पूरा नाम</label>
                      <input 
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Priyanshu Sharma"
                        className="w-full px-4 py-3 bg-gray-50 border border-brand-cream hover:border-gray-300 focus:border-brand-gold focus:bg-white rounded-xl text-xs font-semibold focus:outline-none transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10.5px] text-gray-400 font-black uppercase tracking-wider block">WhatsApp Mobile Number</label>
                      <div className="flex">
                        <select 
                          value={countryCode} 
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="px-3 border border-r-0 border-brand-cream bg-gray-50 hover:bg-gray-100 rounded-l-xl text-xs font-bold focus:outline-none transition-colors"
                          disabled={isSubmitting}
                        >
                          <option value="+91">+91 (IN)</option>
                          <option value="+1">+1 (US)</option>
                          <option value="+44">+44 (UK)</option>
                          <option value="+971">+971 (UAE)</option>
                        </select>
                        <input 
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="e.g. 9123456789"
                          className="w-full px-4 py-3 bg-gray-50 border border-brand-cream hover:border-gray-300 focus:border-brand-gold focus:bg-white rounded-r-xl text-xs font-semibold focus:outline-none transition-all"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                  </div>

                  {errorMessage && (
                    <p className="text-red-500 text-xs font-bold flex items-center gap-1 leading-relaxed">
                      ⚠️ {errorMessage}
                    </p>
                  )}

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] transition-all ${
                        isSubmitting ? "opacity-70 pointer-events-none" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <>Launching Gateway...</>
                      ) : (
                        <>
                          <CreditCard size={15} /> Purchase & Instant Download PDF
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-[10px] text-gray-400 font-semibold mt-5 text-center leading-normal">
                  Our payment gateway utilizes SSL secure tunnels. Upon purchase, a custom licensed download key is generated instantly.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* SECTION: Interactive Bespoke FAQs */}
        <section className="mt-20 border-t border-brand-cream/50 pt-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-dark leading-tight">
                Common Questions & Guidance
              </h3>
              {!["eb-failure-comeback", "eb-weight-loss-en", "eb-weight-loss-hi"].includes(ebook.id) && (
                <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider">
                  {ebook.id === "eb-diabetes-care" ? "Some FAQs" : "Find answers directly from clinical outcomes of patients"}
                </p>
              )}
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-brand-cream/80 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-4.5 text-left font-bold text-xs md:text-sm text-brand-dark hover:bg-gray-50/50 transition-colors flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown 
                      size={16} 
                      className={`text-gray-400 transform transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-gray-500 leading-relaxed font-semibold border-t border-gray-100">
                          {faq.a}
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: Patient Reviews */}
        <section className="mt-20 border-t border-brand-cream/50 pt-16">
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center space-y-2">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-brand-dark leading-tight">
                {ebook.id === "eb-diabetes-care" ? "Ebook User Testimonials" : ["eb-failure-comeback", "eb-weight-loss-en", "eb-weight-loss-hi"].includes(ebook.id) ? "Verified Buyers Testimonials" : "Verified Patient Testimonials"}
              </h3>
              {ebook.id !== "eb-diabetes-care" && (
                <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider">
                  Real feedback from individuals who completed this exact 21-day timeline
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((rev, idx) => (
                <div key={idx} className="p-6 bg-white border border-brand-cream/80 rounded-3xl flex flex-col justify-between space-y-4 shadow-xs">
                  <div className="space-y-2">
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <span className="text-xs text-brand-dark font-extrabold">{rev.name}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      <PaymentStatusModal 
        status={paymentStatus}
        errorMessage={paymentError}
        productName={ebook.title}
        amount={ebook.price}
        paymentId={paymentId}
        onClose={() => setPaymentStatus("idle")}
      />

    </div>
  );
}
