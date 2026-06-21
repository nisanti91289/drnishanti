import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import logoUrl from "../assets/images/clinic_logo.png";
import { trackPixelEvent } from "../utils/pixel";
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  Linkedin,
  ChevronRight,
  ChevronDown,
  ExternalLink
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Logo() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
      <img 
        src={logoUrl} 
        alt="Dr. Nishanti's Clinic Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync mobile products menu toggle when main drawer is closed
  useEffect(() => {
    if (!isOpen) {
      setMobileProductsOpen(false);
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Treatments", path: "/treatments" },
    { name: "Products", path: "/products" },
    { name: "EBook", path: "/ebooks" },
    { name: "Contact", path: "/contact" },
  ];

  const productSubLinks = [
    { name: "Skin Blossom", path: "/products/skin-blossom" },
    { name: "Anti Ageing", path: "/products/anti-ageing" },
    { name: "Anti Acidity", path: "/products/anti-acidity" },
    { name: "Ozone Rapid Heal", path: "/products/ozone-rapid-heal" },
    { name: "Ozone Hair Revive", path: "/products/ozone-hair-revive" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-lg shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <Logo />
          <div className="flex flex-col">
            <span className={`font-display font-bold text-lg leading-tight bg-[#f8c300] px-1.5 py-0.5 rounded ${scrolled ? "text-brand-blue" : "text-brand-blue md:text-white"}`}>
              DR. NISHANTI'S
            </span>
            <span className={`text-[10px] ml-[5px] font-medium tracking-widest uppercase ${scrolled ? "text-brand-pink" : "text-brand-pink md:text-white/80"}`}>
              Skin Hair & Wellness
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.name === "Products") {
              const isProductPathActive = location.pathname.startsWith("/products");
              return (
                <div key={link.name} className="relative group flex items-center">
                  <Link
                    to={link.path}
                    className={`text-sm font-medium tracking-wide hover:text-brand-gold transition-colors flex items-center gap-1 py-2 ${
                      isProductPathActive
                        ? "text-brand-gold" 
                        : (scrolled ? "text-brand-dark" : "text-white")
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300 pointer-events-none" />
                  </Link>
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-white text-brand-dark rounded-2xl shadow-xl border border-brand-cream/85 py-3 flex flex-col overflow-hidden">
                      {productSubLinks.map((subLink) => (
                        <Link
                          key={subLink.path}
                          to={subLink.path}
                          className={`px-5 py-2.5 text-sm font-medium hover:bg-brand-cream/40 hover:text-brand-gold transition-colors border-l-2 ${
                            location.pathname === subLink.path
                              ? "border-brand-gold text-brand-gold bg-brand-cream/20"
                              : "border-transparent text-gray-700"
                          }`}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                      <div className="border-t border-brand-cream/50 mt-2 pt-2 mx-5">
                        <Link 
                          to="/products"
                          className="text-xs text-gray-400 font-semibold uppercase tracking-wider hover:text-brand-gold flex items-center justify-between"
                        >
                          View All Products
                          <ChevronRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide hover:text-brand-gold transition-colors ${
                  location.pathname === link.path 
                    ? "text-brand-gold" 
                    : (scrolled ? "text-brand-dark" : "text-white")
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <a 
            href="https://wa.me/9110839962"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-brand-pink text-white rounded-full text-sm font-semibold hover:bg-brand-pink/90 transition-all shadow-lg hover:shadow-brand-pink/20 hover:-translate-y-0.5"
          >
            Book Appointment
          </a>
        </div>

        {/* mobile toggle */}
        <button 
          className="md:hidden text-brand-blue"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-2xl p-6 flex flex-col gap-4 md:hidden border-t border-brand-cream"
          >
            {navLinks.map((link) => {
              if (link.name === "Products") {
                const isProductPathActive = location.pathname.startsWith("/products");
                return (
                  <div key={link.name} className="flex flex-col gap-2">
                    <button
                      onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                      className={`text-lg font-display font-semibold flex items-center justify-between text-left w-full outline-none focus:outline-none ${
                        isProductPathActive ? "text-brand-gold" : "text-brand-dark"
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown 
                        size={20} 
                        className={`transition-transform duration-300 ${mobileProductsOpen ? "rotate-180 text-brand-gold" : "text-gray-400"}`} 
                      />
                    </button>
                    <AnimatePresence>
                      {mobileProductsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden pl-4 flex flex-col gap-3 border-l-2 border-brand-cream ml-1 mt-1"
                        >
                          {productSubLinks.map((subLink) => (
                            <Link
                              key={subLink.path}
                              to={subLink.path}
                              onClick={() => {
                                setIsOpen(false);
                                setMobileProductsOpen(false);
                              }}
                              className={`text-base font-medium ${
                                location.pathname === subLink.path ? "text-brand-gold font-semibold" : "text-gray-600"
                              }`}
                            >
                              {subLink.name}
                            </Link>
                          ))}
                          <Link
                            to="/products"
                            onClick={() => {
                              setIsOpen(false);
                              setMobileProductsOpen(false);
                            }}
                            className="text-xs text-brand-pink font-semibold uppercase tracking-wider pt-1 flex items-center gap-1"
                          >
                            All Products <ChevronRight size={12} />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-display font-semibold ${
                    location.pathname === link.path ? "text-brand-gold" : "text-brand-dark"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <hr className="border-brand-cream" />
            <div className="flex flex-col gap-3">
              <a 
                href="tel:+919110839962"
                className="flex items-center justify-center gap-2 w-full py-4 bg-brand-blue text-white rounded-xl font-bold"
              >
                <Phone size={18} /> Call Now
              </a>
              <a 
                href="https://wa.me/919110839962"
                className="flex items-center justify-center gap-2 w-full py-4 bg-green-500 text-white rounded-xl font-bold"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="space-y-6 md:col-span-1">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight text-white">
                DR. NISHANTI'S
              </span>
              <span className="text-[10px] font-medium tracking-widest uppercase text-brand-pink">
                Skin Hair & Wellness
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Treatment for Skin, hair, chronic ailments, knee pain, back pain, cervical pain, allergy, asthama & psoriasis using advanced Ozone Therapy in Ahmedabad.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/SkinHairandAyurvedaClinic" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-blue transition-colors"><Facebook size={18} /></a>
            <a href="https://www.instagram.com/skinhairayurvedaclinic" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-blue transition-colors -ml-[14px]"><Instagram size={18} /></a>
            <a href="https://www.linkedin.com/company/skin-hair-and-ayurveda-clinic/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-blue transition-colors -ml-[14px]"><Linkedin size={18} /></a>
            <a href="https://in.pinterest.com/skinhairandayurvedaclinic/_created" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-blue transition-colors -ml-[14px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22c.666-3.333 2.333-11.667 2.333-11.667S9.667 9.11 9.667 7.777c0-2.11 1.222-3.667 2.722-3.667 1.278 0 1.944.944 1.944 2.11 0 1.278-.833 3.222-1.278 5-.333 1.5.778 2.722 2.222 2.722 2.667 0 4.722-2.833 4.722-6.889 0-3.611-2.611-6.111-6.278-6.111-4.278 0-6.778 3.222-6.778 6.556 0 1.278.5 2.667 1.111 3.389.111.111.111.222.056.389-.111.444-.333 1.333-.389 1.556-.056.222-.167.278-.389.167-1.5-.722-2.444-2.944-2.444-4.722 0-3.833 2.778-7.389 8.056-7.389 4.222 0 7.5 3.056 7.5 7.056 0 4.222-2.667 7.611-6.389 7.611-1.222 0-2.389-.667-2.778-1.389l-.778 2.889c-.278 1.056-1.056 2.389-1.556 3.222"/></svg>
            </a>
            <a href="https://x.com/SkinHairAyurved" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-blue transition-colors -ml-[14px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.464-2.464l6.768-6.768"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6 text-brand-gold">Treatments</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><ChevronRight size={14} /> Acne & Scar Removal</li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><ChevronRight size={14} /> Hair Fall Control</li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><ChevronRight size={14} /> Ozone Therapy</li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><ChevronRight size={14} /> PRP Treatment</li>
            <li className="hover:text-white transition-colors cursor-pointer flex items-center gap-2"><ChevronRight size={14} /> Pain Management</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6 text-brand-gold">Clinic Timing</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex justify-between">
              <span>Mon, Tue, Wed, Fri:</span>
              <span className="text-white">12:00PM - 6:00PM</span>
            </li>
            <li className="flex justify-between opacity-50">
              <span>Thursday:</span>
              <span>Closed</span>
            </li>
            <li className="flex justify-between opacity-50">
              <span>Saturday:</span>
              <span>Closed</span>
            </li>
            <li className="flex justify-between opacity-50">
              <span>Sunday:</span>
              <span>Closed</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6 text-brand-gold">Policies & Legals</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link to="/terms-and-conditions" className="hover:text-white transition-colors flex items-center gap-2">
                <ChevronRight size={14} /> Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white transition-colors flex items-center gap-2">
                <ChevronRight size={14} /> Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/refund-policy" className="hover:text-white transition-colors flex items-center gap-2" title="No Refund after place order">
                <ChevronRight size={14} /> Refund & Cancellation
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="hover:text-white transition-colors flex items-center gap-2" title="We try to deliver in 3-4 days">
                <ChevronRight size={14} /> Shipping Policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-lg mb-6 text-brand-gold">Get In Touch</h4>
          <div className="space-y-4 text-sm text-gray-400">
            <div className="flex gap-3">
              <MapPin className="text-brand-pink shrink-0" size={18} />
              <span>F-31, Savita Park, Sanjivani Clinic, Isanpur, Ahmedabad</span>
            </div>
            <div className="flex gap-3">
              <Phone className="text-brand-pink shrink-0 animate-pulse" size={18} />
              <div>
                <span className="text-white font-semibold">+91 91108 39962</span>
                <span className="block text-[11px] text-gray-500 mt-0.5">WhatsApp support for queries</span>
              </div>
            </div>
            <a 
              href="https://share.google/wcmCboUs39SOxBD2h"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-4 py-3 bg-brand-blue text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-brand-blue/90 transition-all text-center"
            >
              <MapPin size={16} /> Get Directions
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} Dr. Nishanti's Skin Hair & Wellness. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/privacy-policy" className="hover:text-white hover:underline transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link to="/terms-and-conditions" className="hover:text-white hover:underline transition-colors duration-200">
            Terms & Conditions
          </Link>
          <Link to="/refund-policy" className="hover:text-white hover:underline transition-colors duration-200">
            Refund Policy
          </Link>
          <Link to="/shipping-policy" className="hover:text-white hover:underline transition-colors duration-200">
            Shipping Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function StickyCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 group">
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="https://wa.me/919110839962"
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-green-600 transition-colors"
      >
        <MessageCircle size={30} />
      </motion.a>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href="tel:+919110839962"
        className="w-14 h-14 bg-brand-blue text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-700 transition-colors"
      >
        <Phone size={28} />
      </motion.a>
    </div>
  );
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPixelEvent("PageView");
  }, [pathname]);

  const isProductPage = pathname.startsWith("/products");
  const isCheckoutScreen = pathname === "/checkout/instamojo-mock";

  if (isCheckoutScreen) {
    return (
      <div className="min-h-screen bg-slate-100">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen selection:bg-brand-blue/10 selection:text-brand-blue">
      <Navbar />
      <main className="overflow-hidden">
        {children}
      </main>
      <Footer />
      {!isProductPage && <StickyCTA />}
    </div>
  );
}
