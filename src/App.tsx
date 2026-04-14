import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Star, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  Instagram, 
  Users, 
  Award, 
  Truck,
  UtensilsCrossed
} from 'lucide-react';

// --- Types ---
interface Dish {
  name: string;
  description: string;
  shortDescription: string;
  halfPrice?: string;
  fullPrice: string;
  imageUrl: string;
}

interface Review {
  text: string;
  author: string;
  source: string;
}

// --- Constants ---
const PHONE_NUMBER = "+91 99140 80000";
const WHATSAPP_LINK = "https://wa.me/919914080000?text=Hi, I want to place an order at Chick Fi";
const MAPS_LINK = "https://maps.google.com/?q=Chick+Fi+Jamalpur+Ludhiana";

const SIGNATURE_DISHES: Dish[] = [
  { 
    name: "Butter Chicken", 
    description: "Creamy, slow-cooked tomato gravy. The reason people come back.", 
    shortDescription: "Legendary Butter Chicken",
    halfPrice: "₹320", 
    fullPrice: "₹580",
    imageUrl: "https://picsum.photos/seed/butter-chicken/800/600"
  },
  { 
    name: "Handi Chicken", 
    description: "Slow-cooked in a clay handi. Must try.", 
    shortDescription: "Traditional Handi Chicken",
    halfPrice: "₹340", 
    fullPrice: "₹620",
    imageUrl: "https://picsum.photos/seed/handi-chicken/800/600"
  },
  { 
    name: "Cream Chicken", 
    description: "Rich, velvety white gravy with tender chicken pieces.", 
    shortDescription: "Cream Chicken Dishes",
    halfPrice: "₹350", 
    fullPrice: "₹650",
    imageUrl: "https://picsum.photos/seed/cream-chicken/800/600"
  },
  { 
    name: "Biryani", 
    description: "Fragrant long-grain rice with aromatic spices and chicken.", 
    shortDescription: "Biryani",
    fullPrice: "₹250",
    imageUrl: "https://picsum.photos/seed/biryani/800/600"
  },
  { 
    name: "Handi Paneer", 
    description: "Fresh cottage cheese cooked in a traditional handi masala.", 
    shortDescription: "Handi Paneer",
    fullPrice: "₹280",
    imageUrl: "https://picsum.photos/seed/paneer/800/600"
  },
  { 
    name: "Dal Makhani", 
    description: "Creamy black lentils slow-cooked overnight with butter.", 
    shortDescription: "Dal Makhani and Roti",
    fullPrice: "₹220",
    imageUrl: "https://picsum.photos/seed/dal/800/600"
  },
  { 
    name: "Cheese Chilly", 
    description: "Indo-Chinese street fire on a plate.", 
    shortDescription: "Cheese Chilly",
    halfPrice: "₹280", 
    fullPrice: "₹480",
    imageUrl: "https://picsum.photos/seed/chilly-cheese/800/600"
  },
  { 
    name: "Veg Noodles", 
    description: "Wok-tossed noodles with fresh garden vegetables.", 
    shortDescription: "Veg Noodles",
    fullPrice: "₹180",
    imageUrl: "https://picsum.photos/seed/noodles/800/600"
  },
];

const REVIEWS: Review[] = [
  { text: "Small little place with friendly staff and a really nice owner.", author: "Google Review", source: "Verified" },
  { text: "Great Taste, Nice Place to set with family and friends...... in nominal price.", author: "Google Review", source: "Verified" },
  { text: "Good place for non veg lovers,service is good...", author: "Google Review", source: "Verified" },
  { text: "Always a pleasure to my taste buds when I dine here. Perhaps a longest standing restaurant in the area.", author: "Amanpreet Singh", source: "Local Guide" },
  { text: "Best place for eating out and for small parties. Service is good and parking is also available.", author: "J R Kataria", source: "Local Guide" },
  { text: "Small budget best quality food point. Food quality is better than all nearby restaurants.", author: "Rakesh Kumar", source: "Local Guide" },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Order', href: '#order' },
    { name: 'Find Us', href: '#find-us' },
    { name: 'Parties', href: '#parties' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/95 backdrop-blur-md py-3 shadow-xl' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center gap-1 group">
          <span className="font-display text-2xl md:text-3xl text-white tracking-tighter">
            CHICK <span className="text-primary">FI</span>
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 group-hover:scale-150 transition-transform" />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-white/80 hover:text-primary font-medium text-sm uppercase tracking-widest transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_LINK}
            className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md font-bold text-sm uppercase transition-all transform hover:scale-105 active:scale-95"
          >
            Order Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-dark border-t border-white/10 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-white text-xl font-display uppercase tracking-wider"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={WHATSAPP_LINK}
                className="bg-primary text-white text-center py-4 rounded-md font-bold uppercase tracking-widest"
              >
                Order on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden">
    {/* Background with Overlay */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A0000] to-[#3D0A00] opacity-90" />
      <div className="absolute inset-0 bg-black/40" />
      <img 
        src="https://picsum.photos/seed/chicken/1920/1080?blur=4" 
        alt="Background" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>

    <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-white text-4xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 text-shadow-lg">
          JAMALPUR KA SABSE <br />
          <span className="text-primary">PURANA</span> CHICKEN JOINT
          <div className="text-2xl md:text-4xl mt-4 font-sans text-accent opacity-90">ਚਿੱਕ ਫੀ</div>
        </h1>
        <p className="text-[#F5C6A0] text-lg md:text-2xl max-w-2xl mx-auto mb-10 font-medium">
          Serving bold flavours since 1990 — Butter Chicken, Handi Chicken & more, made fresh every day.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href={WHATSAPP_LINK}
            className="group relative bg-primary text-white px-8 py-4 rounded-md font-bold text-lg uppercase flex items-center gap-3 transition-all hover:bg-primary/90 hover:-translate-y-1 shadow-xl"
          >
            <div className="w-3 h-3 rounded-full bg-[#25D366] animate-pulse-green" />
            Order on WhatsApp
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#menu"
            className="border-2 border-accent text-white px-8 py-4 rounded-md font-bold text-lg uppercase hover:bg-accent/10 transition-all"
          >
            See Our Menu
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm md:text-base font-medium">
          <div className="flex items-center gap-2">
            <div className="flex text-accent">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} />)}
            </div>
            <span>4.0 Stars</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <span>1,630+ Happy Customers</span>
          <span className="hidden sm:inline">•</span>
          <span>Est. 1990</span>
        </div>
      </motion.div>
    </div>
  </section>
);

const TrustBar = () => (
  <section className="bg-dark py-12 border-y border-white/5">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {[
          { icon: <Award className="text-accent" />, text: "Est. 1990 · 35 Years Strong" },
          { icon: <Star className="text-accent" />, text: "4.0★ · 1,630+ Reviews" },
          { icon: <MapPin className="text-accent" />, text: "Parking Available" },
          { icon: <Clock className="text-accent" />, text: "Open 7 Days · 10am–10pm" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left">
            {item.icon}
            <span className="text-white font-medium text-sm md:text-base uppercase tracking-tight">{item.text}</span>
          </div>
        ))}
      </div>
      <p className="text-accent text-center mt-8 italic font-medium">
        "Jamalpur ka sabse bharosa-mand chicken restaurant."
      </p>
    </div>
  </section>
);

const Menu = () => (
  <section id="menu" className="py-24 bg-surface">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-primary text-4xl md:text-5xl mb-2 relative inline-block">
          OUR SIGNATURES
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-accent" />
        </h2>
        <p className="text-dark/60 text-lg mt-6 font-medium">
          35 saal se yehi dishes log baar baar order karte hain.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SIGNATURE_DISHES.map((dish, i) => (
          <motion.div 
            key={dish.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="h-64 bg-gradient-to-br from-primary/20 to-dark/20 relative overflow-hidden">
              <img 
                src={dish.imageUrl} 
                alt={dish.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {i < 2 && (
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest z-10">
                  Best Seller
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl text-dark leading-tight">{dish.name}</h3>
                <div className="text-right">
                  {dish.halfPrice && (
                    <div className="text-[10px] uppercase tracking-widest text-dark/40 font-bold">Half / Full</div>
                  )}
                  <div className="text-accent font-bold">
                    {dish.halfPrice ? `${dish.halfPrice} / ${dish.fullPrice}` : dish.fullPrice}
                  </div>
                </div>
              </div>
              <div className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-3">
                {dish.shortDescription}
              </div>
              <p className="text-dark/60 text-sm mb-6 line-clamp-2">{dish.description}</p>
              <a 
                href={WHATSAPP_LINK}
                className="flex items-center justify-between text-primary font-bold text-sm uppercase group/btn"
              >
                Order Now
                <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="inline-block bg-accent/10 border border-accent/20 px-6 py-3 rounded-full text-accent font-bold text-sm uppercase tracking-wide">
          Half plate is enough for two · Great value every time
        </div>
      </div>
    </div>
  </section>
);

const Story = () => (
  <section id="about" className="py-24 bg-dark text-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-primary to-dark rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/legacy/800/1000" 
                alt="Our Legacy"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-lg shadow-xl hidden md:block">
              <span className="font-display text-5xl block leading-none">35+</span>
              <span className="text-sm uppercase tracking-widest font-bold opacity-80">Years of Quality</span>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <span className="text-accent font-display text-sm tracking-[0.3em] uppercase block mb-4">OUR LEGACY</span>
          <h2 className="text-4xl md:text-5xl mb-8 leading-tight">35 Saal Ki Mehnat, <br />Ek Baar Ka Khana</h2>
          
          <div className="space-y-6 text-white/70 text-lg leading-relaxed">
            <p>
              It all started in 1990 when Puneet ji envisioned a place where the people of Jamalpur could enjoy authentic, 
              home-style chicken dishes made with the finest ingredients. What began as a small passion project has 
              grown into Ludhiana's most trusted chicken destination.
            </p>
            <p>
              For over three decades, we've remained true to our roots. We don't believe in shortcuts. Every handi is 
              slow-cooked, every spice is hand-picked, and every guest is greeted with the same warmth that Puneet ji 
              brought to the first table 35 years ago.
            </p>
          </div>

          <blockquote className="mt-10 border-l-4 border-accent pl-6 py-2 italic text-xl text-white/90">
            "Hamare grahak hamare parivaar hain. Isliye hum hamesha fresh banate hain."
            <footer className="mt-2 text-sm font-bold uppercase tracking-widest text-accent">— Puneet ji, Owner</footer>
          </blockquote>

          <div className="grid grid-cols-3 gap-4 mt-12">
            {[
              { label: "Years Open", val: "35+" },
              { label: "Meals Served", val: "50k+" },
              { label: "Ludhiana's Fav", val: "#1" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 p-4 rounded-lg border border-white/10 text-center">
                <div className="text-2xl font-display text-primary">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">{stat.label}</div>
              </div>
            ))}
          </div>

          <a 
            href={WHATSAPP_LINK}
            className="mt-12 inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-md font-bold uppercase tracking-widest hover:bg-primary/90 transition-all group"
          >
            Order Today on WhatsApp
            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section className="py-24 bg-surface">
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-primary text-4xl md:text-5xl mb-4">Inside Chick Fi</h2>
        <div className="w-16 h-1 bg-accent mx-auto" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          "aspect-square", "aspect-[3/4]", "aspect-video",
          "aspect-[4/5]", "aspect-square", "aspect-video"
        ].map((ratio, i) => (
          <div key={i} className={`relative group overflow-hidden rounded-lg ${ratio}`}>
            <img 
              src={`https://picsum.photos/seed/gallery-${i}/800/800`} 
              alt="Gallery" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a 
          href="#" 
          className="inline-flex items-center gap-2 bg-white border border-dark/10 px-6 py-3 rounded-full text-dark font-bold text-sm uppercase tracking-widest hover:shadow-lg transition-all"
        >
          <Instagram size={18} className="text-primary" />
          @chickfiludhiana — Follow for daily specials
        </a>
      </div>
    </div>
  </section>
);

const Order = () => (
  <section id="order" className="py-24 bg-primary text-white">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h2 className="text-5xl md:text-7xl mb-4 text-shadow-sm">READY TO ORDER?</h2>
      <p className="text-white/80 text-xl mb-16 font-medium">
        Dine in, takeaway ya delivery — hum sab karte hain.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "Dine In", 
            desc: "Walk in and eat fresh. Seating + parking available.", 
            cta: "Get Directions →", 
            href: MAPS_LINK,
            icon: <UtensilsCrossed size={32} className="text-accent" />
          },
          { 
            title: "Order on WhatsApp", 
            desc: "Message us directly. Fast response, fresh food.", 
            cta: "Chat Now →", 
            href: WHATSAPP_LINK,
            icon: <MessageCircle size={32} className="text-accent" />,
            pulse: true
          },
          { 
            title: "Takeaway / Delivery", 
            desc: "Call us and we'll have it ready.", 
            cta: `Call ${PHONE_NUMBER}`, 
            href: `tel:${PHONE_NUMBER.replace(/\s/g, '')}`,
            icon: <Truck size={32} className="text-accent" />
          },
        ].map((card) => (
          <div key={card.title} className="bg-dark p-10 rounded-xl border-2 border-accent/20 flex flex-col items-center text-center group hover:border-accent transition-all">
            <div className="mb-6 transform group-hover:scale-110 transition-transform">{card.icon}</div>
            <h3 className="text-2xl mb-4">{card.title}</h3>
            <p className="text-white/60 mb-8">{card.desc}</p>
            <a 
              href={card.href}
              className={`w-full py-4 rounded-md font-bold uppercase tracking-widest transition-all ${
                card.pulse ? 'bg-primary animate-pulse-green' : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {card.cta}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-16 flex items-center justify-center gap-3 text-accent font-display text-xl">
        <Clock size={24} />
        <span>Open Every Day · 10:00 AM – 10:00 PM</span>
      </div>
    </div>
  </section>
);

const Parties = () => (
  <section id="parties" className="py-24 bg-dark text-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl mb-6">Hosting a Party or Event?</h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">
            Best place for small parties in Jamalpur. We cater for groups. 
            Let us handle the food — you enjoy the night.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: <Users size={20} />, text: "Tables for Groups" },
              { icon: <Award size={20} />, text: "Bulk Order Discounts" },
              { icon: <Clock size={20} />, text: "Quick Service Guaranteed" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-accent">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>

          <a 
            href={WHATSAPP_LINK}
            className="inline-block bg-accent text-dark px-10 py-4 rounded-md font-bold uppercase tracking-widest hover:bg-accent/90 transition-all"
          >
            Plan Your Party with Us →
          </a>
          <p className="mt-4 text-xs text-white/40 uppercase tracking-widest">
            Advance booking recommended for groups of 8+
          </p>
        </div>

        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          <div className="aspect-square bg-primary/20 rounded-lg overflow-hidden">
            <img src="https://picsum.photos/seed/party1/400/400" alt="Party" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
          </div>
          <div className="aspect-square bg-accent/20 rounded-lg overflow-hidden mt-8">
            <img src="https://picsum.photos/seed/party2/400/400" alt="Party" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Reviews = () => (
  <section className="py-24 bg-surface overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
      <h2 className="text-primary text-4xl md:text-5xl mb-4">Jamalpur Ki Zubaan</h2>
      <div className="w-16 h-1 bg-accent mx-auto" />
    </div>

    {/* Marquee */}
    <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
      {[...REVIEWS, ...REVIEWS].map((review, i) => (
        <div key={i} className="flex-shrink-0 w-[350px] bg-white p-8 rounded-xl border-t-4 border-accent shadow-sm">
          <div className="flex text-primary mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <p className="text-dark/80 text-lg mb-6 italic leading-relaxed">"{review.text}"</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-dark">{review.author}</span>
            <span className="bg-primary/10 text-primary text-[10px] px-2 py-1 rounded font-bold uppercase">{review.source}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="max-w-7xl mx-auto px-4 mt-16 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
      <span className="font-display text-xl">4.0★ Google</span>
      <span className="font-display text-xl">3.9★ Justdial</span>
      <span className="font-display text-xl">Listed on Zomato & Swiggy</span>
    </div>

    <style>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        animation: marquee 30s linear infinite;
      }
    `}</style>
  </section>
);

const FindUs = () => (
  <section id="find-us" className="py-24 bg-dark text-white">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="w-full lg:w-2/3">
          <div className="w-full h-[450px] rounded-xl overflow-hidden border-2 border-accent/20 relative">
            {/* Map Placeholder */}
            <div className="absolute inset-0 bg-dark/80 flex items-center justify-center text-center p-8">
              <div>
                <MapPin size={48} className="text-primary mx-auto mb-4" />
                <h3 className="text-2xl mb-2">Chick Fi Jamalpur</h3>
                <p className="text-white/60 mb-6">Metro Rd, HM Colony, Urban Estate Phase 1, Jamalpur, Ludhiana, Punjab 141003</p>
                <a 
                  href={MAPS_LINK}
                  className="inline-block bg-primary text-white px-8 py-3 rounded-md font-bold uppercase tracking-widest hover:bg-primary/90 transition-all"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.23456789!2d75.8901234!3d30.9123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a834567890123%3A0x1234567890abcdef!2sChick%20Fi!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin" 
              className="w-full h-full border-0 grayscale invert opacity-30"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col justify-center">
          <div className="bg-white/5 p-10 rounded-xl border border-white/10">
            <h3 className="text-3xl mb-8 text-accent">Visit Us</h3>
            <div className="space-y-8">
              <div className="flex gap-4">
                <MapPin className="text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1">Address</div>
                  <p className="text-lg">Metro Rd, HM Colony, Urban Estate Phase 1, Jamalpur, Ludhiana, Punjab 141003</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1">Hours</div>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    <span className="text-white/60">Mon – Sun</span>
                    <span className="text-right">10am – 10pm</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs uppercase tracking-widest font-bold opacity-50 mb-1">Contact</div>
                  <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="text-lg hover:text-primary transition-colors">{PHONE_NUMBER}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-dark pt-24 pb-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div>
          <a href="#" className="flex items-center gap-1 mb-6">
            <span className="font-display text-3xl text-white tracking-tighter">
              CHICK <span className="text-primary">FI</span>
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
          </a>
          <p className="text-white/40 leading-relaxed max-w-xs">
            Jamalpur's finest chicken restaurant since 1990. 
            Legacy of taste, quality, and trust for over 35 years.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-accent text-xs uppercase tracking-[0.2em] font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-white/60 text-sm font-medium">
              <li><a href="#menu" className="hover:text-primary transition-colors">Menu</a></li>
              <li><a href="#order" className="hover:text-primary transition-colors">Order Now</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Our Story</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-accent text-xs uppercase tracking-[0.2em] font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-white/60 text-sm font-medium">
              <li><a href="#find-us" className="hover:text-primary transition-colors">Find Us</a></li>
              <li><a href="#parties" className="hover:text-primary transition-colors">Parties</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div>
          <h4 className="text-accent text-xs uppercase tracking-[0.2em] font-bold mb-6">Connect</h4>
          <div className="flex gap-4 mb-8">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
              <Instagram size={20} />
            </a>
            <a href={WHATSAPP_LINK} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#25D366] transition-all">
              <MessageCircle size={20} />
            </a>
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
              <Phone size={20} />
            </a>
          </div>
          <div className="text-white/40 text-sm">
            <div className="mb-1">Call us for bulk orders:</div>
            <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="text-white font-bold text-lg hover:text-primary transition-colors">{PHONE_NUMBER}</a>
          </div>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-accent text-[10px] uppercase tracking-[0.3em] font-bold">
          © 2025 Chick Fi, Ludhiana. All Rights Reserved.
        </p>
        <div className="text-white/20 text-[10px] uppercase tracking-widest flex gap-6">
          <span>Designed for Conversion</span>
          <span>Jamalpur's Pride</span>
        </div>
      </div>
    </div>
  </footer>
);

const FloatingWhatsApp = () => (
  <a 
    href={WHATSAPP_LINK}
    className="fixed bottom-8 right-8 z-[60] w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform animate-pulse-green"
    aria-label="Order on WhatsApp"
  >
    <MessageCircle size={32} />
  </a>
);

const MobileCallBar = () => (
  <div className="md:hidden fixed top-0 left-0 w-full bg-primary text-white py-2 px-4 z-[70] flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest shadow-lg">
    <Phone size={14} />
    <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`}>Call {PHONE_NUMBER}</a>
  </div>
);

// --- Main App ---

export default function App() {
  useEffect(() => {
    // Inject Schema Markup
    const schema = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "name": "Chick Fi",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Metro Rd, HM Colony, Urban Estate Phase 1, Jamalpur",
        "addressLocality": "Ludhiana",
        "addressRegion": "Punjab",
        "postalCode": "141003",
        "addressCountry": "IN"
      },
      "telephone": "+919914080000",
      "servesCuisine": ["North Indian", "Chinese"],
      "priceRange": "₹200-400",
      "openingHours": "Mo-Su 10:00-22:00",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.0",
        "reviewCount": "1630"
      },
      "image": "https://picsum.photos/seed/chicken/800/600",
      "url": window.location.href
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="relative pt-[40px] md:pt-0">
      <MobileCallBar />
      <Navbar />
      
      <main>
        <Hero />
        <TrustBar />
        <Menu />
        <Story />
        <Gallery />
        <Order />
        <Parties />
        <Reviews />
        <FindUs />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
