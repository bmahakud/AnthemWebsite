"use client"
import { Footer } from "@/components/Footer";;

import { motion } from "framer-motion";
import { FlaskConical, Calendar, Clock, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ResearchPage() {
  const sectionFade = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      {/* HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-anthem-bgLight via-sky-50 to-primary/10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute left-20 top-20 w-40 h-40 bg-anthem-lightBlue/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 14, repeat: Infinity }}
            className="absolute right-20 bottom-20 w-52 h-52 bg-blue-500/20 rounded-full blur-2xl"
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionFade}
            className="space-y-8"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="flex justify-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl">
                <FlaskConical className="size-12 text-white" />
              </div>
            </motion.div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              Research &{" "}
              <span className="bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
                Development
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Building the future of educational technology through cutting-edge research and innovation.
            </p>

            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20"
            >
              <Clock className="size-5 text-primary" />
              <span className="text-primary font-semibold">Launching Soon</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto pt-4"
            >
              Our R&D division is currently working behind the scenes on revolutionary AI-powered educational solutions. 
              We're preparing to unveil groundbreaking research that will transform how institutions teach and students learn.
            </motion.p>

            {/* Stay Updated CTA */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="pt-8"
            >
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
                >
                  <Rocket className="mr-3 size-5" />
                  Get Early Access Updates
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-4">
                Be the first to know when our research papers and prototypes are released
              </p>
            </motion.div> */}
          </motion.div>
        </div>
      </section>

      
      {/* CTA SECTION */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/5 to-blue-50">
        <div className="container px-4 md:px-6">
          <motion.div
            variants={sectionFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Interested in Our Research?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Partner with us, contribute to our studies, or simply stay updated with our latest breakthroughs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="default" className="rounded-full px-8">
                  Schedule a Research Briefing
                </Button>
              </Link>
              {/* <Link href="/subscribe">
                <Button size="lg" variant="outline" className="rounded-full px-8">
                  Subscribe to Updates
                </Button>
              </Link> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
