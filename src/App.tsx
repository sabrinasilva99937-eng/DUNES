import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Home, 
  Search, 
  Menu, 
  ArrowLeft, 
  ChevronRight, 
  Star, 
  MessageCircle, 
  MapPin, 
  CreditCard, 
  Settings as SettingsIcon,
  LogOut,
  Bell,
  Lock,
  Eye,
  Smartphone,
  CheckCircle,
  Truck,
  Package,
  Clock,
  ExternalLink,
  Plus,
  Minus,
  X,
  Filter
} from 'lucide-react';
import { Product, Screen, UserData, Address, PaymentMethod, CartItem, Order } from './types';
import { PRODUCTS, HERO_IMAGE } from './constants';

// --- Components ---

const Navbar = ({ onNavigate, currentScreen }: { onNavigate: (s: Screen) => void, currentScreen: Screen }) => {
  const tabs: { id: Screen; icon: any; label: string }[] = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'catalog', icon: Search, label: 'Catálogo' },
    { id: 'favorites', icon: Heart, label: 'Favoritos' },
    { id: 'cart', icon: ShoppingBag, label: 'Carrinho' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  if (['splash', 'welcome', 'login', 'signup'].includes(currentScreen)) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-light/80 backdrop-blur-xl border-t border-brand-dark/5 pb-safe pt-2">
      <div className="flex justify-around items-center px-4 mb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className="flex flex-col items-center gap-1 relative py-1 focus:outline-none"
            >
              <Icon 
                size={22} 
                className={`transition-colors duration-300 ${isActive ? 'text-brand-dark' : 'text-brand-dark/40'}`} 
              />
              <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? 'text-brand-dark' : 'text-brand-dark/40'}`}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-1 w-1 h-1 bg-brand-accent rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- Screens ---
const SplashScreen = ({ onFinish }: { onFinish: () => void, key?: string }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-brand-dark flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="flex flex-col items-center justify-center p-6"
      >
        <div className="w-[360px] h-[360px] relative flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-brand-accent/20 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[30px] border border-dashed border-brand-accent/10 rounded-full"
          />
          <div className="absolute inset-6 flex items-center justify-center">
             <div className="w-56 h-56 bg-brand-accent rounded-full opacity-10 blur-3xl animate-pulse absolute" />
             <img 
                src="/src/assets/images/dunes_sun_logo_1779232437862.png" 
                alt="Dunes Jewelry Logo" 
                className="w-56 h-56 object-contain relative z-10 brightness-110" 
                referrerPolicy="no-referrer"
             />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const WelcomeScreen = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-brand-white to-brand-light px-6 pt-12 pb-6 flex flex-col justify-between items-center text-center relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-brand-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Sparkles of premium gems */}
      <div className="absolute top-12 right-12 opacity-60 animate-pulse">
        <span className="text-brand-accent text-xl">✦</span>
      </div>
      <div className="absolute top-1/3 left-8 opacity-40">
        <span className="text-brand-accent text-lg">✦</span>
      </div>
      <div className="absolute bottom-40 right-10 opacity-50 animate-pulse">
        <span className="text-brand-accent text-sm">✦</span>
      </div>

      {/* Header and Animated Logo */}
      <div className="flex flex-col items-center mt-6 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="w-[350px] h-[350px] bg-brand-white/80 border border-brand-accent/20 rounded-full flex items-center justify-center shadow-[0_12px_36px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.7)] backdrop-blur-md mb-6"
        >
          <img 
            src="/src/assets/images/dunes_sun_logo_1779232437862.png" 
            alt="Dunes Logo" 
            className="w-[310px] h-[310px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
          />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-4xl font-serif tracking-widest text-[#1a2d3c] mb-2 font-light"
        >
          DUNES
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-[10px] tracking-[0.3em] text-[#869fb2] font-semibold uppercase mb-6"
        >
          Alta Joalheria
        </motion.p>
        
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-brand-accent to-transparent my-2" />
      </div>

      {/* Hero Invitation Text */}
      <div className="mt-auto mb-10 max-w-sm px-6 z-10 select-none">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2 }}
          className="text-brand-dark/95 font-light font-serif italic text-base leading-relaxed"
        >
          "A delicadeza do ouro e o brilho eterno da prata esculpidos em forma de exclusividade para você."
        </motion.p>
      </div>

      {/* Elegant Action Buttons */}
      <div className="w-full max-w-[280px] space-y-4 mb-2 z-10">
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          onClick={() => onNavigate('home')}
          className="w-full bg-[#1b2527] border border-[#a4b5c4] hover:bg-brand-dark text-white font-medium py-3.5 rounded-[12px] shadow-lg active:scale-[0.98] transition-all text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2"
        >
          <span>Descobrir Joias</span>
          <ChevronRight size={14} className="text-zinc-300" />
        </motion.button>

        <motion.button 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          onClick={() => onNavigate('login')}
          className="w-full text-brand-dark/60 hover:text-brand-dark font-medium py-2 text-[11px] tracking-[0.15em] uppercase transition-all flex items-center justify-center gap-1.5"
        >
          <span>Minha Conta</span>
        </motion.button>
      </div>
    </div>
  );
};

const LoginScreen = ({ onNavigate, onLogin, mode = 'login' }: { 
  onNavigate: (s: Screen) => void, 
  onLogin: (identifier: string) => void,
  mode?: 'login' | 'signup' 
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!identifier) return;
    onLogin(identifier);
    onNavigate('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light via-brand-white to-brand-light px-6 pt-12 pb-8 flex flex-col justify-between relative overflow-hidden">
      {/* Return button */}
      <button 
        onClick={() => onNavigate('welcome')}
        className="absolute top-5 left-5 p-2 bg-white/60 border border-brand-accent/20 rounded-full text-brand-dark/80 hover:text-brand-dark z-20 backdrop-blur-md"
      >
        <ArrowLeft size={16} />
      </button>

      <div className="flex flex-col items-center text-center mt-6">
        <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center border border-brand-accent/30 mb-4 backdrop-blur-md shadow-sm">
          <img 
            src="/src/assets/images/dunes_sun_logo_1779232437862.png" 
            alt="Dunes" 
            className="w-8 h-8 object-contain"
          />
        </div>
        <h2 className="text-3xl font-serif text-brand-dark tracking-wide mb-1">
          {mode === 'login' ? 'Bem-vindo' : 'Criar Conta'}
        </h2>
        <p className="text-brand-accent font-semibold tracking-[0.2em] text-[10px] uppercase">
          {mode === 'login' 
            ? 'Dunes Jewelry • Universo Exclusivo' 
            : 'Junte-se ao universo Dunes.'}
        </p>
      </div>

      <div className="flex flex-col gap-4 my-8 z-10">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.15em] text-brand-dark/70 font-semibold ml-1">
            {mode === 'login' ? 'E-mail ou Nome' : 'Nome Completo'}
          </label>
          <input 
            type="text" 
            placeholder={mode === 'login' ? "seu@email.com ou seu nome" : "Seu nome completo"}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full bg-white/80 text-brand-dark border border-[#b2c6d4]/40 placeholder-[#8ea4b5]/65 rounded-[12px] px-4 py-3.5 focus:outline-none focus:border-brand-accent focus:bg-white transition-all text-sm shadow-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-[0.15em] text-brand-dark/70 font-semibold ml-1">Senha</label>
          <input 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/80 text-brand-dark border border-[#b2c6d4]/40 placeholder-[#8ea4b5]/65 rounded-[12px] px-4 py-3.5 focus:outline-none focus:border-brand-accent focus:bg-white transition-all text-sm shadow-sm"
          />
        </div>
        {mode === 'login' && (
          <button className="text-right text-xs text-brand-accent font-medium mt-1 hover:brightness-110 transition-all uppercase tracking-widest text-[9px] font-semibold">
            Esqueceu a senha?
          </button>
        )}
      </div>

      <div className="space-y-4 z-10">
        <button 
          onClick={handleSubmit}
          className="w-full bg-brand-dark/95 hover:bg-brand-dark text-white font-semibold py-3.5 rounded-[12px] shadow-md active:scale-[0.98] transition-all text-sm tracking-widest uppercase border border-[#b2c6d4]/30"
        >
          {mode === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>

        {mode === 'login' && (
          <>
            <div className="flex items-center gap-4 my-2">
              <div className="h-[1px] flex-1 bg-[#b2c6d4]/30" />
              <span className="text-[9px] text-brand-dark/40 uppercase tracking-widest font-bold">ou</span>
              <div className="h-[1px] flex-1 bg-[#b2c6d4]/30" />
            </div>

            <button 
              onClick={() => {
                onLogin('Cliente Google');
                onNavigate('home');
              }}
              className="w-full bg-white hover:bg-neutral-50 border border-brand-accent/20 text-brand-dark font-medium py-3 rounded-[12px] shadow-sm flex items-center justify-center gap-3 active:scale-[0.98] transition-all text-sm"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
              Continuar com Google
            </button>
          </>
        )}
      </div>

      <div className="mt-8 text-center z-10">
        <p className="text-xs text-brand-dark/60">
          {mode === 'login' ? (
            <>Não tem uma conta? <button onClick={() => onNavigate('signup')} className="text-brand-accent font-bold underline underline-offset-4">Cadastre-se</button></>
          ) : (
            <>Já tem uma conta? <button onClick={() => onNavigate('login')} className="text-brand-accent font-bold underline underline-offset-4">Faça login</button></>
          )}
        </p>
      </div>
    </div>
  );
};

const HomeScreen = ({ onNavigate, onProductSelect, onCategorySelect, favorites, onToggleFavorite, formatPrice, scrollY = 0 }: { 
  onNavigate: (s: Screen) => void, 
  onProductSelect: (p: Product) => void,
  onCategorySelect: (c: string) => void,
  favorites: string[],
  onToggleFavorite: (id: string) => void,
  formatPrice: (p: number) => string,
  scrollY?: number
}) => {
  return (
    <div className="pb-16">
      {/* Hero */}
      <div className="relative h-[65vh] w-full overflow-hidden bg-brand-dark">
        <div 
          style={{
            transform: `translateY(${scrollY}px) scale(${1 + scrollY * 0.0008})`,
            opacity: Math.max(0, 1 - scrollY / 320),
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src={HERO_IMAGE} 
            alt="Hero Jewelry" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Black overlay that gets progressively darker as you scroll */}
          <div 
            style={{
              opacity: Math.min(1, scrollY / 320),
            }}
            className="absolute inset-0 bg-brand-dark transition-opacity duration-75 pointer-events-none"
          />
        </div>
        
        {/* Ambient default gradient on top */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-10 left-6 right-6 text-brand-light select-none">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: Math.max(-scrollY * 0.4, -150), opacity: Math.max(0, 1 - scrollY / 250) }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-serif mb-2 leading-tight text-white">Coleção<br />Eterna Elegância</h2>
            <p className="text-brand-light/75 text-xs font-light tracking-wide max-w-[85%]">
              Peças exclusivas esculpidas para momentos inesquecíveis.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-4">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-xl font-serif text-brand-dark">Categorias</h3>
          <button 
            onClick={() => {
              onNavigate('categories');
            }}
            className="text-xs text-brand-accent font-medium flex items-center gap-1 uppercase tracking-widest active:scale-95 transition-transform px-2 py-1"
          >
            Ver todas <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {["Relógios", "Anéis", "Colares", "Brincos", "Pulseiras"].map((cat) => (
             <button 
              key={cat}
              onClick={() => {
                onCategorySelect(cat);
                onNavigate('catalog');
              }}
              className="flex-shrink-0 bg-white border border-brand-dark/5 px-4 py-2.5 rounded-[10px] ios-shadow text-sm font-medium text-brand-dark/70 hover:text-brand-dark hover:border-brand-accent/30 transition-all font-sans"
             >
               {cat}
             </button>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4 pb-12">
        <h3 className="text-xl font-serif text-brand-dark mb-4">Novidades</h3>
        <div className="grid grid-cols-2 gap-3">
          {PRODUCTS.slice(0, 4).map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -5 }}
              onClick={() => onProductSelect(product)}
              className="bg-white rounded-[10px] overflow-hidden ios-shadow border border-brand-dark/5"
            >
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(product.id);
                  }}
                  className={`absolute top-3 right-3 p-2 rounded-[10px] backdrop-blur-md transition-colors ${
                    favorites.includes(product.id) ? 'bg-brand-accent text-white' : 'bg-white/20 text-white hover:bg-white/40'
                  }`}
                >
                  <Heart size={14} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="p-3">
                <p className="text-[10px] text-brand-accent font-bold uppercase tracking-widest mb-1">{product.category}</p>
                <h4 className="text-sm font-medium text-brand-dark truncate mb-1">{product.name}</h4>
                <p className="text-sm font-bold text-brand-dark">{formatPrice(product.price)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CatalogScreen = ({ onProductSelect, activeCategory, setActiveCategory, favorites, onToggleFavorite, onBack, formatPrice }: { 
  onProductSelect: (p: Product) => void,
  activeCategory: string,
  setActiveCategory: (c: string) => void,
  favorites: string[],
  onToggleFavorite: (id: string) => void,
  onBack: () => void,
  formatPrice: (p: number) => string
}) => {
  // Parse active categories from the comma-separated activeCategory string
  const selectedCategories = useMemo(() => {
    if (!activeCategory || activeCategory === "All") return [];
    return activeCategory.split(",");
  }, [activeCategory]);

  const handleToggleCategory = (cat: string) => {
    if (cat === "All") {
      setActiveCategory("All");
      return;
    }

    if (selectedCategories.includes(cat)) {
      const remaining = selectedCategories.filter(c => c !== cat);
      setActiveCategory(remaining.length === 0 ? "All" : remaining.join(","));
    } else {
      const updated = [...selectedCategories, cat];
      setActiveCategory(updated.join(","));
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) return PRODUCTS;
    return PRODUCTS.filter(p => selectedCategories.includes(p.category));
  }, [selectedCategories]);

  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex bg-white/50 backdrop-blur-sm rounded-[10px] p-1 gap-2 items-center">
           <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
            <ArrowLeft size={18} />
          </button>
          <div className="pr-3">
            <h2 className="text-2xl font-serif text-brand-dark leading-none">Catálogo</h2>
            <p className="text-brand-dark/50 text-xs">Selecione uma ou mais opções</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4">
        {["All", "Relógios", "Anéis", "Colares", "Brincos", "Pulseiras"].map((cat) => {
          const isSelected = cat === "All" 
            ? selectedCategories.length === 0 
            : selectedCategories.includes(cat);
          return (
            <button
              key={cat}
              onClick={() => handleToggleCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-[10px] text-sm font-medium transition-all ${
                isSelected 
                  ? "bg-brand-accent text-white ios-shadow" 
                  : "bg-white text-brand-dark/50 border border-brand-dark/5"
              }`}
            >
              {cat === "All" ? "Todos" : cat}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-5">
        {filteredProducts.map((product) => (
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onProductSelect(product)}
            className="group"
          >
            <div className="rounded-[10px] overflow-hidden aspect-[3/4] mb-1.5 ios-shadow relative border border-brand-dark/5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(product.id);
                }}
                className={`absolute top-3 right-3 p-2 rounded-[10px] backdrop-blur-md border transition-colors ${
                  favorites.includes(product.id) 
                    ? 'bg-brand-accent text-white border-brand-accent' 
                    : 'bg-white/20 text-white border-white/30 hover:bg-white/40'
                }`}
              >
                <Heart size={14} fill={favorites.includes(product.id) ? "currentColor" : "none"} />
              </button>
            </div>
            <div>
              <p className="text-[10px] text-brand-accent font-bold uppercase tracking-widest mb-0.5">{product.category}</p>
              <h4 className="text-sm font-medium text-brand-dark mb-0.5 leading-tight">{product.name}</h4>
              <p className="text-sm font-bold text-brand-dark">{formatPrice(product.price)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const ProductScreen = ({ product, onBack, onAddToCart, onBuyNow, isFavorite, onToggleFavorite, formatPrice }: { 
  product: Product, 
  onBack: () => void, 
  onAddToCart: () => void,
  onBuyNow: () => void,
  isFavorite: boolean,
  onToggleFavorite: (id: string) => void,
  formatPrice: (p: number) => string
}) => {
  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="relative h-[65vh] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="p-3 bg-white/80 backdrop-blur-md rounded-[10px] ios-shadow text-brand-dark"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={() => onToggleFavorite(product.id)}
            className={`p-3 backdrop-blur-md rounded-[10px] ios-shadow transition-colors ${
              isFavorite ? 'bg-brand-accent text-white' : 'bg-white/80 text-brand-dark'
            }`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {[1,2,3].map(i => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${i === 1 ? 'w-8 bg-brand-accent' : 'w-2 bg-white/50'}`} />
          ))}
        </div>
      </div>

      <div className="px-4 pt-6 -mt-6 bg-white rounded-t-[10px] relative z-10 w-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-2">
            <p className="text-brand-accent font-bold uppercase tracking-[0.2em] text-[11px] mb-2">{product.category} · {product.collection}</p>
            <h1 className="text-3xl font-serif text-brand-dark leading-tight">{product.name}</h1>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-brand-dark">{formatPrice(product.price)}</p>
            <p className="text-[10px] text-brand-dark/40 uppercase font-semibold">ou 10x de {formatPrice(product.price / 10)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-6">
          {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-brand-accent text-brand-accent" />)}
          <span className="text-xs text-brand-dark/40 ml-2 font-medium">(48 avaliações)</span>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-brand-dark/40 font-bold mb-2">Descrição</h3>
            <p className="text-brand-dark/60 text-sm leading-relaxed font-light">
              {product.description} Este produto é feito com {product.material.toLowerCase()}, garantindo durabilidade e um brilho luxuoso constante. Cada peça Dunes é única e carrega o selo de autenticidade da joalheria.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-brand-light/50 p-4 rounded-[10px] border border-brand-dark/5">
              <p className="text-[10px] uppercase text-brand-dark/40 font-bold mb-1">Material</p>
              <p className="text-sm font-medium text-brand-dark">{product.material}</p>
            </div>
            <div className="bg-brand-light/50 p-4 rounded-[10px] border border-brand-dark/5">
              <p className="text-[10px] uppercase text-brand-dark/40 font-bold mb-1">Coleção</p>
              <p className="text-sm font-medium text-brand-dark">{product.collection}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-dark/5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs uppercase tracking-widest text-brand-dark/40 font-bold">Avaliações de Clientes</h3>
              {["1", "6", "7", "8"].includes(product.id) ? (
                <span className="text-[10px] bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-full font-bold">Novidade</span>
              ) : (
                <div className="flex items-center gap-1 text-xs text-brand-dark/60 font-semibold bg-brand-light px-2.5 py-1 rounded-[8px]">
                  <Star size={10} className="fill-brand-accent text-brand-accent" />
                  <span>4.8/5.0</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {(() => {
                const isNew = ["1", "6", "7", "8"].includes(product.id);
                const reviewsPool = [
                  { name: "Mariana Santos", rating: 5, comment: "Absolutamente deslumbrante! O acabamento é perfeito e brilha lindamente sob a luz." },
                  { name: "Thiago Oliveira", rating: 5, comment: "Produto de altíssima qualidade. O design supera todas as expectativas." },
                  { name: "Gabriela Silva", rating: 4, comment: "Muito bonito e delicado. Chegou super bem embalado, numa caixinha sofisticada." },
                  { name: "Rodrigo Costa", rating: 5, comment: "Excelente aquisição. Um verdadeiro investimento em elegância que vale cada centavo." },
                  { name: "Camila Rodrigues", rating: 5, comment: "Perfeito para ocasiões especiais. Recomendo de olhos fechados!" },
                  { name: "Bruno Barbosa", rating: 4, comment: "Design moderno e elegante na medida certa. O fecho é bastante seguro." },
                  { name: "Amanda Ferreira", rating: 5, comment: "Impecável! Chegou super rápido e a qualidade é realmente indiscutível." },
                  { name: "Felipe Mendes", rating: 5, comment: "Atenção incrível aos detalhes. A Dunes está de parabéns com essa peça." },
                  { name: "Juliana Souza", rating: 5, comment: "Uma obra de arte em forma de joia. Simplesmente amei, veste perfeitamente!" },
                  { name: "Lucas Alencar", rating: 4, comment: "Muito satisfeito com a compra. Dá um belo toque de classe no dia a dia." }
                ];
                const idNum = parseInt(product.id) || 1;
                const count = isNew ? (idNum % 3) + 1 : (idNum % 3) + 3; // 1 to 3 for new, 3 to 5 for others
                
                const reviews = [];
                for (let i = 0; i < count; i++) {
                  const poolIndex = (idNum * 3 + i) % reviewsPool.length;
                  reviews.push(reviewsPool[poolIndex]);
                }

                return reviews.map((review, idx) => (
                  <div key={idx} className="bg-brand-light/35 p-3 rounded-[10px] border border-brand-dark/5 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-brand-dark">{review.name}</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            size={10} 
                            className={`${
                              star <= review.rating 
                                ? "fill-brand-accent text-brand-accent" 
                                : "text-brand-dark/10"
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-brand-dark/70 font-light leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-brand-dark/5 flex gap-3 z-50">
        <button 
          onClick={onBuyNow}
          className="h-12 flex-1 bg-white border border-brand-dark text-brand-dark text-sm font-bold rounded-[10px] ios-shadow active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          Adquirir
        </button>
        <button 
          onClick={onAddToCart}
          className="h-12 flex-1 bg-brand-dark text-white text-sm font-bold rounded-[10px] ios-shadow active:scale-[0.98] transition-all"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

const CartScreen = ({ 
  cart, 
  onNavigate, 
  onBack,
  onRemoveItem,
  onUpdateQuantity,
  formatPrice
}: { 
  cart: CartItem[], 
  onNavigate: (s: Screen) => void, 
  onBack: () => void,
  onRemoveItem: (id: string) => void,
  onUpdateQuantity: (id: string, delta: number) => void,
  formatPrice: (p: number) => string
}) => {
  const total = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Carrinho</h2>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-brand-light rounded-[10px] flex items-center justify-center text-brand-dark/20 mb-4">
            <ShoppingBag size={32} />
          </div>
          <p className="text-brand-dark/40 font-medium text-sm">Seu carrinho está vazio</p>
          <button 
            onClick={() => onNavigate('catalog')}
            className="mt-4 text-brand-accent font-semibold underline text-sm"
          >
            Explorar catálogo
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((item, idx) => (
            <div key={idx} className="flex gap-3">
              <div className="w-20 h-20 rounded-[10px] overflow-hidden ios-shadow border border-brand-dark/5 flex-shrink-0">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-0.5 animate-fadeIn">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-brand-dark text-sm leading-tight mb-0.5">{item.product.name}</h4>
                    <p className="text-[10px] text-brand-dark/40 font-bold uppercase tracking-tight">{item.product.material}</p>
                  </div>
                  <button 
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1 text-brand-dark/20 hover:text-red-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-3 bg-brand-light rounded-[8px] px-2 py-1">
                    <button onClick={() => onUpdateQuantity(item.product.id, -1)} className="p-0.5">
                      <Minus size={12} className="text-brand-dark/40" />
                    </button>
                    <span className="text-xs font-bold min-w-[1ch] text-center">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.product.id, 1)} className="p-0.5">
                      <Plus size={12} className="text-brand-dark/40" />
                    </button>
                  </div>
                  <p className="font-bold text-brand-dark text-sm">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="h-[1px] bg-brand-dark/10 my-4" />

          <div className="bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-brand-dark/40">Subtotal</span>
              <span className="font-bold">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-dark/40">Entrega</span>
              <span className="text-brand-accent font-bold uppercase tracking-widest text-[10px]">Grátis</span>
            </div>
            <div className="h-[1px] bg-brand-dark/5" />
            <div className="flex justify-between text-base">
              <span className="font-serif">Total</span>
              <span className="font-bold text-brand-dark">{formatPrice(total)}</span>
            </div>
          </div>

          <button 
            onClick={() => onNavigate('payment')}
            className="w-full h-12 bg-brand-dark text-white rounded-[10px] font-semibold ios-shadow active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm"
          >
            Finalizar Pedido
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

const PaymentScreen = ({ total, addresses, savedCards, onFinish, onBack, formatPrice }: { 
  total: number, 
  addresses: Address[], 
  savedCards: PaymentMethod[],
  onFinish: () => void, 
  onBack: () => void,
  formatPrice: (p: number) => string
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'apple' | 'pix'>('card');
  const [installments, setInstallments] = useState(1);
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [selectedAddress, setSelectedAddress] = useState<Address>(addresses[0] || { id: 0, type: 'Principal', address: 'Endereço não cadastrado', city: '', zip: '' });
  const [showAddressPicker, setShowAddressPicker] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<number | 'new'>(savedCards.find(c => c.isMain)?.id || savedCards[0]?.id || 'new');

  const paymentMethods = [
    { id: 'card', name: 'Cartão de Crédito', icon: CreditCard },
    { id: 'apple', name: 'Apple Pay', icon: Smartphone },
    { id: 'pix', name: 'PIX (5% off)', icon: CheckCircle, highlight: true }
  ];

  const finalTotal = selectedMethod === 'pix' ? total * 0.95 : total;

  useEffect(() => {
    if (selectedMethod !== 'card') {
      setInstallments(1);
    }
  }, [selectedMethod]);

  const handleFinish = () => {
    if (selectedMethod === 'card') {
      if (selectedCardId === 'new') {
        if (!cardData.number || !cardData.name || !cardData.expiry || !cardData.cvv) {
          alert("Por favor, preencha todos os dados do cartão.");
          return;
        }
      }
    }
    onFinish();
  };

  return (
    <div className="pt-4 pb-12 px-4 min-h-screen bg-brand-light">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark font-sans shadow-none border-none">Checkout</h2>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs uppercase tracking-widest font-bold text-brand-dark/40">Endereço de Entrega</h3>
            <button 
              onClick={() => setShowAddressPicker(!showAddressPicker)}
              className="text-[10px] text-brand-accent font-bold uppercase underline"
            >
              {showAddressPicker ? 'Fechar' : 'Alterar'}
            </button>
          </div>

          {showAddressPicker ? (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3 mt-4"
            >
              {addresses.map(addr => (
                <button 
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowAddressPicker(false);
                  }}
                  className={`w-full text-left p-3 rounded-[10px] border transition-all ${selectedAddress.id === addr.id ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-dark/5 bg-brand-light/50'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-brand-accent mb-1">{addr.type}</p>
                      <p className="text-sm font-semibold">{addr.address}</p>
                      <p className="text-xs text-brand-dark/40">{addr.city}</p>
                    </div>
                    {selectedAddress.id === addr.id && (
                      <CheckCircle size={16} className="text-brand-accent" />
                    )}
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            <div className="flex gap-4">
              <div className="p-2.5 bg-brand-light rounded-[8px] text-brand-dark/60 h-fit">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5">{selectedAddress.address}</p>
                <p className="text-xs text-brand-dark/40">{selectedAddress.city} · {selectedAddress.zip}</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
           <h3 className="text-xs uppercase tracking-widest font-bold text-brand-dark/40 ml-2">Método de Pagamento</h3>
           {paymentMethods.map(method => (
             <button 
              key={method.id} 
              onClick={() => setSelectedMethod(method.id as any)}
              className={`w-full text-left bg-white p-4 rounded-[10px] ios-shadow border transition-all flex items-center justify-between ${selectedMethod === method.id ? 'ring-2 ring-brand-accent/30 border-brand-accent/30' : 'border-brand-dark/5'}`}
             >
               <div className="flex items-center gap-4">
                 <div className={`p-2.5 rounded-[8px] ${method.highlight ? 'bg-brand-accent/10 text-brand-accent' : 'bg-brand-light text-brand-dark/60'}`}>
                   <method.icon size={20} />
                 </div>
                 <span className="text-sm font-medium">{method.name}</span>
               </div>
               <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === method.id ? 'border-brand-accent' : 'border-brand-dark/10'}`}>
                 {selectedMethod === method.id && <div className="w-2.5 h-2.5 bg-brand-accent rounded-full" />}
               </div>
             </button>
           ))}
        </div>

        {selectedMethod === 'card' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            {/* Saved Cards */}
            {savedCards.length > 0 && (
              <div className="bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5 space-y-3">
                <h3 className="text-xs uppercase tracking-widest font-bold text-brand-dark/40 ml-2">Seus Cartões</h3>
                <div className="space-y-3">
                  {savedCards.map(card => (
                    <button
                      key={card.id}
                      onClick={() => setSelectedCardId(card.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-[10px] border transition-all ${setSelectedCardId === card.id ? 'border-brand-accent bg-brand-accent/5' : 'border-brand-dark/5 bg-brand-light/50'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-7 bg-brand-dark/5 rounded flex items-center justify-center font-bold text-[8px] uppercase">
                          {card.brand}
                        </div>
                        <p className="text-sm font-semibold">**** {card.last4}</p>
                      </div>
                      {selectedCardId === card.id && <CheckCircle size={16} className="text-brand-accent" />}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedCardId('new')}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-[10px] border border-dashed transition-all ${selectedCardId === 'new' ? 'border-brand-accent bg-brand-accent/5 text-brand-accent' : 'border-brand-dark/10 bg-transparent text-brand-dark/30'}`}
                  >
                    <Plus size={16} />
                    <span className="text-sm font-semibold">Adicionar novo cartão</span>
                  </button>
                </div>
              </div>
            )}

            {/* New Card Form */}
            {selectedCardId === 'new' && (
              <div className="bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5 space-y-3">
                <h3 className="text-xs uppercase tracking-widest font-bold text-brand-dark/40 ml-2">Dados do Novo Cartão</h3>
                
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="Número do Cartão"
                    value={cardData.number}
                    onChange={e => setCardData({...cardData, number: e.target.value})}
                    className="w-full bg-brand-light p-3.5 rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all font-mono"
                  />
                  <input 
                    type="text" 
                    placeholder="Nome Impresso no Cartão"
                    value={cardData.name}
                    onChange={e => setCardData({...cardData, name: e.target.value})}
                    className="w-full bg-brand-light p-3.5 rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all uppercase"
                  />
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="Validade (MM/AA)"
                      value={cardData.expiry}
                      onChange={e => setCardData({...cardData, expiry: e.target.value})}
                      className="flex-1 bg-brand-light p-3.5 rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
                    />
                    <input 
                      type="text" 
                      placeholder="CVV"
                      value={cardData.cvv}
                      onChange={e => setCardData({...cardData, cvv: e.target.value})}
                      className="w-24 bg-brand-light p-3.5 rounded-[10px] text-sm outline-none focus:ring-2 focus:ring-brand-accent/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5">
              <h3 className="text-xs uppercase tracking-widest font-bold text-brand-dark/40 mb-3 ml-2">Parcelamento</h3>
              <div className="relative">
                <select 
                  value={installments}
                  onChange={(e) => setInstallments(Number(e.target.value))}
                  className="w-full bg-brand-light p-3.5 rounded-[10px] text-sm font-medium text-brand-dark appearance-none outline-none focus:ring-2 focus:ring-brand-accent/30 transition-all"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>
                      {n}x de {formatPrice(finalTotal / n)} {n === 1 ? '(à vista)' : 'sem juros'}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-dark/30">
                  <ChevronRight size={16} className="rotate-90" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-6">
           <button 
            onClick={handleFinish}
            className="w-full h-12 bg-brand-accent text-white font-bold rounded-[10px] ios-shadow active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-sm"
           >
             {selectedMethod === 'card' && installments > 1 
               ? `Pagar em ${installments}x de ${formatPrice(total / installments)}`
               : `Pagar ${formatPrice(finalTotal)}`
             }
           </button>
           <p className="text-center text-[10px] text-brand-dark/30 mt-4 uppercase tracking-widest font-medium">Ambiente seguro Dunes Jewelry</p>
        </div>
      </div>
    </div>
  );
};

const SuccessScreen = ({ onNavigate }: { onNavigate: (s: Screen) => void }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10, stiffness: 100 }}
        className="w-20 h-20 bg-brand-accent rounded-[10px] flex items-center justify-center text-white mb-6 shadow-xl shadow-brand-accent/20"
      >
        <CheckCircle size={40} />
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-serif text-brand-dark mb-2"
      >
        Pedido Confirmado
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-brand-dark/50 text-sm font-light mb-8"
      >
        Obrigado pela sua compra. Enviamos um e-mail com todos os detalhes do seu pedido.
      </motion.p>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => onNavigate('tracking')}
        className="w-full h-12 bg-brand-dark text-white rounded-[10px] font-semibold mb-4 text-sm"
      >
        Rastrear Pedido
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        onClick={() => onNavigate('home')}
        className="text-brand-accent font-bold uppercase tracking-widest text-xs"
      >
        Voltar para a Home
      </motion.button>
    </div>
  );
};

const TrackingScreen = ({ onBack, orders, selectedOrder, onSelectOrder, onClearSelection, formatPrice }: { 
  onBack: () => void, 
  orders: Order[], 
  selectedOrder: Order | null,
  onSelectOrder: (o: Order) => void,
  onClearSelection: () => void,
  formatPrice: (p: number) => string
}) => {
  if (selectedOrder) {
    const steps = [
      { label: "Pedido Recebido", date: selectedOrder.date, completed: true, icon: CheckCircle },
      { label: "Em Preparação", date: selectedOrder.date, completed: selectedOrder.status !== 'Processando', icon: Package },
      { label: "Enviado", date: selectedOrder.status === 'Entregue' ? selectedOrder.date : "Previsão hoje", completed: selectedOrder.status === 'Entregue', active: selectedOrder.status === 'Enviado', icon: Truck },
      { label: "Saiu para Entrega", date: "Aguardando", completed: selectedOrder.status === 'Entregue', icon: Smartphone },
      { label: "Entregue", date: "Aguardando", completed: selectedOrder.status === 'Entregue', icon: Home },
    ];

    return (
      <div className="pt-4 pb-16 px-4 min-h-screen bg-brand-light font-sans">
        <div className="mb-8 flex flex-col items-center">
          <div className="w-full flex justify-start mb-4">
            <button onClick={onClearSelection} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
              <ArrowLeft size={18} />
            </button>
          </div>
          <h2 className="text-2xl font-serif text-brand-dark mb-1">Rastreamento</h2>
          <p className="text-brand-accent font-bold text-xs uppercase tracking-widest">Pedido #{selectedOrder.id}</p>
        </div>

        <div className="space-y-0 relative">
          <div className="absolute left-6 top-2 bottom-6 w-[2px] bg-brand-dark/5" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-6 mb-8 relative">
              <div className={`z-10 w-12 h-12 rounded-[10px] flex items-center justify-center ios-shadow border ${
                step.completed 
                  ? 'bg-brand-dark text-white border-brand-dark' 
                  : step.active 
                    ? 'bg-brand-accent text-white border-brand-accent animate-pulse' 
                    : 'bg-white text-brand-dark/20 border-brand-dark/5'
              }`}>
                <step.icon size={20} />
              </div>
              <div className="flex flex-col justify-center">
                <h4 className={`font-semibold text-sm ${step.completed || step.active ? 'text-brand-dark' : 'text-brand-dark/30'}`}>
                  {step.label}
                </h4>
                <p className="text-xs text-brand-dark/40 mt-0.5">{step.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white p-4 rounded-[10px] border border-brand-dark/5 flex flex-col gap-3 ios-shadow">
           <div className="flex justify-between items-center pb-3 border-b border-brand-dark/5">
              <span className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-widest">Código</span>
              <span className="text-xs font-mono font-bold text-brand-dark">{selectedOrder.trackingCode}</span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-brand-dark/30 uppercase tracking-widest">Status</span>
              <span className="text-xs font-bold text-brand-accent uppercase tracking-widest">{selectedOrder.status}</span>
           </div>
        </div>

        <button className="w-full mt-10 p-5 bg-brand-dark text-white rounded-3xl text-[10px] font-bold uppercase tracking-widest ios-shadow flex items-center justify-center gap-3 active:scale-95 transition-transform">
          <MessageCircle size={18} />
          Falar com Suporte
        </button>
      </div>
    );
  }

  const inProgress = orders.filter(o => o.status !== 'Entregue');
  const finished = orders.filter(o => o.status === 'Entregue');

  return (
    <div className="pt-4 pb-16 px-4 min-h-screen bg-brand-light font-sans">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Meus Pedidos</h2>
      </div>

      <div className="space-y-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-brand-dark/5 rounded-[10px] flex items-center justify-center mx-auto mb-4">
              <Package size={28} className="text-brand-dark/20" />
            </div>
            <p className="text-brand-dark/40 font-medium text-sm">Você ainda não possui pedidos.</p>
          </div>
        ) : (
          <>
            {inProgress.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-brand-accent ml-2">Em Andamento</h3>
                {inProgress.map(order => (
                  <button 
                    key={order.id}
                    onClick={() => onSelectOrder(order)}
                    className="w-full text-left bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5 hover:border-brand-accent/20 transition-all active:scale-[0.98] group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-brand-accent tracking-widest mb-1">{order.status}</p>
                        <h4 className="text-base font-serif text-brand-dark">Pedido #{order.id.split('-')[1]}</h4>
                      </div>
                      <div className="p-1.5 bg-brand-light rounded-[8px] text-brand-dark/20 group-hover:text-brand-accent transition-colors">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-brand-dark/5">
                      <p className="text-[10px] uppercase font-bold text-brand-dark/30 tracking-widest">{order.date}</p>
                      <p className="text-sm font-bold text-brand-dark font-mono">{formatPrice(order.total)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {finished.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/30 ml-2">Finalizados</h3>
                {finished.map(order => (
                  <button 
                    key={order.id}
                    onClick={() => onSelectOrder(order)}
                    className="w-full text-left bg-white/60 p-4 rounded-[10px] border border-brand-dark/5 group opacity-80"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-brand-dark/30 tracking-widest mb-1">Entregue</p>
                        <h4 className="text-base font-serif text-brand-dark/60">Pedido #{order.id.split('-')[1]}</h4>
                      </div>
                      <div className="p-1.5 bg-brand-light rounded-[8px] text-brand-dark/20 group-hover:text-brand-accent transition-colors">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-3 border-t border-brand-dark/5">
                      <p className="text-[10px] uppercase font-bold text-brand-dark/20 tracking-widest">{order.date}</p>
                      <p className="text-sm font-bold text-brand-dark/40 font-mono">{formatPrice(order.total)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const ProfileScreen = ({ onNavigate, onBack, userData, onClearOrderSelection }: { 
  onNavigate: (s: Screen) => void, 
  onBack: () => void, 
  userData: UserData,
  onClearOrderSelection: () => void
}) => {
  const menu = [
    { label: "Dados Pessoais", icon: User, action: () => onNavigate('personal_data') },
    { label: "Endereços", icon: MapPin, action: () => onNavigate('addresses') },
    { label: "Meus Pedidos", icon: Package, action: () => { onClearOrderSelection(); onNavigate('tracking'); } },
    { label: "Favoritos", icon: Heart, action: () => onNavigate('favorites') },
    { label: "Pagamentos", icon: CreditCard, action: () => onNavigate('payment_methods') },
    { label: "Configurações", icon: SettingsIcon, action: () => onNavigate('settings') },
    { label: "Suporte VIP", icon: MessageCircle, highlight: true, action: () => onNavigate('support') },
  ];

  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="w-full flex justify-start mb-4">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
      </div>
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-[10px] overflow-hidden ios-shadow border-4 border-white">
            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 -right-2 p-2.5 bg-brand-accent text-white rounded-[10px] shadow-lg border-2 border-white">
            <Plus size={16} />
          </button>
        </div>
        <h2 className="text-xl font-serif text-brand-dark">{userData.name}</h2>
        <p className="text-brand-accent font-bold text-[10px] uppercase tracking-widest mt-1">Membro Platinum desde 2024</p>
      </div>

      <div className="space-y-2.5">
        {menu.map((item, idx) => (
          <button 
            key={idx}
            onClick={item.action}
            className={`w-full bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5 flex items-center justify-between transition-all active:scale-[0.98] ${item.highlight ? 'bg-brand-accent/5' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-[8px] ${item.highlight ? 'bg-brand-accent/10 text-brand-accent' : 'bg-brand-light text-brand-dark/60'}`}>
                <item.icon size={18} />
              </div>
              <span className={`text-sm font-medium ${item.highlight ? 'text-brand-accent' : 'text-brand-dark'}`}>{item.label}</span>
            </div>
            <ChevronRight size={16} className="text-brand-dark/20" />
          </button>
        ))}
        
        <button 
          onClick={() => onNavigate('login')}
          className="w-full p-4 mt-2 flex items-center justify-center gap-2 text-red-500 font-bold uppercase tracking-widest text-[10px]"
        >
          <LogOut size={14} />
          Sair da Conta
        </button>
      </div>
    </div>
  );
};

const FavoritesScreen = ({ onProductSelect, favorites, onToggleFavorite, onMoveToCart, onBack, formatPrice }: { 
  onProductSelect: (p: Product) => void,
  favorites: string[],
  onToggleFavorite: (id: string) => void,
  onMoveToCart: (p: Product) => void,
  onBack: () => void,
  formatPrice: (p: number) => string
}) => {
  const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Desejos</h2>
      </div>
      
      {favoriteProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-brand-light rounded-[10px] flex items-center justify-center text-brand-dark/20 mb-4">
            <Heart size={32} />
          </div>
          <p className="text-brand-dark/40 font-medium text-sm">Sua lista de desejos está vazia</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {favoriteProducts.map((product) => (
            <motion.div 
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => onProductSelect(product)}
              className="bg-white rounded-[10px] overflow-hidden ios-shadow border border-brand-dark/5"
            >
              <div className="h-40 relative">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(product.id);
                  }}
                  className="absolute top-2 right-2 p-2 rounded-[10px] bg-brand-accent text-white"
                >
                  <Heart size={14} fill="white" />
                </button>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-medium text-brand-dark truncate">{product.name}</h4>
                <p className="text-sm font-bold text-brand-dark">{formatPrice(product.price)}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onMoveToCart(product);
                  }}
                  className="w-full mt-2 py-2 bg-brand-dark text-white text-[9px] font-bold uppercase tracking-widest rounded-[8px]"
                >
                  Mover p/ Carrinho
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const SupportScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-2xl font-serif text-brand-dark leading-tight">Suporte VIP</h2>
          <p className="text-brand-dark/50 text-xs">Atendimento exclusivo Dunes</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Chat Online", sub: "Atendimento imediato", icon: MessageCircle, color: "bg-blue-500" },
          { label: "WhatsApp", sub: "Envie sua mensagem", icon: MessageCircle, color: "bg-green-500" },
          { label: "FAQ", sub: "Dúvidas frequentes", icon: Eye, color: "bg-purple-500" },
          { label: "Lojas Físicas", sub: "Visite nossas unidades", icon: MapPin, color: "bg-brand-accent" }
        ].map(item => (
          <button key={item.label} className="bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5 text-left transition-all active:scale-95">
            <div className={`w-10 h-10 ${item.color} rounded-[10px] flex items-center justify-center text-white mb-3 shadow-lg shadow-black/5`}>
              <item.icon size={18} />
            </div>
            <h4 className="font-semibold text-sm mb-0.5 leading-tight">{item.label}</h4>
            <p className="text-[10px] text-brand-dark/40 font-medium leading-none">{item.sub}</p>
          </button>
        ))}
      </div>

      <div className="bg-brand-dark p-6 rounded-[10px] text-brand-light relative overflow-hidden">
        <div className="relative z-10 w-full">
          <h3 className="text-lg font-serif mb-1">Concierge Dunes</h3>
          <p className="text-xs text-brand-light/60 font-light mb-4 leading-relaxed">Nossos especialistas estão prontos para ajudar você a escolher a peça perfeita para sua ocasião especial.</p>
          <button className="px-5 py-2.5 bg-brand-accent text-white rounded-[10px] font-bold uppercase tracking-widest text-[9px]">Iniciar Chat VIP</button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
      </div>
    </div>
  );
};

const SettingsScreen = ({ onNavigate, isDarkMode, setIsDarkMode, currency, setCurrency }: { 
  onNavigate: (s: Screen) => void, 
  isDarkMode: boolean, 
  setIsDarkMode: (v: boolean) => void,
  currency: 'BRL' | 'USD' | 'EUR',
  setCurrency: (v: 'BRL' | 'USD' | 'EUR') => void
}) => {
  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => onNavigate('profile')} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Configurações</h2>
      </div>

      <div className="space-y-6">
        <div>
           <h3 className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40 ml-2 mb-3">Conta</h3>
           <div className="bg-white rounded-[10px] overflow-hidden border border-brand-dark/5 ios-shadow">
             {[
               { label: "Segurança", icon: Lock, screen: 'security' as Screen },
               { label: "Notificações", icon: Bell, screen: 'notifications' as Screen },
               { label: "Privacidade", icon: Eye, screen: 'privacy' as Screen },
               { label: "Dispositivos", icon: Smartphone, screen: 'devices' as Screen }
             ].map((item, idx) => (
               <button 
                 key={idx} 
                 onClick={() => onNavigate(item.screen)}
                 className={`w-full p-4 flex items-center justify-between ${idx !== 3 ? 'border-b border-brand-dark/5' : ''} active:bg-brand-light/50 transition-colors`}
               >
                 <div className="flex items-center gap-4">
                   <div className="text-brand-dark/40"><item.icon size={18} /></div>
                   <span className="text-sm font-medium">{item.label}</span>
                 </div>
                 <ChevronRight size={16} className="text-brand-dark/10" />
               </button>
             ))}
           </div>
        </div>

        <div>
           <h3 className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40 ml-2 mb-3">Preferências</h3>
           <div className="bg-white rounded-[10px] overflow-hidden border border-brand-dark/5 ios-shadow">
             <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-medium text-brand-dark">Tema Escuro</span>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? 'bg-brand-accent' : 'bg-brand-dark/10'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${isDarkMode ? 'right-1' : 'left-1'}`} />
                </button>
             </div>
             <div className="p-4 flex items-center justify-between border-t border-brand-dark/5">
                <span className="text-sm font-medium text-brand-dark">Moeda</span>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="bg-transparent text-xs font-bold text-brand-accent uppercase outline-none cursor-pointer"
                >
                  <option value="BRL">BRL (R$)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const SecurityScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Segurança</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-[10px] p-4 ios-shadow border border-brand-dark/5 space-y-3">
           <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Autenticação em Duas Etapas</p>
                <p className="text-[10px] text-brand-dark/40">Proteja sua conta com um nível extra de segurança.</p>
              </div>
              <div className="w-12 h-6 bg-brand-accent rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
              </div>
           </div>
           <hr className="border-brand-dark/5" />
           <button className="w-full text-left flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Alterar Senha</p>
                <p className="text-[10px] text-brand-dark/40">Última alteração há 3 meses.</p>
              </div>
              <ChevronRight size={16} className="text-brand-dark/10" />
           </button>
        </div>

        <div className="bg-white rounded-[10px] p-4 ios-shadow border border-brand-dark/5">
           <h4 className="text-[10px] uppercase font-bold text-brand-dark/30 mb-3 tracking-widest">Atividade Recente</h4>
           <div className="space-y-3">
              <div className="flex gap-3">
                 <div className="w-10 h-10 bg-brand-light rounded-[10px] flex items-center justify-center text-brand-dark/40">
                   <Smartphone size={18} />
                 </div>
                 <div>
                   <p className="text-sm font-semibold">Login em iPhone 15 Pro</p>
                   <p className="text-[10px] text-brand-dark/40">São Paulo, Brasil · Hoje às 14:20</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsSettingsScreen = ({ onBack }: { onBack: () => void }) => {
  const [settings, setSettings] = useState({
    orders: true,
    promo: false,
    app: true,
    email: true
  });

  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Notificações</h2>
      </div>

      <div className="bg-white rounded-[10px] overflow-hidden ios-shadow border border-brand-dark/5">
        {[
          { key: 'orders', label: 'Status do Pedido', desc: 'Receba atualizações sobre suas compras.' },
          { key: 'promo', label: 'Ofertas e Promoções', desc: 'Avisos sobre novidades e descontos exclusivos.' },
          { key: 'app', label: 'Notificações no App', desc: 'Alertas dentro da experiência Dunes.' },
          { key: 'email', label: 'Newsletter por E-mail', desc: 'Curadoria semanal da marca.' }
        ].map((item, idx) => (
          <div key={item.key} className={`p-4 flex items-center justify-between ${idx !== 3 ? 'border-b border-brand-dark/5' : ''}`}>
             <div className="flex-1 pr-4">
               <p className="text-sm font-semibold">{item.label}</p>
               <p className="text-[10px] text-brand-dark/40">{item.desc}</p>
             </div>
             <button 
               onClick={() => setSettings(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof settings] }))}
               className={`w-12 h-6 rounded-full relative transition-colors ${settings[item.key as keyof typeof settings] ? 'bg-brand-accent' : 'bg-brand-dark/10'}`}
             >
               <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${settings[item.key as keyof typeof settings] ? 'right-1' : 'left-1'}`} />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrivacyScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Privacidade</h2>
      </div>

      <div className="space-y-4">
        <div className="bg-brand-dark/5 p-4 rounded-[10px]">
           <p className="text-xs text-brand-dark/60 leading-relaxed italic">
             "Na Dunes, sua exclusividade é protegida. Seus dados são utilizados estritamente para personalizar sua experiência de luxo e garantir a excelência no atendimento."
           </p>
        </div>

        <div className="bg-white rounded-[10px] overflow-hidden ios-shadow border border-brand-dark/5">
           {[
             { label: "Compartilhamento de Dados", desc: "Permitir uso para personalização." },
             { label: "Histórico de Busca", desc: "Armazenar para recomendações." },
             { label: "Localização", desc: "Usar para encontrar lojas próximas." }
           ].map((item, idx) => (
             <div key={idx} className={`p-4 flex items-center justify-between ${idx !== 2 ? 'border-b border-brand-dark/5' : ''}`}>
                <div>
                   <p className="text-sm font-semibold">{item.label}</p>
                   <p className="text-[10px] text-brand-dark/40">{item.desc}</p>
                </div>
                <div className="w-12 h-6 bg-brand-accent rounded-full relative">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                </div>
             </div>
           ))}
        </div>

        <button className="w-full p-4 text-xs font-bold text-red-500 uppercase tracking-widest text-center mt-2">
           Excluir minha conta permanentemente
        </button>
      </div>
    </div>
  );
};

const DevicesScreen = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Dispositivos</h2>
      </div>

      <div className="space-y-3">
        <div className="text-center py-2">
           <p className="text-[10px] uppercase font-bold text-brand-dark/30 tracking-widest">Sessões Ativas</p>
        </div>

        <div className="bg-white p-4 rounded-[10px] border border-brand-accent/20 bg-brand-accent/5 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-accent text-white rounded-[10px] flex items-center justify-center">
                 <Smartphone size={20} />
              </div>
              <div>
                <p className="text-sm font-bold">Este Dispositivo</p>
                <p className="text-[10px] text-brand-dark/40">iPhone 15 Pro · São Paulo, BR</p>
              </div>
           </div>
           <span className="w-2 h-2 bg-green-500 rounded-full" />
        </div>

        <div className="bg-white p-4 rounded-[10px] border border-brand-dark/5 flex items-center justify-between ios-shadow">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-light text-brand-dark/40 rounded-[10px] flex items-center justify-center">
                 <Lock size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold">MacBook Pro 16"</p>
                <p className="text-[10px] text-brand-dark/40">Safari · Último acesso ontem</p>
              </div>
           </div>
           <button className="text-[10px] font-bold text-brand-accent uppercase">Sair</button>
        </div>
      </div>
    </div>
  );
};

const PersonalDataScreen = ({ onBack, userData, onUpdate }: { onBack: () => void, userData: UserData, onUpdate: (data: Partial<UserData>) => void }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone
  });

  const handleSave = () => {
    onUpdate(formData);
    onBack();
  };

  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Dados Pessoais</h2>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40 ml-2">Nome Completo</label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-white border border-brand-dark/5 rounded-[10px] px-4 py-3 text-sm ios-shadow focus:outline-none focus:border-brand-accent/30 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40 ml-2">E-mail</label>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full bg-white border border-brand-dark/5 rounded-[10px] px-4 py-3 text-sm ios-shadow focus:outline-none focus:border-brand-accent/30 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/40 ml-2">Telefone</label>
          <input 
            type="tel" 
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-white border border-brand-dark/5 rounded-[10px] px-4 py-3 text-sm ios-shadow focus:outline-none focus:border-brand-accent/30 transition-colors"
          />
        </div>
        <button 
          onClick={handleSave}
          className="w-full bg-brand-dark text-white font-bold py-3 rounded-[10px] ios-shadow mt-4 active:scale-95 transition-transform text-sm"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

const AddressesScreen = ({ onBack, addresses, onUpdate }: { 
  onBack: () => void, 
  addresses: Address[],
  onUpdate: (data: Partial<UserData>) => void 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ rua: '', numero: '', cep: '', cidade: '' });

  const handleDelete = (id: number) => {
    onUpdate({ addresses: addresses.filter(a => a.id !== id) });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.rua || !formData.numero || !formData.cep) return;

    const newAddressItem: Address = {
      id: Date.now(),
      type: "Residencial",
      address: `${formData.rua}, ${formData.numero}`,
      city: formData.cidade || "São Paulo",
      zip: formData.cep
    };

    onUpdate({ addresses: [...addresses, newAddressItem] });
    setFormData({ rua: '', numero: '', cep: '', cidade: '' });
    setShowAddForm(false);
  };

  return (
    <div className="pt-4 pb-16 px-4 min-h-screen bg-brand-light">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Endereços</h2>
      </div>

      <div className="space-y-3">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5 flex justify-between items-start">
            <div className="flex gap-4">
              <div className="p-2.5 bg-brand-light rounded-[10px] text-brand-dark/60 h-fit">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase text-brand-accent font-bold mb-1">{addr.type}</p>
                <p className="text-sm font-semibold mb-0.5">{addr.address}</p>
                <p className="text-xs text-brand-dark/40">{addr.city} · {addr.zip}</p>
              </div>
            </div>
            <button 
              onClick={() => handleDelete(addr.id)}
              className="text-red-400 p-2 hover:bg-red-50 rounded-[10px] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        
        {showAddForm ? (
          <motion.form 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onSubmit={handleSave}
            className="bg-white p-4 rounded-[10px] shadow-2xl space-y-4 border border-brand-accent/10"
          >
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/30 ml-1">Rua</label>
                <input 
                  type="text" 
                  value={formData.rua}
                  onChange={e => setFormData({...formData, rua: e.target.value})}
                  placeholder="Nome da avenida ou rua"
                  className="w-full bg-brand-light p-3 rounded-[10px] text-sm focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all placeholder:text-brand-dark/20"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/30 ml-1">Número</label>
                  <input 
                    type="text" 
                    value={formData.numero}
                    onChange={e => setFormData({...formData, numero: e.target.value})}
                    placeholder="Ex: 123"
                    className="w-full bg-brand-light p-3 rounded-[10px] text-sm focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all placeholder:text-brand-dark/20"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/30 ml-1">CEP</label>
                  <input 
                    type="text" 
                    value={formData.cep}
                    onChange={e => setFormData({...formData, cep: e.target.value})}
                    placeholder="00000-000"
                    className="w-full bg-brand-light p-3 rounded-[10px] text-sm focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all placeholder:text-brand-dark/20"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-brand-dark/30 ml-1">Cidade (Opcional)</label>
                <input 
                  type="text" 
                  value={formData.cidade}
                  onChange={e => setFormData({...formData, cidade: e.target.value})}
                  placeholder="São Paulo - SP"
                  className="w-full bg-brand-light p-3 rounded-[10px] text-sm focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all placeholder:text-brand-dark/20"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-3 text-[10px] font-bold uppercase tracking-widest text-brand-dark/40"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-1 bg-brand-dark text-white py-3 rounded-[10px] text-[10px] font-bold uppercase tracking-widest ios-shadow active:scale-95 transition-all"
              >
                Salvar Endereço
              </button>
            </div>
          </motion.form>
        ) : (
          <button 
            onClick={() => setShowAddForm(true)}
            className="w-full bg-white border-2 border-dashed border-brand-dark/10 p-4 rounded-[10px] flex flex-col items-center justify-center gap-2 text-brand-dark/30 font-medium text-sm mt-4 hover:border-brand-accent/30 hover:text-brand-accent transition-all group"
          >
            <div className="w-10 h-10 bg-brand-light rounded-[10px] flex items-center justify-center group-hover:bg-brand-accent/10 transition-colors">
              <Plus size={20} />
            </div>
            Adicionar Novo Endereço
          </button>
        )}
      </div>
    </div>
  );
};

const PaymentMethodsScreen = ({ onBack, paymentMethods, onUpdate }: { 
  onBack: () => void, 
  paymentMethods: PaymentMethod[],
  onUpdate: (data: Partial<UserData>) => void 
}) => {
  const handleDelete = (id: number) => {
    onUpdate({ paymentMethods: paymentMethods.filter(p => p.id !== id) });
  };

  const handleAdd = () => {
    const newMethod: PaymentMethod = {
      id: Date.now(),
      brand: "Visa",
      last4: "0000",
      expiry: "01/30",
      isMain: false
    };
    onUpdate({ paymentMethods: [...paymentMethods, newMethod] });
  };

  const toggleMain = (id: number) => {
    const newMethods = paymentMethods.map(p => ({
      ...p,
      isMain: p.id === id
    }));
    onUpdate({ paymentMethods: newMethods });
  };

  return (
    <div className="pt-4 pb-16 px-4 min-h-screen bg-brand-light">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Pagamento</h2>
      </div>

      <div className="space-y-3">
        {paymentMethods.map(card => (
          <div 
            key={card.id} 
            onClick={() => toggleMain(card.id)}
            className={`bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5 flex justify-between items-center transition-all ${card.isMain ? 'ring-2 ring-brand-accent/20 border-brand-accent/20' : ''}`}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-brand-dark rounded-[6px] flex items-center justify-center text-white font-bold text-[10px] uppercase">
                {card.brand}
              </div>
              <div>
                <p className="text-sm font-semibold">•••• •••• •••• {card.last4}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <p className="text-[10px] text-brand-dark/40 font-medium">Expira em {card.expiry}</p>
                  {card.isMain && <span className="text-[9px] bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded-[4px] font-bold uppercase">Principal</span>}
                </div>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(card.id);
              }}
              className="text-red-400 p-2 hover:bg-red-50 rounded-[10px] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        <button 
          onClick={handleAdd}
          className="w-full bg-brand-dark text-white p-4 rounded-[10px] flex items-center justify-center gap-3 font-semibold text-sm mt-6 ios-shadow active:scale-95 transition-transform"
        >
          <Plus size={18} />
          Adicionar Novo Cartão
        </button>
      </div>
    </div>
  );
};

const CategoriesScreen = ({ onCategorySelect, onNavigate }: { 
  onCategorySelect: (c: string) => void,
  onNavigate: (s: Screen) => void 
}) => {
  const categories = [
    { name: "Relógios", label: "Relógios", icon: Clock, count: 10 },
    { name: "Anéis", label: "Anéis", icon: Star, count: 10 },
    { name: "Colares", label: "Colares", icon: Heart, count: 10 },
    { name: "Brincos", label: "Brincos", icon: Eye, count: 10 },
    { name: "Pulseiras", label: "Pulseiras", icon: Smartphone, count: 10 },
  ];

  return (
    <div className="pt-4 pb-16 px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => onNavigate('home')} className="p-2.5 bg-white rounded-[10px] ios-shadow border border-brand-dark/5">
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-serif text-brand-dark">Categorias</h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <button 
          onClick={() => {
            onCategorySelect('All');
            onNavigate('catalog');
          }}
          className="bg-brand-dark p-4 rounded-[10px] text-white flex items-center justify-between ios-shadow group"
        >
          <div className="text-left">
            <h3 className="text-lg font-serif mb-1 group-hover:text-brand-accent transition-colors">Todas as Peças</h3>
            <p className="text-xs text-white/50 uppercase tracking-widest">{PRODUCTS.length} Itens na Coleção</p>
          </div>
          <ChevronRight size={20} className="text-brand-accent" />
        </button>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button 
              key={cat.name}
              onClick={() => {
                onCategorySelect(cat.name);
                onNavigate('catalog');
              }}
              className="bg-white p-4 rounded-[10px] ios-shadow border border-brand-dark/5 text-left transition-all active:scale-95 group"
            >
              <div className="w-10 h-10 bg-brand-light rounded-[10px] flex items-center justify-center text-brand-dark/60 mb-4 group-hover:bg-brand-accent group-hover:text-white transition-all">
                <cat.icon size={20} />
              </div>
              <h4 className="font-semibold text-sm mb-1 leading-tight">{cat.label}</h4>
              <p className="text-xs text-brand-dark/30 font-medium">{cat.count} Peças</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- App Layout ---

export default function App() {
  const [timeString, setTimeString] = useState("18:08");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [prevScreen, setPrevScreen] = useState<Screen | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [catalogCategory, setCatalogCategory] = useState<string>("All");
  const [selectedTrackOrder, setSelectedTrackOrder] = useState<Order | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currency, setCurrency] = useState<'BRL' | 'USD' | 'EUR'>('BRL');

  const [scrollY, setScrollY] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setScrollY(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentScreen]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const formatPrice = (price: number) => {
    const rates = { BRL: 1, USD: 0.18, EUR: 0.17 };
    const symbols = { BRL: 'R$', USD: '$', EUR: '€' };
    const converted = price * rates[currency];
    return `${symbols[currency]} ${converted.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const [userData, setUserData] = useState<UserData>({
    name: "Maria Oliveira",
    email: "maria@example.com",
    phone: "+55 (11) 99999-9999",
    addresses: [
      { id: 1, type: "Principal", address: "Av. Paulista, 1000", city: "São Paulo - SP", zip: "01310-100" },
      { id: 2, type: "Trabalho", address: "Rua Oscar Freire, 500", city: "São Paulo - SP", zip: "01426-001" },
    ],
    paymentMethods: [
      { id: 1, brand: "Mastercard", last4: "4829", expiry: "12/28", isMain: true },
      { id: 2, brand: "Visa", last4: "9102", expiry: "05/26", isMain: false },
    ],
    orders: [
      { 
        id: "ORDER-48129", 
        date: "19 Mai 2026", 
        items: [], 
        total: 4500, 
        status: "Enviado", 
        trackingCode: "DN123456789BR" 
      },
      { 
        id: "ORDER-47901", 
        date: "10 Mai 2026", 
        items: [], 
        total: 1250, 
        status: "Entregue", 
        trackingCode: "DN987654321BR" 
      }
    ]
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const navigate = (screen: Screen) => {
    if (screen === 'catalog' && currentScreen !== 'catalog') {
      // If navigating from navbar or elsewhere to catalog, don't necessarily reset
      // but if we want it to always show all when clicking the icon, we handle it in Navbar
    }
    setPrevScreen(currentScreen);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabNavigate = (screen: Screen) => {
    if (screen === 'catalog') {
      setCatalogCategory('All');
    }
    navigate(screen);
  };

  const selectProduct = (p: Product) => {
    setSelectedProduct(p);
    navigate('product');
  };

  const addToCart = () => {
    if (selectedProduct) {
      setCart(prev => {
        const existing = prev.find(item => item.product.id === selectedProduct.id);
        if (existing) {
          return prev.map(item => 
            item.product.id === selectedProduct.id 
              ? { ...item, quantity: item.quantity + 1 } 
              : item
          );
        }
        return [...prev, { product: selectedProduct, quantity: 1 }];
      });
      navigate('cart');
    }
  };

  const buyNow = () => {
    if (selectedProduct) {
      setCart(prev => {
        const existing = prev.find(item => item.product.id === selectedProduct.id);
        if (existing) {
          return prev;
        }
        return [...prev, { product: selectedProduct, quantity: 1 }];
      });
      navigate('payment');
    }
  };

  const moveFavoriteToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setFavorites(prev => prev.filter(id => id !== product.id));
    navigate('cart');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const finishPayment = () => {
    const newOrder: Order = {
      id: `ORDER-${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      total: cart.reduce((a, b) => a + b.product.price * b.quantity, 0),
      status: "Processando",
      trackingCode: `DN${Math.floor(Math.random() * 900000000) + 100000000}BR`
    };

    setUserData(prev => ({
      ...prev,
      orders: [newOrder, ...prev.orders]
    }));
    
    setShowSuccess(true);
    setCart([]);
  };

  const handleSuccessClose = (screen: Screen) => {
    setShowSuccess(false);
    navigate(screen);
  };

  const handleLogin = (identifier: string) => {
    setUserData(prev => ({
      ...prev,
      name: identifier,
      email: identifier.includes('@') ? identifier : `${identifier.toLowerCase().replace(/\s/g, '.')}@example.com`
    }));
  };

  return (
    <div className="min-h-screen w-full bg-[#0d1314] flex items-center justify-center p-0 sm:p-6 md:p-8 select-none relative overflow-hidden">
      {/* Decorative Blur Elements in Outer Space */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-accent/5 rounded-full -mr-40 -mt-40 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-accent/5 rounded-full -ml-40 -mb-40 blur-[120px] pointer-events-none" />
      
      {/* 9:20 Premium Smartphone Mockup Container */}
      <div 
        className="screen-ratio-9-20 w-full h-screen sm:h-[880px] sm:max-h-[92vh] sm:aspect-[9/20] bg-brand-light sm:rounded-[48px] relative font-sans sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] sm:border-[12px] sm:border-[#1c2628] overflow-hidden flex flex-col transform"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        {/* iOS Dynamic Notch/Camera Island for sm and up */}
        <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-[#1c2628] rounded-full z-[120] flex items-center justify-center">
          <div className="absolute left-4 w-2 h-2 bg-zinc-950 rounded-full border border-zinc-800" />
          <div className="absolute right-4 w-3.5 h-1 bg-zinc-800 rounded-full" />
        </div>

        {/* Premium Phone Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-10 px-6 pt-1 flex justify-between items-center text-brand-dark/50 text-[11px] font-semibold select-none z-[110] pointer-events-none sm:h-12 sm:pt-2">
          {/* Time */}
          <span className="font-sans text-xs sm:text-[13px] tracking-tight">{timeString}</span>
          
          {/* Right Icons */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[1.5px] h-3">
              <span className="w-[3px] h-1.5 bg-brand-dark/50 rounded-[1px]" />
              <span className="w-[3px] h-2 bg-brand-dark/50 rounded-[1px]" />
              <span className="w-[3px] h-2.5 bg-brand-dark/50 rounded-[1px]" />
              <span className="w-[3px] h-3 bg-brand-dark/50 rounded-[1px]" />
            </div>
            <span className="text-[9px] font-mono tracking-tighter opacity-70">LTE</span>
            <div className="flex items-center gap-0.5 border border-brand-dark/30 rounded-[4px] px-[2px] py-[1.2px] h-3.5 w-6">
              <div className="bg-brand-dark/70 h-full w-[80%] rounded-[1.2px]" />
            </div>
          </div>
        </div>

        {/* Home Indicator line (iOS Style) for extra mockup realism */}
        <div className="hidden sm:block absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-brand-dark/25 rounded-full z-[110] pointer-events-none" />

        {/* Scaled App Window (The actual scrollable window) */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 w-full overflow-y-auto no-scrollbar relative pt-10 sm:pt-12 bg-brand-light"
        >
          <AnimatePresence mode="wait">
            {currentScreen === 'splash' && (
              <SplashScreen key="splash" onFinish={() => navigate('welcome')} />
            )}
          </AnimatePresence>

          <main className="relative z-10 w-full min-h-full pb-24 animate-fade-in">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen + (selectedProduct?.id || '')}
                initial={{ opacity: 0, x: prevScreen === 'splash' ? 0 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {currentScreen === 'welcome' && <WelcomeScreen onNavigate={navigate} />}
                {currentScreen === 'login' && <LoginScreen onNavigate={navigate} onLogin={handleLogin} />}
                {currentScreen === 'signup' && <LoginScreen onNavigate={navigate} onLogin={handleLogin} mode="signup" />}
                {currentScreen === 'home' && (
                  <HomeScreen 
                    onNavigate={navigate} 
                    onProductSelect={selectProduct} 
                    onCategorySelect={(cat) => {
                      setCatalogCategory(cat);
                    }}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    formatPrice={formatPrice}
                    scrollY={scrollY}
                  />
                )}
                {currentScreen === 'categories' && (
                  <CategoriesScreen 
                    onCategorySelect={setCatalogCategory}
                    onNavigate={navigate}
                  />
                )}
                {currentScreen === 'catalog' && (
                  <CatalogScreen 
                    onProductSelect={selectProduct} 
                    activeCategory={catalogCategory}
                    setActiveCategory={setCatalogCategory}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onBack={() => navigate('home')}
                    formatPrice={formatPrice}
                  />
                )}
                {currentScreen === 'product' && selectedProduct && (
                  <ProductScreen 
                    product={selectedProduct} 
                    onBack={() => navigate(prevScreen === 'home' ? 'home' : 'catalog')} 
                    onAddToCart={addToCart} 
                    onBuyNow={buyNow}
                    isFavorite={favorites.includes(selectedProduct.id)}
                    onToggleFavorite={toggleFavorite}
                    formatPrice={formatPrice}
                  />
                )}
                {currentScreen === 'favorites' && (
                  <FavoritesScreen 
                    onProductSelect={selectProduct} 
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onMoveToCart={moveFavoriteToCart}
                    onBack={() => navigate('home')}
                    formatPrice={formatPrice}
                  />
                )}
                {currentScreen === 'cart' && (
                  <CartScreen 
                    cart={cart} 
                    onNavigate={navigate} 
                    onBack={() => navigate('home')} 
                    onRemoveItem={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                    formatPrice={formatPrice}
                  />
                )}
                {currentScreen === 'payment' && (
                  <PaymentScreen 
                    total={cart.reduce((a, b) => a + b.product.price * b.quantity, 0)} 
                    addresses={userData.addresses}
                    savedCards={userData.paymentMethods}
                    onFinish={finishPayment} 
                    onBack={() => navigate('cart')}
                    formatPrice={formatPrice}
                  />
                )}
                {currentScreen === 'profile' && (
                  <ProfileScreen 
                    onNavigate={navigate} 
                    onBack={() => navigate('home')} 
                    userData={userData}
                    onClearOrderSelection={() => setSelectedTrackOrder(null)}
                  />
                )}
                {currentScreen === 'tracking' && (
                  <TrackingScreen 
                    onBack={() => navigate('profile')}
                    orders={userData.orders}
                    selectedOrder={selectedTrackOrder}
                    onSelectOrder={setSelectedTrackOrder}
                    onClearSelection={() => setSelectedTrackOrder(null)}
                    formatPrice={formatPrice}
                  />
                )}
                {currentScreen === 'support' && <SupportScreen onBack={() => navigate('profile')} />}
                {currentScreen === 'settings' && (
                  <SettingsScreen 
                    onNavigate={navigate} 
                    isDarkMode={isDarkMode}
                    setIsDarkMode={setIsDarkMode}
                    currency={currency}
                    setCurrency={setCurrency}
                  />
                )}
                {currentScreen === 'security' && <SecurityScreen onBack={() => navigate('settings')} />}
                {currentScreen === 'notifications' && <NotificationsSettingsScreen onBack={() => navigate('settings')} />}
                {currentScreen === 'privacy' && <PrivacyScreen onBack={() => navigate('settings')} />}
                {currentScreen === 'devices' && <DevicesScreen onBack={() => navigate('settings')} />}
                {currentScreen === 'personal_data' && (
                  <PersonalDataScreen 
                    onBack={() => navigate('profile')} 
                    userData={userData}
                    onUpdate={updateUserData}
                  />
                )}
                {currentScreen === 'addresses' && (
                  <AddressesScreen 
                    onBack={() => navigate('profile')} 
                    addresses={userData.addresses}
                    onUpdate={updateUserData}
                  />
                )}
                {currentScreen === 'payment_methods' && (
                  <PaymentMethodsScreen 
                    onBack={() => navigate('profile')} 
                    paymentMethods={userData.paymentMethods}
                    onUpdate={updateUserData}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {['home', 'catalog', 'favorites', 'cart', 'profile'].includes(currentScreen) && (
            <Navbar onNavigate={handleTabNavigate} currentScreen={currentScreen} />
          )}

          {showSuccess && <SuccessScreen onNavigate={handleSuccessClose} />}
        </div>
      </div>
    </div>
  );
}
