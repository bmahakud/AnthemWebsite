"use client"
import { Footer } from "@/components/Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Youtube,
  Palette,
  Globe,
  DollarSign,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Sparkles,
  Zap,
  Play,
  PenTool,
  MousePointer,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";

export default function DigitalMarketingPage() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  }

  const services = [
    {
      title: "Digital Marketing Solutions",
      icon: <Globe className="size-8" />,
      color: "from-blue-500 to-cyan-600",
      features: [
        "Social Media Marketing (Facebook, Instagram, LinkedIn)",
        "Bulk SMS & Email Marketing",
        "Search Engine Optimization (SEO)",
        "Google Ads and YouTube Ads",
        "Content Marketing & Blog Writing",
      ],
    },
    {
      title: "YouTube Video Production & Marketing",
      icon: <Youtube className="size-8" />,
      color: "from-red-500 to-pink-600",
      features: [
        "Video Shooting",
        "Video Editing",
        "YouTube Channel Optimization",
        "YouTube Ads Campaigns",
        "Video SEO & Promotion",
      ],
    },
    {
      title: "Branding & Identity Creation",
      icon: <Palette className="size-8" />,
      color: "from-anthem-blue to-anthem-darkBlue",
      features: [
        "Logo Design",
        "Stationery Design (Business Cards, Letterheads)",
        "Brand Storytelling Videos",
        "Social Media Branding",
        "Brand Guidelines Creation",
      ],
    },
  ]

  const whyChooseUs = [
    {
      icon: <DollarSign className="size-6" />,
      title: "Affordable Excellence",
      description: "High-impact digital solutions designed to fit every budget, empowering businesses of all sizes.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Zap className="size-6" />,
      title: "All-in-One Expertise",
      description: "From YouTube production to full-scale branding, we offer seamless, end-to-end services.",
      color: "from-yellow-500 to-orange-600",
    },
    {
      icon: <Users className="size-6" />,
      title: "Customer-First Focus",
      description: "Dedicated support and measurable results aligned with your goals.",
      color: "from-anthem-blue to-anthem-lightBlue",
    },
  ]

  const packages = {
    youtube: [
      {
        name: "Basic Package",
        price: "₹15,000",
        period: "/month",
        features: [
          "Video shooting (4 videos)",
          "Basic editing",
          "Channel setup",
          "Thumbnail creation",
          "Basic video promotion",
          "SEO content",
          "Video upload",
        ],
        popular: false,
      },
      {
        name: "Standard Package",
        price: "₹20,000",
        period: "/month",
        features: ["Video shooting (4 videos)", "Intermediate editing", "YouTube Ads", "Comprehensive optimization"],
        popular: true,
      },
      {
        name: "Premium Package",
        price: "₹25,000",
        period: "/month",
        features: [
          "Video shooting (6 videos)",
          "Advanced editing",
          "Full channel management",
          "Influencer collaboration",
          "Ads campaign",
        ],
        popular: false,
      },
    ],
    branding: [
      {
        name: "Basic Package",
        price: "₹4,999",
        period: " (one-time)",
        features: ["Logo design", "Business card design", "Brand color palette", "Typography guide"],
        popular: false,
      },
      {
        name: "Standard Package",
        price: "₹14,999",
        period: " (one-time)",
        features: [
          "Logo design (with revisions)",
          "Full stationery design",
          "Brand guidelines",
          "Brand storytelling video",
        ],
        popular: true,
      },
      {
        name: "Premium Package",
        price: "₹19,999",
        period: " (one-time)",
        features: [
          "Unlimited logo revisions",
          "Complete brand identity kit",
          "Professional-grade brand storytelling video",
          "YouTube Ads campaign setup",
        ],
        popular: false,
      },
    ],
    digital: [
      {
        name: "Basic Package",
        price: "₹9,999",
        period: "/month",
        features: [
          "Basic SEO (up to 5 keywords)",
          "Social media marketing (3 posts/week)",
          "Bulk SMS & email (2,000/month)",
          "Content writing (4 blogs/month)",
          "Basic analytics report",
        ],
        popular: false,
      },
      {
        name: "Standard Package",
        price: "₹15,000",
        period: "/month",
        features: [
          "Advanced SEO (up to 10 keywords)",
          "5 posts/week",
          "Bulk SMS/email (3,000/month)",
          "Content writing (6 blogs/month)",
          "YouTube video editing (1 video)",
          "Detailed analytics report",
        ],
        popular: true,
      },
      {
        name: "Premium Package",
        price: "₹25,000",
        period: "/month",
        features: [
          "Full-scale SEO (up to 15 keywords)",
          "Multi-platform marketing (7 posts/week)",
          "Bulk SMS/email (5,000/month)",
          "Advanced content writing (8 blogs/month)",
          "Video shoots (3 videos/month)",
          "Comprehensive KPI report",
        ],
        popular: false,
      },
    ],
  }

  const addOnServices = [
    {
      title: "Google Ads & Social Media Ads",
      description:
        "Comprehensive ad campaign management to grow your business and improve ROI on Google Ads and social platforms.",
      price: "₹10,000/month management fee",
      note: "(excluding ad spend)",
      icon: <MousePointer className="size-6" />,
    },
    {
      title: "Custom Graphic Design",
      description: "Creative designs tailored to your needs, including logos, brochures, and marketing materials.",
      price: "Starting at ₹3,000 onwards",
      icon: <PenTool className="size-6" />,
    },
  ]

  const testimonials = [
    {
      name: "Dr. Baryon Swain",
      content:
        "The team at Anthem Global quickly identified growth opportunities we hadn't even considered. Their expertise helped us refine our strategy and achieve sustainable growth.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100&query=professional man portrait",
    },
    {
      name: "Santosh M.",
      content:
        "The level of expertise and personalized attention to our unique needs has made them an invaluable partner.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100&query=indian businessman portrait",
    },
    {
      name: "Arindum Chaudhary",
      content:
        "Thanks to Anthem Global, we now have a clear business model and a strong value proposition. Their guidance was pivotal in helping us expand our customer base and increase revenue.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100&query=young professional portrait",
    },
  ]

  return (
    <div ref={containerRef} className="flex min-h-[100dvh] flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-anthem-bgLight to-sky-100/10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-anthem-lightBlue/10 rounded-full blur-xl"
          />
        </div>

        <div className="container px-4 md:px-6 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="size-4" />
              Digital Marketing Excellence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              About Our{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
              >
                Digital Marketing
              </motion.span>{" "}
              Services
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed"
            >
              In a world dominated by digital innovation, your brand needs a partner who doesn't just follow trends but
              creates them. At Anthem Global, we specialize in crafting unique, data-driven digital marketing strategies that
              go beyond the ordinary.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto"
            >
              Our team of experts integrates cutting-edge technology with creative solutions to amplify your online
              presence. Whether it's crafting viral campaigns, optimizing your content for search engines, or managing
              your ad spend to deliver the highest ROI, we tailor every solution to align with your goals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" variant="anthem" className="rounded-full h-14 px-10 text-lg group">
                Let's Create Your Digital Success Story
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-10 text-lg">
                View Our Portfolio
                <Play className="ml-2 size-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-primary/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Anthem Global is The Right Choice for You?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We combine innovation, expertise, and dedication to deliver exceptional results
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {whyChooseUs.map((item, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }} className="group">
                <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-blue-50/30 backdrop-blur transition-all hover:shadow-xl">
                  <CardContent className="p-8">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`size-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-6 shadow-lg`}
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-blue-50/30 to-background">
      <div className="container px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services We Provide</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive digital marketing solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="hidden md:grid gap-8 md:grid-cols-3"
        >
          {services.map((service, i) => (
            <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.05 }} className="group">
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/20 backdrop-blur transition-all hover:shadow-2xl">
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <CardContent className="p-8">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    whileHover={{ rotate: 360 }}
                    className={`size-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 shadow-lg mx-auto`}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-6 text-center">{service.title}</h3>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle className="size-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
          >
            {services.map((service, i) => (
              <SwiperSlide key={i}>
                <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/20 backdrop-blur transition-all hover:shadow-2xl">
                  <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                  <CardContent className="p-8">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      whileHover={{ rotate: 360 }}
                      className={`size-16 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white mb-6 shadow-lg mx-auto`}
                    >
                      {service.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-6 text-center">{service.title}</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle className="size-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>

      {/* Packages Section */}
      <section className="w-full py-20 md:py-32 bg-background">
  <div className="container px-4 md:px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Packages</h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Choose the perfect package that fits your business needs and budget
      </p>
    </motion.div>

    <Tabs defaultValue="youtube" className="w-full">
      <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
        <TabsTrigger value="youtube" className="gap-2">
          <Youtube className="size-4" />
          YouTube Marketing
        </TabsTrigger>
        <TabsTrigger value="branding" className="gap-2">
          <Palette className="size-4" />
          Branding
        </TabsTrigger>
        <TabsTrigger value="digital" className="gap-2">
          <Globe className="size-4" />
          Digital Marketing
        </TabsTrigger>
      </TabsList>

      {Object.entries(packages).map(([key, categoryPackages]) => (
        <TabsContent key={key} value={key}>
          {/* Desktop Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:grid gap-8 md:grid-cols-3"
          >
            {categoryPackages.map((pkg, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }} className="relative">
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full overflow-hidden transition-all hover:shadow-2xl ${
                    pkg.popular ? "border-primary shadow-lg" : "border-border/40"
                  }`}
                >
                  <CardHeader className="text-center pb-8 pt-8">
                    <CardTitle className="text-2xl mb-4">{pkg.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                        className="text-4xl font-bold"
                      >
                        {pkg.price}
                      </motion.span>
                      <span className="text-muted-foreground">{pkg.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-8">
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="size-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <motion.div
                      className="h-1 bg-primary/20 rounded-full overflow-hidden mb-6"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <motion.div
                        className="h-full bg-primary"
                        initial={{ width: "0%" }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 1 }}
                      />
                    </motion.div>
                    <Button
                      className={`w-full ${pkg.popular ? "" : "variant-outline"}`}
                      variant={pkg.popular ? "default" : "outline"}
                      onClick={() => setSelectedPackage(`${key}-${i}`)}
                    >
                      Get Started
                      <ArrowRight className="ml-2 size-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Slider */}
          <div className="md:hidden">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
            >
              {categoryPackages.map((pkg, i) => (
                <SwiperSlide key={i}>
                  <motion.div variants={itemVariants} whileHover={{ y: -10 }} className="relative">
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <Badge className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <Card
                      className={`h-full overflow-hidden transition-all hover:shadow-2xl ${
                        pkg.popular ? "border-primary shadow-lg" : "border-border/40"
                      }`}
                    >
                      <CardHeader className="text-center pb-8 pt-8">
                        <CardTitle className="text-2xl mb-4">{pkg.name}</CardTitle>
                        <div className="flex items-baseline justify-center gap-1">
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                            className="text-4xl font-bold"
                          >
                            {pkg.price}
                          </motion.span>
                          <span className="text-muted-foreground">{pkg.period}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-8">
                        <ul className="space-y-3 mb-8">
                          {pkg.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="size-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <motion.div
                          className="h-1 bg-primary/20 rounded-full overflow-hidden mb-6"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        >
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: "0%" }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 1 }}
                          />
                        </motion.div>
                        <Button
                          className={`w-full ${pkg.popular ? "" : "variant-outline"}`}
                          variant={pkg.popular ? "default" : "outline"}
                          onClick={() => setSelectedPackage(`${key}-${i}`)}
                        >
                          Get Started
                          <ArrowRight className="ml-2 size-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  </div>
</section>

      {/* Add-On Services */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-b from-blue-50/30 to-background">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Add-On Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Enhance your packages with the following services
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto"
          >
            {addOnServices.map((service, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ scale: 1.02 }} className="group">
                <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/20 backdrop-blur transition-all hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                        <p className="text-muted-foreground mb-4">{service.description}</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-semibold text-primary">{service.price}</span>
                          {service.note && <span className="text-sm text-muted-foreground">{service.note}</span>}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-3"
          >
            {testimonials.map((testimonial, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -10 }} className="group">
                <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-blue-50/30 backdrop-blur transition-all hover:shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, idx) => (
                        <Star key={idx} className="size-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-full overflow-hidden bg-muted">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to take your business to the next level with Anthem Global Digital Services?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8">Get in Touch with Us Today</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="secondary" className="rounded-full h-14 px-10 text-lg group">
                Start Your Digital Journey
                <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Footer - Keep original */}
      <Footer />
    </div>
  )
}
