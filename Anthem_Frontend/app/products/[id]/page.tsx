"use client";

import { API_URL } from "@/lib/config";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Link from "next/link";
import {
  Code,
  ArrowRight,
  PlayCircle,
  Activity,
  CheckCircle2,
  Users,
  Zap,
  Target,
  Shield,
  GitMerge,
  Layers,
  FileText,
  Quote,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Package,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string | number;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  cover: string;
  iconText: string;
  category: string;
  status: string;
  features: string[];
  outcomes: string[];
  challenges: string[];
  technologies: string[];
  stats: any[];
  platforms: string[];
  integrations: string[];
  support: string[];
  liveUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  pricing: string;
  featured?: boolean;
  sortOrder?: number;
  gallery_images: Array<string | { id: number; image: string; created_at: string }> | null;
  created_at?: string;
  updated_at?: string;
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handlePrevImage = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!product || !product.gallery_images || product.gallery_images.length === 0) return;
    const imgs = product.gallery_images.map((g: any) =>
      typeof g === "object" ? g.image : g
    );
    const currentIndex = imgs.indexOf(activeGalleryImage || "");
    const prevIndex = (currentIndex - 1 + imgs.length) % imgs.length;
    setActiveGalleryImage(imgs[prevIndex]);
  };

  const handleNextImage = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.stopPropagation();
    if (!product || !product.gallery_images || product.gallery_images.length === 0) return;
    const imgs = product.gallery_images.map((g: any) =>
      typeof g === "object" ? g.image : g
    );
    const currentIndex = imgs.indexOf(activeGalleryImage || "");
    const nextIndex = (currentIndex + 1) % imgs.length;
    setActiveGalleryImage(imgs[nextIndex]);
  };

  const getGalleryImages = () => {
    if (!product?.gallery_images) return [];
    return product.gallery_images.map((g: any) =>
      typeof g === "object" ? g.image : g
    );
  };

  const currentImageIndex = () => {
    const imgs = getGalleryImages();
    return imgs.indexOf(activeGalleryImage || "");
  };

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (Math.abs(deltaX) > 50 && deltaY < 80) {
      if (deltaX < 0) handleNextImage();
      else handlePrevImage();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeGalleryImage) return;
      if (e.key === "ArrowLeft") handlePrevImage();
      else if (e.key === "ArrowRight") handleNextImage();
      else if (e.key === "Escape") { setActiveGalleryImage(null); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGalleryImage, product]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/products/`);
        if (!response.ok) {
          throw new Error("Failed to load products database");
        }
        const data = (await response.json()) as Product[];
        const foundProduct = data.find((p) => String(p.id) === String(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found");
        }
      } catch (err: any) {
        console.error("Error fetching product details:", err);
        setError(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  // Safely extract a URL string from whatever the API returns (string or object)
  const getImageUrl = (imagePath: any): string => {
    // If it's an object (gallery item), pull the .image property
    if (imagePath && typeof imagePath === "object" && "image" in imagePath) {
      imagePath = imagePath.image;
    }
    const path = String(imagePath ?? "").trim();
    if (!path) return "/placeholder.svg";
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return path;
    return `${API_URL}${path}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#061412] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#05110E] flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0B151A] border border-white/5 p-8 rounded-2xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-2">Error Occurred</h2>
          <p className="text-gray-400 mb-6">{error || "Could not find the requested product."}</p>
          <Link href="/products">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all">
              <ArrowLeft className="mr-2 size-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC] selection:bg-emerald-500/30">

      {/* ---------------- DARK HERO SECTION ---------------- */}
      <section className="bg-[#05110E] relative overflow-hidden pb-12">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-900/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-800/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">

          {/* Top Navigation */}
          <nav className="flex items-center justify-between py-6 border-b border-white/5">
            <Link href="/products" className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors">
              <div className="bg-emerald-500 p-1.5 rounded-md">
                <Package className="size-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-wide max-w-[150px] sm:max-w-xs truncate">{product.name}</span>
            </Link>

            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-300">
              <a href="#overview" className="hover:text-white transition-colors">Overview</a>
              {product?.challenges?.length ? <a href="#features" className="hover:text-white transition-colors">Challenges</a> : null}
              {product?.technologies?.length ? <a href="#tech-stack" className="hover:text-white transition-colors">Tech Stack</a> : null}
              {product?.outcomes?.length ? <a href="#impact" className="hover:text-white transition-colors">Impact</a> : null}
              {product?.gallery_images?.length ? <a href="#gallery" className="hover:text-white transition-colors">Gallery</a> : null}
            </div>

            {product?.liveUrl || product?.demoUrl ? (
              <a href={product.liveUrl || product.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 font-semibold shadow-sm shadow-emerald-900/20">
                  View Product <ArrowRight className="ml-2 size-4" />
                </Button>
              </a>
            ) : (
              <div />
            )}
          </nav>

          {/* Hero Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 pb-12 items-center">

            {/* Left Info */}
            <div className="space-y-6">
              {product.featured && (
                <div className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                  Featured Product
                </div>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                {product.name.split(' ').map((word, i) =>
                  i === 0 ? <span key={i}>{word} <br /></span> : <span key={i}>{word} </span>
                )}
              </h1>
              {product.tagline && (
                <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
                  {product.tagline}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-4 pt-2">
                {(product?.liveUrl || product?.demoUrl) && (
                  <a href={product.liveUrl || product.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg h-12 px-6 font-medium">
                      Live Demo <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </a>
                )}
                {product?.documentationUrl && (
                  <a href={product.documentationUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/5 rounded-lg h-12 px-6 font-medium">
                      Documentation <FileText className="ml-2 size-4" />
                    </Button>
                  </a>
                )}
              </div>

              {/* Tech Stack Horizontal Pills */}
              {product?.technologies && product.technologies.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-6">
                  {/* Handling technologies string which sometimes might be a single string with spaces based on your JSON */}
                  {(product.technologies.length === 1 ? product.technologies[0].split(' ') : product.technologies).slice(0, 6).map((tech, i) => (
                    <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-xs font-medium">
                      <div className="size-1.5 rounded-full bg-emerald-400" />
                      {tech}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Graphic Card */}
            <div className="bg-[#0B151A] rounded-2xl border border-white/5 p-8 h-full min-h-[400px] flex flex-col justify-between relative shadow-2xl overflow-hidden group">
              {/* Decorative background shape inside card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-emerald-900/10 to-transparent opacity-50 pointer-events-none" />

              <div className="flex-1 flex items-center justify-center relative z-10 w-full h-full">
                {product.cover ? (
                  <img src={getImageUrl(product.cover)} alt={product.name} className="w-full h-full object-contain rounded-xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" />
                ) : (
                  <div className="flex items-center gap-6">
                    <div className="relative size-24 md:size-32">
                      <div className="size-full rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                         <span className="text-4xl text-emerald-500 font-bold">{product.iconText || product.name.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{product.name.split(" ")[0]}</h2>
                      {product.category && <p className="text-emerald-400 text-sm mt-1 tracking-wide font-medium">{product.category.toUpperCase()}</p>}
                    </div>
                  </div>
                )}
              </div>

              {product.category && (
                <div className="flex justify-end relative z-10 mt-6">
                  <div className="text-xs font-semibold text-gray-400 border border-white/10 hover:bg-white/5 px-4 py-2 rounded-lg transition-colors cursor-default">
                    {product.category.toUpperCase()}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ---------------- LIGHT CONTENT SECTION ---------------- */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT COLUMN (Wider) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Product Overview Card */}
            <div id="overview" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                    <Target className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Product Overview</h3>
                </div>
                {product.fullDescription && (
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                        <Target className="size-5" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Product Details</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {product.fullDescription}
                    </p>
                  </div>
                )}

                {product.description && (
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                        <FileText className="size-5" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Description</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
                      {product.description}
                    </p>
                  </div>
                )}

              {/* Stats Grid */}
              {product?.stats && product.stats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {product.stats.map((stat: any, i: number) => (
                    <div key={i} className="bg-gray-50/80 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center text-center hover:bg-emerald-50/50 transition-colors">
                      <div className="flex items-center justify-center text-emerald-600 mb-2">
                        {i === 0 ? <Activity className="size-5" /> : i === 1 ? <CheckCircle2 className="size-5" /> : i === 2 ? <Users className="size-5" /> : <Zap className="size-5" />}
                      </div>
                      <div className="text-xl font-bold text-gray-900 mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Key Features / Challenges Card */}
            {product?.challenges && product.challenges.length > 0 && (
              <div id="features" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                    <Shield className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Key Challenges</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.challenges.map((challenge, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="p-2 bg-white rounded-md text-emerald-600 shadow-sm shrink-0 border border-gray-100">
                        <GitMerge className="size-4" />
                      </div>
                      <p className="text-sm font-medium text-gray-700 pt-1 leading-snug">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Impact & Outcome Card */}
            {product?.outcomes && product.outcomes.length > 0 && (
              <div id="impact" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                    <Target className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Impact & Outcome</h3>
                </div>
                <ul className="space-y-4">
                  {product.outcomes.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="size-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm font-medium leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN (Narrower) */}
          <div className="lg:col-span-1 space-y-6">

            {/* Product Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                  <FileText className="size-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Product Details</h3>
              </div>

              <div className="space-y-4 text-sm">
                {product.category && (
                  <div className="flex justify-between items-start border-b border-gray-50 pb-4 gap-4">
                    <span className="text-gray-500 shrink-0">Category</span>
                    <span className="font-semibold text-gray-900 text-right capitalize">{product.category}</span>
                  </div>
                )}
                {product.pricing && (
                  <div className="flex justify-between items-start border-b border-gray-50 pb-4 gap-4">
                    <span className="text-gray-500 shrink-0">Pricing</span>
                    <span className="font-semibold text-gray-900 text-right">{product.pricing}</span>
                  </div>
                )}
                {product.status && (
                  <div className="flex justify-between items-start pt-2 gap-4">
                    <span className="text-gray-500 shrink-0">Status</span>
                    <span className="font-semibold uppercase text-[10px] tracking-wide px-2 py-1 bg-emerald-50 text-emerald-600 rounded">{product.status}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack Card */}
            {product?.technologies && product.technologies.length > 0 && (
              <div id="tech-stack" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                    <Layers className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Tech Stack</h3>
                </div>

                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {/* Handling technologies string which sometimes might be a single string with spaces based on JSON */}
                  {(product.technologies.length === 1 ? product.technologies[0].split(' ') : product.technologies).map((tech, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="shrink-0 size-8 rounded bg-gray-50 border border-gray-100 text-gray-600 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                        {tech.substring(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900 truncate max-w-[80px]" title={tech}>{tech}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ---------------- GALLERY SECTION ---------------- */}
            {product?.gallery_images && product.gallery_images.length > 0 && (
              <div id="gallery" className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 border border-emerald-100">
                    <Maximize2 className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Media Gallery</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {product.gallery_images.map((img: any, i) => {
                    // Support both plain string URLs and { image: string } objects
                    const imgUrl = typeof img === "object" && img?.image ? img.image : img;
                    return (
                      <div
                        key={i}
                        className="bg-gray-900 aspect-[4/3] rounded-xl border border-gray-200 overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-all"
                        onClick={() => setActiveGalleryImage(imgUrl)}
                      >
                        <img
                          src={getImageUrl(imgUrl)}
                          alt={`Gallery item ${i + 1}`}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                          onError={(e) => (e.currentTarget.style.display = 'none')}
                        />

                        <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/40 transition-colors flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100">
                          <Maximize2 className="text-white size-6" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ---------------- FULLSCREEN LIGHTBOX ---------------- */}
      <AnimatePresence>
        {activeGalleryImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center backdrop-blur-md"
          >
            <TransformWrapper
              key={activeGalleryImage}
              initialScale={1}
              minScale={1}
              maxScale={4}
              centerZoomedOut={true}
              doubleClick={{ mode: "toggle" }}
              wheel={{ step: 0.1 }}
            >
              {({ zoomIn, zoomOut, state }) => (
                <div
                  className="w-full h-full flex flex-col relative"
                  onTouchStart={(e) => {
                    if (state.scale === 1) handleLightboxTouchStart(e);
                  }}
                  onTouchEnd={(e) => {
                    if (state.scale === 1) handleLightboxTouchEnd(e);
                  }}
                >
                  {/* Close */}
                  <button
                    onClick={() => setActiveGalleryImage(null)}
                    className="absolute top-4 right-4 z-[70] bg-black/50 hover:bg-black/80 border border-white/20 text-white rounded-full p-3 transition-all shadow-xl"
                  >
                    <X className="size-5" />
                  </button>

                  {/* Zoom Controls */}
                  <div className="absolute top-4 left-4 z-[70] flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); zoomIn(); }}
                      className="bg-black/50 hover:bg-black/80 border border-white/20 text-white rounded-full p-2 transition-all shadow-md"
                    >
                      <ZoomIn className="size-4" />
                    </button>
                    <span className="text-white/70 text-xs font-medium">{Math.round(state.scale * 100)}%</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); zoomOut(); }}
                      disabled={state.scale <= 1}
                      className="bg-black/50 hover:bg-black/80 border border-white/20 text-white rounded-full p-2 transition-all shadow-md disabled:opacity-30"
                    >
                      <ZoomOut className="size-4" />
                    </button>
                  </div>

                  {/* Image counter */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
                    <span className="text-white/60 text-xs bg-black/40 px-3 py-1 rounded-full">
                      {currentImageIndex() + 1} / {getGalleryImages().length}
                    </span>
                  </div>

                  {/* Image area */}
                  <div
                    className="relative flex items-center justify-center w-full px-4"
                    style={{ height: "calc(100vh - 130px)" }}
                    onClick={() => state.scale === 1 && setActiveGalleryImage(null)}
                  >
                    <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img
                        src={getImageUrl(activeGalleryImage)}
                        alt="Gallery"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
                        style={{ touchAction: "none" }}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = "/placeholder.svg"; }}
                      />
                    </TransformComponent>
                  </div>

                  {/* Bottom controls */}
                  <div className="w-full flex flex-col items-center gap-3 pb-4 px-6">
                    {/* Dot indicators */}
                    {getGalleryImages().length > 1 && (
                      <div className="flex items-center gap-1.5">
                        {getGalleryImages().map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setActiveGalleryImage(getGalleryImages()[i]); }}
                            className={`rounded-full transition-all ${
                              i === currentImageIndex()
                                ? "w-5 h-2 bg-white"
                                : "w-2 h-2 bg-white/30 hover:bg-white/60"
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Arrow row */}
                    {getGalleryImages().length > 1 && (
                      <div className="flex items-center gap-6">
                        <button
                          onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                          className="bg-black/50 hover:bg-black/80 active:scale-95 border border-white/20 text-white rounded-full px-6 py-3 backdrop-blur-md transition-all shadow-xl flex items-center gap-2 text-sm font-medium z-[70]"
                        >
                          <ChevronLeft className="size-5" />
                          <span className="hidden sm:inline">Prev</span>
                        </button>
                        <span className="text-white/40 text-xs">Swipe or tap arrows</span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                          className="bg-black/50 hover:bg-black/80 active:scale-95 border border-white/20 text-white rounded-full px-6 py-3 backdrop-blur-md transition-all shadow-xl flex items-center gap-2 text-sm font-medium z-[70]"
                        >
                          <span className="hidden sm:inline">Next</span>
                          <ChevronRight className="size-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </TransformWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
