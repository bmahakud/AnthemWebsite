"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"
import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Link from "next/link"
import {
  ArrowRight,
  Code,
  Smartphone,
  BarChart,
  Brain,
  Users,
  Target,
  Lightbulb,
  Shield,
  Zap,
  CheckCircle,
  Award,
  ChevronDown,
  Star,
  Sparkles,
  Globe,
  Rocket,
  Heart,
  TrendingUp,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { MapPin, Phone, Mail } from "lucide-react";
import { API_URL } from "@/lib/config";
import { Footer } from "@/components/Footer";


// Animated counter component
const AnimatedCounter = ({ value, label, suffix = "+" }: { value: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLDivElement>(null)
  const counterInView = useInView(counterRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (counterInView) {
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [counterInView, value])

  return (
    <div ref={counterRef} className="text-center group">
      <motion.div
        className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2"
        animate={{ scale: counterInView ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {count}
        {suffix}
      </motion.div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
      <motion.div
        className="w-12 h-1 bg-gradient-to-r from-primary to-blue-500 mx-auto mt-2 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: counterInView ? 48 : 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  )
}

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: dimensions.height + 100,
          }}
          animate={{
            y: -100,
            x: Math.random() * dimensions.width,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const journeyRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const expertiseRef = useRef<HTMLDivElement>(null)

  // Scroll progress and parallax effects
  const { scrollYProgress } = useScroll({ target: containerRef })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Parallax transforms
  const heroY = useTransform(smoothProgress, [0, 0.3], [0, -200])
  const heroOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 0.3], [1, 0.8])

  const backgroundY1 = useTransform(smoothProgress, [0, 1], [0, -300])
  const backgroundY2 = useTransform(smoothProgress, [0, 1], [0, -150])
  const backgroundY3 = useTransform(smoothProgress, [0, 1], [0, -75])

  // Section visibility
  const heroInView = useInView(heroRef, { once: false, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: false, amount: 0.3 })
  const journeyInView = useInView(journeyRef, { once: false, amount: 0.3 })
  const valuesInView = useInView(valuesRef, { once: false, amount: 0.3 })
  const teamInView = useInView(teamRef, { once: false, amount: 0.3 })
  const expertiseInView = useInView(expertiseRef, { once: false, amount: 0.3 })

  // Mouse position for 3D effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / (typeof window !== 'undefined' ? window.innerWidth : 1)) * 2 - 1,
        y: (e.clientY / (typeof window !== 'undefined' ? window.innerHeight : 1)) * 2 - 1,
      })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])


  const [projects, setProjects] = useState<Array<{ client?: string | null }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects/`);
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const uniqueClients = new Set(
    projects
      .map((project) => project.client?.trim())
      .filter((client) => client && client !== "")
  ).size;

  // const stats = [
  //   {
  //     number: `${projects.length}+`,
  //     label: "Projects Completed",
  //     icon: <Zap className="size-6" />,
  //   },
  //   {
  //     number: `${uniqueClients}+`,
  //     label: "Happy Clients",
  //     icon: <Users className="size-6" />,
  //   },
  //   {
  //     number: "99%",
  //     label: "Success Rate",
  //     icon: <Shield className="size-6" />,
  //   },
  //   { number: "24/7", label: "Support", icon: <Clock className="size-6" /> },
  // ];

  // In about/page.tsx, add these lines near your other state declarations:

  // const [teamMembers, setTeamMembers] = useState<any[]>([]);
  // const [executives, setExecutives] = useState<any[]>([]);
  // const [founders, setFounders] = useState<any[]>([]);
  // const [teamLoading, setTeamLoading] = useState(true);

  // // Copy the exact same useEffect from team page
  // useEffect(() => {
  //   const fetchTeamData = async () => {
  //     try {
  //       const [teamRes, execRes, founderRes] = await Promise.all([
  //         fetch(`${API_URL}/api/team-members/`),
  //         fetch(`${API_URL}/api/executives/`),
  //         fetch(`${API_URL}/api/founders/`)
  //       ]);

  //       const [teamData, execData, founderData] = await Promise.all([
  //         teamRes.json(),
  //         execRes.json(),
  //         founderRes.json()
  //       ]);

  //       setTeamMembers(teamData);
  //       setExecutives(execData);
  //       setFounders(founderData);
  //     } catch (error) {
  //       console.error('Error fetching team data:', error);
  //     } finally {
  //       setTeamLoading(false);
  //     }
  //   };

  //   fetchTeamData();
  // }, []);

  // // Calculate total team count
  // const totalTeamCount = teamMembers.length + executives.length + founders.length;
  // console.log("Total team members in about page:", totalTeamCount);

  // // Now use it in your stats
  // const stats = [
  //   { value: 3, label: "Years of Excellence" },
  //   { value: projects.length || 0, label: "Projects Delivered" },
  //   { value: totalTeamCount, label: "Team Members" }, // ✅ Use it here
  //   { value: 5, label: "Industry Awards" },
  // ];

  // const stats = [
  //   { value: 3, label: "Years of Excellence" },
  //   { value: projects.length, label: "Projects Delivered" },
  //   { value: 15, label: "Team Members" },
  //   { value: 5, label: "Industry Awards" },
  // ]
  // Remove all these:
  // const [teamMembers, setTeamMembers] = useState<any[]>([]);
  // const [executives, setExecutives] = useState<any[]>([]);
  // const [founders, setFounders] = useState<any[]>([]);
  // const [teamLoading, setTeamLoading] = useState(true);

  // Replace with this simpler version:

  const [teamData, setTeamData] = useState<any[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);

  // Copy the exact same useEffect from team page (simplified version)
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        console.log("Fetching team data from:", `${API_URL}/api/team/`);
        const response = await fetch(`${API_URL}/api/team/`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Team data response:", data);

        // Make sure data is an array
        if (!Array.isArray(data)) {
          console.error("Team data is not an array:", data);
          setTeamData([]);
          return;
        }

        setTeamData(data);
      } catch (error) {
        console.error('Error fetching team data:', error);
        setTeamData([]);
      } finally {
        setTeamLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  // Calculate total team count (same logic as team page)
  const teammember = teamData.filter((member: any) => member.status === 'Active').length;
  console.log("Total active team members in about page:", teammember);

  // Now use it in your stats
  const stats = [
    { value: 4, label: "Years of Excellence" },
    { value: projects.length || 0, label: "Projects Delivered" },
    { value: teamLoading ? 15 : teammember, label: "Team Members" }, // ✅ Use it here
    { value: 6, label: "Industry Awards" },
  ];




  const journey = [
    {
      year: "2009",
      title: "Company Foundation",
      description: "Anthem Global was founded with a vision to revolutionize software development and AI solutions",
      icon: <Rocket className="size-6" />,
      color: "from-anthem-blue to-anthem-lightBlue",
    },
    {
      year: "2023",
      title: "DashoApp LMS Achievement",
      description: "Successfully launched DashoApp Learning Management System, marking our first major milestone",
      icon: <Sparkles className="size-6" />,
      color: "from-anthem-yellow to-amber-500",
    },
    {
      year: "2024",
      title: "First Investment Received",
      description: "Secured our first significant investment to fuel growth and expand our technological capabilities",
      icon: <TrendingUp className="size-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      year: "2025",
      title: "Reduced Loss to Zero",
      description: "Achieved financial stability by reducing operational losses to zero, marking a major business milestone",
      icon: <Target className="size-6" />,
      color: "from-anthem-blue to-anthem-darkBlue",
    },
  ]

  const values = [
    {
      title: "Innovation First",
      description:
        "We push boundaries and embrace cutting-edge technologies to deliver solutions that set new industry standards.",
      icon: <Lightbulb className="size-8" />,
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      delay: 0,
    },
    {
      title: "Collaborative Spirit",
      description:
        "Our success is built on transparent partnerships and shared commitment to achieving extraordinary results.",
      icon: <Users className="size-8" />,
      gradient: "from-anthem-blue via-anthem-lightBlue to-blue-600",
      delay: 0.2,
    },
    {
      title: "Agile Excellence",
      description:
        "We adapt quickly to changing needs with flexible methodologies that ensure perfect alignment with your goals.",
      icon: <Zap className="size-8" />,
      gradient: "from-anthem-yellow via-anthem-lightYellow to-amber-500",
      delay: 0.4,
    },
  ]

  const team = [
    {
      name: "Manas Ranjan Pattnaik",
      role: "Chairman",
      image: "/Anthem Assests/images_manas_pattnaik.png",
      quote: "Guiding Anthem Global's long-term vision, governance, and organizational direction.",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Rajesh Kumar Acharya",
      role: "Director",
      image: "/Anthem Assests/images_rajeshsir.png",
      quote: "Leading strategic execution across technology, operations, and client-focused delivery.",
      social: { linkedin: "#", twitter: "#" },
    },
    {
      name: "Chakradhara Panda",
      role: "Chief Executive Officer",
      image: "/Anthem Assests/images_chakradhara_panda.png",
      quote: "Driving delivery excellence, enterprise solutions, and business growth.",
      social: { linkedin: "#", twitter: "#" },
    },
  ]

  const expertise = [
    {
      title: "AI & Machine Learning",
      description: "Advanced algorithms that learn, adapt, and evolve with your business needs.",
      icon: <Brain className="size-8" />,
      image: "/image/ai-ml.png",
      technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face"],
    },
    {
      title: "Custom Software Development",
      description: "Bespoke solutions crafted to solve your unique business challenges.",
      icon: <Code className="size-8" />,
      image: "/image/Custom-software-development.jpg",
      technologies: ["React", "Node.js", "Python", "Cloud Native"],
    },
    {
      title: "Mobile & Web Applications",
      description: "Cross-platform applications that deliver exceptional user experiences.",
      icon: <Smartphone className="size-8" />,
      image: "/image/mobile-and-web.jpg",
      technologies: ["React Native", "Flutter", "Progressive Web Apps"],
    },
    {
      title: "Data Analytics & Insights",
      description: "Transform raw data into actionable insights that drive business growth.",
      icon: <BarChart className="size-8" />,
      image: "/image/data-analytics.jpg",
      technologies: ["Power BI", "Tableau", "Apache Spark", "BigQuery"],
    },
  ]

  const certifications = [
    { name: "StartUp India", icon: <Award className="size-6" />, color: "text-orange-500" },
    { name: "Start-Up Odisha", icon: <CheckCircle className="size-6" />, color: "text-green-500" },
    { name: "MSME", icon: <Shield className="size-6" />, color: "text-blue-500" },
    { name: "ISO 9001:2015", icon: <Target className="size-6" />, color: "text-purple-500" },
  ]

  return (
    <div ref={containerRef} className="flex min-h-screen flex-col overflow-hidden">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-anthem-blue via-anthem-lightBlue to-anthem-yellow z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-anthem-blue/5 via-blue-50/30 to-anthem-lightBlue/10"
            style={{ y: backgroundY1 }}
          />

          {/* Floating geometric shapes */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-anthem-blue/20 to-anthem-lightBlue/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ y: backgroundY2 }}
          />

          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-anthem-blue/10 to-anthem-yellow/10 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ y: backgroundY3 }}
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

          <FloatingParticles />
        </div>

        <motion.div
          className="container px-4 md:px-6 relative z-10"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`,
                }}
              >
                <motion.span
                  className="block bg-gradient-to-r from-anthem-blue via-blue-700 to-anthem-darkBlue bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  About Us
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-base md:text-xl text-muted-foreground mb-8 max-w-6xl mx-auto leading-relaxed text-justify space-y-4 px-2"
            >
              <p>
                At Anthem Global, we build intelligent digital solutions powered by Artificial Intelligence, innovation, and modern technology. Our mission is to help businesses transform, automate, and scale through smart software, AI-driven systems, and next-generation digital experiences.
              </p>
              <p>
                From custom software development to AI automation, cloud platforms and enterprise applications, we combine technical excellence with creative problem-solving to deliver impactful results for startups, enterprises, and organizations worldwide.
              </p>
              <p>
                We don&apos;t just develop software — we create intelligent solutions that drive growth, efficiency, and future-ready innovation.
              </p>
            </motion.div>


            {/* Animated logo */}


            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-3 justify-center items-center"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="anthem"
                  className="w-full sm:w-auto rounded-full px-6 py-4 text-base font-semibold shadow-lg"
                >
                  Explore Our Journey
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link href="/team" className="block w-full">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto rounded-full px-6 py-4 text-base font-semibold border-2 hover:bg-primary/5"
                  >
                    Meet Our Team
                    <Heart className="ml-2 size-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: heroInView ? 1 : 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => statsRef.current?.scrollIntoView({ behavior: "smooth" })}
          >
            <span className="text-sm text-muted-foreground mb-2">Discover More</span>
            <ChevronDown className="size-6 text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: statsInView ? 1 : 0, y: statsInView ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every number tells a story of innovation, dedication, and transformative success
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: statsInView ? 1 : 0, y: statsInView ? 0 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 p-4 md:p-8 group hover:scale-105">
                  <CardContent className="p-0">
                    <AnimatedCounter value={stat.value} label={stat.label} />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section
        ref={journeyRef}
        className="py-20 md:py-32 bg-gradient-to-br from-anthem-textDark via-anthem-darkBlue to-slate-950 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(1,122,202,0.15),transparent_50%)]" />

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: journeyInView ? 1 : 0, y: journeyInView ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our Journey Through Time
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From humble beginnings to industry leadership - every milestone shaped our vision
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            {/* Timeline line */}
            <motion.div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-anthem-blue via-anthem-lightBlue to-anthem-yellow transform md:-translate-x-1/2"
              initial={{ height: 0 }}
              animate={{ height: journeyInView ? "100%" : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {journey.map((item, index) => (
              <motion.div
                key={index}
                className={cn(
                  "relative flex flex-col md:flex-row items-start md:items-center mb-12 last:mb-0 pl-10 md:pl-0",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{
                  opacity: journeyInView ? 1 : 0,
                  x: journeyInView ? 0 : index % 2 === 0 ? -50 : 50,
                }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div
                  className={cn(
                    "w-full md:w-5/12",
                    index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                  )}
                >
                  <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-500 group">
                    <CardContent className="p-6">
                      <div
                        className={cn(
                          "flex items-center gap-3 mb-3",
                          index % 2 === 0 ? "justify-end" : "justify-start"
                        )}
                      >
                        <motion.div
                          className={cn(
                            "size-10 rounded-full bg-gradient-to-r flex items-center justify-center text-white",
                            item.color
                          )}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.icon}
                        </motion.div>
                        <span className="text-2xl font-bold text-white">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline dot */}
                <motion.div
                  className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 size-6 rounded-full bg-white shadow-lg z-10"
                  initial={{ scale: 0 }}
                  animate={{ scale: journeyInView ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  whileHover={{ scale: 1.5 }}
                >
                  <motion.div
                    className="size-full rounded-full bg-gradient-to-r from-anthem-blue to-anthem-yellow"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>




        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Our Mission & Vision
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Guiding principles that shape our journey and define our future
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <Card className="h-full border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-primary to-blue-600 overflow-hidden">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="size-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Target className="size-10 text-white" />
                    </motion.div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Mission</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To empower businesses worldwide with innovative, cutting-edge software solutions that drive digital transformation and unlock new possibilities. We are committed to delivering excellence through creativity, technical expertise, and a deep understanding of our clients' needs.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group"
            >
              <Card className="h-full border-0 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-anthem-blue to-blue-600 overflow-hidden">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, -90, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-xl"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="size-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Rocket className="size-10 text-white" />
                    </motion.div>
                  </div>
                </div>
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">Our Vision</h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    To be a global leader in AI-powered software development, recognized for our innovation, integrity, and impact. We envision a future where technology seamlessly integrates with human potential, creating solutions that inspire progress and transform industries worldwide.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        ref={valuesRef}
        className="py-20 md:py-32 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: valuesInView ? 1 : 0, y: valuesInView ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our core values shape every decision, every innovation, and every partnership we build
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: valuesInView ? 1 : 0, y: valuesInView ? 0 : 50 }}
                transition={{ duration: 0.8, delay: value.delay }}
                className="group"
              >
                <Card className="h-full border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-105">
                  <div className="relative h-64 overflow-hidden">
                    <motion.div
                      className={cn("absolute inset-0 bg-gradient-to-br opacity-90", value.gradient)}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="size-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        {value.icon}
                      </motion.div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        ref={teamRef}
        className="py-20 md:py-32 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: teamInView ? 1 : 0, y: teamInView ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Meet Our Visionaries
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The brilliant minds behind Anthem Global's revolutionary approach to technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: teamInView ? 1 : 0, y: teamInView ? 0 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <Card className="bg-white/5 backdrop-blur-md border-white/10 hover:bg-white/10 transition-all duration-500 overflow-hidden group-hover:scale-105">
                  <div className="relative h-80 overflow-hidden">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-user.jpg"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <motion.div
                      className="absolute top-4 right-4 size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Star className="size-6 text-yellow-400" />
                    </motion.div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.role}</p>
                    <blockquote className="text-gray-300 italic border-l-2 border-primary pl-4">
                      "{member.quote}"
                    </blockquote>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section
        ref={expertiseRef}
        className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.1),transparent_50%)]" />

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: expertiseInView ? 1 : 0, y: expertiseInView ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Our Expertise Domains
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technologies and methodologies that power transformative solutions
            </p>
          </motion.div>

          {/* ✅ Desktop Grid (unchanged) */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">

            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: expertiseInView ? 1 : 0, y: expertiseInView ? 0 : 50 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <Card className="h-full border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-105">
                  <div className="relative h-56 md:h-64 overflow-hidden rounded-lg">
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-center rounded-lg"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <motion.div
                      className="absolute bottom-4 left-4 size-12 rounded-full bg-white/90 flex items-center justify-center text-primary shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.5 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* ✅ Mobile Swiper */}
          <div className="md:hidden">
            <Swiper
              modules={[Navigation]}
              spaceBetween={16}
              slidesPerView={1.1} // shows one card fully and part of the next
              navigation
            >
              {expertise.map((item, index) => (
                <SwiperSlide key={index}>
                  <Card className="h-full border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="relative h-56 overflow-hidden rounded-lg">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-center rounded-lg"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <motion.div
                        className="absolute bottom-4 left-4 size-12 rounded-full bg-white/90 flex items-center justify-center text-primary shadow-lg"
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                      >
                        {item.icon}
                      </motion.div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-white to-gray-50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Trusted & Certified
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence is recognized by leading industry bodies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <Card className="p-6 text-center bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <motion.div
                    className={cn(
                      "size-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors",
                      cert.color,
                    )}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {cert.icon}
                  </motion.div>
                  <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-anthem-blue via-anthem-darkBlue to-anthem-darkBlue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Animated background elements */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{
                background: "linear-gradient(90deg, #ffffff, #e0e7ff, #ffffff)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ready to Transform Your Vision?
            </motion.h2>

            <motion.p
              className="text-xl text-white/80 mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Let's collaborate to turn your boldest ideas into groundbreaking digital realities. The future of
              innovation starts with a conversation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link href="/projects" className="block">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto rounded-full px-6 py-4 text-base font-semibold bg-white text-primary hover:bg-gray-100 shadow-xl"
                  >
                    Start Your Project
                    <Rocket className="ml-2 size-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                <Link href="/" className="block">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto rounded-full px-6 py-4 text-base font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
                  >
                    Explore Our Work
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Keep original */}
      <Footer />
    </div>
  )
}
