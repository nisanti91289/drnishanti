import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  FileText, 
  Lock, 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  ArrowRight,
  ShieldCheck, 
  Search, 
  BookMarked,
  X,
  CreditCard,
  User,
  Phone,
  AlertCircle,
  HelpCircle,
  GraduationCap
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { triggerInstamojoCheckout } from "../utils/instamojo";
import { trackPixelEvent } from "../utils/pixel";

// Define EBook interface
export interface EBook {
  id: string;
  title: string;
  subInfo: string;
  author: string;
  originalPrice: number;
  price: number;
  discount: number;
  badge: string;
  timeTag: string;
  colorTheme: {
    from: string;
    to: string;
    accent: string;
    bgSubtle: string;
    spineColor: string;
  };
  chapters: string[];
  introduction: string;
  page2Content: {
    heading: string;
    bullets: string[];
    note: string;
  };
  page3Content: {
    heading: string;
    protocolSteps: string[];
    doctorAdvice: string;
  };
}

export const EBOOKS_DATA: EBook[] = [
  {
    id: "eb-impress-partner",
    title: "21 Day Plan to Impress Your Husband / Boyfriend (Hinglish)",
    subInfo: "Build Deeper Connection, Improve Communication & Create a Happier Relationship",
    author: "Dr. Nishanti Prajapati",
    originalPrice: 599,
    price: 197,
    discount: 67,
    badge: "67% OFF",
    timeTag: "⚡ INSTANT DIGITAL ACCESS",
    colorTheme: {
      from: "from-rose-700",
      to: "to-red-900",
      accent: "text-rose-500",
      bgSubtle: "bg-rose-50",
      spineColor: "border-rose-950"
    },
    chapters: [
      "Welcome to Your Intimate Relationship Journey",
      "How to Use the Day-by-Day Practical Workbook",
      "Understanding Your Partner's Love Language",
      "Somatic Grounding & Building Emotional Safety",
      "Resolving Arguments with Constructive Communication",
      "Day-by-Day Intimacy Booster Tasks (Days 1 - 21)",
      "Daily Reflective Notebook Journal Checklists",
      "The Milestone Progress Scorecard Assessment"
    ],
    introduction: "Welcome to Your Journey. 'हर रिश्ता प्यार से शुरू होता है, लेकिन उसे मजबूत बनाने के लिए समझ, प्रयास और emotional connection की जरूरत होती है।' This practical 60-page guided workbook is constructed by Dr. Nishanti Prajapati to offer 21 daily micro-actions that deepen intimacy, establish safety, and restore dynamic warmth in your marriage or relationship.",
    page2Content: {
      heading: "The Relationship Transformation Pillars",
      bullets: [
        "Emotional Connection: Focus on making partner feel deeply heard, understood, and biologically safe.",
        "Mutual Respect: Actively honor and prioritize boundaries, decisions, and individual schedules.",
        "Active Communication: Shift from blame-focused declarations ('You always...') to somatic expressions ('I feel...').",
        "Micro-Appreciations: Consciously point out and validate 5 minor actions executed by him daily."
      ],
      note: "Relationship Formula: Understanding + Communication + Appreciation + Consistency = Strong Relationship"
    },
    page3Content: {
      heading: "Day 1 Activity: Target Love Languages",
      protocolSteps: [
        "Schedule 10 minutes of silent, device-free evening buffer time with your partner.",
        "Ask in a soft, non-demanding tone: 'What is one minor thing I do that makes you feel most loved?'",
        "Listen with complete somatic awareness, zero interruptions, and high empathy.",
        "Document his feedback honestly inside your daily workbook and repeat this token of love tomorrow."
      ],
      doctorAdvice: "Dr. Nishanti's Clinical Wisdom: Relationship conflict triggers the amygdala, initiating defensive reflexes. Establishing zero-judgment spaces immediately helps down-regulate this natural distress."
    }
  },
  {
    id: "eb-better-sleep",
    title: "21 Days Better Sleep Routine  (Hindi+Eng)",
    subInfo: "बेहतर नींद के लिए 21 दिनों का आसान और वैज्ञानिक रूटीन प्लान",
    author: "Dr. Nishanti Prajapati",
    originalPrice: 579,
    price: 189,
    discount: 67,
    badge: "67% OFF",
    timeTag: "⚡ INSTANT DIGITAL ACCESS",
    colorTheme: {
      from: "from-slate-900",
      to: "to-indigo-950",
      accent: "text-indigo-500",
      bgSubtle: "bg-indigo-50",
      spineColor: "border-slate-950"
    },
    chapters: [
      "अच्छी नींद का स्वास्थ्य और मानसिक प्रभाव",
      "Circadian Rhythms: Setting Your Organic Biological Clock",
      "Interactive Sleep Score Calculator & Self-Assessment",
      "Melatonin Optimization: Balancing Screens & Lighting",
      "The Evening Wind-Down Routine Checklists (Days 1 - 21)",
      "Scientific Breathing: The 4-7-8 Somatic Grounding Method",
      "The Zeigarnik Mind Dump Strategy for Anti-Anxiety",
      "21 Pages Daily Sleep Tracker & Reflection Journal"
    ],
    introduction: "A doctor-guided 21-day sleep improvement routine designed to build healthy sleep habits, improve sleep quality, reduce nighttime stress, and help you wake up refreshed with better daytime energy.",
    page2Content: {
      heading: "The Physiology of Chronic Insomnia",
      bullets: [
        "Blue Light Pollution: Emitting synthetic blue rays blocks prompt release of structural melatonin hormones.",
        "Evening Gastric Overload: Heavy late-night dinners pre-divert cellular circulation, keeping core metabolic temperature elevated.",
        "Bed-Working Association: Doing office tasks in bed trains the brain to associate your sleeping zone with active stress.",
        "Nocturnal Cortisol: Unresolved daytime worries trigger continuous autonomic stress, fracturing sleep cycles."
      ],
      note: "Circadian Axiom: High sunlight exposure first thing in the morning sets the anchor for high melatonin release exactly 14 hours later."
    },
    page3Content: {
      heading: "The Clinical Evening Wind-Down",
      protocolSteps: [
        "Execute a complete digital curfew (zero screens) after 9:30 PM.",
        "Sip 100ml warm water with zero additives or chamomile extract to soothe mucosal linings.",
        "Dim bedroom lights and keep temperature snug (clinically recommended between 18°C - 22°C).",
        "Complete a 5-minute progressive muscle relaxation (PMR) from head to heels."
      ],
      doctorAdvice: "Dr. Nishanti's Clinical Guidance: High adrenaline instantly blocks sleep onset. Taking a warm, tepid water shower pre-stimulates skin evaporation, forcing a drop in your internal metabolic temperature, signaling sleep readiness."
    }
  },
  {
    id: "eb-diabetes-care",
    title: "21 Days Diabetes Care & Control Plan (Hindi+Eng)",
    subInfo: "मधुमेह देखभाल और बेहतर जीवनशैली के लिए 21 दिनों का आसान और practical routine plan. Designed by Dr. Nishanti Prajapati, this guide includes daily lifestyle habits, balanced meal ideas, activity guidance, and simple trackers to support better diabetes management.",
    author: "Dr. Nishanti Prajapati",
    originalPrice: 550,
    price: 203,
    discount: 63,
    badge: "63% OFF",
    timeTag: "⚡ INSTANT DIGITAL ACCESS",
    colorTheme: {
      from: "from-teal-850",
      to: "to-emerald-950",
      accent: "text-emerald-500",
      bgSubtle: "bg-emerald-50",
      spineColor: "border-teal-950"
    },
    chapters: [
      "मधुमेह का वैज्ञानिक विश्लेषण: Insulin & Glucose Dynamics",
      "Understanding Cellular Insulin Resistance",
      "Interactive Blood Sugar Range Guide & Assessment Sheet",
      "The Glycemic Index: Smart Swaps & Pantry Blueprints",
      "Developing Peak Insulin Sensitivity (Days 1 - 21)",
      "Double Hydration Protocols & Pancreatic Protection",
      "Topical Herbs for Sugar Regulation (Cinnamon, Fenugreek, Karela)",
      "21 Days Sugar Tracker Daily Reflection Journal Sheets"
    ],
    introduction: "Restore metabolic control. This structured clinical program provides a step-by-step roadmap to enhance cellular insulin sensitivity, avoid dangerous glucose spikes, manage pancreatic strain, and stabilize organic HbA1c ratios within 21 days.",
    page2Content: {
      heading: "Understanding the Insulin Barrier",
      bullets: [
        "Insulin Resistance: Tissues block sugar absorption, forcing the pancreatic organ to emit excess insulin.",
        "Glycemic Spikes: Refined flour, white sugars, and processed juices trigger instant blood glucose surges.",
        "Hepatic Congestion: Overuse of processed high-carb foods congests liver tissue with excess glycogen.",
        "Systemic Inflammatory Cascades: Prolonged high sugars weaken blood vessel structures, affecting skin layers."
      ],
      note: "Diabetes Growth Axiom: Integrating fiber loads before high-carb meals directly reduces the overall sugar absorption rate by 30%."
    },
    page3Content: {
      heading: "The Fiber Loading Pre-Meal Protocol",
      protocolSteps: [
        "Check your current fasting blood sugar index immediately upon waking.",
        "15 minutes before lunch, consume 1 plate of raw cucumber and green leafy salad with a squeeze of fresh lemon juice.",
        "Incorporate a strict 15-minute continuous walks routine immediately after dinner.",
        "Replace standard milk tea with warm water containing a pinch of organic cinnamon powder."
      ],
      doctorAdvice: "Dr. Nishanti's Clinical Advice: Muscles are a massive sink for system glucose. When you take a light walk immediately after meals, your muscles absorb blood sugar natively via GLUT-4 gates, entirely bypassing cell insulin pathways."
    }
  },
  {
    id: "eb-failure-comeback",
    title: "21 Days From Failure to Comeback (English)",
    subInfo: "Emotional strength, confidence और personal growth के लिए 21 दिनों की practical journey. Designed by Dr. Nishanti Prajapati, this guide includes daily mindset exercises, self-improvement activities, reflection prompts, and progress trackers to help you build a stronger version of yourself.",
    author: "Dr. Nishanti Prajapati",
    originalPrice: 600,
    price: 199,
    discount: 67,
    badge: "67% OFF",
    timeTag: "⚡ INSTANT DIGITAL ACCESS",
    colorTheme: {
      from: "from-amber-700",
      to: "to-amber-950",
      accent: "text-amber-500",
      bgSubtle: "bg-amber-50",
      spineColor: "border-amber-950"
    },
    chapters: [
      "Welcome to Your 60-Page Comeback Journey",
      "The Foundation: Reclaiming Your Personal Agency",
      "Baseline Evaluation: Realistically Where Am I Today?",
      "Week 1: Rebuilding the Core Mindset Foundations (Days 1 - 7)",
      "Week 2: Strengthening Cognitive Resilience (Days 8 - 14)",
      "Week 3: External Strategic Action & Momentum (Days 15 - 21)",
      "The Emergency Mindset Reset Box Breathing Protocol",
      "21 Daily Reflective Worksheet Pages & Notes"
    ],
    introduction: "असफलताएं और चुनौतियां जीवन का हिस्सा हैं। यह 21-दिन की personal growth guide आपको daily self-reflection exercises, confidence-building activities, positive mindset techniques और practical action steps के माध्यम से मजबूत वापसी करने में मदद करती है।",
    page2Content: {
      heading: "The Three Pillars of Rebounding",
      bullets: [
        "Cognitive Flexibility: Shifting your thoughts from labeling yourself ('I am a failure') to labeling a process ('I experienced a setback').",
        "Somatic Grounding: Establishing immediate physical presence to calm the sympathetic nervous system.",
        "Micro-Action Consistency: Focusing on executing minor, realistic promises daily to recreate self-trust.",
        "Environmental Curation: Cutting off toxic and highly critical inputs while surrounding yourself with constructive growth tools."
      ],
      note: "Comeback Creed: Your past does explain your context, but it has absolutely no legal authority to determine your character."
    },
    page3Content: {
      heading: "Day 1 Action: Fact Stripping",
      protocolSteps: [
        "Write down the precise setback or disappointment you are struggling to move past.",
        "Strip away all emotional self-exaggeration and write down exactly three objective, structural facts of what happened.",
        "Identify one minor healthy boundary you will configure today to protect your daily mental bandwidth.",
        "Practice 4 rounds of box breathing (inhale 4s, hold 4s, exhale 4s, hold 4s) to reset deep autonomic fear."
      ],
      doctorAdvice: "Dr. Nishanti's Wellness Guideline: Worrying does not solve tomorrow's challenges; it simply depletes today's energy. Focus strictly on executing the micro-task directly in front of you."
    }
  },
  {
    id: "eb-weight-loss-en",
    title: "21 Days Doctor Guided Weight Loss Transformation Plan (English)",
    subInfo: "Transform Your Body, Improve Your Energy & Build Healthy Habits That Last",
    author: "Dr. Nishanti Prajapati",
    originalPrice: 600,
    price: 221,
    discount: 63,
    badge: "63% OFF",
    timeTag: "⚡ INSTANT DIGITAL ACCESS",
    colorTheme: {
      from: "from-green-700",
      to: "to-emerald-900",
      accent: "text-green-500",
      bgSubtle: "bg-green-50",
      spineColor: "border-green-950"
    },
    chapters: [
      "The Physics and Physiology of Metabolic Fat Burning",
      "Biological Assessment: Establishing Your Metabolism Baseline",
      "Balanced Nutrition: The Power of Satiety & Insulin Stability",
      "Weekly Progress Trackers (Days 1 - 21)",
      "Daily Practical Workout & Resistance Training Library",
      "Overcoming Plateaus and Managing Cortisol Levels",
      "The 7-Day Healthy Meal Prep Calendars & Swaps",
      "21 Daily Reflective Assessment Pages and Checklists"
    ],
    introduction: "A complete 64-page structured medical weight management system. Designed to optimize your thyroid speed, normalize blood insulin levels, preserve lean muscle tissues, and help you burn stubborn visceral body fat without dangerous fasting or calorie deprivation.",
    page2Content: {
      heading: "The Pillars of Sustainable Fat Loss",
      bullets: [
        "Lymphatic Activation: Active hydration and micro-movements ensure rapid release of cellular liquid waste.",
        "Satiety Management: High-density protein and healthy fats stabilize hunger hormones (Leptin & Ghrelin).",
        "The Power of NEAT: Spontaneous daily movement (stairs, stretching) speeds up your passive metabolic rate.",
        "Metabolic Plateau Defeat: Periodically adjusting exercise intensity prevents thyroid down-regulation."
      ],
      note: "Dr. Nishanti's Wisdom: Weight loss is not a mathematical game of severe starvation. It is a biological consequence of a deeply nourished and balanced body."
    },
    page3Content: {
      heading: "Day 1 Action: Ignition Sequence",
      protocolSteps: [
        "Drink 300ml of hot, tepid water on an empty stomach to pre-stimulate digestion juices.",
        "Perform a 10-minute active morning stretch and write down your primary body measurement values.",
        "Strictly replace refined morning carbohydrates with dense protein-rich alternatives.",
        "Audit package labels on standard household foods to locate hidden processed sugar groups."
      ],
      doctorAdvice: "Clinical Observation: Sugar crashes directly stimulate secondary hunger sensors. Keeping sugars zero and proteins high during the first 6 days resets your neural sweet carvings permanently."
    }
  },
  {
    id: "eb-weight-loss-hi",
    title: "21 Days Doctor Guided Weight Loss Transformation Plan (Hindi)",
    subInfo: "21 दिनों का वजन घटाने का रूपांतरण प्लान - अपने शरीर को बदलें",
    author: "Dr. Nishanti Prajapati",
    originalPrice: 600,
    price: 221,
    discount: 63,
    badge: "63% OFF",
    timeTag: "⚡ INSTANT DIGITAL ACCESS",
    colorTheme: {
      from: "from-orange-700",
      to: "to-amber-900",
      accent: "text-orange-500",
      bgSubtle: "bg-orange-50",
      spineColor: "border-orange-950"
    },
    chapters: [
      "चयापचय (Metabolism) और फैट बर्निंग का वैज्ञानिक विश्लेषण",
      "शारीरिक मूल्यांकन: Baseline Weight & Waist Measurement",
      "संतुलित आहार: दैनिक भोजन में प्रोटीन, फाइबर और वसा का महत्व",
      "दैनिक स्वास्थ्य दिनचर्या एवं साप्ताहिक प्रगति ट्रैकर (Days 1 - 21)",
      "फैट लॉस एक्सरसाइज लाइब्रेरी: उठक-बैठक, पुश-अप्स और प्लैंक",
      "मानसिकता रूपांतरण गाइड: असमयी भूख (Cravings) को कैसे रोकें?",
      "7-दिवसीय स्वस्थ भोजन योजनाकार और उपयोगी विकल्प",
      "21 दिनों का दैनिक विचार पत्रक तथा प्रमाणपत्र फॉर्म"
    ],
    introduction: "एक वैज्ञानिक और प्रामाणिक डॉक्टर-निर्देशित प्लान। भूखे रहने या खतरनाक क्रैश डाइट्स के बिना स्वाभाविक रूप से इंसुलिन को संतुलित करके, चयापचय (metabolism) को सक्रिय करके, और मांसपेशियों की सुरक्षा करके स्थायी रूप से चर्बी (fat) को घटाने की व्यावहारिक मार्गदर्शिका।",
    page2Content: {
      heading: "स्वस्थ वजन घटाने के चार मुख्य स्तंभ",
      bullets: [
        "संतुलित पोषण (Nutrition): थाली में प्रचुर मात्रा में प्रोटीन, फाइबर और स्वस्थ वसा का समावेश ताकि ग्लूकोज नियंत्रित रहे।",
        "नियमित शारीरिक गतिविधि (Movement): दैनिक जीवन में कम से कम 8,000 से 10,000 कदम चलना और स्ट्रेंथ ट्रेनिंग व्यायाम।",
        "तनाव नियंत्रण (Cortisol Balance): गहरे तनाव और कोर्टिसोल के कारण पेट पर वसा जमती है; ध्यान (meditation) द्वारा इसे प्रबंधित करें।",
        "पर्याप्त नींदनीं (Sleep): 7 - 8 घंटे की गहरी नींद से घ्रेलिन (भूख बढ़ाने वाला हार्मोन) और लेप्टिन (तृप्ति का हार्मोन) संतुलित रहते हैं।"
      ],
      note: "डॉ. निशांती की विशेष सलाह: क्रैश डाइट और भूखे रहने से आपका चयापचय स्थायी रूप से धीमा हो जाता है, जिससे अंततः वजन और तेजी से बढ़ता है।"
    },
    page3Content: {
      heading: "दिन 1: चयापचय को जागृत करना",
      protocolSteps: [
        "सुबह जागने के तुरंत बाद 250 - 300ml गुनगुना पानी पिएं (यह आंतों को प्राकृतिक रूप से साफ करता है)।",
        "सुबह के नाश्ते में अनिवार्य रूप से प्रोटीन शामिल करें (जैसे भुने मखाने, मूंग स्प्राउट्स, या पनीर)।",
        "दोपहर और रात के भोजन की थाली का आधा हिस्सा हरी सब्जियों तथा ताजे सलाद से सजाएं।",
        "प्रत्येक मुख्य भोजन के 15 मिनट बाद कम से कम 10 मिनट की एक नियमित वॉक अवश्य करें।"
      ],
      doctorAdvice: "विशेष आयुर्वेदिक संदेश: हमारा शरीर एक मंदिर है। इसे गंभीर भूख की पीड़ा देने के बजाय, शुद्ध, ताजे, और पोषक तत्वों से भरपूर संतुलित आहार के साथ प्राकृतिक रूपांतरण को सहज रूप से अपनाएं।"
    }
  }
];

export default function Ebooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeEbook, setActiveEbook] = useState<EBook | null>(null);
  const [demoPage, setDemoPage] = useState(1);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  
  // Order Form State matching user requirements
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Scientific Program eBooks | Dr. Nishanti Prajapati";
    window.scrollTo(0, 0);
    trackPixelEvent("ViewContent", {
      content_name: "Scientific eBooks Catalog",
      content_ids: ["ebooks_catalog"],
      content_type: "product",
      value: 0,
      currency: "INR"
    });
  }, []);

  useEffect(() => {
    if (activeEbook) {
      trackPixelEvent("AddToCart", {
        content_name: activeEbook.title,
        content_ids: [activeEbook.id],
        content_type: "product",
        value: activeEbook.price,
        currency: "INR"
      });
    }
  }, [activeEbook]);

  // Filter EBooks mapping easily with user intent
  const filteredEbooks = EBOOKS_DATA.filter((ebook) => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ebook.subInfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ebook.chapters.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (selectedCategory === "all") return matchesSearch;
    if (selectedCategory === "wellness") {
      return matchesSearch && (ebook.id.includes("diabetes") || ebook.id.includes("weight-loss"));
    }
    if (selectedCategory === "lifestyle") {
      return matchesSearch && (ebook.id.includes("sleep") || ebook.id.includes("impress-partner"));
    }
    if (selectedCategory === "growth") {
      return matchesSearch && (ebook.id.includes("failure-comeback"));
    }
    return matchesSearch;
  });

  const handleOpenDemo = (ebook: EBook) => {
    setActiveEbook(ebook);
    setDemoPage(1);
    setOrderModalOpen(false);
    setErrorMessage("");
  };

  const handleCloseModal = () => {
    setActiveEbook(null);
    setDemoPage(1);
    setErrorMessage("");
  };

  const COUNTRY_CODES = [
    { code: "+91", label: "🇮🇳 India (+91)" },
    { code: "+1", label: "🇺🇸 US/Canada (+1)" },
    { code: "+44", label: "🇬🇧 UK (+44)" },
    { code: "+971", label: "🇦🇪 UAE (+971)" },
    { code: "+61", label: "🇦🇺 Australia (+61)" },
    { code: "+65", label: "🇸🇬 Singapore (+65)" },
    { code: "+49", label: "🇩🇪 Germany (+49)" },
    { code: "+966", label: "🇸🇦 Saudi Arabia (+966)" },
    { code: "+965", label: "🇰🇼 Kuwait (+965)" },
    { code: "+974", label: "🇶🇦 Qatar (+974)" },
  ];

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEbook) return;

    if (!fullName.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }
    if (!phoneNumber.trim()) {
      setErrorMessage("Please enter your mobile phone number.");
      return;
    }

    const contactRegex = /^[0-9]{8,12}$/;
    if (!contactRegex.test(phoneNumber.trim().replace(/[-\s]/g, ""))) {
      setErrorMessage("Please enter a valid mobile number (8-12 digits without country code).");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const fullMobile = `${countryCode}${phoneNumber.trim().replace(/[-\s]/g, "")}`;
    const productCharge = activeEbook.price;
    const bookTitle = activeEbook.title;

    const orderData = {
      name: fullName.trim(),
      mobile: fullMobile,
      address: `Instant eBook Download Key (${activeEbook.id})`,
      area: "Active Clinic Community Core",
      city: "Instant PDF Deliverables",
      pincode: "PDF_EBOOK",
      state: "Digital Access System"
    };

    try {
      trackPixelEvent("InitiateCheckout", {
        content_name: activeEbook.title,
        content_ids: [activeEbook.id],
        content_type: "product",
        value: activeEbook.price,
        currency: "INR"
      });
      await triggerInstamojoCheckout({
        amount: productCharge,
        productName: `${bookTitle} complete eBook Program`,
        orderData,
        isEbook: true,
        ebookId: activeEbook.id,
        ebookTheme: activeEbook.colorTheme,
        onFailure: (err) => {
          setIsSubmitting(false);
          setErrorMessage(err || "Secure order was rejected or dismissed.");
        }
      });
    } catch (err: any) {
      console.error(err);
      setIsSubmitting(false);
      setErrorMessage("Instamojo payment checkout failed. Please refresh and try again.");
    }
  };

  return (
    <div className="bg-brand-cream/10 min-h-screen text-brand-dark pt-28 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Banner Section */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 text-brand-gold rounded-full text-xs font-bold uppercase tracking-widest border border-brand-gold/15"
          >
            <BookMarked size={14} className="animate-pulse" /> Dr. Nishanti Prajapati's Transformation Monographs
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
            Practical 21-Day <span className="text-brand-pink">Program eBooks</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed font-semibold">
            Take clinical charge of your sleep, relationship harmony, blood sugar, motivation, and fat loss transformation limits. Download complete step-by-step guides, reflective worksheets, and habit logs instantly.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-4 rounded-3xl border border-brand-cream/85 shadow-sm">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {[
              { id: "all", label: "📚 All Programs" },
              { id: "wellness", label: "⚖️ Weight Loss & Diabetes" },
              { id: "lifestyle", label: "🌙 Better Sleep & Partner" },
              { id: "growth", label: "🌱 Comeback & Growth" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-brand-pink text-white shadow-md shadow-brand-pink/15"
                    : "bg-brand-cream/20 text-gray-600 hover:bg-brand-cream/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search chapters or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-5 py-2.5 bg-brand-cream/15 border border-brand-cream/80 rounded-full text-sm font-medium text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-gold/45 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-dark"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* EBooks Grid - Tailored to the user requirement */}
        {filteredEbooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredEbooks.map((ebook, idx) => (
              <motion.div
                key={ebook.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
              >
                {/* 1. Discount Badge (Premium Blue-Sky Blue Style) */}
                <div className="absolute top-0 left-0 z-20 bg-blue-600 text-white font-extrabold text-[11px] tracking-wider px-3.5 py-1.5 rounded-br-lg shadow-sm">
                  {ebook.badge}
                </div>

                <div className="absolute top-2.5 right-3.5 z-20 text-[10px] text-gray-300 font-extrabold uppercase tracking-widest">
                  PDF eBook
                </div>

                {/* 2. Visual Book Cover Frame - Padded & Bolder design */}
                <div 
                  onClick={() => navigate(`/ebooks/${ebook.id}`)}
                  className="pt-12 pb-9 px-8 bg-gradient-to-b from-gray-50/70 to-white flex justify-center items-center relative overflow-hidden group-hover:from-gray-100/40 transition-colors duration-300 border-b border-gray-100 cursor-pointer"
                >
                  <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-brand-pink/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                  {/* 3D Rendered Premium Larger CSS Book Cover */}
                  <div className="w-[155px] h-[215px] rounded-r-lg shadow-lg hover:shadow-2xl transition-all duration-300 relative flex flex-col justify-between p-4 overflow-hidden select-none border-l-[6px] border-black/40 transform group-hover:scale-105 group-hover:rotate-1">
                    <div className={`absolute inset-0 bg-gradient-to-tr ${ebook.colorTheme.from} ${ebook.colorTheme.to} opacity-95`} />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                    
                    {/* Spinal Shine Gloss Layer */}
                    <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-r from-white/20 via-transparent to-transparent z-20" />

                    {/* Book Cover Content rendering nicely */}
                    <div className="relative z-10 space-y-1">
                      <span className="text-[6.5px] text-white/70 font-semibold uppercase tracking-widest block border-b border-white/10 pb-0.5">
                        21-DAY CHRONO SERIES
                      </span>
                      <span className="text-[6.5px] text-white/50 block font-bold font-mono">
                        By Dr. Nishanti Prajapati
                      </span>
                    </div>

                    {/* Book Title */}
                    <div className="relative z-10 text-center space-y-1">
                      <BookOpen size={16} className="text-white/80 mx-auto" />
                      <h3 className="text-[10px] font-display font-extrabold text-white text-center leading-tight tracking-tight drop-shadow-md">
                        {ebook.title}
                      </h3>
                    </div>

                    {/* Book Footer */}
                    <div className="relative z-10 flex justify-between items-center text-[5.5px] text-white/60 font-semibold uppercase tracking-wider">
                      <span>Vol. II</span>
                      <span className="bg-white/15 px-1 py-0.5 rounded text-white text-[5px]">Complete Guide</span>
                    </div>
                  </div>
                </div>

                {/* 3. Details description beneath cover */}
                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <div className="text-[10px] text-emerald-500 font-extrabold tracking-wider flex items-center gap-1">
                      {ebook.timeTag}
                    </div>

                    {/* Bold Title */}
                    <h3 
                      onClick={() => navigate(`/ebooks/${ebook.id}`)}
                      className="text-[15px] leading-snug font-extrabold text-gray-950 group-hover:text-brand-pink transition-colors cursor-pointer line-clamp-2"
                    >
                      {ebook.title}
                    </h3>
                    
                    {/* Sub title / copy */}
                    <p className="text-[11.5px] text-gray-400 font-medium leading-relaxed line-clamp-2">
                      {ebook.subInfo}
                    </p>
                  </div>

                  {/* 4. Price Block & ADD button matching visual reference */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    
                    <div className="flex flex-col">
                      <span className="text-[16px] font-black text-gray-900 leading-none">
                        ₹{ebook.price}
                      </span>
                      <span className="text-[11.5px] text-gray-400 font-bold line-through mt-0.5">
                        ₹{ebook.originalPrice}
                      </span>
                    </div>

                    {/* Elegant outline ADD button as requested */}
                    <button
                      onClick={() => navigate(`/ebooks/${ebook.id}`)}
                      className="px-6 py-2 rounded-xl border-2 border-emerald-500 hover:bg-emerald-500 text-emerald-600 hover:text-white text-[12.5px] font-black tracking-wide transition-all duration-300 cursor-pointer text-center"
                    >
                      ADD
                    </button>

                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-brand-cream p-8">
            <HelpCircle size={48} className="mx-auto text-gray-300 mb-4 animate-bounce" />
            <h3 className="text-lg font-bold text-brand-dark">No Programs Found</h3>
            <p className="text-gray-400 text-sm mt-1 max-w-md mx-auto">
              We couldn't find any resources matching "{searchQuery}". Try selecting a different topic category or clearing your search.
            </p>
          </div>
        )}

        {/* Subtle Admin Upload portal link for the Doctor */}
        <div className="mt-20 pt-8 border-t border-brand-cream/45 flex justify-center">
          <Link
            to="/ebooks/upload-dashboard"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-cream/5 hover:bg-emerald-50/20 border border-brand-cream hover:border-emerald-500/25 rounded-full text-[11px] font-bold text-gray-500 hover:text-emerald-700 tracking-wide transition-all shadow-sm"
          >
            👨‍⚕️ Partner program security portal & eBook upload dashboard
          </Link>
        </div>

      </div>

      {/* Interactive 3-Page EBook Preview & Locked payment overlay */}
      <AnimatePresence>
        {activeEbook && (
          <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-brand-dark/70 backdrop-blur-xs"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-brand-cream/80 overflow-hidden flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh] z-50 text-brand-dark"
            >
              
              {/* Left sidebar: Directory index */}
              <div className="w-full md:w-1/3 p-6 bg-brand-cream/15 border-b md:border-b-0 md:border-r border-brand-cream/50 flex flex-col justify-between max-h-[180px] md:max-h-none overflow-y-auto">
                <div className="space-y-4">
                  {/* Book cover visual block */}
                  <div className="hidden md:flex justify-center pt-2">
                    <div className={`w-[100px] h-[140px] rounded-r-md shadow-md bg-gradient-to-tr ${activeEbook.colorTheme.from} ${activeEbook.colorTheme.to} flex flex-col justify-between p-3 border-l-4 border-black/35 relative text-white select-none`}>
                      <div className="absolute top-0 left-0 w-[1px] h-full bg-white/20" />
                      <span className="text-[5px] text-white/50 tracking-widest block uppercase">CLINICAL MONOGRAPH</span>
                      <BookOpen size={14} className="mx-auto text-white/80" />
                      <h4 className="text-[6.5px] font-bold text-center leading-tight line-clamp-3">
                        {activeEbook.title}
                      </h4>
                      <span className="text-[5px] text-right text-white/30 block font-light">Dr. Nishanti</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-black text-brand-dark uppercase tracking-wider flex items-center gap-1.5 border-b border-brand-cream pb-1">
                      <GraduationCap size={15} className="text-brand-pink" /> 21-Day Syllabus
                    </h3>
                    <ul className="text-[11px] text-gray-500 font-semibold space-y-1.5 md:space-y-2.5">
                      {activeEbook.chapters.map((chap, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-1">
                          <span className="text-brand-gold select-none font-extrabold">Ch {cIdx+1}.</span>
                          <span className="line-clamp-1">{chap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="hidden md:block border-t border-brand-cream/60 pt-4 mt-4 text-center">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-extrabold justify-center uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" /> Secure Clinical Server
                  </div>
                </div>
              </div>

              {/* Right column: Interactive sliding reader preview */}
              <div className="w-full md:w-2/3 flex flex-col justify-between overflow-y-auto h-[70vh] md:h-auto min-h-0 bg-gray-50/50">
                
                {/* Header bar */}
                <div className="p-5 border-b border-brand-cream/50 bg-white sticky top-0 flex items-center justify-between z-10 shadow-xs">
                  <div className="space-y-0.5">
                    <span className="text-[9.5px] text-brand-pink font-extrabold uppercase tracking-widest block">
                      Previewing Page {demoPage} of 3
                    </span>
                    <h2 className="text-xs md:text-sm font-display font-extrabold text-brand-dark line-clamp-1">
                      {activeEbook.title}
                    </h2>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-brand-dark rounded-full cursor-pointer transition-colors"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Page content view */}
                <div className="p-6 md:p-8 flex-grow space-y-6 min-h-[320px]">
                  
                  <AnimatePresence mode="wait">
                    {demoPage === 1 && (
                      <motion.div
                        key="page1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 pb-2 border-b border-brand-cream/50">
                          <FileText size={18} className="text-brand-gold" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PAGE 1: WELCOME NOTE</span>
                        </div>
                        <h3 className="text-base md:text-lg font-display font-bold text-brand-dark leading-tight">
                          Introduction & Wellness Journey Notes
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-semibold">
                          {activeEbook.introduction}
                        </p>
                      </motion.div>
                    )}

                    {demoPage === 2 && (
                      <motion.div
                        key="page2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 pb-2 border-b border-brand-cream/50">
                          <FileText size={18} className="text-brand-gold" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PAGE 2: DETAILED INDEX & TOPICS</span>
                        </div>
                        <h3 className="text-base font-display font-bold text-brand-dark leading-snug">
                          {activeEbook.page2Content.heading}
                        </h3>
                        
                        <div className="space-y-2.5">
                          {activeEbook.page2Content.bullets.map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed font-semibold">
                              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 bg-brand-pink`} />
                              <span>{bullet}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3 bg-amber-500/10 border border-amber-500/15 rounded-xl text-[11px] text-amber-800 font-extrabold flex items-center gap-1.5">
                          <span>💡 {activeEbook.page2Content.note}</span>
                        </div>
                      </motion.div>
                    )}

                    {demoPage === 3 && !orderModalOpen && (
                      <motion.div
                        key="page3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center gap-2 pb-2 border-b border-brand-cream/50">
                          <FileText size={18} className="text-brand-gold" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">PAGE 3: SCIENTIFIC FLOW PROTOCOLS</span>
                        </div>
                        <h3 className="text-base font-display font-bold text-brand-dark leading-snug">
                          {activeEbook.page3Content.heading}
                        </h3>

                        <div className="space-y-2">
                          {activeEbook.page3Content.protocolSteps.map((step, idx) => (
                            <div key={idx} className="bg-brand-cream/15 border border-brand-cream/80 p-2.5 rounded-xl flex gap-3 text-xs text-gray-650 leading-relaxed font-semibold">
                              <span className="flex items-center justify-center w-5 h-5 bg-brand-gold text-white font-black rounded-full text-[9px] flex-shrink-0">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-3.5 bg-brand-dark text-white rounded-xl text-[11px] leading-relaxed font-medium">
                          ⭐ {activeEbook.page3Content.doctorAdvice}
                        </div>
                      </motion.div>
                    )}

                    {orderModalOpen && (
                      <motion.div
                        key="payment_payload"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-5"
                      >
                        <div className="text-center space-y-2 max-w-md mx-auto">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-rose-50 text-rose-500 rounded-full animate-bounce">
                            <Lock size={20} />
                          </div>
                          <h3 className="text-base font-display font-extrabold text-brand-dark">
                            Remaining Chapters Locked!
                          </h3>
                          <p className="text-xs text-gray-400 font-bold leading-relaxed">
                            Provide your checkout details to instantly unlock the daily checklists, recipe guides, worksheets, and full access guides.
                          </p>
                        </div>

                        {/* Payment capture form */}
                        <form onSubmit={handleOrderSubmit} className="space-y-4 bg-white border border-brand-cream rounded-2xl p-4 md:p-5 shadow-xs">
                          {errorMessage && (
                            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-bold flex items-center gap-2">
                              <AlertCircle size={15} /> {errorMessage}
                            </div>
                          )}

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                              Your Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                              <input
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Rahul Sharma"
                                className="w-full pl-10 pr-4 py-2.5 bg-brand-cream/10 border border-brand-cream rounded-xl text-xs font-bold focus:outline-none focus:ring-1.5 focus:ring-brand-gold focus:bg-white text-brand-dark"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
                              Mobile Number (with Country Code)
                            </label>
                            <div className="flex gap-2">
                              <div className="relative">
                                <select
                                  value={countryCode}
                                  onChange={(e) => setCountryCode(e.target.value)}
                                  className="appearance-none bg-brand-cream/15 border border-brand-cream text-xs font-bold px-3 py-2.5 rounded-xl text-brand-dark focus:outline-none focus:ring-1.5 focus:ring-brand-gold pr-7 cursor-pointer"
                                >
                                  {COUNTRY_CODES.map((item) => (
                                    <option key={item.code} value={item.code}>
                                      {item.code}
                                    </option>
                                  ))}
                                </select>
                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[8.5px]">
                                  ▼
                                </div>
                              </div>
                              
                              <div className="relative flex-grow">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                                <input
                                  type="tel"
                                  required
                                  value={phoneNumber}
                                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))}
                                  placeholder="9110839962"
                                  className="w-full pl-10 pr-4 py-2.5 bg-brand-cream/10 border border-brand-cream rounded-xl text-xs font-bold focus:outline-none focus:ring-1.5 focus:ring-brand-gold focus:bg-white text-brand-dark"
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-lg hover:shadow-emerald-500/20 transition-all ${
                              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                            }`}
                          >
                            {isSubmitting ? (
                              <>
                                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Generating Secure Access Link...
                              </>
                            ) : (
                              <>
                                <CreditCard size={15} /> Confirm Order & Download eBook (₹{activeEbook.price})
                              </>
                            )}
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* Bottom Navigation controls */}
                <div className="p-5 border-t border-brand-cream/50 bg-white sticky bottom-0 flex items-center justify-between z-10 font-bold text-xs">
                  {!orderModalOpen ? (
                    <>
                      <button
                        onClick={() => setDemoPage((prev) => Math.max(1, prev - 1))}
                        disabled={demoPage === 1}
                        className={`flex items-center gap-1 text-gray-405 hover:text-brand-dark cursor-pointer transition-colors ${
                          demoPage === 1 ? "opacity-35 cursor-not-allowed" : ""
                        }`}
                      >
                        <ChevronLeft size={16} /> Back
                      </button>

                      <span className="text-gray-400 uppercase tracking-widest text-[9.5px]">
                        Page {demoPage} of 3
                      </span>

                      {demoPage < 3 ? (
                        <button
                          onClick={() => setDemoPage((prev) => prev + 1)}
                          className="flex items-center gap-1 text-brand-pink hover:text-brand-pink/85 cursor-pointer transition-all"
                        >
                          Next Page <ChevronRight size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setOrderModalOpen(true);
                          }}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-brand-pink text-white rounded-full text-[11px] font-extrabold hover:bg-brand-pink/90 transition-all cursor-pointer shadow-md"
                        >
                          Unlock Full Program <ArrowRight size={14} />
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setOrderModalOpen(false);
                          setDemoPage(3);
                          setErrorMessage("");
                        }}
                        className="flex items-center gap-1 text-gray-400 hover:text-brand-dark cursor-pointer transition-colors"
                      >
                        <ChevronLeft size={16} /> Back to Demo
                      </button>
                      <span className="text-gray-400 font-semibold text-[10.5px]">
                        🔒 SSL Encrypted Checkout
                      </span>
                    </>
                  )}
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
