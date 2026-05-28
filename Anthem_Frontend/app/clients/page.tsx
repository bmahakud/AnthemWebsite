"use client"
import { Footer } from "@/components/Footer";

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ChevronRight, CheckCircle2, Building, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const clientsList = [
  {
    name: "East Coast Railway",
    logo: "/Anthem Assests/client-logo_East-Coast-Railway.png",
    sector: "Government & Transport",
  },
  {
    name: "Orissa High Court",
    logo: "/Anthem Assests/client-logo_ohclogog.png",
    sector: "Judiciary & E-Governance",
  },
  {
    name: "Department of School and Mass Education, Odisha",
    logo: "/Anthem Assests/client-logo_Mass-Education.png",
    sector: "Government & Education",
  },
  {
    name: "Panchayatiraj, Odisha",
    logo: "/Anthem Assests/client-logo_Panchayatiraj.png",
    sector: "Rural Development & Govt",
  },
  {
    name: "Center For Modernizing Government Initiative",
    logo: "/Anthem Assests/client-logo_Modernizing-Government.png",
    sector: "E-Governance Consulting",
  },
  {
    name: "Text Book Bureau, Odisha",
    logo: "/Anthem Assests/client-logo_Text-Book-Bureau.png",
    sector: "Public Sector & Publishing",
  },
  {
    name: "Urban Housing Development Department, Odisha",
    logo: "/Anthem Assests/client-logo_Urban-Housing.png",
    sector: "Government & Urban Dev",
  },
  {
    name: "NRHM, Odisha",
    logo: "/Anthem Assests/client-logo_NRHM-Odisha.png",
    sector: "Public Health & Govt",
  },
  {
    name: "Advocate General, Odisha",
    logo: "/Anthem Assests/client-logo_logo2.jpg",
    sector: "Judiciary & Law",
  },
  {
    name: "Shiksha Vikash Samiti, Odisha",
    logo: "/Anthem Assests/client-logo_ShikshaVikashSamiti.png",
    sector: "Educational Society",
  },
  {
    name: "Intelli Decision, Canada",
    logo: "/Anthem Assests/client-logo_Intelli-Decision.png",
    sector: "International Partner & IT",
  },
  {
    name: "KIIT University",
    logo: "/Anthem Assests/client-logo_KIIT-University.png",
    sector: "Higher Education",
  },
  {
    name: "Naxatra News",
    logo: "/Anthem Assests/client-logo_Naxatra-News.png",
    sector: "Media & Broadcasting",
  },
  {
    name: "College of Pharmaceuticals Sciences, Puri",
    logo: "/Anthem Assests/client-logo_Pharmaceuticals-Sciences.png",
    sector: "Higher Education & Medical",
  },
  {
    name: "Planet Solutions",
    logo: "/Anthem Assests/client-logo_Planet-Solutions.png",
    sector: "IT Consultancies",
  },
  {
    name: "Puri Engineering School",
    logo: "/Anthem Assests/client-logo_Puri-Engineering-School.png",
    sector: "Technical Education",
  },
  {
    name: "Abaduta Sricharan Baba",
    logo: "/Anthem Assests/client-logo_deathbanner.jpg",
    sector: "Trust & Community",
  },
  {
    name: "ARMTECH",
    logo: "/Anthem Assests/images_armtech-logo.jpg",
    sector: "Technology Enterprise",
  },
]

export default function ClientsPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_50%)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/Anthem%20Assests/images_ban-clients.jpg')] bg-cover bg-center" />
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
            <span className="text-primary font-medium">Clients</span>
          </div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent">
                Our Valued Clients
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Anthem Global has built strong, enduring partnerships with diverse clients across public transit, state judiciary, regional ministries, education sectors, and international technology partners.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Bento Grid */}
      <section className="pb-24 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {clientsList.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full border border-border/40 bg-card/60 hover:bg-card/90 hover:border-primary/20 backdrop-blur-md shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group p-4 text-center items-center justify-between">
                  {/* Grayscale to full color transition logo box */}
                  <div className="h-24 w-full flex items-center justify-center p-2 mb-4 bg-muted/20 border border-border/10 rounded-xl">
                    <img
                      src={client.logo}
                      alt={`${client.name} logo`}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="fallback-icon hidden items-center justify-center text-muted-foreground">
                      <Building className="size-8" />
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-sm font-bold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors mb-1.5">
                      {client.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/65 px-2 py-0.5 rounded-full inline-block">
                      {client.sector}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote / Stats bar */}
      <section className="py-16 bg-muted/30 border-t border-border/30">
        <div className="container px-4 md:px-6 mx-auto text-center max-w-4xl">
          <ShieldCheck className="size-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Dedicated to Public & Enterprise Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            By managing high-profile data collections, e-governance infrastructures, and digital point-cloud operations, our team continues to maintain 100% customer satisfaction and dynamic service continuity.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}