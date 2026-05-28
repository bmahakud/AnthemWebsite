"use client"
import { Footer } from "@/components/Footer";

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ChevronRight, Mail, Phone, MapPin, Briefcase, Award, GraduationCap, ArrowRight, Heart, Sparkles, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const perks = [
  {
    title: "Cutting-Edge Projects",
    description: "Work on major national e-governance systems, LiDAR point cloud processing, and high-profile enterprise applications.",
    icon: <Sparkles className="size-6 text-primary" />,
  },
  {
    title: "Continuous Learning",
    description: "Participate in skill advancement initiatives and gain certifications in GIS, cloud technologies, and modern frameworks.",
    icon: <GraduationCap className="size-6 text-primary" />,
  },
  {
    title: "Inclusive Culture",
    description: "Be part of a collaborative workspace that values dedication, honest efforts, team building, and social responsibility.",
    icon: <Heart className="size-6 text-primary" />,
  },
  {
    title: "Global Exposure",
    description: "Contribute to projects servicing domestic government wings and top-tier international clients across multi-sectors.",
    icon: <Award className="size-6 text-primary" />,
  },
]

export default function CareerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    position: "General Opening / Software Engineer",
    coverLetter: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Job Application: ${formData.name} - ${formData.position}`)
    const body = encodeURIComponent(
      `Hello Anthem HR Team,\n\nI would like to apply for possible openings at Anthem Global.\n\nMy Details:\nName: ${formData.name}\nEmail: ${formData.email}\nDesired Position: ${formData.position}\n\nCover Letter Notes:\n${formData.coverLetter}\n\n(I have attached my detailed resume to this email.)`
    )
    window.location.href = `mailto:info@anthemgt.com?subject=${subject}&body=${body}`
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.08),transparent_50%)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/Anthem%20Assests/images_ban-career.jpg')] bg-cover bg-center" />
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
            <span className="text-primary font-medium">Careers</span>
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            <div className="md:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent">
                  Build Your Career With Us
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
                  Are you passionate about software engineering, GIS mapping, digitization systems, or digital consultancy? We are always looking for dedicated, innovative professionals to join our collaborative office in Bhubaneswar.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/40 px-4 py-3 rounded-xl border border-border/10">
                    <MapPin className="size-5 text-primary shrink-0" />
                    <span>Bhubaneswar IT Zone, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground bg-muted/40 px-4 py-3 rounded-xl border border-border/10">
                    <Briefcase className="size-5 text-primary shrink-0" />
                    <span>Full-Time & Internships</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-2xl overflow-hidden shadow-xl border border-border/20 bg-muted/20"
              >
                <img
                  src="/Anthem Assests/images_career.jpg"
                  alt="Career illustration"
                  className="w-full h-auto max-h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="py-16 md:py-24 border-t border-border/30 relative">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Why Join Anthem Global?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We cultivate a dynamic and supportive environment that fuels technical capability, team building, and professional advancement.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border border-border/30 bg-card/60 backdrop-blur-md p-6 hover:shadow-lg transition-all duration-300">
                  <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                    {perk.icon}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{perk.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{perk.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Application Form Section */}
      <section className="pb-24 relative">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="border border-border/40 bg-card/70 backdrop-blur-md shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-anthem-blue via-anthem-lightBlue to-anthem-yellow" />
              
              <CardContent className="p-8 md:p-12 flex flex-col gap-6">
                <div className="text-center mb-6">
                  <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-4 border border-primary/20">
                    <Mail className="size-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Submit Your Resume</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    You can send us your detailed resume at <span className="font-semibold text-primary underline">info@anthemgt.com</span> for possible openings in the near future.
                  </p>
                </div>

                {/* Styled Interactive Email Application Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider block">Full Name</label>
                      <Input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-muted/30 border-border/60 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider block">Email Address</label>
                      <Input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-muted/30 border-border/60 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">Position / Focus Area</label>
                    <select
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full flex h-10 w-full rounded-xl border border-border/60 bg-muted/30 px-3 py-2 text-sm text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="General Opening / Software Engineer">General Opening / Software Engineer</option>
                      <option value="GIS & LiDAR Point Classification Analyst">GIS & LiDAR Point Classification Analyst</option>
                      <option value="Digitization / Document Processing Executive">Digitization / Document Processing Executive</option>
                      <option value="Sales / Project Management Coordinator">Sales / Project Management Coordinator</option>
                      <option value="Technical Internship">Technical Internship</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">Brief Introduction / Cover Note</label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Tell us about yourself, your qualifications, and your software experience..."
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="bg-muted/30 border-border/60 rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="anthem"
                    className="w-full rounded-xl shadow-lg py-6 font-semibold flex items-center justify-center gap-2"
                  >
                    <Send className="size-4" /> Send Email Application
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  Clicking the button will open your default email client (e.g. Outlook, Mail) prefilled with your application notes. Don't forget to attach your PDF/DOC resume!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  )
}