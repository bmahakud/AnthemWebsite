"use client"
import { Footer } from "@/components/Footer";;
import { API_URL } from "@/lib/config";
import { CardContent } from "@/components/ui/card";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {
  Code,
  Brain,
  Smartphone,
  BarChart,
  Blocks,
  Database,
  Server,
  GraduationCap,
  ShoppingCart,
  Globe,
  X,
  ExternalLink,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Star,
  Search,
  Clock,
  Users,
  CheckCircle,
  Play,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";


// API URL - make sure this matches your backend
// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Types
interface Project {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  gallery: string[];
  icon: string;
  category: string;
  technologies: string[];
  color: string;
  stats: Record<string, string>;
  details: string;
  challenges: string[];
  outcomes: string[];
  timeline: string;
  team: string;
  client: string;
  created_at?: string;
  liveUrl?: string;
  videoUrl?: string;
  status: "completed" | "ongoing" | "planned";
  featured?: boolean;
  testimonial_name?: string;
  testimonial_role?: string;
  testimonial_image?: string;
  testimonial_quote?: string;
  testimonial_rating?: number;
  sortOrder?: number;
}

interface ProjectTestimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const projectsRef = useRef<HTMLDivElement>(null);
  // Lightbox state
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const lbTouchStartX = useRef<number | null>(null);
  const lbTouchStartY = useRef<number | null>(null);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxImage(images[index]);
  };

  const lbCurrentIndex = lightboxImages.indexOf(lightboxImage || "");

  const lbPrev = () => {
    if (!lightboxImages.length) return;
    const idx = (lbCurrentIndex - 1 + lightboxImages.length) % lightboxImages.length;
    setLightboxImage(lightboxImages[idx]);
  };

  const lbNext = () => {
    if (!lightboxImages.length) return;
    const idx = (lbCurrentIndex + 1) % lightboxImages.length;
    setLightboxImage(lightboxImages[idx]);
  };

  const lbTouchStart = (e: React.TouchEvent) => {
    lbTouchStartX.current = e.touches[0].clientX;
    lbTouchStartY.current = e.touches[0].clientY;
  };

  const lbTouchEnd = (e: React.TouchEvent) => {
    if (lbTouchStartX.current === null || lbTouchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - lbTouchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - lbTouchStartY.current);
    if (Math.abs(dx) > 50 && dy < 80) {
      dx < 0 ? lbNext() : lbPrev();
    }
    lbTouchStartX.current = null;
    lbTouchStartY.current = null;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/api/projects/`);

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }

        const data = (await response.json()) as Project[];

        // Sort projects by sortOrder first (lower numbers first), then by created_at
        const sortedProjects = [...data].sort((a, b) => {
          // First sort by sortOrder if available
          const sortOrderA = a.sortOrder ?? 9999; // Default to high number if undefined
          const sortOrderB = b.sortOrder ?? 9999;

          if (sortOrderA !== sortOrderB) {
            return sortOrderA - sortOrderB; // Ascending order (lower numbers first)
          }

          // If sortOrder is the same, sort by created_at (newest first)
          const aTime = new Date(a.created_at ?? 0).getTime();
          const bTime = new Date(b.created_at ?? 0).getTime();
          return bTime - aTime; // Descending (newest first)
        });

        setProjects(sortedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

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


  const openProject = (project: Project) => {
    setSelectedProject(project);
  };

  const categories = [
    { id: "all", label: "All Projects", icon: <Sparkles className="size-4" /> },
    {
      id: "mobile",
      label: "Mobile Apps",
      icon: <Smartphone className="size-4" />,
    },
    { id: "fintech", label: "FinTech", icon: <BarChart className="size-4" /> },
    { id: "saas", label: "SaaS", icon: <Database className="size-4" /> },
    {
      id: "edtech",
      label: "EdTech",
      icon: <GraduationCap className="size-4" />,
    },
    { id: "ai", label: "AI/ML", icon: <Brain className="size-4" /> },
    {
      id: "blockchain",
      label: "Blockchain",
      icon: <Blocks className="size-4" />,
    },
    { id: "devops", label: "DevOps", icon: <Server className="size-4" /> },
    {
      id: "ecommerce",
      label: "E-Commerce",
      icon: <ShoppingCart className="size-4" />,
    },
    { id: "govtech", label: "GovTech", icon: <Globe className="size-4" /> },
    {
      id: "enterprise",
      label: "Enterprise",
      icon: <Code className="size-4" />,
    },
  ];

  // Filter projects based on category and search query
  const getFilteredProjects = () => {
    let filtered = projects;

    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(
        (project) =>
          (project.category || "")
            .split(",")
            .map((c: string) => c.trim())
            .includes(activeCategory)
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.shortDescription.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(query)
          )
      );
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  // Load more projects
  const loadMoreProjects = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleProjects((prev) => Math.min(prev + 3, filteredProjects.length));
      setIsLoading(false);
    }, 800);
  };

  // Scroll to projects section
  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Reset filters
  const resetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
  };

  // Get testimonial for a project - dynamic from project data
  const getProjectTestimonial = (
    project: Project
  ): ProjectTestimonial | null => {
    if (project.testimonial_name && project.testimonial_quote) {
      return {
        name: project.testimonial_name,
        role: project.testimonial_role || "",
        image: project.testimonial_image || "/placeholder.svg",
        quote: project.testimonial_quote,
        rating: project.testimonial_rating || 5,
      };
    }
    return null;
  };

  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      Code: <Code className="size-6" />,
      Brain: <Brain className="size-6" />,
      Smartphone: <Smartphone className="size-6" />,
      BarChart: <BarChart className="size-6" />,
      Blocks: <Blocks className="size-6" />,
      Database: <Database className="size-6" />,
      Server: <Server className="size-6" />,
      GraduationCap: <GraduationCap className="size-6" />,
      ShoppingCart: <ShoppingCart className="size-6" />,
      Globe: <Globe className="size-6" />,
    };
    return iconMap[iconName] || <Code className="size-6" />;
  };

  // Get image URL - handles both full URLs and relative paths
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "/placeholder.jpg";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("/")) return imagePath;
    return `${API_URL}${imagePath}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };
  const uniqueClients = new Set(
    projects
      .map(project => project.client?.trim())
      .filter(client => client && client !== "")
  ).size;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Hero Section - Fixed without parallax */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-anthem-bgLight to-sky-100/10">
        {/* Static Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-anthem-lightBlue/10 rounded-full blur-3xl animate-pulse delay-2000" />
          </div>
        </div>

        <div className="container px-4 md:px-6 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Sparkles className="size-4" />
              Our Portfolio
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Transforming Ideas into
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
              >
                Digital Reality
              </motion.span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-2">
              Explore our portfolio of innovative solutions that drive business
              growth and digital transformation
            </p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8 md:mb-12"
            >
              {[
                { label: "Projects Completed", value: `${projects.length}+` },
                { label: "Happy Clients", value: `${uniqueClients}+` },
                { label: "Team Members", value: `${teammember}` },
                { label: "Years Experience", value: "4+" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="rounded-full px-8 py-6 text-base"
              >
                Explore Our Projects
                <ChevronRight className="ml-2 size-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
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

      {/* Projects Section */}
      <section ref={projectsRef} className="w-full py-20 bg-background">
        <div className="container px-4 md:px-6">
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Our Projects
              </h2>
              <p className="text-muted-foreground max-w-2xl">
                Discover our portfolio of innovative solutions across various
                industries and technologies
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64 rounded-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12"
          >
            <Tabs
              defaultValue="all"
              value={activeCategory}
              onValueChange={setActiveCategory}
            >
              <TabsList className="flex flex-wrap gap-1.5 h-auto bg-transparent">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.icon}
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects
                .slice(0, visibleProjects)
                .map((project, idx) => {
                  const testimonial = getProjectTestimonial(project);

                  return (
                    <motion.div
                      key={project.id}
                      layout
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="group relative h-full flex flex-col"
                    >
                      <Card className="h-full flex flex-col overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/20 backdrop-blur transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                        {/* Project Image */}
                        <div className="relative h-56 overflow-hidden flex-shrink-0">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-90 transition-opacity duration-500`}
                          />
                          <img
                            src={
                              project.image?.startsWith("http")
                                ? project.image
                                : project.image
                                  ? `${API_URL}${project.image}`
                                  : "/placeholder.jpg"
                            }
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/placeholder.jpg";
                            }}
                          />

                          {/* Category Badges */}
                          <div className="absolute top-4 left-4 flex flex-wrap gap-1 max-w-[70%]">
                            {(project.category || "").split(",").map((c: string) => c.trim()).filter(Boolean).slice(0, 2).map((cat: string) => {
                              const catLabel = categories.find(c => c.id === cat)?.label || (cat.charAt(0).toUpperCase() + cat.slice(1));
                              return (
                                <span
                                  key={cat}
                                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${project.color} text-white shadow-sm`}
                                >
                                  {catLabel}
                                </span>
                              );
                            })}
                            {(project.category || "").split(",").filter(Boolean).length > 2 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-black/50 text-white">
                                +{(project.category || "").split(",").filter(Boolean).length - 2}
                              </span>
                            )}
                          </div>

                          {/* Quick Stats */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100"
                          >
                            <div className="flex justify-between text-white">
                              <div className="flex items-center gap-2">
                                <Clock className="size-4" />
                                <span className="text-sm">
                                  {project.timeline}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="size-4" />
                                <span className="text-sm">
                                  {project.team.split(",")[0]}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </div>

                        {/* Project Content */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors truncate" title={project.title}>
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {project.shortDescription}
                          </p>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-2 mb-4 items-center">
                            {project.technologies
                              .slice(0, 3)
                              .map((tech, idx) => (
                                <motion.span
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            {project.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-md">
                                +{project.technologies.length - 3} more
                              </span>
                            )}
                          </div>

                          {/* Testimonial Preview - Dynamic */}
                          {testimonial && (
                            <div className="mb-4 p-3 bg-muted/30 rounded-lg border border-border/30">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="flex">
                                  {[...Array(testimonial.rating)].map(
                                    (_, i) => (
                                      <Star
                                        key={i}
                                        className="size-3 fill-primary text-primary"
                                      />
                                    )
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  Client Testimonial
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground italic line-clamp-2">
                                "{testimonial.quote.substring(0, 100)}..."
                              </p>
                            </div>
                          )}

                          {/* Action Button */}
                          <Link href={`/projects/${project.id}`} className="w-full mt-auto">
                            <Button
                              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                            >
                              View Project Details
                              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {visibleProjects < filteredProjects.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={loadMoreProjects}
                disabled={isLoading}
                className="rounded-full px-8"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                    Loading...
                  </div>
                ) : (
                  <>
                    Load More Projects
                    <ChevronRight className="ml-2 size-4" />
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {/* No Results Message */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                <Search className="size-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any projects matching your current filters.
              </p>
              <Button variant="outline" onClick={resetFilters}>
                Reset Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 size-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="size-5" />
              </button>

              {/* Modal Content */}
              <div className="relative">
                {/* Header Image */}
                <div className="relative h-64 md:h-80 overflow-hidden rounded-t-2xl">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-90`}
                  />
                  <img
                    src={
                      selectedProject.image?.startsWith("http")
                        ? selectedProject.image
                        : selectedProject.image
                          ? `${API_URL}${selectedProject.image}`
                          : "/placeholder.jpg"
                    }
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder.jpg";
                    }}
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="size-12 rounded-full bg-white/90 flex items-center justify-center text-primary">
                        {getIconComponent(selectedProject.icon)}
                      </div>
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                        {
                          categories.find(
                            (c) => c.id === selectedProject.category
                          )?.label
                        }
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-white/90 text-lg">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Project Tabs */}
                  <Tabs defaultValue="overview" className="mb-8">
                    <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 mb-6">
                      <TabsTrigger
                        value="overview"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                      >
                        Overview
                      </TabsTrigger>
                      <TabsTrigger
                        value="gallery"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                      >
                        Gallery
                      </TabsTrigger>
                      <TabsTrigger
                        value="testimonial"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                      >
                        Client Testimonial
                      </TabsTrigger>
                      <TabsTrigger
                        value="video"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                      >
                        Video
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <div className="md:col-span-2">
                          {/* Project Details */}
                          <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4">
                              Project Overview
                            </h3>
                            <div className="prose prose-blue max-w-none text-muted-foreground">
                              {selectedProject.details
                                .split("\n\n")
                                .map((paragraph, idx) => (
                                  <p key={idx}>{paragraph}</p>
                                ))}
                            </div>
                          </div>

                          {/* Challenges & Outcomes */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div>
                              <h3 className="text-xl font-bold mb-4">
                                Challenges
                              </h3>
                              <ul className="space-y-3">
                                {selectedProject.challenges.map(
                                  (challenge, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-3 text-muted-foreground"
                                    >
                                      <CheckCircle className="size-5 text-primary flex-shrink-0 mt-0.5" />
                                      <span>{challenge}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold mb-4">
                                Outcomes
                              </h3>
                              <ul className="space-y-3">
                                {selectedProject.outcomes.map(
                                  (outcome, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-3 text-muted-foreground"
                                    >
                                      <CheckCircle className="size-5 text-primary flex-shrink-0 mt-0.5" />
                                      <span>{outcome}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>

                          {/* Technologies */}
                          <div className="mb-8">
                            <h3 className="text-xl font-bold mb-4">
                              Technologies Used
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.technologies.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Project Info Sidebar */}
                        <div>
                          <Card className="bg-muted/30 border-border/40">
                            <CardContent className="p-6">
                              <h3 className="text-lg font-bold mb-4">
                                Project Information
                              </h3>

                              <div className="space-y-4">
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    Client
                                  </h4>
                                  <p className="font-medium">
                                    {selectedProject.client}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    Timeline
                                  </h4>
                                  <p className="font-medium">
                                    {selectedProject.timeline}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    Team
                                  </h4>
                                  <p className="font-medium">
                                    {selectedProject.team}
                                  </p>
                                </div>

                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground mb-1">
                                    Category
                                  </h4>
                                  <p className="font-medium">
                                    {
                                      categories.find(
                                        (c) => c.id === selectedProject.category
                                      )?.label
                                    }
                                  </p>
                                </div>
                              </div>

                              <div className="border-t border-border/40 my-6"></div>

                              {/* Project Stats */}
                              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                                Key Metrics
                              </h4>
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                {selectedProject.stats?.stat1 && (
                                  <div className="text-center p-3 bg-background rounded-lg">
                                    <div className="text-xl font-bold text-primary">
                                      {selectedProject.stats.stat1}
                                    </div>
                                    <div className="text-xs text-muted-foreground capitalize">
                                      {selectedProject.stats.stat1_label ||
                                        "users"}
                                    </div>
                                  </div>
                                )}
                                {selectedProject.stats?.stat2 && (
                                  <div className="text-center p-3 bg-background rounded-lg">
                                    <div className="text-xl font-bold text-primary">
                                      {selectedProject.stats.stat2}
                                    </div>
                                    <div className="text-xs text-muted-foreground capitalize">
                                      {selectedProject.stats.stat2_label ||
                                        "rating"}
                                    </div>
                                  </div>
                                )}
                                {selectedProject.stats?.stat3 && (
                                  <div className="text-center p-3 bg-background rounded-lg">
                                    <div className="text-xl font-bold text-primary">
                                      {selectedProject.stats.stat3}
                                    </div>
                                    <div className="text-xs text-muted-foreground capitalize">
                                      {selectedProject.stats.stat3_label ||
                                        "downloads"}
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Actions */}
                              <div className="space-y-3">
                                <Button
                                  className="w-full gap-2"
                                  onClick={() => {
                                    if (selectedProject.liveUrl) {
                                      window.open(
                                        selectedProject.liveUrl,
                                        "_blank"
                                      );
                                    } else {
                                      alert("Project link not available");
                                    }
                                  }}
                                >
                                  <ExternalLink className="size-4" />
                                  View Live Project
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="gallery" className="mt-0">
                      <h3 className="text-xl font-bold mb-6">Project Gallery</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedProject.gallery.map((image, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="relative overflow-hidden rounded-lg aspect-video cursor-pointer group"
                            onClick={() => openLightbox(selectedProject.gallery.map(g => getImageUrl(g)), idx)}
                          >
                            <img
                              src={getImageUrl(image)}
                              alt={`${selectedProject.title} - Gallery image ${idx + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/placeholder.jpg";
                              }}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <ZoomIn className="text-white size-8 drop-shadow-lg" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="testimonial" className="mt-0">
                      {getProjectTestimonial(selectedProject) ? (
                        <div>
                          <h3 className="text-xl font-bold mb-6">
                            Client Testimonial
                          </h3>
                          <Card className="bg-muted/30 border-border/40">
                            <CardContent className="p-6">
                              <div className="flex items-center gap-4 mb-6">
                                <div className="size-16 rounded-full overflow-hidden">
                                  <img
                                    src={getImageUrl(
                                      getProjectTestimonial(selectedProject)!.image
                                    )}
                                    alt={
                                      getProjectTestimonial(selectedProject)!.name
                                    }
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      e.currentTarget.onerror = null;
                                      e.currentTarget.src = "/default-avatar.png";
                                    }}
                                  />
                                </div>
                                <div>
                                  <h4 className="font-bold">
                                    {
                                      getProjectTestimonial(selectedProject)!
                                        .name
                                    }
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {
                                      getProjectTestimonial(selectedProject)!
                                        .role
                                    }
                                  </p>
                                  <div className="flex mt-1">
                                    {[
                                      ...Array(
                                        getProjectTestimonial(selectedProject)!
                                          .rating
                                      ),
                                    ].map((_, i) => (
                                      <Star
                                        key={i}
                                        className="size-4 fill-primary text-primary"
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <blockquote className="text-lg italic text-muted-foreground">
                                "{getProjectTestimonial(selectedProject)!.quote}
                                "
                              </blockquote>
                            </CardContent>
                          </Card>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                            <Star className="size-8 text-muted-foreground" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            No testimonial available
                          </h3>
                          <p className="text-muted-foreground">
                            We don't have a client testimonial for this project
                            yet.
                          </p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="video" className="mt-0">
                      <h3 className="text-xl font-bold mb-6">Project Video</h3>

                      {selectedProject.videoUrl ? (
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                          {/* Video Player */}
                          {selectedProject.videoUrl.includes("youtube") ||
                            selectedProject.videoUrl.includes("youtu.be") ? (
                            <iframe
                              src={selectedProject.videoUrl
                                .replace("watch?v=", "embed/")
                                .replace("youtu.be/", "youtube.com/embed/")}
                              title={`${selectedProject.title} - Project Video`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : selectedProject.videoUrl.includes("vimeo") ? (
                            <iframe
                              src={selectedProject.videoUrl.replace(
                                "vimeo.com/",
                                "player.vimeo.com/video/"
                              )}
                              title={`${selectedProject.title} - Project Video`}
                              className="w-full h-full"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900">
                              <div className="text-center text-white">
                                <Play className="size-16 mx-auto mb-4" />
                                <p className="text-lg font-semibold">
                                  Video Preview
                                </p>
                                <p className="text-sm text-gray-300 mt-2">
                                  <a
                                    href={selectedProject.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:text-blue-300 underline"
                                  >
                                    Click to view video
                                  </a>
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="size-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                            <Play className="size-8 text-muted-foreground" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">
                            No video available
                          </h3>
                          <p className="text-muted-foreground">
                            We don't have a video for this project yet.
                          </p>
                        </div>
                      )}

                      <p className="text-sm text-muted-foreground mt-4">
                        {selectedProject.videoUrl
                          ? `This video showcases the key features and functionality of the ${selectedProject.title} project.`
                          : "Check back later for video content about this project."}
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Projects Gallery Lightbox ---- */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[60] flex flex-col items-center justify-center backdrop-blur-md"
          >
            <TransformWrapper
              key={lightboxImage}
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
                    if (state.scale === 1) lbTouchStart(e);
                  }}
                  onTouchEnd={(e) => {
                    if (state.scale === 1) lbTouchEnd(e);
                  }}
                >
                  {/* Close */}
                  <button
                    onClick={() => setLightboxImage(null)}
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

                  {/* Counter */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
                    <span className="text-white/60 text-xs bg-black/40 px-3 py-1 rounded-full">
                      {lbCurrentIndex + 1} / {lightboxImages.length}
                    </span>
                  </div>

                  {/* Image area */}
                  <div
                    className="relative flex items-center justify-center w-full px-4"
                    style={{ height: "calc(100vh - 130px)" }}
                    onClick={() => state.scale === 1 && setLightboxImage(null)}
                  >
                    <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img
                        src={lightboxImage}
                        alt="Gallery"
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl select-none"
                        style={{ touchAction: "none" }}
                        onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }}
                      />
                    </TransformComponent>
                  </div>

                  {/* Bottom controls */}
                  <div className="w-full flex flex-col items-center gap-3 pb-4 px-6">
                    {lightboxImages.length > 1 && (
                      <div className="flex items-center gap-1.5">
                        {lightboxImages.map((_, i) => (
                          <button key={i}
                            onClick={(e) => { e.stopPropagation(); setLightboxImage(lightboxImages[i]); }}
                            className={`rounded-full transition-all ${i === lbCurrentIndex ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/30 hover:bg-white/60"
                              }`}
                          />
                        ))}
                      </div>
                    )}
                    {lightboxImages.length > 1 && (
                      <div className="flex items-center gap-6">
                        <button onClick={(e) => { e.stopPropagation(); lbPrev(); }}
                          className="bg-black/50 hover:bg-black/80 active:scale-95 border border-white/20 text-white rounded-full px-6 py-3 transition-all shadow-xl flex items-center gap-2 text-sm font-medium z-[70]">
                          <ChevronLeft className="size-5" />
                          <span className="hidden sm:inline">Prev</span>
                        </button>
                        <span className="text-white/40 text-xs">Swipe or tap arrows</span>
                        <button onClick={(e) => { e.stopPropagation(); lbNext(); }}
                          className="bg-black/50 hover:bg-black/80 active:scale-95 border border-white/20 text-white rounded-full px-6 py-3 transition-all shadow-xl flex items-center gap-2 text-sm font-medium z-[70]">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}