"use client"
import { Footer } from "@/components/Footer";

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ChevronRight, Mail, Phone, Award, Shield, User, Globe, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const managementTeam = [
  {
    name: "Manas Ranjan Pattnaik",
    role: "Chairman",
    avatar: "/Anthem Assests/images_manas_pattnaik.png",
    education: "M.S. in Computer Science (San Diego State University, California, USA)",
    emails: ["manas.pattnaik@anthemgt.com", "manaspattnaik@hotmail.com"],
    phone: "07873099999",
    skills: ["Government Relations", "SEZ Management", "Policy & Regulatory", "IT Parks & Infrastructure"],
    bio: [
      "A Techno-commercial expert with a Master's degree in Computer Science from San Diego State University, California, USA. He has over 30 years of experience in various domestic and international assignments in the fields of Information Technology, Consulting. He has served extensively in Botswana, Ivory Coast, Algeria, Nepal, Bhutan, Mauritius assisting them in setting up their IT and supporting infrastructure.",
      "He was the technical in charge of the ambitious E-governance project of the Indian Judicial System under the aegis of the Hon'ble Supreme Court of India. As Director of Software Technology Parks of India (STPI) he managed 45+ STPI centers across India and also helped in creating 30 of those. He has played a key role in providing consulting services to the ICT programmes and policy formation in China and Panama where he undertook feasibility studies, determined policy frameworks and strategic plans.",
      "He is also currently actively promoting Entrepreneurship development and has setup his own Information Technology firm which is handling several high profile IT and Data management projects, under the National E-governance program, like Census Data collection and processing, digitization of legal documents, management systems for railways amongst others. His firm also serves a host of international clients with varied IT needs in the Telecom, Healthcare and Finance sector."
    ]
  },
  {
    name: "Rajesh Kumar Acharya",
    role: "Director",
    avatar: "/Anthem Assests/images_rajeshsir.png",
    education: "M. Tech in Computer Science",
    emails: ["raja@anthemgt.com"],
    phone: "07873088888",
    skills: ["Skill Development", "Infrastructure Planning", "Network Ops", "Consulting & RIM"],
    bio: [
      "A Techno-commercial expert with M. Tech in Computer Science. He has over 25 years of experience in both Industry and Technical Education.",
      "Has handled many domestic and international assignments in the fields of Information Technology & Consulting. He has expertise in Infrastructure, Software Development, Education & Training, Network operations centers, remote infrastructure management, government relations and business development etc.",
      "He is currently handling Skill and Entrepreneurship development under National Skill Development Program to promote employability and empower youth with technical competencies."
    ]
  },
  {
    name: "Chakradhara Panda",
    role: "Chief Executive Officer (CEO)",
    avatar: "/Anthem Assests/images_chakradhara_panda.png",
    education: "B.E. (Institution of Electronics & Telecommunication Engineers)",
    emails: ["chakradhara.panda@anthemgt.com"],
    phone: "07873077777",
    skills: ["Project Implementation", "Team Building", "E-Governance Delivery", "Team Management"],
    bio: [
      "Mr. Chakradhara Panda is the CEO of Anthem Global Technologies Pvt Ltd and he is responsible for execution of projects.",
      "He has over 15+ years of delivery experience in implementing high-impact e-governance projects. He was instrumental in building highly capable technical teams in various states for delivering large-scale Socio-economic & Census projects.",
      "His core expertise includes end-to-end project implementation, team building, and operational team management to ensure timely project delivery and compliance."
    ]
  }
]

export default function ManagementProfilePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[radial-gradient(circle_at_70%_20%,rgba(59,130,246,0.08),transparent_50%)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/Anthem%20Assests/images_ban-managprofile.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        
        {/* Decorative Glowing Orbs */}
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
            <span className="text-primary font-medium">Management Profile</span>
          </div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent">
                Management Profile
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Anthem Global is steered by visionary leaders and technical pioneers who combine decades of national and international experience in software systems, e-governance, and enterprise project execution.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profiles Grid */}
      <section className="pb-24 relative">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {managementTeam.map((member, index) => (
              <motion.div
                key={member.name}
                className="flex"
                initial={{ opacity: 0, y: 55 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="border border-border/40 bg-card/60 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col w-full">
                  {/* Card Top Accent / Decorative background */}
                  <div className="h-2 bg-gradient-to-r from-anthem-blue via-anthem-lightBlue to-anthem-darkBlue" />
                  
                  <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-md mb-4 bg-muted flex items-center justify-center p-1">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover rounded-full"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-icon') as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                        <div className="fallback-icon hidden items-center justify-center text-muted-foreground">
                          <User className="size-16" />
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                      <div className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary mb-4">
                        {member.role}
                      </div>

                      {/* Contact Badges */}
                      <div className="w-full space-y-2 text-left bg-muted/20 p-3 rounded-lg border border-border/5">
                        {member.emails.map((email) => (
                          <a
                            key={email}
                            href={`mailto:${email}`}
                            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors py-0.5 overflow-hidden text-ellipsis whitespace-nowrap"
                          >
                            <Mail className="size-3.5 text-primary shrink-0" />
                            <span className="truncate">{email}</span>
                          </a>
                        ))}
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors py-0.5"
                        >
                          <Phone className="size-3.5 text-primary shrink-0" />
                          <span>{member.phone}</span>
                        </a>
                      </div>
                    </div>

                    {/* Education Block */}
                    <div className="flex items-start gap-2 text-xs bg-muted/40 p-3 rounded-lg border border-border/10 mb-4">
                      <GraduationCap className="size-4.5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-foreground mb-0.5">Education</span>
                        <span className="text-muted-foreground">{member.education}</span>
                      </div>
                    </div>

                    {/* Bio Paragraphs */}
                    <div className="text-xs md:text-sm text-muted-foreground leading-relaxed space-y-3 text-justify mb-6">
                      {member.bio.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>

                    {/* Expertise Badges */}
                    <div className="mt-auto pt-4 border-t border-border/10">
                      <span className="text-xs font-bold text-foreground block mb-2.5 uppercase tracking-wider">
                        Areas of Expertise
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.skills.map((skill) => (
                          <div
                            key={skill}
                            className="px-2.5 py-0.5 text-[10px] md:text-xs rounded-full border border-primary/20 bg-primary/5 text-foreground hover:bg-primary/10 transition-colors"
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-muted/30 border-t border-border/30">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Connect with Our Team</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Get in touch with our office representatives for consultations, bids, or project queries.
          </p>
          <Link href="/contact">
            <Button variant="anthem" className="shadow-lg px-8 py-5 rounded-full">
              Contact Office
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}