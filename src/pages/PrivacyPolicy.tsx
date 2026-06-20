import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Shield, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Dr. Nishanti's Skin Hair & Ozone Clinic";
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
            id="back-home-link"
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
          id="privacy-content-card"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-brand-pink/10 text-brand-pink rounded-2xl" id="privacy-shield-icon">
              <Shield size={32} />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark" id="privacy-title">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-500 mt-1">Last Updated: June 2026</p>
            </div>
          </div>

          <div className="prose prose-brand max-w-none text-gray-600 space-y-8 leading-relaxed">
            <p>
              At <strong>Dr. Nishanti's Skin Hair & Ozone Clinic</strong>, we are committed to protecting your privacy and ensuring the security of your personal and medical information. This Privacy Policy outlines how we collect, use, and protect the information you provide when using our services or visiting our clinic and website.
            </p>

            <hr className="border-brand-cream/80" />

            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">1. Information We Collect</h2>
              <p>We may collect personal details and health information to provide you with high-quality healthcare and treatment solutions. This includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Contact Details:</strong> Your name, phone number, email address, and home address.</li>
                <li><strong>Appointment Scheduling Details:</strong> Date and time of preferred appointments, reason for visit, and treatment inquiries.</li>
                <li><strong>Clinical Records:</strong> Medical history, skin and hair health concerns, details of received therapies (including Ozone Therapy, PRP, or Cosmetology), and follow-up notes.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and usage data collected via functional cookies for website performance.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">2. How We Use Your Information</h2>
              <p>The information we collect is strictly utilized to deliver safe and personalized healing routines. Specifically, we use your data to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Schedule and confirm your clinical consultation and treatment appointments.</li>
                <li>Provide accurate therapeutic suggestions tailored to your skin, hair, and systemic wellness requirements.</li>
                <li>Reach out to you regarding appointment reminders, clinic updates, and prescription details.</li>
                <li>Establish secure internal record-keeping practices compliant with standards.</li>
                <li>Maintain and optimize our website experience to make informative resources accessible.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">3. Information Confidentiality & Sharing</h2>
              <p>
                We hold your wellness journey in absolute trust. Your personal, contact, and medical records are kept strictly confidential. We <strong>do not sell, rent, or trade</strong> your information to third-party marketing companies under any circumstances. Information is only shared:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>With your explicit, informed consent for coordination of specialized care.</li>
                <li>With trusted medical support staff operating directly under Dr. Nishanti's supervision.</li>
                <li>When required of us by healthcare regulations or law enforcement authorities.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">4. Data Security</h2>
              <p>
                To prevent unauthorized access or disclosure, we have implemented industry-standard physical, electronic, and managerial safeguards. Our patient database and digital appointment scheduling workflows are carefully maintained, protecting your privacy at every touchpoint.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">5. Your Privacy Rights</h2>
              <p>
                You retain complete control of your data. At any time, you can reach out to our clinic team to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to the clinical and contact files we maintain for you.</li>
                <li>Request updates or corrections to outdated or incomplete information.</li>
                <li>Request the deletion of your personal contact registry (subject to medical record compliance regulations).</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl md:text-2xl font-display font-bold text-brand-dark">6. Contact & Practice Information</h2>
              <p>
                If you have questions, feedback, or concerns regarding your privacy, please connect with us directly:
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
