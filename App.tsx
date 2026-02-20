
import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  CheckCircle2,
  ArrowRight,
  Zap,
  ShieldCheck,
  Users,
  Star,
  Clock,
  ChevronDown,
  ChevronUp,
  BarChart3,
  CalendarDays,
  ArrowLeft,
  ExternalLink,
  Send,
  Globe,
  Wrench,
  Flame,
  Droplets,
  TreePine,
  Building2,
  Sparkles
} from 'lucide-react';

// --- Shared Components ---

const CTAButton = ({ className = "", children = "Get Your Free Consultation" }) => (
  <a
    href="/opt-in"
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-block gradient-bg px-8 py-4 rounded-full font-bold text-white hover:opacity-90 transition-all transform hover:scale-105 glow-purple text-center ${className}`}
  >
    {children}
  </a>
);

const Logo = ({ onClick }: { onClick?: () => void }) => (
  <div
    className="group flex items-center gap-3 cursor-pointer select-none"
    onClick={onClick}
  >
    {/* Icon Part: White circle with black diamond */}
    <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
      {/* Rotation removed as requested */}
      <div className="w-4 h-4 bg-black rounded-sm transform rotate-45 transition-all duration-300 ease-out group-hover:scale-110"></div>
    </div>

    {/* Text Part: NEXTFLOW (white) AI (purple) */}
    <div className="flex items-baseline font-bold tracking-tighter text-2xl uppercase">
      <span className="text-white">AI Voice</span>
      <span className="text-[#a855f7] ml-1.5">Hub</span>
    </div>
  </div>
);

// --- Page Components ---

const Navbar = ({ setView }: { setView: (v: string) => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Logo onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button onClick={handleHomeClick} className="hover:text-white transition-colors">Home</button>
          <a href="#benefits" onClick={(e) => { e.preventDefault(); setView('home'); setTimeout(() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white transition-colors">Benefits</a>
          <a href="#how-it-works" onClick={(e) => { e.preventDefault(); setView('home'); setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-white transition-colors">How it Works</a>
          <a href="/opt-in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a>
        </div>
        <a
          href="/opt-in"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:bg-purple-500 hover:text-white transition-all"
        >
          Free Consultation
        </a>
      </div>
    </nav>
  );
};


const ContactPage = ({ setView }: { setView: (v: string) => void }) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    currentWebsite: '',
    monthlyCustomers: '',
    biggestChallenge: '',
    services: [] as string[],
  });

  const businessTypeOptions = ['HVAC', 'Plumbing', 'Landscaping', 'Electrical', 'Roofing', 'General Contractor', 'Cleaning Services', 'Other'];
  const serviceOptions = ['Website Design', 'Lead Generation', 'Online Booking', 'SEO', 'Google Ads', 'Social Media'];

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch('https://services.leadconnectorhq.com/hooks/Er1cETQk7bVrn97N4m8N/webhook-trigger/38de9f3d-10f6-4330-915e-510df7e7ee25', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessType: formData.businessType,
          currentWebsite: formData.currentWebsite,
          monthlyCustomers: formData.monthlyCustomers,
          biggestChallenge: formData.biggestChallenge,
          services: formData.services,
        }),
      });
    } catch {
      // Still show success — webhook may not return CORS headers
    }
    setSubmitting(false);
    setStep(3);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 transition-colors";

  return (
    <div className="pt-32 pb-24 min-h-[80vh] flex flex-col justify-center">
      <div className="container mx-auto px-6 max-w-4xl">
        <button onClick={() => { setView('home'); window.scrollTo(0,0); }} className="flex items-center gap-2 text-purple-400 mb-8 hover:text-purple-300 transition-colors">
          <ArrowLeft size={20} /> Back to Home
        </button>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Let's <span className="gradient-text">Build Together.</span></h1>
            <p className="text-xl text-gray-400 mb-10">Ready to get a professional website that brings in customers? Let's talk about your business goals.</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Us</p>
                  <a href="mailto:sayedakbar@aivoicehub.site" className="text-lg font-bold hover:text-purple-400 transition-colors">sayedakbar@aivoicehub.site</a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  <CalendarDays size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fast Track</p>
                  <a
                    href="/opt-in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold hover:text-purple-400 transition-colors text-left block"
                  >
                    Get a Free Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-10 rounded-3xl border border-purple-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl -z-10"></div>

            {step < 3 && (
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">{step === 1 ? 'Get in Touch' : 'Tell Us About Your Business'}</h3>
                <span className="text-sm text-gray-500">Step {step} of 2</span>
              </div>
            )}

            {step === 1 && (
              <form className="space-y-4" onSubmit={handleStep1}>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={inputClass}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={inputClass}
                    placeholder="john@mybusiness.com"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={inputClass}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <button type="submit" className="w-full gradient-bg py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                  Next <ArrowRight size={18} />
                </button>
              </form>
            )}

            {step === 2 && (
              <form className="space-y-5" onSubmit={handleStep2}>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">What type of business do you have?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {businessTypeOptions.map(option => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => setFormData({...formData, businessType: option})}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                          formData.businessType === option
                            ? 'border-purple-500 bg-purple-500/20 text-white'
                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-2 block">What services are you interested in?</label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map(service => (
                      <button
                        type="button"
                        key={service}
                        onClick={() => toggleService(service)}
                        className={`px-3 py-2 rounded-full text-sm font-medium border transition-all ${
                          formData.services.includes(service)
                            ? 'border-purple-500 bg-purple-500/20 text-white'
                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Do you have a current website?</label>
                  <input
                    type="text"
                    value={formData.currentWebsite}
                    onChange={(e) => setFormData({...formData, currentWebsite: e.target.value})}
                    className={inputClass}
                    placeholder="www.mybusiness.com (or 'No')"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400 mb-1 block">How many customers do you serve monthly?</label>
                  <input
                    type="text"
                    value={formData.monthlyCustomers}
                    onChange={(e) => setFormData({...formData, monthlyCustomers: e.target.value})}
                    className={inputClass}
                    placeholder="e.g. 20-30"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 rounded-xl font-bold border border-white/10 hover:border-white/20 transition-colors flex items-center justify-center gap-2"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>
                  <button type="submit" disabled={submitting} className="flex-1 gradient-bg py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? 'Submitting...' : 'Submit'} {!submitting && <Send size={18} />}
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Thank You!</h3>
                <p className="text-gray-400 mb-8">We've received your information and will be in touch shortly to discuss your new website.</p>
                <button
                  onClick={() => { setView('home'); window.scrollTo(0,0); }}
                  className="gradient-bg px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity"
                >
                  Back to Home
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Landing Page Sections ---

const Hero = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-purple-900/10 blur-[120px] rounded-full -z-10"></div>
    <div className="container mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />)}
        <span className="ml-2 text-sm font-medium text-gray-400">Trusted by 500+ Local Businesses</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight max-w-5xl mx-auto leading-tight">
        Websites That Bring You <span className="gradient-text">More Customers.</span>
      </h1>
      <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed">
        Professional websites for HVAC, plumbers, landscapers, and local service businesses. Capture leads, book appointments, and grow your business 24/7.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <CTAButton className="w-full sm:w-auto" />
        <p className="text-gray-500 text-sm italic">No tech skills needed. We handle everything.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {[
          { metric: "24/7", label: "Lead Capture" },
          { metric: "2x", label: "More Bookings" },
          { metric: "100%", label: "Mobile Ready" },
          { metric: "Fast", label: "Launch Time" }
        ].map((item, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl">
            <div className="text-3xl font-bold mb-1 gradient-text">{item.metric}</div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Industries = () => (
  <section className="py-16 bg-[#050505]">
    <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold text-center mb-12 text-gray-400">Built for Local Service Businesses</h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
        {[
          { icon: <Flame className="text-orange-500" size={28} />, label: "HVAC" },
          { icon: <Droplets className="text-blue-500" size={28} />, label: "Plumbing" },
          { icon: <TreePine className="text-green-500" size={28} />, label: "Landscaping" },
          { icon: <Zap className="text-yellow-500" size={28} />, label: "Electrical" },
          { icon: <Building2 className="text-gray-400" size={28} />, label: "Roofing" },
          { icon: <Sparkles className="text-purple-500" size={28} />, label: "Cleaning" }
        ].map((item, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl text-center hover:border-purple-500/30 transition-all group">
            <div className="mb-3 group-hover:scale-110 transition-transform flex justify-center">{item.icon}</div>
            <div className="text-sm font-medium text-gray-300">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Comparison = () => (
  <section className="py-20 bg-[#050505]">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">No Website vs <span className="text-purple-500">AI Voice Hub Website</span></h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl">
          <h3 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div> Without a Website
          </h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex gap-3">❌ <span>Customers can't find you when they search online.</span></li>
            <li className="flex gap-3">❌ <span>Missing calls while you're on a job.</span></li>
            <li className="flex gap-3">❌ <span>Competitors get the customers you should have.</span></li>
            <li className="flex gap-3">❌ <span>No credibility—customers go with who looks more professional.</span></li>
          </ul>
        </div>
        <div className="bg-purple-500/5 border border-purple-500/20 p-8 rounded-3xl glow-purple">
          <h3 className="text-xl font-bold text-purple-400 mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div> With AI Voice Hub Website
          </h3>
          <ul className="space-y-4 text-gray-200">
            <li className="flex gap-3 font-medium">✅ <span className="text-white">Show up when customers search "plumber near me".</span></li>
            <li className="flex gap-3 font-medium">✅ <span className="text-white">Customers book appointments even when you're busy.</span></li>
            <li className="flex gap-3 font-medium">✅ <span className="text-white">Capture leads 24/7 with smart contact forms.</span></li>
            <li className="flex gap-3 font-medium">✅ <span className="text-white">Look professional and build instant trust.</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const Solutions = () => (
  <section id="solutions" className="py-24">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything You Need to Grow</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">We build websites that work as hard as you do—capturing leads and booking jobs around the clock.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: <Globe className="text-purple-500" size={32} />,
            title: "Professional Website",
            desc: "A stunning, mobile-friendly website that showcases your services, builds trust, and makes customers want to hire you."
          },
          {
            icon: <CalendarDays className="text-purple-500" size={32} />,
            title: "Online Booking System",
            desc: "Let customers book appointments directly on your website. No more phone tag—they pick a time that works for both of you."
          },
          {
            icon: <BarChart3 className="text-purple-500" size={32} />,
            title: "Lead Capture Forms",
            desc: "Smart contact forms that capture customer info and send it straight to your phone. Never miss a potential job again."
          }
        ].map((item, idx) => (
          <div key={idx} className="glass-card p-10 rounded-3xl hover:border-purple-500/50 transition-all group">
            <div className="mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section id="benefits" className="py-24 bg-[#050505]">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Why Local Businesses Choose AI Voice Hub</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Zap className="text-purple-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Get Found Online</h4>
                <p className="text-gray-400">97% of customers search online before hiring. Without a website, they'll never find you.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="text-purple-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Build Trust Instantly</h4>
                <p className="text-gray-400">A professional website with reviews and your work photos makes customers confident in hiring you.</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Users className="text-purple-500" />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-2">Never Miss a Lead</h4>
                <p className="text-gray-400">Your website works 24/7. Customers can contact you or book appointments even at 2 AM.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute -inset-4 bg-purple-500/20 blur-3xl rounded-full"></div>
          <div className="relative glass-card p-2 rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Website Dashboard" className="rounded-2xl border border-white/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-2xl">
              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[18px] border-l-black border-b-[12px] border-b-transparent ml-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Process = () => (
  <section id="how-it-works" className="py-24">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-12 relative">
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent -translate-y-1/2 z-0"></div>
        {[
          { step: "01", title: "Tell Us About Your Business", desc: "We'll learn about your services, your ideal customers, and what makes your business unique." },
          { step: "02", title: "We Build Your Website", desc: "Our team creates a professional website with online booking and lead capture—all customized for you." },
          { step: "03", title: "Start Getting Customers", desc: "Your website goes live and starts working for you. Watch the leads and bookings roll in." }
        ].map((item, idx) => (
          <div key={idx} className="relative z-10 text-center">
            <div className="w-20 h-20 rounded-full bg-black border-2 border-purple-500 mx-auto mb-8 flex items-center justify-center text-2xl font-black text-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              {item.step}
            </div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-[#050505]">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
        <p className="text-gray-400">Real results from real local business owners.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Mike Thompson",
            role: "Thompson HVAC Services",
            content: "Since getting our AI Voice Hub website, we've doubled our service calls. Customers can book online even when we're out on jobs. Best investment I've made for my business.",
            image: "https://i.pravatar.cc/150?u=mike"
          },
          {
            name: "Sarah Martinez",
            role: "Martinez Plumbing Co.",
            content: "I was hesitant about spending money on a website, but it paid for itself in the first month. We're getting 10-15 new leads every week now.",
            image: "https://i.pravatar.cc/150?u=sarah2"
          },
          {
            name: "James Wilson",
            role: "GreenScape Landscaping",
            content: "The online booking system changed everything. No more back-and-forth phone calls. Customers pick their time slot and we show up. Simple.",
            image: "https://i.pravatar.cc/150?u=james"
          }
        ].map((item, idx) => (
          <div key={idx} className="glass-card p-8 rounded-3xl border border-white/5">
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-yellow-500 text-yellow-500" />)}
            </div>
            <p className="text-gray-300 italic mb-8">"{item.content}"</p>
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full border border-purple-500/30" />
              <div>
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-gray-500 text-sm">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-bold">{question}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="pb-6 text-gray-400 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

const FAQ = () => (
  <section id="faq" className="py-24">
    <div className="container mx-auto px-6 max-w-3xl">
      <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
      <div className="space-y-2">
        <FAQItem
          question="How much does a website cost?"
          answer="We offer affordable packages designed for local service businesses. Book a free consultation and we'll give you an exact quote based on your needs. No hidden fees."
        />
        <FAQItem
          question="How long does it take to build?"
          answer="Most websites are ready to launch within 1-2 weeks. We handle everything—design, content, and setup—so you can focus on running your business."
        />
        <FAQItem
          question="Do I need to know anything about technology?"
          answer="Not at all! We handle all the technical stuff. You just tell us about your business and approve the design. It's that simple."
        />
        <FAQItem
          question="Can customers really book appointments online?"
          answer="Yes! We set up a professional booking system where customers can see your availability and book a time slot that works for both of you. You'll get instant notifications."
        />
        <FAQItem
          question="Will my website work on phones?"
          answer="Absolutely. All our websites are mobile-friendly. Over 60% of your customers will visit from their phones, so we make sure it looks perfect on every device."
        />
      </div>
    </div>
  </section>
);

const Footer = ({ setView }: { setView: (v: string) => void }) => (
  <footer className="py-12 border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <Logo onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms & Conditions</a>
          <a href="/opt-in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Get Started</a>
          <a href="/opt-in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact Us</a>
        </div>
        <p className="text-gray-500 text-sm">© 2026 AI Voice Hub.</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [view, setView] = useState('home');

  useEffect(() => {
    // Only auto-scroll to top if we are switching views
    // For smooth anchors, we handle explicitly in clicks
    if (view !== 'home') window.scrollTo(0, 0);
  }, [view]);

  const renderView = () => {
    switch(view) {
      case 'contact': return <ContactPage setView={setView} />;
      default: return (
        <>
          <Hero />
          <Industries />
          <Comparison />
          <Solutions />
          <Benefits />
          <Process />
          <Testimonials />

          <section className="py-20 bg-purple-600/10">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join hundreds of local businesses who are getting more customers with a professional website. Book your free consultation today.</p>
              <CTAButton />
            </div>
          </section>

          <FAQ />

          <section id="book" className="py-24 bg-[#0a0a0a]">
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold mb-8">Get Your Free Website Consultation</h2>
              <div className="max-w-4xl mx-auto glass-card p-10 rounded-3xl border border-purple-500/20">
                <p className="text-xl text-gray-400 mb-8">Let's talk about how a professional website can help you get more customers.</p>
                <CTAButton className="text-lg px-12 py-5" />
                <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-gray-500 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Free Consultation</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Custom Design</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Fast Launch</div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar setView={setView} />
      <main>
        {renderView()}
      </main>
      <Footer setView={setView} />
    </div>
  );
}
