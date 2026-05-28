"use client"
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, ChevronRight, Smartphone, Compass, ShieldCheck, Zap, ArrowRight, AppWindow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function IphoneAppPage() {
  const features = [
    {
      title: "iOS Native Apps",
      description: "Engineering fluid Swift & Objective-C applications optimized for all generations of iPhone and iPad devices.",
      icon: <Smartphone className="size-6 text-anthem-blue" />,
    },
    {
      title: "Cross-Platform Frameworks",
      description: "Leveraging React Native and Flutter to build single-codebase apps that deploy flawlessly across iOS and Android.",
      icon: <AppWindow className="size-6 text-anthem-blue" />,
    },
    {
      title: "High Performance Graphics",
      description: "Optimizing frame-rates, rendering speeds, and local asset usage to ensure smooth interactions.",
      icon: <Zap className="size-6 text-anthem-blue" />,
    },
    {
      title: "App Store Publishing",
      description: "Managing complete submission pipelines, including Apple Store compliance reviews, provisioning, and certificates.",
      icon: <ShieldCheck className="size-6 text-anthem-blue" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(1,122,202,0.08),transparent_50%)]">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/Anthem%20Assests/images_ban-Iphone.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90" />
        
        {/* Glow Spheres */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-anthem-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-anthem-lightBlue/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <Home className="size-3.5" /> Home
            </Link>
            <ChevronRight className="size-3.5 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Our Services</span>
            <ChevronRight className="size-3.5 text-muted-foreground/50" />
            <span className="text-anthem-blue font-medium">Mobility Services</span>
          </div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent">
                Mobility Services
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                Connect with users on the go. We design premium iOS, Android, and cross-platform mobile apps structured for maximum responsiveness, security, and elegant UI interfaces.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid Content */}
      <section className="pb-24 relative">
        <div className="container px-4 md:px-6 mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 items-start mb-16">
            
            {/* Visual Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="border border-border/40 bg-card/65 backdrop-blur-md shadow-lg overflow-hidden h-full">
                <div className="relative h-3 bg-gradient-to-r from-anthem-blue to-anthem-lightBlue" />
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-12 rounded-xl bg-anthem-blue/10 border border-anthem-blue/20 flex items-center justify-center text-anthem-blue">
                      <Smartphone className="size-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">Mobile Excellence</h2>
                  </div>

                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-justify mb-4">
                    In today's digital landscape, mobile utility is a core business necessity. We translate complex business systems into native phone applications, complete with local databases, sync logics, and biometric integrations.
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed text-justify">
                    From e-health portals and secure financial wallets to field team trackers, we guarantee swift execution, beautiful micro-interactions, and quick App Store approvals.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature List Panel */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {features.map((item, index) => (
                <Card key={index} className="border border-border/40 bg-card/65 backdrop-blur-md shadow hover:border-anthem-blue/30 transition-all duration-300">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="size-12 rounded-xl bg-anthem-blue/10 border border-anthem-blue/20 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-16 bg-muted/30 border-t border-border/30">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Launch Your App to the World</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            Get in touch with our mobile design architects to construct, code, and deploy an amazing mobile experience for your brand.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button variant="anthem" className="shadow-lg px-8 py-5 rounded-full">
                Consult Mobile Team <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
