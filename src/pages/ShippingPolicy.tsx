import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Truck, ArrowLeft, Mail, Phone, MapPin, Globe } from "lucide-react";

export default function ShippingPolicy() {
  useEffect(() => {
    document.title = "Shipping Policy | Dr. Nishanti's Skin Hair & Ozone Clinic";
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
            id="back-home-link-shipping"
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
          id="shipping-content-card"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-blue/10 text-brand-blue rounded-2xl" id="shipping-icon-wrapper">
              <Truck size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark" id="shipping-title">
                Shipping Policy
              </h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: June 2026</p>
            </div>
          </div>

          <div className="prose prose-brand max-w-none text-gray-600 space-y-8 leading-relaxed">
            <p>
              Thank you for trusting <strong>Dr. Nishanti's Skin Hair & Ozone Clinic</strong>. We are dedicated to delivering our specialized wellness and clinical products safely and effectively directly to your doorstep.
            </p>

            <hr className="border-brand-cream/80" />

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">1. Delivery Timeline</h2>
              <div className="bg-brand-cream/20 border-l-4 border-brand-blue rounded-xl p-5 text-gray-700">
                <p className="font-semibold text-brand-dark mb-1">Standard Doorstep Dispatch:</p>
                <p className="mt-0 font-medium">
                  We will try to deliver at your location within <strong>3-4 days</strong>, but sometimes it depends on your location and courier company service.
                </p>
              </div>
              <p className="text-sm mt-3">
                Orders are usually processed and packed within 24-48 hours of order confirmation. Once your shipment is handed over to our verified shipping partners (such as BlueDart, Delhivery, or Indian Post), standard transit timelines apply.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">2. Shipping Charges</h2>
              <p>To promote seamless wellness access, we offer <strong>Free Delivery across India</strong> for our core clinic formulations, including Skin Blossom and Anti Ageing Cream, when ordered through our verified clinical WhatsApp portal.</p>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">3. Location Restrictions & Delays</h2>
              <p>
                While we strive to cover all pin codes across the nation, remote or regional rural addresses may require additional transport. Local public holidays, extreme weather events, or high workload constraints at third-party courier companies may occasionally cause structural shipping delays. We appreciate your kind patience during these scenarios.
              </p>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">4. Tracking Your Order</h2>
              <p>
                Upon package dispatch, our digital administration desk will send your shipping details and consignment numbers directly to your registered WhatsApp phone number, allowing you to monitor real-time transport updates.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">5. Delivery Problems & Contact</h2>
              <p>
                For delivery adjustments, wrong pin code corrections, or delayed package tracking, connect with us:
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
                  <span>+91 91108 39962 (For Shipping Inquiries)</span>
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
