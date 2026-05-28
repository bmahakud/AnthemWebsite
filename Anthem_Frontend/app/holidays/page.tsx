"use client"
import { Footer } from "@/components/Footer";

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Sparkles,
  PartyPopper,
  Flame,
  Heart,
  Star,
  Zap,
  Gift,
  Crown,
  Music,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

const confettiEmojis = ["🎉", "🎊", "✨", "🎈", "🎁", "🌟", "💫", "🎆", "🎇"]

function seededRandom(seed: number) {
  let t = seed + 0x6D2B79F5
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

function randFor(i: number, offset: number) {
  return seededRandom((i + 1) * 1000 + offset)
}

export default function HolidaysPage() {
  const [activeYear, setActiveYear] = useState("2025")

  const holidays2025 = [
    {
      date: "1st Jan",
      name: "New Year's Day",
      icon: <PartyPopper className="size-8" />,
      color: "from-purple-500 to-pink-500",
      emoji: "🎉",
      description: "Start the year with joy and celebrations!",
    },
    {
      date: "26th Jan",
      name: "Republic Day",
      icon: <Star className="size-8" />,
      color: "from-orange-500 to-red-500",
      emoji: "🇮🇳",
      description: "Celebrating India's Constitution",
    },
    {
      date: "26th Feb",
      name: "Mahashivratri",
      icon: <Flame className="size-8" />,
      color: "from-blue-500 to-purple-500",
      emoji: "🔱",
      description: "The Great Night of Lord Shiva",
    },
    {
      date: "14th Mar",
      name: "Holi",
      icon: <Sparkles className="size-8" />,
      color: "from-pink-500 to-yellow-500",
      emoji: "🎨",
      description: "Festival of Colors and Spring",
    },
    {
      date: "15th Jun",
      name: "Raja",
      icon: <Heart className="size-8" />,
      color: "from-green-500 to-teal-500",
      emoji: "🌸",
      description: "Celebrating Womanhood and Earth",
    },
    {
      date: "27th Jun",
      name: "Rath Yatra",
      icon: <Crown className="size-8" />,
      color: "from-yellow-500 to-orange-500",
      emoji: "🛕",
      description: "Chariot Festival of Lord Jagannath",
    },
    {
      date: "15th Aug",
      name: "Independence Day",
      icon: <Star className="size-8" />,
      color: "from-orange-500 to-green-500",
      emoji: "🇮🇳",
      description: "Celebrating Freedom and Unity",
    },
    {
      date: "27th Aug",
      name: "Ganesh Chaturthi",
      icon: <Gift className="size-8" />,
      color: "from-red-500 to-pink-500",
      emoji: "🐘",
      description: "Birthday of Lord Ganesha",
    },
    {
      date: "2nd Oct",
      name: "Dussehra",
      icon: <Zap className="size-8" />,
      color: "from-yellow-500 to-red-500",
      emoji: "🏹",
      description: "Victory of Good over Evil",
    },
    {
      date: "20th Oct",
      name: "Diwali",
      icon: <Flame className="size-8" />,
      color: "from-yellow-500 to-orange-500",
      emoji: "🪔",
      description: "Festival of Lights",
    },
    {
      date: "25th Dec",
      name: "Christmas",
      icon: <Gift className="size-8" />,
      color: "from-red-500 to-green-500",
      emoji: "🎄",
      description: "Celebrating Joy and Giving",
    },
  ]

  const holidays2026 = [
    {
      date: "1st Jan",
      name: "New Year Day",
      icon: <PartyPopper className="size-8" />,
      color: "from-purple-500 to-pink-500",
      emoji: "🎉",
      description: "Start the year with joy and celebrations!",
    },
    {
      date: "26th Jan",
      name: "Republic Day",
      icon: <Star className="size-8" />,
      color: "from-orange-500 to-red-500",
      emoji: "🇮🇳",
      description: "Celebrating India's Constitution",
    },
    {
      date: "15th Feb",
      name: "Mahashivratri",
      icon: <Flame className="size-8" />,
      color: "from-blue-500 to-purple-500",
      emoji: "🔱",
      description: "The Great Night of Lord Shiva",
    },
    {
      date: "4th March",
      name: "Holi",
      icon: <Sparkles className="size-8" />,
      color: "from-pink-500 to-yellow-500",
      emoji: "🎨",
      description: "Festival of Colors and Spring",
    },
    {
      date: "16th July",
      name: "Rath Yatra",
      icon: <Crown className="size-8" />,
      color: "from-yellow-500 to-orange-500",
      emoji: "🛕",
      description: "Chariot Festival of Lord Jagannath",
    },
    {
      date: "15th Aug",
      name: "Independence day",
      icon: <Star className="size-8" />,
      color: "from-orange-500 to-green-500",
      emoji: "🇮🇳",
      description: "Celebrating Freedom and Unity",
    },
    {
      date: "16th Sept",
      name: "Ganesh Chaturthi",
      icon: <Gift className="size-8" />,
      color: "from-red-500 to-pink-500",
      emoji: "🐘",
      description: "Birthday of Lord Ganesha",
    },
    {
      date: "2nd Oct",
      name: "Mahatma Gandhi Jayanti",
      icon: <Heart className="size-8" />,
      color: "from-green-500 to-teal-500",
      emoji: "𓀗",
      description: "Celebrating Peace and Non-Violence",
    },
    {
      date: "10th October",
      name: "Dusserah",
      icon: <Zap className="size-8" />,
      color: "from-yellow-500 to-red-500",
      emoji: "🏹",
      description: "Victory of Good over Evil",
    },
    {
      date: "8th Nov",
      name: "Diwali",
      icon: <Flame className="size-8" />,
      color: "from-yellow-500 to-orange-500",
      emoji: "🪔",
      description: "Festival of Lights",
    },
    {
      date: "25th Dec",
      name: "Christmas",
      icon: <Gift className="size-8" />,
      color: "from-red-500 to-green-500",
      emoji: "🎄",
      description: "Celebrating Joy and Giving",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Hero Section with Crazy Animations */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-purple-50/50 to-pink-50/30">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${randFor(i, 1) * 100}%`,
                y: `${randFor(i, 2) * 100}%`,
                scale: randFor(i, 3) * 0.5 + 0.5,
                opacity: randFor(i, 4) * 0.5 + 0.3,
              }}
              animate={{
                y: [
                  `${randFor(i, 5) * 100}%`,
                  `${randFor(i, 6) * -20}%`,
                  `${randFor(i, 7) * 100}%`,
                ],
                rotate: [0, 360],
              }}
              transition={{
                duration: randFor(i, 8) * 15 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute"
              style={{
                fontSize: `${randFor(i, 9) * 30 + 20}px`,
              }}
            >
              {
                confettiEmojis[
                  Math.floor(randFor(i, 10) * confettiEmojis.length)
                ]
              }
            </motion.div>
          ))}
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Animated Calendar Icon */}
            <motion.div
              className="mb-8 flex justify-center"
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="relative">
                <div className="size-24 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Calendar className="size-12 text-white" />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-3xl blur-xl"
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
            >
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Anthem Global Holidays
              </span>
              <motion.span
                animate={{ rotate: [0, 20, 0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block ml-4"
              >
                🎉
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            >
              Celebrate Life, Culture & Joy with Our Team!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 justify-center items-center"
            >
              {["🎊", "✨", "🎈", "🌟"].map((emoji, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="text-4xl"
                >
                  {emoji}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute size-2 bg-primary/30 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                left: `${10 + (i * 6) % 80}%`,
                top: `${20 + (i * 8) % 60}%`,
              }}
            />
          ))}
        </div>
      </section>

      {/* Holidays List Section */}
      <section className="w-full py-20 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <Tabs
            defaultValue="2025"
            className="w-full"
            onValueChange={setActiveYear}
          >
            <div className="flex justify-center mb-12">
              <TabsList className="grid grid-cols-2 h-14 p-1 bg-muted/50 backdrop-blur-sm rounded-full">
                <TabsTrigger
                  value="2025"
                  className="rounded-full text-lg font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-white"
                >
                  🗓️ 2025
                </TabsTrigger>
                <TabsTrigger
                  value="2026"
                  className="rounded-full text-lg font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-white"
                >
                  🗓️ 2026
                </TabsTrigger>
              </TabsList>
            </div>

            <AnimatePresence mode="wait">
              <TabsContent value="2025" className="mt-0">
                <motion.div
                  key="2025"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-x-auto md:overflow-visible"
                >
                  <div className="flex md:contents gap-4 md:gap-6 min-w-max md:min-w-0">
                  {holidays2025.map((holiday, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        rotate: [0, -2, 2, -2, 0],
                        transition: { duration: 0.5 },
                      }}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden border-2 border-transparent hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
                        <CardContent className="p-0">
                          {/* Holiday Header with Gradient */}
                          <div
                            className={`relative h-32 bg-gradient-to-br ${holiday.color} p-6 overflow-hidden`}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                              }}
                              transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="absolute -top-10 -right-10 text-white/20 text-8xl"
                            >
                              {holiday.emoji}
                            </motion.div>

                            <div className="relative z-10 flex items-center justify-between">
                              <div className="text-white">
                                {holiday.icon}
                              </div>
                              <Badge className="bg-white/20 text-white backdrop-blur-sm">
                                {holiday.date}
                              </Badge>
                            </div>

                            <motion.div
                              className="absolute bottom-4 left-6 text-6xl"
                              animate={{
                                rotate: [0, 10, -10, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                              }}
                            >
                              {holiday.emoji}
                            </motion.div>
                          </div>

                          {/* Holiday Content */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {holiday.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {holiday.description}
                            </p>

                            <motion.div
                              className="mt-4 flex gap-2 flex-wrap"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <Badge variant="outline" className="text-xs">
                                <Calendar className="size-3 mr-1" />
                                {holiday.date}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Sparkles className="size-3 mr-1" />
                                Festival
                              </Badge>
                            </motion.div>
                          </div>

                          {/* Bottom Gradient */}
                          <motion.div
                            className={`h-1 bg-gradient-to-r ${holiday.color}`}
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="2026" className="mt-0">
                <motion.div
                  key="2026"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-x-auto md:overflow-visible"
                >
                  <div className="flex md:contents gap-4 md:gap-6 min-w-max md:min-w-0">
                  {holidays2026.map((holiday, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        rotate: [0, -2, 2, -2, 0],
                        transition: { duration: 0.5 },
                      }}
                      className="group"
                    >
                      <Card className="h-full overflow-hidden border-2 border-transparent hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-white to-blue-50/30">
                        <CardContent className="p-0">
                          {/* Holiday Header with Gradient */}
                          <div
                            className={`relative h-32 bg-gradient-to-br ${holiday.color} p-6 overflow-hidden`}
                          >
                            <motion.div
                              animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                              }}
                              transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="absolute -top-10 -right-10 text-white/20 text-8xl"
                            >
                              {holiday.emoji}
                            </motion.div>

                            <div className="relative z-10 flex items-center justify-between">
                              <div className="text-white">
                                {holiday.icon}
                              </div>
                              <Badge className="bg-white/20 text-white backdrop-blur-sm">
                                {holiday.date}
                              </Badge>
                            </div>

                            <motion.div
                              className="absolute bottom-4 left-6 text-6xl"
                              animate={{
                                rotate: [0, 10, -10, 0],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                              }}
                            >
                              {holiday.emoji}
                            </motion.div>
                          </div>

                          {/* Holiday Content */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {holiday.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {holiday.description}
                            </p>

                            <motion.div
                              className="mt-4 flex gap-2 flex-wrap"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                            >
                              <Badge variant="outline" className="text-xs">
                                <Calendar className="size-3 mr-1" />
                                {holiday.date}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                <Sparkles className="size-3 mr-1" />
                                Festival
                              </Badge>
                            </motion.div>
                          </div>

                          {/* Bottom Gradient */}
                          <motion.div
                            className={`h-1 bg-gradient-to-r ${holiday.color}`}
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                          />
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                  </div>
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </section>

      {/* Fun Stats Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/5 via-purple-50/30 to-pink-50/20">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Holiday Statistics
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Making every celebration count!
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "11", label: "Holidays/Year", icon: <Calendar className="size-6" />, color: "from-blue-500 to-purple-500" },
              { number: "100%", label: "Joy & Fun", icon: <PartyPopper className="size-6" />, color: "from-pink-500 to-red-500" },
              { number: "24/7", label: "Celebration Mode", icon: <Sparkles className="size-6" />, color: "from-yellow-500 to-orange-500" },
              { number: "∞", label: "Happy Moments", icon: <Heart className="size-6" />, color: "from-green-500 to-teal-500" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center border-2 border-transparent group-hover:border-primary/50 transition-all">
                  <div className={`size-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

