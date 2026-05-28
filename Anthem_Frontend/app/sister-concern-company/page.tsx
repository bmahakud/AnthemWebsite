"use client"
import { Footer } from "@/components/Footer";

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronRight, Home, Building2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const sisterOrgs = [
  {
    name: "Anthem India",
    logo: "/Anthem Assests/client-logo_logo.png",
    description: "Core technology division providing advanced engineering solutions, enterprise applications, and IT consultation across the domestic market.",
    focus: "Enterprise Software & IT Consulting",
  },
  {
    name: "Anthem Sai",
    logo: "/Anthem Assests/images_SAI.png",
    description: "Specialized service arm focused on digital transformation, client support infrastructure, and local educational capacity building initiatives.",
    focus: "Digital Transformation & Support",
  },
  {
    name: "Anthem Global Proprietary",
    logo: "/Anthem Assests/images_PROPRIETARY.png",
    description: "Research & Development division managing proprietary products, software licensing frameworks, and international technology partnerships.",
    focus: "IP Management & Product R&D",
  },
  {
    name: "Jagruti & Prasanti",
    logo: "/Anthem Assests/images_JAGRUTI.png",
    description: "Socio-economic empowerment and corporate social responsibility (CSR) wing, facilitating rural development and digital literacy.",
    focus: "Social Responsibility & Empowerment",
  },
  {
    name: "CSI Bhubaneswar Chapter",
    logo: "/Anthem Assests/images_CSI.png",
    description: "Strategic collaboration and technical association promoting computer science research, professional networking, and student conventions.",
    focus: "CS Research & Professional Network",
  },
]

export default function SisterOrganizationsPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Parallax/Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08),transparent_50%)]">
        {/* Banner image background with glass overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/Anthem%20Assests/images_ban-Sisterconcernedcompany.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="size-3.5" /> Home
            </Link>
            <ChevronRight className="size-3.5 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Who We Are</span>
            <ChevronRight className="size-3.5 text-muted-foreground/50" />
            <span className="text-primary font-medium">Sister Organizations</span>
          </div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent">
                Sister Organizations
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Anthem Global operates in collaboration with strategic sister concerns and technical chapters to build a comprehensive ecosystem of innovation, digital enablement, and professional growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="pb-24 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sisterOrgs.map((org, index) => (
              <motion.div
                key={org.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="h-full border border-border/40 bg-card/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Logo area */}
                    <div className="h-20 flex items-center justify-start mb-6">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-muted/20 border border-border/10 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={org.logo}
                          alt={`${org.name} logo`}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            // Fallback to building icon if image fails
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="fallback-icon hidden items-center justify-center text-primary">
                          <Building2 className="size-8" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {org.name}
                    </h3>
                    <div className="inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4 self-start">
                      {org.focus}
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed flex-1">
                      {org.description}
                    </p>
                  </div>
                  
                  <div className="p-6 pt-0 border-t border-border/10 bg-muted/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">Collaborative Network</span>
                    <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-muted/30 border-t border-border/30">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Interested in Partnering with Us?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Discover how our global network of companies and engineering teams can accelerate your business objectives.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button variant="anthem" className="rounded-full shadow-lg px-6 py-5">
                Contact Our Representative <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}