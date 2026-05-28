"use client"
import { Footer } from "@/components/Footer";

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ChevronRight, Target, Eye, ShieldCheck, HeartHandshake, Compass } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const visionPoints = [
  "Services to every human being through our innovation.",
  "Responsible, Ethical & Professional towards the stakeholders.",
  "To maintain Dedication, Integrity and Honesty towards our valuable clients.",
  "To make our presence felt all over the world.",
  "To maximize value for our customers.",
  "To be recognized globally for Products, Services & Cost Competitiveness."
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function MissionVisionPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_50%)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/Anthem%20Assests/images_ban-mission-vision.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        
        {/* Glow Spheres */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-anthem-lightBlue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="size-3.5" /> Home
            </Link>
            <ChevronRight className="size-3.5 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Who We Are</span>
            <ChevronRight className="size-3.5 text-muted-foreground/50" />
            <span className="text-primary font-medium">Mission & Vision</span>
          </div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent">
                Mission & Vision
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                The core pillars of our company guide our decisions, inspire our technological innovation, and define our commitment to our stakeholders and global clients.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="pb-24 relative">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* Vision Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border border-border/40 bg-card/65 backdrop-blur-md shadow-lg overflow-hidden h-full">
                <div className="relative h-3 bg-gradient-to-r from-blue-500 to-cyan-500" />
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
                      <Eye className="size-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Vision</h2>
                  </div>

                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    {visionPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex gap-3.5 items-start p-3 bg-muted/20 border border-border/10 rounded-xl hover:bg-muted/40 hover:border-blue-500/20 transition-all duration-300"
                      >
                        <div className="size-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-semibold text-xs shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mission Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border border-border/40 bg-card/65 backdrop-blur-md shadow-lg overflow-hidden h-full">
                <div className="relative h-3 bg-gradient-to-r from-anthem-blue to-anthem-lightBlue" />
                <CardContent className="p-8 flex flex-col gap-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="size-12 rounded-xl bg-anthem-blue/10 border border-anthem-blue/20 flex items-center justify-center text-anthem-blue">
                      <Target className="size-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Our Mission</h2>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-justify">
                    At Anthem Global, our mission is to design, develop, and deliver high-fidelity digital solutions that solve real-world problems. We strive to merge techno-commercial expertise in Custom Software, GIS & LiDAR, and Document Processing with clean execution strategies that exceed client expectations.
                  </p>

                  <div className="space-y-4 mt-2">
                    <div className="flex items-start gap-4 p-4 rounded-xl border border-border/10 bg-muted/25">
                      <ShieldCheck className="size-6 text-anthem-blue shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-foreground block text-sm mb-0.5">Absolute Compliance</span>
                        <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          We execute all domestic and international assignments under strict regulatory compliance and the highest quality standards.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl border border-border/10 bg-muted/25">
                      <HeartHandshake className="size-6 text-anthem-blue shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-foreground block text-sm mb-0.5">Values-Driven Delivery</span>
                        <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          We believe that integrity, honesty, and responsible stewardship are the foundation of any lasting business partnership.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-xl border border-border/10 bg-muted/25">
                      <Compass className="size-6 text-anthem-blue shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-foreground block text-sm mb-0.5">Global Incubation</span>
                        <span className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                          Fostering local entrepreneurship, technical training, and dynamic youth employment to secure a robust future.
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}