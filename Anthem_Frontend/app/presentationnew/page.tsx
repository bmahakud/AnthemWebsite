"use client"
import { Footer } from "@/components/Footer";

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ChevronRight, Download, FileText, Play, ShieldAlert, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const presentationsList = [
  {
    title: "Trends In IT",
    filename: "Presentation_page_2_Presentation_TrendsInIT_1stMarch2014.ppt",
    path: "/Anthem Assests/Presentation_page_2_Presentation_TrendsInIT_1stMarch2014.ppt",
    size: "11.4 MB",
    description: "Analysis of technology advancements, digital growth patterns, and evolving software consulting landscapes.",
    tags: ["Tech Trends", "IT Strategy"],
  },
  {
    title: "Make In India",
    filename: "Presentation_page_Final_MakeInIndia.ppt",
    path: "/Anthem Assests/Presentation_page_Final_MakeInIndia.ppt",
    size: "2.7 MB",
    description: "Strategic outline demonstrating domestic IT delivery capabilities, manufacturing support, and growth frameworks.",
    tags: ["National Policy", "IT Delivery"],
  },
  {
    title: "Judicial System",
    filename: "Presentation_page_Judicialsystem1.ppt",
    path: "/Anthem Assests/Presentation_page_Judicialsystem1.ppt",
    size: "3.5 MB",
    description: "Detailed system architecture and implementation blueprint for the E-governance project of the Indian Judicial System.",
    tags: ["E-Governance", "Case Management"],
  },
  {
    title: "Sagitaur Group",
    filename: "Presentation_page_Sagitaur_Group_-_Karnataka_Solar_Park-Chief_Minister_06-09-2012.pptx",
    path: "/Anthem Assests/Presentation_page_Sagitaur_Group_-_Karnataka_Solar_Park-Chief_Minister_06-09-2012.pptx",
    size: "2.6 MB",
    description: "Presentation regarding solar power infrastructure, GIS corridor mapping, and solar park engineering plans.",
    tags: ["Solar Power", "GIS Corridor"],
  },
  {
    title: "STPI Advantages",
    filename: "Presentation_page_STPI_Advantages.ppt",
    path: "/Anthem Assests/Presentation_page_STPI_Advantages.ppt",
    size: "81.5 KB",
    description: "Benefits of Software Technology Parks of India (STPI) scheme, tax incentives, and regulatory support for export.",
    tags: ["STPI Scheme", "Software Export"],
  },
  {
    title: "STPI Presentation for OCAC",
    filename: "Presentation_page_STPI_Presentation_for_OCAC-CATALYST.ppt",
    path: "/Anthem Assests/Presentation_page_STPI_Presentation_for_OCAC-CATALYST.ppt",
    size: "2.2 MB",
    description: "Collaborative proposal presenting STPI benefits and operational alignments for the Odisha Computer Application Centre.",
    tags: ["Institutional Proposal", "Odisha ICT"],
  },
]

export default function PresentationsPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.08),transparent_50%)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/Anthem%20Assests/images_ban-presentation.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        
        {/* Glow Spheres */}
        <div className="absolute top-1/4 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-anthem-lightBlue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="size-3.5" /> Home
            </Link>
            <ChevronRight className="size-3.5 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Who We Are</span>
            <ChevronRight className="size-3.5 text-muted-foreground/50" />
            <span className="text-primary font-medium">Presentations</span>
          </div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent">
                Presentations & Proposals
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Explore our corporate presentation slide decks outlining technology trends, STPI schemes, major e-governance case studies (such as the Supreme Court Judicial System), and infrastructure proposals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Presentations Grid */}
      <section className="pb-24 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {presentationsList.map((ppt, index) => (
              <motion.div
                key={ppt.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                <Card className="h-full border border-border/40 bg-card/50 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
                  <div className="p-6 flex-1 flex flex-col">
                    
                    {/* PPT File Header Icon Area */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="size-12 rounded-xl bg-anthem-blue/10 border border-anthem-blue/20 flex items-center justify-center text-anthem-blue group-hover:scale-105 transition-transform duration-300">
                        <FileText className="size-6" />
                      </div>
                      <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                        {ppt.size}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {ppt.title}
                    </h3>
                    
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                      {ppt.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {ppt.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-primary/5 text-muted-foreground px-2 py-0.5 rounded border border-primary/10">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="p-6 pt-0 border-t border-border/10 bg-muted/10 flex items-center gap-3">
                    <a
                      href={ppt.path}
                      download={ppt.filename}
                      className="w-full"
                    >
                      <Button variant="anthem" className="w-full rounded-lg shadow flex items-center justify-center gap-2">
                        <Download className="size-4" /> Download PPT
                      </Button>
                    </a>
                  </div>

                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Callout banner */}
      <section className="py-16 bg-muted/30 border-t border-border/30">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-6 items-center bg-card/60 backdrop-blur-md p-6 rounded-2xl border border-border/40 shadow-md">
            <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <CheckCircle className="size-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-foreground mb-1">Corporate Archives</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These slide presentations represent verified corporate files scraped directly from the official Anthem Global Technology Services Pvt. Ltd. domain. Download links pull directly from your local website directories.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}