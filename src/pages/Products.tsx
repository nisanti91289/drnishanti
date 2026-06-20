import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MessageCircle, Star, CheckCircle2, Sparkles, ShieldCheck, Zap, Droplets } from "lucide-react";

// Using direct paths from /public/images/ for better reliability on Netlify
const AntiAcidity1 = "/images/regenerated_image_1778181782220.webp";
const AntiAcidity2 = "/images/regenerated_image_1778181783807.webp";
const AntiAcidity3 = "/images/regenerated_image_1778181785434.webp";
const AntiAcidity4 = "/images/regenerated_image_1778181787483.webp";
const SkinBlossom1 = "/images/regenerated_image_1778182243725.webp";
const SkinBlossom2 = "/images/regenerated_image_1778182396887.webp";
const SkinBlossom3 = "/images/regenerated_image_1778182398841.webp";
const SkinBlossom4 = "/images/regenerated_image_1778182401054.webp";
const AntiAgeing1 = "/images/regenerated_image_1778182655790.webp";
const AntiAgeing2 = "/images/regenerated_image_1778182657668.webp";
const AntiAgeing3 = "/images/regenerated_image_1778182659916.webp";
const AntiAgeing4 = "/images/regenerated_image_1778182662171.webp";
const HairRevive1 = "/images/regenerated_image_1778182921229.webp";
const HairRevive2 = "/images/regenerated_image_1778182923489.webp";
const HairRevive3 = "/images/regenerated_image_1778182926154.webp";
const HairRevive4 = "/images/regenerated_image_1778182928815.webp";
const RapidHeal1 = "/images/regenerated_image_1778183207659.webp";
const RapidHeal2 = "/images/regenerated_image_1778183209590.webp";
const RapidHeal3 = "/images/regenerated_image_1778245098856.png";
const RapidHeal4 = "/images/regenerated_image_1778245112770.png";

const productSections = [
  {
    id: "skin-blossom",
    name: "Skin Blossom",
    desc: "A powerful blend for radiant and healthy skin.",
    benefits: ["Rejuvenates the Skin", "Target Pimples", "Sun Protection", "Pigmentation Control"],
    price: "₹649",
    originalPrice: "₹799",
    path: "/products/skin-blossom",
    images: [
      SkinBlossom1,
      SkinBlossom2,
      SkinBlossom3,
      SkinBlossom4
    ],
    color: "brand-pink"
  },
  {
    id: "anti-acidity",
    name: "Anti Acidity",
    desc: "Natural relief for digestive discomfort and gut wellness.",
    benefits: ["Acid Reflux relief", "Peptic Ulcers support", "Improved Gut Health"],
    price: "₹449",
    originalPrice: "₹599",
    path: "/products/anti-acidity",
    images: [AntiAcidity1, AntiAcidity2, AntiAcidity3, AntiAcidity4],
    color: "brand-blue"
  },
  {
    id: "anti-ageing",
    name: "Anti Ageing",
    desc: "Turn back the clock with our premium restorative cream.",
    benefits: ["Anti Ageing therapy", "Wrinkles reduction", "Fine Line Repair"],
    price: "₹949",
    originalPrice: "₹1,149",
    path: "/products/anti-ageing",
    images: [
      AntiAgeing1,
      AntiAgeing2,
      AntiAgeing3,
      AntiAgeing4
    ],
    color: "brand-gold"
  },
  {
    id: "ozone-hair-revive",
    name: "Ozone Hair Revive",
    desc: "Activated ozone technology for hair restoration and strength.",
    benefits: ["Rejuvenates Hair", "Combats Hair Loss", "Prevents Dandruff", "Fixes Thinning of Hair", "Alopecia support"],
    price: "₹599",
    originalPrice: "₹699",
    path: "/products/ozone-hair-revive",
    images: [
      HairRevive1,
      HairRevive2,
      HairRevive3,
      HairRevive4
    ],
    color: "brand-blue"
  },
  {
    id: "ozone-rapid-heal",
    name: "Ozone Rapid Heal",
    desc: "Rapid infection fighter for skin health and recovery.",
    benefits: ["Fights Infections", "Treats Skin Infections", "Cold Sores relief", "Jock Itch support", "Toe Fungus therapy"],
    price: "₹699",
    originalPrice: "₹799",
    path: "/products/ozone-rapid-heal",
    images: [
      RapidHeal1,
      RapidHeal2,
      RapidHeal3,
      RapidHeal4
    ],
    color: "brand-pink"
  }
];

export default function Products() {
  useEffect(() => {
    document.title = "Premium Wellness Products";
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 bg-brand-dark overflow-hidden text-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-pink/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white">
              Premium <span className="text-brand-gold">Wellness</span> Products
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg lg:text-xl font-light font-sans leading-relaxed">
              Carefully formulated clinical and Ozone solutions for your daily skin, hair, and internal health maintenance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid of Products */}
      <section className="py-24 bg-brand-cream/20">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {productSections.map((section, sIdx) => (
            <div key={section.id} className="space-y-12">
              {/* Info Header */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-sm font-bold tracking-widest uppercase ${
                    section.color === 'brand-pink' ? 'text-brand-pink' : 
                    section.color === 'brand-blue' ? 'text-brand-blue' : 'text-brand-gold'
                  }`}>
                    <Star size={14} /> Product Clinical Detail
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-display font-bold text-brand-dark leading-tight">
                    {section.name}
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {section.desc}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-3">
                        <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                        <span className="text-brand-dark font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 flex flex-wrap items-center gap-4 sm:gap-6">
                    <div className="flex flex-col">
                      {section.originalPrice && (
                        <span className="text-xs text-gray-400 line-through font-semibold block -mb-1">{section.originalPrice}</span>
                      )}
                      <span className="text-3xl font-bold text-brand-dark">{section.price}</span>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {section.path ? (
                        <Link 
                          to={section.path}
                          className={`inline-flex items-center gap-2 px-8 py-3.5 border-2 font-bold rounded-full transition-all hover:shadow-md hover:-translate-y-0.5 ${
                            section.color === "brand-pink" 
                              ? "border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white"
                              : "border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark"
                          }`}
                        >
                          <Sparkles size={16} /> View Details
                        </Link>
                      ) : (
                        <a 
                          href={`https://wa.me/919110839962?text=I'm%20interested%20in%20buying%20${encodeURIComponent(section.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-10 py-4 bg-green-500 text-white rounded-full font-bold hover:bg-green-600 transition-all shadow-xl hover:shadow-green-500/20 hover:-translate-y-1"
                        >
                          <MessageCircle size={20} /> View Details
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Main Product Feature Iconography */}
                <motion.div
                   initial={{ opacity: 0, x: 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="flex justify-center"
                >
                  <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                     <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col items-center gap-3 text-center">
                        <ShieldCheck className="text-brand-blue" size={40} />
                        <span className="text-xs font-bold uppercase text-gray-400">Tested</span>
                     </div>
                     <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col items-center gap-3 text-center">
                        <Zap className="text-brand-gold" size={40} />
                        <span className="text-xs font-bold uppercase text-gray-400">Effective</span>
                     </div>
                     <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col items-center gap-3 text-center">
                        <Droplets className="text-brand-blue" size={40} />
                        <span className="text-xs font-bold uppercase text-gray-400">Pure</span>
                     </div>
                     <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col items-center gap-3 text-center">
                        <Sparkles className="text-brand-pink" size={40} />
                        <span className="text-xs font-bold uppercase text-gray-400">Quality</span>
                     </div>
                  </div>
                </motion.div>
              </div>

              {/* Image Gallery with Hover Effect */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {section.images.map((img, iIdx) => (
                  <motion.div
                    key={iIdx}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative aspect-square rounded-[2rem] overflow-hidden group shadow-lg border-2 border-white"
                  >
                    <img 
                      src={img} 
                      alt={`${section.name} version ${iIdx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 bg-brand-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <Star className="text-brand-gold mx-auto" size={48} />
          <h2 className="text-3xl lg:text-5xl font-display font-bold italic">"Excellence in Clinical Care Meets Daily Maintenance"</h2>
          <p className="text-white/60 text-lg font-light leading-relaxed">
            Our products are extensions of our treatments. They are designed to maintain the results achieved in-clinic and provide long-lasting health for your skin and hair using the purest ingredients and medical-grade ozone.
          </p>
          <div className="pt-8">
             <Link 
               to="/contact"
               className="px-10 py-4 border-2 border-brand-gold text-brand-gold rounded-full font-bold hover:bg-brand-gold hover:text-brand-dark transition-all"
             >
               Visit Our Clinic
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
