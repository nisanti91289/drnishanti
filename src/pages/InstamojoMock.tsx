import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  ShieldCheck, Lock, CreditCard, Smartphone, Landmark, 
  HelpCircle, AlertCircle, ArrowRight, CheckCircle, Flame
} from "lucide-react";

export default function InstamojoMock() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const name = searchParams.get("name") || "Customer";
  const mobile = searchParams.get("mobile") || "";
  const address = searchParams.get("address") || "";
  const area = searchParams.get("area") || "";
  const city = searchParams.get("city") || "";
  const pincode = searchParams.get("pincode") || "";
  const state = searchParams.get("state") || "";
  const productName = searchParams.get("productName") || "Clinical Program";
  const amount = searchParams.get("amount") || "449";
  const isEbook = searchParams.get("isEbook") || "false";
  const ebookId = searchParams.get("ebookId") || "";
  const ebookTheme = searchParams.get("ebookTheme") || "";

  // Payment methods
  const [selectedMethod, setSelectedMethod] = useState<"upi" | "card" | "net">("upi");
  const [upiId, setUpiId] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    document.title = "Instamojo Secure Sandbox Checkout";
  }, []);

  const handlePay = () => {
    setIsPaying(true);
    
    // Create random mock transaction ids
    const paymentId = "MOJO_MOCK_" + Math.random().toString(36).substring(2, 11).toUpperCase();
    const paymentRequestId = searchParams.get("payment_request_id") || "REQ_" + Math.random().toString(36).substring(2, 11).toUpperCase();

    // Construct callback redirect query params
    const callbackParams = new URLSearchParams({
      payment_id: paymentId,
      payment_status: "Credit",
      payment_request_id: paymentRequestId,
      name,
      mobile,
      address,
      area,
      city,
      pincode,
      state,
      productName,
      amount,
      isEbook,
      ebookId,
      ebookTheme
    }).toString();

    setTimeout(() => {
      // Redirect to backend callback endpoint which persists the transaction and forwards to thank-you!
      window.location.href = `/api/instamojo/callback?${callbackParams}`;
    }, 1500);
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans antialiased text-slate-800 flex flex-col justify-between">
      
      {/* Top Professional Gateway Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#7444a4] text-xl tracking-tight uppercase flex items-center gap-1">
              <Flame size={20} className="text-amber-500 fill-amber-400" /> instamojo
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-black uppercase tracking-wider">
              Sandbox Testnet
            </span>
          </div>
          <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
            <Lock size={13} className="text-emerald-500" /> Secure 128-bit SSL Gateway
          </div>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 py-10 flex-1 grid md:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Merchant & Order Details */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="space-y-2 text-center pb-4 border-b border-slate-100">
            <div className="w-12 h-12 bg-[#7444a4]/10 text-[#7444a4] font-black rounded-full flex items-center justify-center mx-auto text-lg shadow-inner">
              DN
            </div>
            <h3 className="font-bold text-sm text-slate-800">Dr. Nishanti's Clinic</h3>
            <p className="text-[10.5px] text-emerald-600 font-extrabold flex items-center gap-1 justify-center">
              <ShieldCheck size={13} fill="currentColor" className="text-white" /> Verified Business Account
            </p>
          </div>

          <div className="space-y-4 text-xs font-semibold text-slate-600">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Product / Goal</span>
              <span className="text-slate-900 font-bold block">{productName}</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Customer Details</span>
              <span className="text-slate-900 font-bold block">{name}</span>
              <span className="text-slate-500 block font-mono">{mobile}</span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-baseline justify-between text-slate-900">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Amount To Pay</span>
              <span className="text-2xl font-black text-[#7444a4]">₹{amount}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Mock Payment Options Selection */}
        <div className="md:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          
          <div className="bg-slate-50/70 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <span className="font-black text-xs uppercase tracking-wider text-slate-500">Choose Payment Method</span>
            <span className="text-[10.5px] text-indigo-600 font-bold">Simulating Instant Callback</span>
          </div>

          <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50/20 text-center text-xs font-bold">
            <button 
              onClick={() => setSelectedMethod("upi")}
              className={`py-4 flex flex-col items-center gap-1.5 cursor-pointer border-b-2 transition-all ${
                selectedMethod === "upi" ? "border-[#7444a4] text-[#7444a4] bg-white" : "border-transparent text-slate-400 hover:text-slate-800"
              }`}
            >
              <Smartphone size={16} /> BHIM UPI / GPay
            </button>
            <button 
              onClick={() => setSelectedMethod("card")}
              className={`py-4 flex flex-col items-center gap-1.5 cursor-pointer border-b-2 transition-all ${
                selectedMethod === "card" ? "border-[#7444a4] text-[#7444a4] bg-white" : "border-transparent text-slate-400 hover:text-slate-800"
              }`}
            >
              <CreditCard size={16} /> Debit / Credit Card
            </button>
            <button 
              onClick={() => setSelectedMethod("net")}
              className={`py-4 flex flex-col items-center gap-1.5 cursor-pointer border-b-2 transition-all ${
                selectedMethod === "net" ? "border-[#7444a4] text-[#7444a4] bg-white" : "border-transparent text-slate-400 hover:text-slate-800"
              }`}
            >
              <Landmark size={16} /> Netbanking
            </button>
          </div>

          {/* Configuration Form Areas */}
          <div className="p-8 flex-1 min-h-[180px] flex flex-col justify-between">
            
            <div className="space-y-4">
              {selectedMethod === "upi" && (
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Pay using UPI App</h4>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. username@okhdfcbank"
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#7444a4]/25 focus:bg-white transition-all"
                    />
                    <button 
                      onClick={() => setUpiId("drnishanti@upi")}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-[10.5px] font-bold transition-all text-slate-600"
                    >
                      Autofill Mock
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal font-semibold">
                    Accepting payment processing via Google Pay, PhonePe, Paytm, BHIM and netbanking apps instantly.
                  </p>
                </div>
              )}

              {selectedMethod === "card" && (
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Debit / Credit Card Details</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      placeholder="Card Number" 
                      defaultValue="4111 2222 3333 4444" 
                      className="col-span-3 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:outline-none" 
                      disabled
                    />
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      defaultValue="12/29" 
                      className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center focus:outline-none" 
                      disabled
                    />
                    <input 
                      type="password" 
                      placeholder="CVV" 
                      defaultValue="987" 
                      className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-center focus:outline-none" 
                      disabled
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 leading-normal font-semibold">
                    Simulating Mastercard / Visa pre-approved credential authorization.
                  </p>
                </div>
              )}

              {selectedMethod === "net" && (
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Popular Banks Curation</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"].map((bank, bIdx) => (
                      <div key={bIdx} className="px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-1.5">
                        <CheckCircle size={12} className="text-emerald-500" /> {bank}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={handlePay}
                disabled={isPaying}
                className="w-full py-4 bg-[#7444a4] hover:bg-[#603588] text-white rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-purple-700/20 active:scale-98 transition-all"
              >
                {isPaying ? (
                  <>Processing Sandbox Transaction...</>
                ) : (
                  <>
                    Pay Securely Register ₹{amount} <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Footer copyright */}
      <div className="bg-slate-200/55 py-6 px-6 text-center text-[10.5px] font-semibold text-slate-400 border-t border-slate-200/60 leading-normal">
        Instamojo Technologies Inc. Secured SSL Merchant Tunnel. All demo credits are virtual and sandbox only.
      </div>

    </div>
  );
}
