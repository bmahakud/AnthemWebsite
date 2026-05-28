"use client"
import { Footer } from "@/components/Footer";

import { motion } from "framer-motion"
import {
  Ban,
  AlertCircle,
  CreditCard,
  ShoppingCart,
  Shield,
  Mail,
  MapPin,
  Phone,
  FileText,
  BookOpen,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

export default function RefundPolicyPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  }

  // Refund Policy sections – clear and concise
  const sections = [
    {
      title: "1. No Refund Policy",
      icon: <Ban className="size-6" />,
      content: [
        "ANTEM GLOBAL PRIVATE LIMITED does not accept any refund requests once an order is placed and payment is confirmed. All sales are final.",
        "This policy applies to all products and services offered on our Platform, including but not limited to software licenses, subscriptions, development services, and digital products.",
      ],
    },
    {
      title: "2. Why No Refunds?",
      icon: <AlertCircle className="size-6" />,
      content: [
        "Our products and services are digital in nature and are delivered immediately upon purchase. Once access is granted or work has commenced, the value is consumed and cannot be returned.",
        "We invest significant resources into each project and license, and this policy allows us to maintain competitive pricing and high-quality standards for all our customers.",
      ],
    },
    {
      title: "3. Review Before Purchase",
      icon: <ShoppingCart className="size-6" />,
      content: [
        "We strongly encourage you to carefully review all product details, specifications, and requirements before completing your purchase.",
        "If you have any questions about a product or service, please contact our support team before placing your order. We are happy to provide additional information, demos, or consultations to help you make an informed decision.",
      ],
    },
    {
      title: "4. Exceptions & Support",
      icon: <Shield className="size-6" />,
      content: [
        "While we do not offer refunds, we are committed to your satisfaction. If you experience technical issues or have concerns about your purchase, please contact us immediately.",
        "We will work diligently to resolve any problems, provide replacements for defective products, or offer credits toward future purchases in exceptional circumstances at our sole discretion.",
        "All exception requests are evaluated on a case-by-case basis and are not guaranteed.",
      ],
    },
    {
      title: "5. Chargebacks & Disputes",
      icon: <CreditCard className="size-6" />,
      content: [
        "Initiating a chargeback or payment dispute without first contacting us may result in permanent suspension of your account and legal action to recover costs incurred.",
        "If you believe a charge has been made in error, please contact us immediately so we can investigate and resolve the issue amicably.",
      ],
    },
    {
      title: "6. Contact Us",
      icon: <Mail className="size-6" />,
      content: [
        "For any questions or concerns regarding this Refund Policy, please reach out to us:",
        "ANTEM GLOBAL PRIVATE LIMITED",
        "TRIDENT GALAXY APARTMENT, KALINGANAGAR,",
        "Paikarapur, Khordha, Odisha, 752054, India",
        "Email: info@anthemgt.com",
        "Phone: +91 6742972299",
      ],
    },
  ]

  // Deterministic background elements – hydration‑safe
  const refundIcons = ["💳", "🛒", "🚫", "⚠️", "📦", "✅", "🔒", "📋"]
  const dotPositions = Array.from({ length: 30 }, (_, i) => ({
    left: `${(i * 7) % 100}%`,
    top: `${(i * 11) % 100}%`,
    delay: i * 0.2,
    duration: 8 + (i % 10),
  }))

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Hero Section – Refund‑themed, same elegant design */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-anthem-darkBlue via-primary/90 to-anthem-blue">
        {/* Subtle, deterministic background pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(79,70,229,0.15)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(244,63,94,0.1)_0%,_transparent_50%)]" />
          
          {/* Deterministic floating refund icons */}
          <div className="absolute inset-0">
            {refundIcons.map((icon, i) => (
              <motion.div
                key={i}
                className="absolute text-white/5 text-7xl"
                initial={{ 
                  x: `${(i * 13) % 80}%`, 
                  y: `${(i * 17) % 80}%`, 
                  rotate: i * 45,
                  scale: 0.8 
                }}
                animate={{ 
                  y: [`${(i * 17) % 80}%`, `${(i * 17 + 5) % 80}%`, `${(i * 17) % 80}%`],
                  rotate: [i * 45, i * 45 + 10, i * 45],
                  scale: [0.8, 0.9, 0.8],
                }}
                transition={{
                  duration: 13 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              >
                {icon}
              </motion.div>
            ))}
          </div>

          {/* Deterministic dots – subtle, clean */}
          <div className="absolute inset-0">
            {dotPositions.slice(0, 20).map((pos, i) => (
              <motion.div
                key={i}
                className="absolute size-1 bg-white/20 rounded-full"
                style={{ left: pos.left, top: pos.top }}
                animate={{ 
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: pos.duration,
                  repeat: Infinity,
                  delay: pos.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="mb-8 flex justify-center"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="relative">
                <div className="size-28 bg-gradient-to-br from-white to-blue-100 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20">
                  <Ban className="size-14 text-primary" />
                </div>
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 bg-white rounded-3xl blur-2xl"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-slate-200 bg-clip-text text-transparent">
                Refund Policy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto"
            >
              All sales are final. Please review carefully before purchasing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Badge className="bg-white/10 text-white backdrop-blur-sm border-white/20 px-4 py-2 text-sm">
                <FileText className="size-4 mr-2" /> Effective Date: 1st Jan 2025
              </Badge>
              <Badge className="bg-white/10 text-white backdrop-blur-sm border-white/20 px-4 py-2 text-sm">
                <Ban className="size-4 mr-2" /> No Refunds
              </Badge>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Refund Policy Content Section – same elegant card style */}
      <section className="w-full py-20 md:py-28 bg-background">
        <div className="container px-4 md:px-6 max-w-6xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {sections.map((section, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="group"
              >
                <Card className="border border-border/50 hover:border-primary/30 transition-all duration-300 bg-gradient-to-br from-card to-anthem-lightBlue/5 shadow-lg hover:shadow-xl">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 size-12 rounded-full bg-gradient-to-br from-primary/10 to-anthem-lightBlue/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {section.icon}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-anthem-darkBlue bg-clip-text text-transparent">
                          {section.title}
                        </h2>
                        <div className="space-y-3">
                          {section.content.map((paragraph, pIdx) => (
                            <p key={pIdx} className="text-muted-foreground leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-center"
          >
            <Badge variant="outline" className="px-6 py-3 text-base border-primary/30 bg-primary/5">
              <AlertCircle className="size-5 mr-2 text-primary" />
              This Refund Policy was last updated on 1st January 2025
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Footer – identical to other policy pages */}
      <Footer />
    </div>
  )
}