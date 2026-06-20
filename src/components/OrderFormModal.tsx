import React, { useState, useEffect } from "react";
import { X, MapPin, Phone, User, ShoppingBag, ArrowRight, AlertCircle, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import logoUrl from "../assets/images/clinic_logo.png";
import { trackPixelEvent } from "../utils/pixel";

export interface OrderFormData {
  name: string;
  mobile: string;
  address: string;
  area: string;
  city: string;
  pincode: string;
  state: string;
}

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  amount: number;
  onSubmit: (formData: OrderFormData) => void;
}

const INDIAN_STATES = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

export default function OrderFormModal({
  isOpen,
  onClose,
  productName,
  amount,
  onSubmit
}: OrderFormModalProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    name: "",
    mobile: "",
    address: "",
    area: "",
    city: "",
    pincode: "",
    state: "Gujarat" // default selection
  });

  const [errors, setErrors] = useState<Partial<OrderFormData>>({});
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setIsIframe(window.self !== window.top);
  }, []);

  useEffect(() => {
    if (isOpen) {
      trackPixelEvent("AddToCart", {
        content_name: productName,
        content_ids: [productName],
        content_type: "product",
        value: amount,
        currency: "INR"
      });
    }
  }, [isOpen, productName, amount]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    const tempErrors: Partial<OrderFormData> = {};
    if (!formData.name.trim()) tempErrors.name = "Full Name is required";
    
    const mobilePattern = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      tempErrors.mobile = "Mobile Number is required";
    } else if (!mobilePattern.test(formData.mobile)) {
      tempErrors.mobile = "Please provide a valid 10-digit Indian mobile number";
    }

    if (!formData.address.trim()) tempErrors.address = "Street address is required";
    if (!formData.area.trim()) tempErrors.area = "Area / Landmark is required";
    if (!formData.city.trim()) tempErrors.city = "City is required";
    
    const pinPattern = /^\d{6}$/;
    if (!formData.pincode.trim()) {
      tempErrors.pincode = "Pincode is required";
    } else if (!pinPattern.test(formData.pincode)) {
      tempErrors.pincode = "Please provide a valid 6-digit PIN code";
    }

    if (!formData.state) tempErrors.state = "State selection is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // For mobile and pincode, allow only numbers
    if ((name === "mobile" || name === "pincode") && value !== "" && !/^\d+$/.test(value)) {
      return;
    }
    // Limit mobile to 10 digits and pincode to 6 digits
    if (name === "mobile" && value.length > 10) return;
    if (name === "pincode" && value.length > 6) return;

    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof OrderFormData]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      trackPixelEvent("InitiateCheckout", {
        content_name: productName,
        content_ids: [productName],
        content_type: "product",
        value: amount,
        currency: "INR"
      });
      onSubmit(formData);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          className="relative w-full max-w-lg my-8 p-6 md:p-8 bg-white rounded-3xl shadow-2xl border border-brand-cream/80 overflow-hidden"
          id="order-form-container"
        >
          {/* Accent Header Line */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-brand-blue via-brand-pink to-brand-gold" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-brand-dark rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <img 
              src={logoUrl} 
              alt="Dr. Nishanti's Skin Hair Ozone Clinic Logo" 
              className="w-14 h-14 object-contain rounded-2xl border border-brand-cream/50 bg-white p-1 shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-xl md:text-2xl font-display font-bold text-brand-dark">Complete Your Order</h3>
              <p className="text-xs text-gray-500 mt-1">
                For: <span className="font-semibold text-brand-blue">{productName}</span> &bull; <strong className="text-brand-dark font-extrabold text-sm">₹{amount}</strong>
              </p>
            </div>
          </div>

          {/* Iframe UPI Restriction Warning */}
          {isIframe && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-800 leading-relaxed mb-5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <AlertCircle size={48} className="text-amber-900" />
              </div>
              <div className="font-bold flex items-center gap-1.5 text-amber-900 mb-1.5 uppercase tracking-wide">
                <AlertCircle size={15} className="text-amber-700" /> UPI Notice (PhonePe, Google Pay, Paytm)
              </div>
              <p className="mb-2">
                Aap is app ko <strong>Preview Frame (Iframe)</strong> me dekh rahe hain. Browser security regulations ke kaaran, restricted frames ke andar UPI Apps (Google Pay, PhonePe, Paytm, etc.) show nahi hote hain.
              </p>
              <div className="bg-white/70 border border-amber-100 p-2.5 rounded-xl font-medium text-amber-950 flex flex-col gap-1">
                <p>💡 <strong>Solution:</strong></p>
                <p className="flex items-center gap-1">
                  1. Screen ke upper-right (top-right) me <strong className="text-brand-blue font-bold">"Open in new window" / "New Tab" Icon ↗️</strong> par click karke pure page ko open karein.
                </p>
                <p>
                  2. Naye tab me full UPI option (PhonePe, Google Pay, UPI PIN) smoothly open ho jayega!
                </p>
                <p className="text-[10px] text-gray-500 mt-1 italic">
                  * Note: Aap directly credit card, debit card, ya netbanking isi preview window me bhi use kar sakte hain.
                </p>
              </div>
            </motion.div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User size={13} className="text-gray-400" /> Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-sm focus:bg-white focus:outline-none transition-all placeholder-gray-400 ${
                    errors.name ? "border-rose-400 focus:ring-1 focus:ring-rose-400" : "border-gray-200 focus:ring-1 focus:ring-brand-blue"
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.name}</p>}
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone size={13} className="text-gray-400" /> Mobile Number (for Delivery & Updates) <span className="text-rose-500">*</span>
              </label>
              <div className="relative flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-500 text-xs font-bold">
                  +91
                </span>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10 digit phone number"
                  className={`w-full px-4 py-3 rounded-r-xl border border-l-0 bg-gray-50/50 text-sm focus:bg-white focus:outline-none transition-all placeholder-gray-400 ${
                    errors.mobile ? "border-rose-400 focus:ring-1 focus:ring-rose-400" : "border-gray-200 focus:ring-1 focus:ring-brand-blue"
                  }`}
                />
              </div>
              {errors.mobile && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.mobile}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin size={13} className="text-gray-400" /> Flat, House No., Building, Apartment <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Door/House No., Building Name, Street"
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-sm focus:bg-white focus:outline-none transition-all placeholder-gray-400 ${
                  errors.address ? "border-rose-400 focus:ring-1 focus:ring-rose-400" : "border-gray-200 focus:ring-1 focus:ring-brand-blue"
                }`}
              />
              {errors.address && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.address}</p>}
            </div>

            {/* Area & Landmark */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                Area, Colony, Road, Nearby Landmark <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g. Near Ram Temple, Satellite Area"
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-sm focus:bg-white focus:outline-none transition-all placeholder-gray-400 ${
                  errors.area ? "border-rose-400 focus:ring-1 focus:ring-rose-400" : "border-gray-200 focus:ring-1 focus:ring-brand-blue"
                }`}
              />
              {errors.area && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.area}</p>}
            </div>

            {/* Grid for Town, Pincode, State */}
            <div className="grid grid-cols-2 gap-4">
              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  City / Town <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Ahmedabad"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-sm focus:bg-white focus:outline-none transition-all placeholder-gray-400 ${
                    errors.city ? "border-rose-400 focus:ring-1 focus:ring-rose-400" : "border-gray-200 focus:ring-1 focus:ring-brand-blue"
                  }`}
                />
                {errors.city && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.city}</p>}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                  Pincode <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="6 digit PIN code"
                  className={`w-full px-4 py-3 rounded-xl border bg-gray-50/50 text-sm focus:bg-white focus:outline-none transition-all placeholder-gray-400 ${
                    errors.pincode ? "border-rose-400 focus:ring-1 focus:ring-rose-400" : "border-gray-200 focus:ring-1 focus:ring-brand-blue"
                  }`}
                />
                {errors.pincode && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.pincode}</p>}
              </div>
            </div>

            {/* State selection */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                State <span className="text-rose-500">*</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:outline-none transition-all"
              >
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {errors.state && <p className="text-xs text-rose-500 mt-1 font-medium">{errors.state}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-4 bg-brand-blue hover:bg-brand-blue/90 text-white rounded-2xl font-bold text-base transition-all shadow-xl hover:shadow-brand-blue/15 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <p className="text-[11px] text-center text-gray-400 mt-2">
                🇮🇳 Secured packaging with Free Post-paid Delivery across India.
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
