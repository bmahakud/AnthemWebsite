"use client"
import { Footer } from "@/components/Footer";
import { API_URL } from '@/lib/config';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Github, Linkedin, Twitter, Mail, Crown, Star, Users, Phone, MapPin, Calendar, Award, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRef, useState, useEffect } from "react"
import Link from "next/link";
import Image from "next/image";
import TeamModal from "./teammodel";
import { generateSlug } from "@/lib/team";

const CounterAnimation = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}</span>
}


export default function TeamPage() {
  const [founders, setFounders] = useState<any[]>([]);
  const [executives, setExecutives] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [alumniMembers, setAlumniMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Array<{ client?: string | null }>>([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Function to extract year from date
  const getYearFromDate = (dateString: string) => {
    if (!dateString) return "2024";
    try {
      const date = new Date(dateString);
      return date.getFullYear().toString();
    } catch (error) {
      // If it's already just a year, return it
      if (/^\d{4}$/.test(dateString)) {
        return dateString;
      }
      return "2024";
    }
  };

  // Function to sort by join date (earliest first)
  const sortByJoinDate = (members: any[]) => {
    return [...members].sort((a, b) => {
      const dateA = a.joinDate ? new Date(a.joinDate).getTime() : new Date().getTime();
      const dateB = b.joinDate ? new Date(b.joinDate).getTime() : new Date().getTime();
      return dateA - dateB; // Ascending order (earliest first)
    });
  };

  // Fetch team data with member_type filtering
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log("Fetching team data from:", `${API_URL}/api/team/`);

        const response = await fetch(`${API_URL}/api/team/`);

        console.log("Response status:", response.status);
        console.log("Response ok:", response.ok);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw API response:", data);

        // Check if data is an array
        if (!Array.isArray(data)) {
          throw new Error("API response is not an array");
        }

        // Let's see what member_type values actually exist
        const allMemberTypes = data.map((member: any) => member.member_type);
        console.log("All member_type values in data:", [...new Set(allMemberTypes)]);

        // Validate and transform data based on member_type
        const processMember = (member: any) => ({
          ...member,
          image: member.image || "/placeholder.svg",
          bio: member.bio || "Team member at Anthem Global",
          skills: member.skills || [],
          department: member.department || "General",
          location: member.location || "Bhubaneswar, India",
          joinDate: member.joinDate || "2024",  // Convert to year only
          achievements: member.achievements || [],
          experience: member.experience || "",
          education: member.education || "",
          linkedin_url: member.linkedin_url || "",
          social: member.social || {
            linkedin: "#",
            twitter: "#",
            github: "#",
            email: "#"
          }
        });

        // Filter by member_type and status, then sort by join date
        const foundersData = sortByJoinDate(
          data
            .filter((member: any) => member.member_type === 'founder' && member.status === 'Active')
            .map(processMember)
        );

        const executivesData = sortByJoinDate(
          data
            .filter((member: any) => member.member_type === 'executive' && member.status === 'Active')
            .map(processMember)
        );

        const employeesData = sortByJoinDate(
          data
            .filter((member: any) => member.member_type === 'employee' && member.status === 'Active')
            .map(processMember)
        );

        const alumniData = data
          .filter((member: any) => member.status === 'Alumni')
          .map(member => ({
            ...processMember(member),
            bio: member.bio || "Former team member at Anthem Global"
          }));

        console.log("Founders (sorted):", foundersData);
        console.log("Executives (sorted):", executivesData);
        console.log("Employees (sorted):", employeesData);
        console.log("Alumni:", alumniData);

        setFounders(foundersData);
        setExecutives(executivesData);
        setTeamMembers(employeesData);
        setAlumniMembers(alumniData);
      } catch (error) {
        console.error("Error fetching team data:", error);
        const message = error instanceof Error ? error.message : String(error);
        setError(`Failed to load team data: ${message}`);
        setFounders([]);
        setExecutives([]);
        setTeamMembers([]);
        setAlumniMembers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);
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



  const parallaxY = useTransform(smoothProgress, [0, 1], [0, -100])
  const parallaxY2 = useTransform(smoothProgress, [0, 1], [0, -200])
  const scaleProgress = useTransform(smoothProgress, [0, 0.5], [1, 1.1])

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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  }
  const teammember = teamMembers.length + executives.length + founders.length
  console.log("Total team members:", teammember);



  return (
    <div ref={containerRef} className="flex min-h-[100dvh] flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          style={{ y: parallaxY }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-anthem-lightBlue/20 rounded-full blur-xl"
        />
        <motion.div
          style={{ y: parallaxY2 }}
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-anthem-blue/20 to-anthem-lightBlue/20 rounded-full blur-xl"
        />
        <motion.div
          style={{ y: parallaxY }}
          className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"
        />
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-anthem-lightBlue to-anthem-yellow transform-gpu z-50"
        style={{ scaleX: smoothProgress, transformOrigin: "0%" }}
      />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: `${10 + ((i * 6) % 80)}%`,
              top: `${20 + ((i * 8) % 60)}%`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-anthem-bgLight to-sky-100/10" />

        {/* 3D Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container px-4 md:px-6 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Animated Logo */}
            <motion.div
              className="mb-8 flex justify-center"
              whileHover={{ scale: 1.1, rotateY: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Users className="w-12 h-12 text-white" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-2xl opacity-50 blur-xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>

            {/* Header Title */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8"
            >
              Meet Our{" "}
              <span className="bg-gradient-to-r from-primary via-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent">
                Dream Team
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Passionate innovators, creative thinkers, and technology pioneers working together to shape the future of
              AI
            </motion.p>

            {/* Animated Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {[
                { label: "Projects Completed", value: projects.length, suffix: "+" },
                { label: "Happy Clients", value: 25, suffix: "+" },
                { label: "Team Members", value: teamMembers.length + executives.length + founders.length, suffix: "+" },
                { label: "Years Experience", value: 4, suffix: "+" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    <CounterAnimation end={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="w-full py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-anthem-bgLight to-sky-100/10" />
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div className="flex items-center justify-center gap-4 mb-6" whileHover={{ scale: 1.05 }}>
              <Crown className="w-10 h-10 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-anthem-darkBlue bg-clip-text text-transparent">
                Our Visionary Leaders
              </h2>
            </motion.div>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-anthem-lightBlue to-anthem-yellow mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              The brilliant minds behind Anthem Global's revolutionary vision and strategic direction
            </p>
          </motion.div>

          {/* Founders Loading/Empty States */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading visionary leaders...</p>
            </div>
          ) : founders.length === 0 ? (
            <div className="text-center py-20">
              <Crown className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Visionary Leaders Found</h3>
              <p className="text-muted-foreground">We're currently updating our leadership information.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-10 md:grid-cols-3 max-w-7xl mx-auto"
            >
              {founders.map((member, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative h-full flex flex-col"
                  whileHover={{ y: -20, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/team/${generateSlug(member.name)}`} className="h-full flex flex-col">
                    <Card className="h-full flex flex-col overflow-hidden border-0 bg-gradient-to-br from-white/40 to-white/40 backdrop-blur-xl shadow-2xl cursor-pointer">

                      <div className="relative h-72 overflow-hidden flex-shrink-0">
                        <motion.div
                          className="relative w-full h-full"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover object-top bg-white transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/20 to-transparent" />

                        {/* Floating Crown */}
                        <motion.div
                          className="absolute top-6 right-6"
                          animate={{ y: [-5, 5, -5] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
                            <Crown className="w-6 h-6 text-white" />
                          </div>
                        </motion.div>

                        {/* Achievement Badges */}
                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                          {member.achievements?.slice(0, 2).map((achievement: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                              <Award className="w-3 h-3 mr-1" />
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <CardContent className="p-7 flex flex-col flex-grow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold">{member.name}</h3>
                              {member.linkedin_url && (
                                <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-7 h-7 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      window.open(member.linkedin_url, '_blank');
                                    }}
                                  >
                                    <Linkedin className="w-3.5 h-3.5" />
                                  </Button>
                                </motion.div>
                              )}
                            </div>
                            <p className="text-primary font-semibold text-base">{member.role}</p>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div className="flex items-center gap-1 mb-1">
                              <MapPin className="w-3 h-3" />
                              {member.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Since {getYearFromDate(member.joinDate)}
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-2">
                          <span className="font-medium"></span> {member.education || "Not specified"}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Executive Leadership Section */}
      <section className="w-full py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-anthem-bgLight via-sky-50 to-background" />
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div className="flex items-center justify-center gap-4 mb-6" whileHover={{ scale: 1.05 }}>
              <Star className="w-10 h-10 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-anthem-darkBlue bg-clip-text text-transparent">
                Executive Leadership
              </h2>
            </motion.div>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-anthem-lightBlue to-anthem-yellow mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Strategic leaders driving operational excellence and innovation across all departments
            </p>
          </motion.div>

          {/* Executives Loading/Empty States */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading executive leadership...</p>
            </div>
          ) : executives.length === 0 ? (
            <div className="text-center py-20">
              <Star className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Executive Leadership Found</h3>
              <p className="text-muted-foreground">We're currently updating our executive team information.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 grid-cols-2 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {executives.map((member, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative h-full flex flex-col"
                  whileHover={{ y: -15, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/team/${generateSlug(member.name)}`} className="h-full flex flex-col">
                    <Card className="h-full flex flex-col overflow-hidden border-0 bg-gradient-to-br from-white/40 to-white/40 backdrop-blur-xl shadow-2xl cursor-pointer">
                      <div className="relative h-48 md:h-72 overflow-hidden flex-shrink-0">
                        <motion.div
                          className="relative w-full h-full"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            loading="lazy"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/20 to-transparent" />

                        {/* Department Badge */}
                        <div className="absolute top-2 left-2 md:top-4 md:left-4">
                          <Badge className="bg-primary/90 text-white text-xs md:text-sm">{member.department}</Badge>
                        </div>

                        {/* Star Icon */}
                        <motion.div
                          className="absolute top-4 right-4"
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg">
                            <Star className="w-5 h-5 text-white" />
                          </div>
                        </motion.div>
                      </div>

                      <CardContent className="p-3 md:p-6 flex flex-col flex-grow">
                        <div className="mb-2 md:mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm md:text-xl font-bold">{member.name}</h3>
                            {member.linkedin_url && (
                              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="flex-shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(member.linkedin_url, '_blank');
                                  }}
                                >
                                  <Linkedin className="w-2.5 h-2.5 md:w-3.5 h-3.5" />
                                </Button>
                              </motion.div>
                            )}
                          </div>
                          <p className="text-primary font-semibold text-xs md:text-sm">{member.role}</p>
                          <div className="flex items-center gap-2 md:gap-4 mt-1 md:mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-2 h-2 md:w-3 md:h-3" />
                              {member.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-2 h-2 md:w-3 md:h-3" />
                              {getYearFromDate(member.joinDate)}
                            </div>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-2">
                          <span className="font-medium"></span> {member.education || "Not specified"}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mb-2 md:mb-4">
                          {member.skills?.slice(0, 2).map((skill: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Team Members Section */}
      <section className="w-full py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-anthem-bgLight to-sky-100/5" />
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Users className="w-10 h-10 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-anthem-darkBlue bg-clip-text text-transparent">
                Our Amazing Team
              </h2>
            </motion.div>
            <div className="w-32 h-1 bg-gradient-to-r from-primary via-anthem-lightBlue to-anthem-yellow mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Talented professionals from around the world, united by passion and innovation
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading team members...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500">
              <p>{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-20">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Team Members Found</h3>
              <p className="text-muted-foreground">We're currently updating our team information.</p>
            </div>
          ) : (
            /* Team Members Grid */
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 grid-cols-2 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {teamMembers.map((member, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative h-full flex flex-col"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/team/${generateSlug(member.name)}`} className="h-full flex flex-col">
                    <Card className="h-full flex flex-col overflow-hidden border-0 bg-gradient-to-br from-white/40 to-white/40 backdrop-blur-xl shadow-2xl cursor-pointer">
                      <div className="relative h-48 md:h-64 overflow-hidden flex-shrink-0">
                        <motion.div
                          className="relative w-full h-full"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Image
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            loading="lazy"
                          />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/20 to-transparent" />

                        {/* Department Badge */}
                        <div className="absolute top-2 left-2 md:top-3 md:left-3">
                          <Badge className="text-xs border-0 text-white shadow-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500">
                            {member.department}
                          </Badge>
                        </div>

                        {/* Join Year */}
                        <div className="absolute top-2 right-2 md:top-3 md:right-3">
                          <div className="text-white text-xs bg-black/30 px-1 py-1 md:px-2 rounded-full backdrop-blur-sm">
                            {getYearFromDate(member.joinDate)}
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-3 md:p-5 flex flex-col flex-grow">
                        <div className="mb-2 md:mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-sm md:text-lg font-bold">{member.name}</h3>
                            {member.linkedin_url && (
                              <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="flex-shrink-0">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(member.linkedin_url, '_blank');
                                  }}
                                >
                                  <Linkedin className="w-2.5 h-2.5 md:w-3 h-3" />
                                </Button>
                              </motion.div>
                            )}
                          </div>
                          <p className="text-primary font-semibold text-xs md:text-sm">{member.role}</p>
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <MapPin className="w-2 h-2 md:w-3 md:h-3" />
                            {member.location}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 leading-relaxed text-sm line-clamp-2">
                          <span className="font-medium"></span> {member.education || "Not specified"}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                          {member.skills?.slice(0, 2).map((skill: string, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Alumni Section */}
      <section className="w-full py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-muted/20" />
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div className="flex items-center justify-center gap-4 mb-6" whileHover={{ scale: 1.05 }}>
              <Heart className="w-10 h-10 text-muted-foreground" />
              <h2 className="text-4xl md:text-5xl font-bold text-muted-foreground">Our Alumni</h2>
            </motion.div>
            <div className="w-32 h-1 bg-gradient-to-r from-muted-foreground to-muted mx-auto rounded-full" />
            <p className="text-lg text-muted-foreground mt-6 max-w-2xl mx-auto">
              Valued contributors who helped shape our journey and continue to inspire us
            </p>
          </motion.div>

          {/* Alumni Loading/Empty States */}
          {isLoading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-muted-foreground mx-auto"></div>
            </div>
          ) : alumniMembers.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No alumni members to display.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-4 grid-cols-2 md:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto"
            >
              {alumniMembers.map((member, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full overflow-hidden border-0 bg-gradient-to-br from-muted/20 to-muted/10 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-500 opacity-80">
                    <div className="relative h-40 md:h-56 overflow-hidden">
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover bg-white grayscale group-hover:grayscale-0 transition-all duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          loading="lazy"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/10 to-transparent" />

                      {/* Alumni Badge */}
                      <div className="absolute top-2 right-2 md:top-4 md:right-4">
                        <Badge className="bg-muted text-muted-foreground text-xs">Alumni</Badge>
                      </div>

                      {/* Tenure */}
                      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
                        <div className="text-white text-xs bg-black/40 px-1 py-1 md:px-2 rounded-full backdrop-blur-sm">
                          {getYearFromDate(member.joinDate)} -
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-3 md:p-6">
                      <div className="mb-2 md:mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm md:text-xl font-bold mb-1 text-muted-foreground">{member.name}</h3>
                          {member.linkedin_url && (
                            <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="flex-shrink-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(member.linkedin_url, '_blank');
                                }}
                              >
                                <Linkedin className="w-2.5 h-2.5 md:w-3.5 h-3.5" />
                              </Button>
                            </motion.div>
                          )}
                        </div>
                        <p className="text-muted-foreground/80 font-semibold text-xs md:text-sm">{member.role}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground/70">
                          <MapPin className="w-2 h-2 md:w-3 md:h-3" />
                          {member.location}
                        </div>
                      </div>

                      <p className="text-muted-foreground/70 text-xs md:text-sm mt-2">
                        <span className="font-medium"></span> {member.education || "Not specified"}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-anthem-bgLight to-sky-100/10" />
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Join Our Team?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We're always looking for passionate individuals who want to make a difference in the world of AI and
              technology.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white px-8 py-4 text-lg rounded-full shadow-xl"
              >
                View Open Positions
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Team Member Modal */}
      <TeamModal
        member={selectedMember}
        isOpen={open}
        onClose={() => {
          setOpen(false)
          setSelectedMember(null)
        }}
      />
    </div>
  )
}