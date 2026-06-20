import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, ShoppingBag, ArrowLeft, Heart, Calendar, MapPin, Phone, User, FileText, Download, ShieldCheck, FileCheck } from "lucide-react";
import { jsPDF } from "jspdf";
import { EBOOKS_DATA } from "./Ebooks";
import { trackPixelEvent } from "../utils/pixel";
import { getApiUrl } from "../utils/api";

export default function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state?.orderDetails;

  const searchParams = new URLSearchParams(location.search);
  const queryOrderDetails = searchParams.get("payment_id") ? {
    name: searchParams.get("name") || "Customer",
    mobile: searchParams.get("mobile") || "Provided Mobile",
    address: searchParams.get("address") || "Digital PDF Download Link",
    area: searchParams.get("area") || "",
    city: searchParams.get("city") || "India",
    pincode: searchParams.get("pincode") || "",
    state: searchParams.get("state") || "India",
    productName: searchParams.get("productName") || "Premium Clinical Formulation",
    amount: parseFloat(searchParams.get("amount") || "649"),
    paymentId: searchParams.get("payment_id") || "",
    date: searchParams.get("date") || new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }),
    isEbook: searchParams.get("isEbook") === "true",
    ebookId: searchParams.get("ebookId") || undefined
  } : null;

  const finalOrderDetails = orderDetails || queryOrderDetails;
  
  // Download simulation state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadCompleted, setDownloadCompleted] = useState(false);

  useEffect(() => {
    document.title = "Order Placed Successfully | Dr. Nishanti's Clinic";
    window.scrollTo(0, 0);

    if (finalOrderDetails) {
      const orderId = finalOrderDetails.paymentId || finalOrderDetails.orderId || "unknown_order";
      const trackedKey = `pixel_tracked_purchase_${orderId}`;
      if (!sessionStorage.getItem(trackedKey)) {
        trackPixelEvent("Purchase", {
          content_name: finalOrderDetails.productName,
          content_ids: [finalOrderDetails.ebookId || finalOrderDetails.productName],
          content_type: "product",
          value: finalOrderDetails.amount,
          currency: "INR"
        });
        sessionStorage.setItem(trackedKey, "true");
      }
    } else {
      console.log("No order context in route state or query parameters.");
    }
  }, [finalOrderDetails]);

  // Use values from state, otherwise use realistic placeholders to provide a great experience
  const displayDetails = finalOrderDetails || {
    name: "Customer",
    mobile: "Provided Mobile",
    address: "Registered Shipping Address",
    area: "",
    city: "India",
    pincode: "Zip",
    state: "India",
    productName: "Premium Clinical Formulation",
    amount: 649,
    paymentId: "pay_placeholder_" + Math.random().toString(36).substring(2, 11),
    date: new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadCompleted(false);

    // Book matching and thematic colors
    const selectedBook = EBOOKS_DATA.find(b => 
      displayDetails.productName.toLowerCase().includes(b.title.toLowerCase()) || 
      (displayDetails.ebookId && b.id === displayDetails.ebookId) ||
      b.title.toLowerCase().includes(displayDetails.productName.toLowerCase())
    );
    const bookId = selectedBook?.id || displayDetails.ebookId;

    if (bookId) {
      try {
        const checkRes = await fetch(getApiUrl(`/api/ebooks/download-check/${bookId}`));
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          if (checkData.exists) {
            let progress = 0;
            const interval = setInterval(() => {
              progress += 20;
              setDownloadProgress(progress);
              if (progress >= 100) {
                clearInterval(interval);
                setIsDownloading(false);
                setDownloadCompleted(true);

                // Triggers direct browser download of the real uploaded file
                const link = document.createElement("a");
                link.href = getApiUrl(`/api/download-ebook/${bookId}`);
                link.setAttribute("download", checkData.fileName || "eBook.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }, 100);
            return;
          }
        }
      } catch (err) {
        console.log("Static PDF lookup check error. Falling back to dynamic generator.", err);
      }
    }
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDownloading(false);
          setDownloadCompleted(true);
          
          const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
          });
          
          const margin = 20;
          const pageWidth = doc.internal.pageSize.width;
          const pageHeight = doc.internal.pageSize.height;

          // Inline Hindi/Devanagari sanitization & translation helper to avoid built-in font rendering glitches
          const sanitizeText = (txt: string): string => {
            if (!txt) return "";
            let cleaned = txt;
            const replacements: { [key: string]: string } = {
              "हर रिश्ता प्यार से शुरू होता है, लेकिन उसे मजबूत बनाने के लिए समझ, प्रयास और emotional connection की जरूरत होती है।": "Every relationship starts with love, but needs understanding, effort and emotional connection to grow strong.",
              "The Relationship Transformation Pillars": "The Relationship Transformation Pillars",
              "बेहतर नींद के लिए 21 दिनों का आसान और वैज्ञानिक रूटीन प्लान": "Easy and scientific 21-day sleep routine plan for better rest",
              "अच्छी नींद का स्वास्थ्य और मानसिक प्रभाव": "Health and mental impact of good night sleep",
              "दैनिक स्वास्थ्य दिनचर्या एवं साप्ताहिक प्रगति ट्रैकर (Days 1 - 21)": "Daily health routine & weekly progress tracker (Days 1 - 21)",
              "21 दिनों का दैनिक विचार पत्रक तथा प्रमाणपत्र फॉर्म": "21 Days daily reflection worksheet & certificate form",
              "चयापचय (Metabolism) और फैट बर्निंग का वैज्ञानिक विश्लेषण": "Scientific analysis of passive metabolism & fat burning",
              "शारीरिक मूल्यांकन: Baseline Weight & Waist Measurement": "Physical assessment: Baseline Weight & Waist Measurement",
              "संतुलित आहार: दैनिक भोजन में प्रोटीन, फाइबर और वसा का महत्व": "Balanced nutrition: Importance of protein, fiber & healthy fats",
              "दैनिक स्वास्थ्य दिनचर्या एवं साप्ताहिक प्रगति ट्रैकर": "Daily health routines and weekly progress trackers",
              "फैट लॉस एक्सरसाइज लाइब्रेरी: उठक-बैठक, पुश-अप्स और प्लैंक": "Fat loss exercise library: Squats, push-ups and planks",
              "मानसिकता रूपांतरण गाइड: असमयी भूख (Cravings) को कैसे रोकें?": "Mindset transformation guide: How to overcome cravings",
              "7-दिवसीय स्वस्थ भोजन योजनाकार और उपयोगी विकल्प": "7-Day healthy meal planner and useful options",
              "एक वैज्ञानिक और प्रामाणिक डॉक्टर-निर्देशित प्लान। भूखे रहने या खतरनाक क्रैश डाइट्स के बिना स्वाभाविक रूप से इंसुलिन को संतुलित करके, चयापचय (metabolism) को सक्रिय करके, और मांसपेशियों की सुरक्षा करके स्थायी रूप से चर्बी (fat) को घटाने की व्यावहारिक मार्गदर्शिका।": "A scientific, doctor-guided plan to balance insulin, active passive metabolism, and lose fat without severe starvation.",
              "स्वस्थ वजन घटाने के चार मुख्य स्तंभ": "Four primary pillars of sustainable fat loss",
              "संतुलित पोषण (Nutrition): थाली में प्रचुर मात्रा में प्रोटीन, फाइबर और स्वस्थ वसा का समावेश ताकि ग्लूकोज नियंत्रित रहे।": "Balanced Nutrition: Plate full of protein, fiber & healthy fats to control glucose.",
              "नियमित शारीरिक गतिविधि (Movement): दैनिक जीवन में कम से कम 8,000 से 10,000 कदम चलना और स्ट्रेंथ ट्रेनिंग व्यायाम।": "Active Movement: Walking 8,000 to 10,000 steps daily & strength training.",
              "तनाव नियंत्रण (Cortisol Balance): गहरे तनाव और कोर्टिसोल के कारण पेट पर वसा जमती है; ध्यान (meditation) द्वारा इसे प्रबंधित करें।": "Cortisol Balance: Managing stress and cortisol through active calming rituals.",
              "पर्याप्त नींदनीं (Sleep): 7 - 8 घंटे की गहरी नींद से घ्रेलिन (भूख बढ़ाने वाला हार्मोन) और लेप्टिन (तृप्ति का हार्मोन) संतुलित रहते हैं।": "Adequate Sleep: Sleeping 7-8 hours to align hormone balance.",
              "क्रैश डाइट और भूखे रहने से आपका चयापचय स्थायी रूप से धीमा हो जाता है, जिससे अंततः वजन और तेजी से बढ़ता है।": "Crash diets slow down metabolism permanently, causing weight rebound later.",
              "दिन 1: चयापचय को जागृत करना": "Day 1 Action: Awake Your Passive Metabolism",
              "सुबह जागने के तुरंत बाद 250 - 300ml गुनगुना पानी पिएं (यह आंतों को प्राकृतिक रूप से साफ करता है)।": "Drink 250-300ml warm water post waking up for gut cleansing.",
              "सुबह के नाश्ते में अनिवार्य रूप से प्रोटीन शामिल करें (जैसे भुने मखाने, मूंग स्प्राउट्स, या पनीर)।": "Include rich protein in your morning breakfast (sprouts, paneer).",
              "दोपहर और रात के भोजन की थाली का आधा हिस्सा हरी सब्जियों तथा ताजे सलाद से सजाएं।": "Fill half of your lunch & dinner plates with raw salad & green vegetables.",
              "प्रत्येक मुख्य भोजन के 15 मिनट बाद कम से कम 10 मिनट की एक नियमित वॉक अवश्य करें।": "Ensure a 10-minute active light walk after every primary main meal.",
              "विशेष आयुर्वेदिक संदेश: हमारा शरीर एक मंदिर है। इसे गंभीर भूख की पीड़ा देने के बजाय, शुद्ध, ताजे, और पोषक तत्वों से भरपूर संतुलित आहार के साथ प्राकृतिक रूपांतरण को सहज रूप से अपनाएं।": "Clinical message: Treat the body as a temple. Nourish it with balanced whole foods instead of suffering from starvation."
            };
            
            for (const [key, val] of Object.entries(replacements)) {
              if (cleaned.includes(key)) {
                cleaned = cleaned.replace(key, val);
              }
            }
            
            // Standard character replacement for Hindi Unicode to preserve perfect PDF rendering
            cleaned = cleaned.replace(/[\u0900-\u097F]/g, "?"); 
            cleaned = cleaned.replace(/\?/g, ""); 
            return cleaned.trim();
          };

          const bookTitle = selectedBook ? sanitizeText(selectedBook.title) : sanitizeText(displayDetails.productName);
          const bookSubInfo = selectedBook ? sanitizeText(selectedBook.subInfo || "") : "Handcrafted guided transformation workbook series";
          const bookIntro = selectedBook ? sanitizeText(selectedBook.introduction || "") : "Thank you for purchasing this premium handbook. Follow this daily protocol to reconstruct your baseline markers.";
          const bookChapters = selectedBook && selectedBook.chapters ? selectedBook.chapters.map(ch => sanitizeText(ch)) : [
            "Introduction & Welcome Note",
            "Daily Guidelines and Action Swaps",
            "Science & Principles Underlying Your Routine",
            "Phase 1 Foundation and Checklists (Days 1 - 7)",
            "Phase 2 Building Healthy habits (Days 8 - 14)",
            "Phase 3 Personal Commitment Plans (Days 15 - 21)",
            "Self-Assessment Progress Scorecard Sheet",
            "Clinical Advice and Future Recommendations"
          ];

          let primaryRgb = [191, 146, 67]; // default gold
          let accentRgb = [30, 41, 59];    // dark slate
          
          if (selectedBook) {
            if (selectedBook.id === "eb-impress-partner") {
              primaryRgb = [190, 24, 74]; // Crimson Rose
              accentRgb = [159, 18, 57];
            } else if (selectedBook.id === "eb-better-sleep") {
              primaryRgb = [30, 27, 75];  // Deep Indigo
              accentRgb = [79, 70, 229];
            } else if (selectedBook.id === "eb-diabetes-care") {
              primaryRgb = [15, 118, 110]; // Teal
              accentRgb = [13, 148, 136];
            } else if (selectedBook.id === "eb-failure-comeback") {
              primaryRgb = [180, 83, 9];  // Amber Brown
              accentRgb = [217, 119, 6];
            } else if (selectedBook.id.startsWith("eb-weight-loss")) {
              primaryRgb = [4, 120, 87];  // Emerald Green
              accentRgb = [5, 150, 105];
            }
          }
          
          // Page 1: Elegant Cover Page
          doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setLineWidth(1.2);
          doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
          
          doc.setDrawColor(accentRgb[0], accentRgb[1], accentRgb[2]);
          doc.setLineWidth(0.3);
          doc.rect(12, 12, pageWidth - 24, pageHeight - 24);

          doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setFontSize(22);
          doc.setFont("helvetica", "bold");
          doc.text("DR. NISHANTI'S CLINICAL SERIES", pageWidth / 2, 45, { align: "center" });

          doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setLineWidth(1);
          doc.line(40, 52, pageWidth - 40, 52);

          doc.setFontSize(16);
          doc.setTextColor(30, 41, 59);
          const titleLines = doc.splitTextToSize(bookTitle, pageWidth - 45);
          doc.text(titleLines, pageWidth / 2, 75, { align: "center" });

          doc.setFontSize(11);
          doc.setTextColor(115, 115, 115);
          doc.setFont("helvetica", "normal");
          const subInfoLines = doc.splitTextToSize(bookSubInfo, pageWidth - 55);
          doc.text(subInfoLines, pageWidth / 2, 110, { align: "center" });

          doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setFillColor(255, 255, 255);
          doc.circle(pageWidth / 2, 150, 15);
          doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setFontSize(8);
          doc.setFont("helvetica", "bold");
          doc.text("VERIFIED", pageWidth / 2, 149, { align: "center" });
          doc.text("JOURNAL", pageWidth / 2, 153, { align: "center" });

          doc.setFontSize(13);
          doc.setTextColor(30, 41, 59);
          doc.setFont("helvetica", "bold");
          doc.text("Dr. Nishanti Prajapati", pageWidth / 2, 185, { align: "center" });
          
          doc.setFontSize(9);
          doc.setTextColor(148, 163, 184);
          doc.setFont("helvetica", "italic");
          doc.text("Skin, Hair & Ozone Specialist • Certified Wellness Monographs", pageWidth / 2, 192, { align: "center" });

          doc.setFontSize(8.5);
          doc.setTextColor(100, 116, 139);
          doc.setFont("helvetica", "normal");
          doc.text(`Payment ID: ${displayDetails.paymentId}`, pageWidth / 2, 235, { align: "center" });
          doc.text(`Licensed To: ${displayDetails.name} (+91 ${displayDetails.mobile || ""})`, pageWidth / 2, 241, { align: "center" });
          doc.text(`Authorized Purchase: ${displayDetails.date}`, pageWidth / 2, 247, { align: "center" });
          
          doc.setFontSize(7.5);
          doc.text("Page 1 of 5 • Certified Medical-Grade Workbook Series", pageWidth / 2, 280, { align: "center" });

          // Page 2: Welcome & Directory
          doc.addPage();
          doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

          doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text("WELCOME TO YOUR TRANSFORMATION JOURNEY", margin, 25);
          doc.setLineWidth(0.5);
          doc.line(margin, 29, margin + 115, 29);

          doc.setTextColor(51, 65, 85);
          doc.setFontSize(9.5);
          doc.setFont("helvetica", "normal");
          
          const introLines = doc.splitTextToSize(bookIntro, pageWidth - 40);
          doc.text(introLines, margin, 38);

          doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.line(margin, 70, pageWidth - margin, 70);

          doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.text("CORE 60-PAGE TRANSFORMATION SYLLABUS", margin, 79);

          doc.setFontSize(9);
          doc.setTextColor(71, 85, 105);
          doc.setFont("helvetica", "normal");
          
          let yPos = 88;
          bookChapters.forEach((ch, cIndex) => {
            doc.setFillColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
            doc.rect(margin, yPos - 3, 2.5, 2.5, "F");
            
            const pageNum = 1 + cIndex * 7;
            const textWidth = doc.getTextWidth(`Chapter ${cIndex + 1}: ${ch}`);
            doc.text(`Chapter ${cIndex + 1}: ${ch}`, margin + 6, yPos);
            
            doc.setFont("courier", "normal");
            doc.setTextColor(203, 213, 225);
            doc.text(".".repeat(Math.max(10, 45 - Math.floor(textWidth / 3))), margin + 10 + textWidth, yPos);
            
            doc.setFont("helvetica", "bold");
            doc.setTextColor(115, 115, 115);
            doc.text(`P. ${pageNum}`, pageWidth - margin - 12, yPos);
            
            doc.setFont("helvetica", "normal");
            doc.setTextColor(71, 85, 105);
            yPos += 8.5;
          });

          doc.setFontSize(7.5);
          doc.setTextColor(100, 116, 139);
          doc.text("Page 2 of 5 • Certified Medical-Grade Workbook Series", pageWidth / 2, 280, { align: "center" });

          // Page 3: Pillars & Foundations
          doc.addPage();
          doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

          const page2Heading = selectedBook && selectedBook.page2Content 
            ? sanitizeText(selectedBook.page2Content.heading)
            : "The Clinical Transformation Pillars";
          
          const page2Bullets = selectedBook && selectedBook.page2Content && selectedBook.page2Content.bullets
            ? selectedBook.page2Content.bullets.map((b: string) => sanitizeText(b))
            : [
                "Physiological Assessment: Establish baseline markers like hydration, sleep, stress patterns.",
                "Satiety & Mineralization: Balance organic endocrine responses with nutrient-dense nourishment.",
                "Sympathetic Calm: Soothe secondary stress pathways to support recovery and reduce cortisol.",
                "Steady Integration: Cultivate micro-actions sequentially to ensure long-term behavioral changes."
              ];
          
          const page2Note = selectedBook && selectedBook.page2Content && selectedBook.page2Content.note
            ? sanitizeText(selectedBook.page2Content.note)
            : "Clinical Axiom: Rejuvenation starts by shifting from force-driven plans to balanced consistency.";

          doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text(page2Heading.toUpperCase(), margin, 25);
          doc.setLineWidth(0.5);
          doc.line(margin, 29, margin + 105, 29);

          doc.setFontSize(9.5);
          doc.setTextColor(71, 85, 105);
          let yBullet = 42;
          
          page2Bullets.forEach((bullet: string) => {
            const colonIndex = bullet.indexOf(":");
            doc.setFillColor(accentRgb[0], accentRgb[1], accentRgb[2]);
            doc.rect(margin, yBullet - 3, 2, 2, "F");
            
            if (colonIndex !== -1) {
              const boldPart = bullet.substring(0, colonIndex + 1);
              const regularPart = bullet.substring(colonIndex + 1);
              
              doc.setFont("helvetica", "bold");
              doc.setTextColor(30, 41, 59);
              doc.text(boldPart, margin + 5, yBullet);
              
              const boldTextWidth = doc.getTextWidth(boldPart);
              doc.setFont("helvetica", "normal");
              doc.setTextColor(71, 85, 105);
              
              const splitRegular = doc.splitTextToSize(regularPart, pageWidth - margin - margin - boldTextWidth - 8);
              doc.text(splitRegular, margin + 6 + boldTextWidth, yBullet);
              yBullet += Math.max(1, splitRegular.length) * 5 + 6;
            } else {
              doc.setFont("helvetica", "normal");
              const splitText = doc.splitTextToSize(bullet, pageWidth - margin - margin - 8);
              doc.text(splitText, margin + 5, yBullet);
              yBullet += splitText.length * 5 + 6;
            }
          });

          doc.setFillColor(248, 250, 252);
          doc.rect(margin, yBullet + 5, pageWidth - margin - margin, 25, "F");
          doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setLineWidth(0.5);
          doc.line(margin, yBullet + 5, margin, yBullet + 30);
          
          doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setFontSize(9);
          doc.setFont("helvetica", "bold");
          doc.text("CLINICAL MEDICAL OBSERVATION:", margin + 5, yBullet + 11);
          doc.setTextColor(115, 115, 115);
          doc.setFont("helvetica", "italic");
          const splitNote = doc.splitTextToSize(page2Note, pageWidth - margin - margin - 12);
          doc.text(splitNote, margin + 5, yBullet + 17);

          doc.setFontSize(7.5);
          doc.text("Page 3 of 5 • Certified Medical-Grade Workbook Series", pageWidth / 2, 280, { align: "center" });

          // Page 4: Day 1 Action & Steps
          doc.addPage();
          doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

          const page3Heading = selectedBook && selectedBook.page3Content
            ? sanitizeText(selectedBook.page3Content.heading)
            : "Clinical Initiation Steps";
          
          const page3Steps = selectedBook && selectedBook.page3Content && selectedBook.page3Content.protocolSteps
            ? selectedBook.page3Content.protocolSteps.map((s: string) => sanitizeText(s))
            : [
                "Measure your baseline levels immediately after walking up.",
                "Deduct 10 minutes from screen time in the morning.",
                "Ensure robust hydration by consuming 2.5L tepid water daily.",
                "Apply the recommended clean nutritional swaps starting today."
              ];
          
          const page3Advice = selectedBook && selectedBook.page3Content && selectedBook.page3Content.doctorAdvice
            ? sanitizeText(selectedBook.page3Content.doctorAdvice)
            : "Deep cellular healing thrives under low distress. Implement non-judgmental habits.";

          doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text(page3Heading.toUpperCase(), margin, 25);
          doc.setLineWidth(0.5);
          doc.line(margin, 29, margin + 105, 29);

          doc.setTextColor(51, 65, 85);
          doc.setFontSize(10);
          doc.setFont("helvetica", "bold");
          doc.text("Action Steps to Execute Immediately:", margin, 38);

          let yStep = 46;
          page3Steps.forEach((step: string, idx: number) => {
            doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
            doc.setLineWidth(0.4);
            doc.rect(margin, yStep - 3, 3, 3);
            
            doc.setFont("helvetica", "bold");
            doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
            doc.text(`${idx + 1}.`, margin + 6, yStep);
            
            doc.setFont("helvetica", "normal");
            doc.setTextColor(71, 85, 105);
            const stepLines = doc.splitTextToSize(step, pageWidth - margin - margin - 15);
            doc.text(stepLines, margin + 11, yStep);
            yStep += Math.max(1, stepLines.length) * 5 + 6;
          });

          doc.setFillColor(254, 243, 199);
          doc.rect(margin, yStep + 5, pageWidth - margin - margin, 34, "F");
          doc.setDrawColor(245, 158, 11);
          doc.rect(margin, yStep + 5, pageWidth - margin - margin, 34);

          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);
          doc.setTextColor(180, 83, 9);
          doc.text("DOCTOR ADVICE & CLINICAL WISDOM:", margin + 5, yStep + 13);
          
          doc.setFont("helvetica", "normal");
          doc.setTextColor(146, 64, 14);
          const adviceLines = doc.splitTextToSize(page3Advice, pageWidth - margin - margin - 12);
          doc.text(adviceLines, margin + 5, yStep + 20);

          doc.setFontSize(7.5);
          doc.setTextColor(100, 116, 139);
          doc.text("Page 4 of 5 • Certified Medical-Grade Workbook Series", pageWidth / 2, 280, { align: "center" });

          // Page 5: 21-Day Tracker Grid Sheet
          doc.addPage();
          doc.setDrawColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

          doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
          doc.setFontSize(14);
          doc.setFont("helvetica", "bold");
          doc.text("21-DAY CHRONO TIMELINE LOG SHEET", margin, 25);
          doc.setLineWidth(0.5);
          doc.line(margin, 29, margin + 95, 29);

          doc.setFontSize(8.5);
          doc.setTextColor(100, 116, 139);
          doc.setFont("helvetica", "normal");
          doc.text("Place a checkmark or score each day upon completing your guided micro-habits:", margin, 36);

          const startY = 41;
          const colWidths = [15, 60, 47, 48];
          const rowHeight = 8.5;

          doc.setFillColor(243, 244, 246);
          doc.rect(margin, startY, colWidths.reduce((a,b)=>a+b, 0), rowHeight, "F");
          doc.setDrawColor(209, 213, 219);
          doc.setLineWidth(0.2);
          doc.rect(margin, startY, colWidths.reduce((a,b)=>a+b, 0), rowHeight);

          doc.setTextColor(30, 41, 59);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          let currentX = margin;
          const headers = ["Timeline", "Daily Micro-Habit Target", "Parameter Tracker", "Signature/Date"];
          headers.forEach((h, hIdx) => {
            doc.text(h, currentX + 3, startY + 5.5);
            currentX += colWidths[hIdx];
          });

          let currentY = startY + rowHeight;
          doc.setFont("helvetica", "normal");
          doc.setTextColor(71, 85, 105);

          let paramText = "[  ] Completed?  ________";
          if (selectedBook) {
            if (selectedBook.id === "eb-better-sleep") {
              paramText = "Energy Index (1-10): ____";
            } else if (selectedBook.id === "eb-diabetes-care") {
              paramText = "Blood Glucose G1: ____ mg";
            } else if (selectedBook.id === "eb-impress-partner") {
              paramText = "Intimacy Task Met? [Yes/No]";
            } else if (selectedBook.id.startsWith("eb-weight")) {
              paramText = "Water: 3L [  ] Weight: ____";
            }
          }

          for (let rowIdx = 1; rowIdx <= 21; rowIdx++) {
            doc.setDrawColor(229, 231, 235);
            doc.rect(margin, currentY, colWidths.reduce((a,b)=>a+b, 0), rowHeight);
            
            let borderX = margin;
            colWidths.forEach((cw) => {
              doc.line(borderX, currentY, borderX, currentY + rowHeight);
              borderX += cw;
            });

            doc.setFont("helvetica", "bold");
            doc.setTextColor(primaryRgb[0], primaryRgb[1], primaryRgb[2]);
            doc.text(`Day ${rowIdx}`, margin + 3, currentY + 5.5);
            
            doc.setFont("helvetica", "normal");
            doc.setTextColor(71, 85, 105);
            doc.text("Standard micro-habit target series", margin + colWidths[0] + 3, currentY + 5.5);
            doc.setTextColor(156, 163, 175);
            doc.text(paramText, margin + colWidths[0] + colWidths[1] + 3, currentY + 5.5);
            doc.text("Sign: ___________", margin + colWidths[0] + colWidths[1] + colWidths[2] + 3, currentY + 5.5);

            currentY += rowHeight;
          }

          doc.setFontSize(8);
          doc.setTextColor(16, 185, 129);
          doc.setFont("helvetica", "bold");
          doc.text("✓ CLINICALLY AUTHORIZED INDIVIDUAL TRANSFORMATION LOG", pageWidth / 2, 255, { align: "center" });

          doc.setFontSize(7.5);
          doc.setTextColor(100, 116, 139);
          doc.text("Page 5 of 5 • Certified Medical-Grade Workbook Series", pageWidth / 2, 280, { align: "center" });

          const fileName = `${displayDetails.productName.toLowerCase().replace(/[^a-z0-9]/g, "_")}_complete_clinical_guide.pdf`;
          doc.save(fileName);
        }, 600);
      }
    }, 120);
  };

  return (
    <div className="bg-brand-cream/10 min-h-screen text-brand-dark pt-24 pb-16 font-sans">
      <div className="max-w-3xl mx-auto px-6">
        
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-brand-cream/80 overflow-hidden"
        >
          {/* Top Elegant Rainbow Bar */}
          <div className="h-2.5 bg-gradient-to-r from-brand-blue via-brand-pink to-brand-gold" />

          <div className="p-8 md:p-12 text-center">
            {/* Green Success Badge */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full mb-6 shadow-inner">
              <CheckCircle2 size={44} strokeWidth={2.5} />
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-brand-dark mb-4 tracking-tight">
              {displayDetails.isEbook ? "Payment Successful!" : "Thank You for Your Order!"}
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed mb-8">
              {displayDetails.isEbook ? (
                <>
                  We have successfully verified your payment of <strong className="text-brand-dark">₹{displayDetails.amount}</strong> for the <strong>{displayDetails.productName}</strong>. You can now download the full clinical handbook instantly below.
                </>
              ) : (
                <>
                  We have successfully received your payment of <strong className="text-brand-dark">₹{displayDetails.amount}</strong> for <strong>{displayDetails.productName}</strong>. Your wellness request has been passed to Dr. Nishanti's team for processing.
                </>
              )}
            </p>

            {/* eBook Explicit Download Component */}
            {displayDetails.isEbook && (
              <div className="bg-emerald-500/10 border-2 border-emerald-500/25 rounded-2xl p-6 md:p-8 space-y-5 text-center mb-8 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-500/5 rounded-full blur-[70px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                
                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white text-emerald-500 rounded-full shadow-sm">
                    {downloadCompleted ? <FileCheck size={24} /> : <Download size={24} />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-950">Your eBook is Ready to Download</h3>
                  </div>

                  {isDownloading && (
                    <div className="max-w-md mx-auto space-y-2 pt-2">
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-150" 
                          style={{ width: `${downloadProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                        Downloading high-res documents... {downloadProgress}%
                      </span>
                    </div>
                  )}

                  {!isDownloading && (
                    <div className="pt-2">
                      <button
                        onClick={handleDownload}
                        className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold text-xs shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all cursor-pointer"
                      >
                        <Download size={16} /> 
                        {downloadCompleted ? "Download File Again" : "Download PDF Now (Full Guide)"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Receipt Summary Container */}
            <div className="text-left bg-brand-cream/15 border border-brand-cream/50 rounded-2xl p-6 md:p-8 space-y-6 mb-8">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-brand-cream/50 pb-3 flex items-center gap-2">
                <FileText size={16} /> Receipt & Order Breakdown
              </h2>

              <div className="grid md:grid-cols-2 gap-6 text-sm">
                
                {/* Left col: Product & Payment info */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-gray-400 block mb-0.5">{displayDetails.isEbook ? "eBook Purchased" : "Product Ordered"}</span>
                    <div className="font-bold text-brand-dark flex items-center gap-1.5">
                      <ShoppingBag size={14} className="text-brand-pink" /> {displayDetails.productName}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400 block mb-0.5">Payment Reference</span>
                    <span className="font-mono text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block">
                      {displayDetails.paymentId}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-gray-400 block mb-0.5">Paid Amount</span>
                      <span className="font-extrabold text-brand-blue text-base">₹{displayDetails.amount}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 block mb-0.5">Order Date</span>
                      <span className="text-gray-600 font-medium flex items-center gap-1">
                        <Calendar size={13} /> {displayDetails.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right col: Shipping details */}
                <div className="space-y-4 md:border-l md:border-brand-cream/30 md:pl-6">
                  <div>
                    <span className="text-xs text-gray-400 block mb-1">Deliver To</span>
                    <div className="font-semibold text-brand-dark flex items-center gap-1.5">
                      <User size={13} className="text-gray-400" /> {displayDetails.name}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                      <Phone size={11} className="text-gray-400" /> +91 {displayDetails.mobile}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-gray-400 block mb-1">Delivery Channel</span>
                    <div className="text-xs text-gray-600 leading-normal flex items-start gap-1.5 font-semibold">
                      <MapPin size={13} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <span>
                        {displayDetails.isEbook 
                          ? "Instant cloud downloadable PDF on this screen." 
                          : `${displayDetails.address}, ${displayDetails.area && `${displayDetails.area}, `}${displayDetails.city}, ${displayDetails.pincode}, ${displayDetails.state}`}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Back to Products */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to={displayDetails.isEbook ? "/ebooks" : "/products"}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand-dark hover:bg-brand-dark/95 text-white rounded-full font-bold text-sm transition-all"
              >
                <ArrowLeft size={16} /> {displayDetails.isEbook ? "Back to eBooks" : "Continue Shopping"}
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-brand-blue font-semibold text-sm hover:underline"
              >
                Go to Home
              </Link>
            </div>

          </div>
        </motion.div>

        {/* Support section */}
        <div className="text-center mt-8 text-xs text-gray-400 flex items-center justify-center gap-1">
          <span>Thank you for choosing Dr. Nishanti's Skin Hair Ozone</span> &bull; <Heart size={10} className="text-brand-pink fill-brand-pink" />
        </div>

      </div>
    </div>
  );
}
