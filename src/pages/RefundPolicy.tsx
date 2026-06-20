import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { RefreshCw, ArrowLeft, Mail, Phone, MapPin, AlertCircle } from "lucide-react";

export default function RefundPolicy() {
  useEffect(() => {
    document.title = "Refund & Cancellation Policy | Dr. Nishanti's Skin Hair & Ozone Clinic";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-brand-cream/30 min-h-screen py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue/80 font-semibold transition-colors duration-200"
            id="back-home-link-refund"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-cream/60"
          id="refund-content-card"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl" id="refund-icon-wrapper">
              <RefreshCw size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark" id="refund-title">
                Refund & Cancellation Policy
              </h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: June 2026</p>
            </div>
          </div>

          <div className="prose prose-brand max-w-none text-gray-600 space-y-8 leading-relaxed">
            
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">1. Product Orders</h2>
              <p>Once an order is processed or validated through our online support:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Under no circumstances are refunds or returns authorized.</li>
                <li>We do not offer cancellations once payment is completed and shipping arrangements are dispatched.</li>
                <li>This ensures the clinical purity and safety of our entire inventory, as returned items cannot be legally or medically resold.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">2. Damaged or Defective Items</h2>
              <p>In the highly unlikely event that your ordered formulation is damaged or physically defective upon arrival (due to severe courier mishandling):</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Please record an uninterrupted unboxing video showing the shipping label and the broken bottle/seal.</li>
                <li>Share the unboxing proof with our support team on WhatsApp at <strong>+91 91108 39962</strong> within 24 hours of package delivery.</li>
                <li>Following verified proof, we will dispatch a direct replacement product to your address free of cost. No refunds will be provided, only replacements.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">3. Treatment Cancellations</h2>
              <p>
                In-office clinic appointments can be rescheduled or cancelled. However, payments made towards booked specialized surgeries or high-value multi-session clinical routines are subject to the individual guidelines agreed upon during physical admission, and are not generally eligible for standard automatic electronic refunds.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">4. Questions & Support Contact</h2>
              <p>
                If you have any queries about your payment status or received formulation packages, we are always here to assist you:
              </p>
              <div className="bg-brand-cream/20 border border-brand-cream/60 rounded-2xl p-6 mt-4 space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <MapPin className="text-brand-pink shrink-0 mt-0.5" size={16} />
                  <span>
                    <strong>Dr. Nishanti's Skin Hair & Ozone Clinic:</strong> F-31, Savita Park, Sanjivani Clinic, Isanpur, Ahmedabad, India.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-brand-pink shrink-0" size={16} />
                  <span>+91 91108 39962 (For Queries / WhatsApp Support)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-brand-pink shrink-0" size={16} />
                  <span>drnishantiprajapati@gmail.com</span>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
