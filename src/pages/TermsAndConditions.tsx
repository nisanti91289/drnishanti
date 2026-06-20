import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { FileText, ArrowLeft, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | Dr. Nishanti's Skin Hair & Ozone Clinic";
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
            id="back-home-link-terms"
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
          id="terms-content-card"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-gold/10 text-brand-gold rounded-2xl" id="terms-icon-wrapper">
              <FileText size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark" id="terms-title">
                Terms & Conditions
              </h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: June 2026</p>
            </div>
          </div>

          <div className="prose prose-brand max-w-none text-gray-600 space-y-8 leading-relaxed">
            <p>
              Welcome to <strong>Dr. Nishanti's Skin Hair & Ozone Clinic</strong>. These Terms & Conditions govern your use of our physical clinic services, our online products, and our website. By visiting our clinic, scheduling appointments, or purchasing products, you agree to comply with and be bound by the following terms.
            </p>

            <hr className="border-brand-cream/80" />

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">1. Clinical Service Bookings & Consultations</h2>
              <p>We make every effort to offer consistent and timely medical care. By scheduling consultations or clinical procedures, you agree that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Appointments should be requested in advance via our website, telephone, or official WhatsApp channel.</li>
                <li>Clinical recommendations made by Dr. Nishanti and supporting staff are based strictly on the accurate diagnostic information that you provide.</li>
                <li>Patients are requested to inform our clinic team at least 24 hours in advance if they wish to cancel or reschedule a treatment slot.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">2. Product Purchases & Pricing</h2>
              <p>For product sales made via our website links, our catalogue, or clinic front-desk:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All product prices displayed on the website or in quotation details are listed in Indian Rupees (INR) and are inclusive of relevant local taxes.</li>
                <li>Product offerings, packaging, and formulas are subject to modification based on clinical advancements. We reserve the right to revise pricing at our sole discretion.</li>
                <li>Product listings are subject to local stock availability. In cases where an ordered item is temporarily out-of-stock, our support team will connect with you to organize alternative deliveries.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">3. Professional Disclaimer</h2>
              <p>
                The information, resources, and wellness guidelines shared on this website are designed purely for primary informational and educational purposes. They do not constitute formal medical diagnoses or serve as absolute replacements for personalized, physical diagnostic check-ups with a qualified skin care specialist.
              </p>
              <p>
                Individual results from therapeutic procedures (such as Ozone treatment, clinical creams, or skincare serums) vary naturally depending on individual pathology, lifestyle factors, and compliance with prescribed guidance.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">4. Limitation of Liability</h2>
              <p>
                Dr. Nishanti's Skin Hair & Ozone Clinic, including its clinical staff, director, and digital managers, shall not be held liable for any indirect, incidental, or consequential damages arising from the use of products, clinical services, or educational content beyond what is prescribed under consumer protection laws.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">5. Contact Information</h2>
              <p>
                For further clarification or to appeal any actions, please connect with us directly using the details below:
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
                  <span>+91 91108 39962</span>
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
