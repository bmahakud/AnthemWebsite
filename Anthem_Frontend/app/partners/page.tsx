"use client"
import { Footer } from "@/components/Footer";

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ChevronRight, Handshake, ShieldAlert, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const partnersList = [
  {
    name: "CISCO",
    logo: "/Anthem Assests/images_cisco.jpg",
    type: "Network & Core Systems",
  },
  {
    name: "CONVRGD",
    logo: "/Anthem Assests/images_convrgd.jpg",
    type: "Converged Solutions",
  },
  {
    name: "EdgeAccess",
    logo: "/Anthem Assests/images_edge.jpg",
    type: "Broadband & Infrastructure",
  },
  {
    name: "ALTAI",
    logo: "/Anthem Assests/images_altai.jpg",
    type: "Wireless & Wireless Mesh",
  },
  {
    name: "ISL",
    logo: "/Anthem Assests/images_2-idcol.jpg",
    type: "Infrastructure & Licensing",
  },
  {
    name: "TCS iON",
    logo: "/Anthem Assests/images_ionlogo.jpg",
    type: "Digital Assessments & Prep",
  },
  {
    name: "Technopark",
    logo: "/Anthem Assests/images_5-technopark.jpg",
    type: "Technology Hub & Incubation",
  },
  {
    name: "Sagitaur",
    logo: "/Anthem Assests/images_4-sdagitour.jpg",
    type: "Solar & Infrastructure",
  },
  {
    name: "Manvish",
    logo: "/Anthem Assests/images_3-manvish.jpg",
    type: "Hardware & Mobility Systems",
  },
  {
    name: "HTBASA",
    logo: "/Anthem Assests/images_htbasa.png",
    type: "Technological Alliance",
  },
  {
    name: "State Pollution Control Board, Odisha",
    logo: "/Anthem Assests/images_LogoSPCB.png",
    type: "Environmental & Govt Standards",
  },
  {
    name: "Webel",
    logo: "/Anthem Assests/images_webel_oppurtunities.jpg",
    type: "Industrial & State Promotion",
  },
]

export default function PartnersPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/Anthem%20Assests/images_ban-partners.jpg')] bg-cover bg-center" />
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
            <span className="text-primary font-medium">Partners</span>
          </div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent">
                Strategic Partnerships
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                We work in collaboration with world-class hardware providers, industrial promoters, digital test operators, and government wings to deliver robust and verified infrastructures.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="pb-24 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
            {partnersList.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full border border-border/40 bg-card/65 hover:bg-card/95 hover:border-primary/20 backdrop-blur-md shadow hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group p-4 text-center items-center justify-between">
                  
                  {/* Grayscale to full color transition logo box */}
                  <div className="h-24 w-full flex items-center justify-center p-2 mb-4 bg-muted/20 border border-border/10 rounded-xl">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div className="fallback-icon hidden items-center justify-center text-muted-foreground">
                      <Handshake className="size-8" />
                    </div>
                  </div>

                  <div className="w-full">
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-1.5 truncate">
                      {partner.name}
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground bg-muted/65 px-2.5 py-0.5 rounded-full inline-block">
                      {partner.type}
                    </span>
                  </div>

                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Callout */}
      <section className="py-16 bg-muted/30 border-t border-border/30">
        <div className="container px-4 md:px-6 mx-auto text-center max-w-4xl">
          <Award className="size-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Empowering Industry Alignments</h2>
          <p className="text-muted-foreground leading-relaxed">
            From deploying CISCO network architectures to operating the TCS iON PrepTest platforms and collaborating with state bodies like Webel and the Pollution Control Board, Anthem Global is committed to robust quality compliance and mutual technical growth.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  )
}