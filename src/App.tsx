/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Treatments from "./pages/Treatments";
import Products from "./pages/Products";
import Ebooks from "./pages/Ebooks";
import EbookLanding from "./pages/EbookLanding";
import EbookUploadDashboard from "./pages/EbookUploadDashboard";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SkinBlossomLanding from "./pages/SkinBlossomLanding";
import AntiAgeingLanding from "./pages/AntiAgeingLanding";
import OzoneRapidHealLanding from "./pages/OzoneRapidHealLanding";
import AntiAcidityLanding from "./pages/AntiAcidityLanding";
import OzoneHairReviveLanding from "./pages/OzoneHairReviveLanding";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import ThankYou from "./pages/ThankYou";
import InstamojoMock from "./pages/InstamojoMock";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/ebooks/upload-dashboard" element={<EbookUploadDashboard />} />
          <Route path="/ebooks/:id" element={<EbookLanding />} />
          <Route path="/products/skin-blossom" element={<SkinBlossomLanding />} />
          <Route path="/products/anti-ageing" element={<AntiAgeingLanding />} />
          <Route path="/products/ozone-rapid-heal" element={<OzoneRapidHealLanding />} />
          <Route path="/products/anti-acidity" element={<AntiAcidityLanding />} />
          <Route path="/products/ozone-hair-revive" element={<OzoneHairReviveLanding />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/checkout/instamojo-mock" element={<InstamojoMock />} />
        </Routes>
      </Layout>
    </Router>
  );
}
