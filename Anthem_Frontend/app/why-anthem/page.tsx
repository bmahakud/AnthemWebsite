"use client"
import { Footer } from "@/components/Footer";

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ChevronRight, CheckCircle2, Clock, Zap, Target, Sliders, ShieldCheck, Compass, HeartHandshake, Layers } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const advantages = [
  {
    title: "Competitive Pricing",
    description: "Offering premium quality tech and GIS services with excellent cost-competitiveness to maximize business ROI.",
    icon: <Zap className="size-6 text-primary" />,
  },
  {
    title: "Fast Turnaround Time",
    description: "Streamlined operational workflows and dedicated engineering squads ensure rapid deployment and timely project deliveries.",
    icon: <Clock className="size-6 text-primary" />,
  },
  {
    title: "Right Mission and Vision",
    description: "Guided by strong principles centered around absolute dedication, stakeholder integrity, and social empowerment.",
    icon: <Compass className="size-6 text-primary" />,
  },
  {
    title: "Reusable Methodology",
    description: "Leveraging structured software frameworks and proven operational protocols to minimize overhead and build modular systems.",
    icon: <Layers className="size-6 text-primary" />,
  },
  {
    title: "High Quality Solutions",
    description: "Rigorous quality compliance checking protocols and modern tech stacks deliver bulletproof, future-ready results.",
    icon: <ShieldCheck className="size-6 text-primary" />,
  },
  {
    title: "Flexible Solutions",
    description: "Dynamic development models that seamlessly scale and adapt to client requirements, changes, and constraints.",
    icon: <Sliders className="size-6 text-primary" />,
  },
  {
    title: "Reliable Technologies & Tools",
    description: "Utilizing highly secure enterprise tools, CISCO net configurations, and reliable GIS classified point systems.",
    icon: <Target className="size-6 text-primary" />,
  },
  {
    title: "Complete Customer Satisfaction",
    description: "Maintaining a client-centric environment where long-term customer partnerships and trust are our ultimate standard.",
    icon: <HeartHandshake className="size-6 text-primary" />,
  },
  {
    title: "Choice of Delivery Models",
    description: "Providing versatile Software Delivery Models (SDMs) custom-tailored to local, national, and international frameworks.",
    icon: <CheckCircle2 className="size-6 text-primary" />,
  },
]

export default function WhyAnthemPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/Anthem%20Assests/images_ban-whyanthem.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        
        {/* Decorative Glowing Elements */}
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
            <span className="text-primary font-medium">Why Anthem Global</span>
          </div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent">
                Why Anthem Global
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                We combine industry-leading delivery methods, dynamic skill competencies, and deep commitment to quality to help our clients automate, innovate, and thrive.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="pb-24 relative">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((adv, index) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full border border-border/40 bg-card/65 backdrop-blur-md shadow hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden flex flex-col group p-6">
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    {adv.icon}
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {adv.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {adv.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}