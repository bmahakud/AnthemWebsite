"use client";
import { API_URL } from "@/lib/config";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Github,
  Youtube,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/Footer";

// Form validation schema
const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const formRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeOffice, setActiveOffice] = useState("bhubaneswar");
  const isFormInView = useInView(formRef, { once: true, amount: 0.3 });
  const isMapInView = useInView(mapRef, { once: true, amount: 0.3 });

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: any) => {
    setFormStatus("submitting");

    try {
      const response = await fetch(`${API_URL}/api/contact/submit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
        console.error("Submission error:", result.error);
      }
    } catch (error) {
      console.error("Network error:", error);
      setFormStatus("error");
    }
  };

  // Office locations
  const officeLocations = [
    {
      id: "bhubaneswar",
      name: "Development Center (HQ)",
      address:
        "Anthem Tower, IDCO Plot No. N24,25,26 & 27, New IT Zone, Chandaka Industrial Estate, Bhubaneswar-751024, Odisha, India",
      phone: "+91-674-2972299",
      email: "info@anthemgt.com",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.6698642232936!2d85.80800877524584!3d20.355294381129596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a190906be33604f%3A0xe54d4a8e6308ffc2!2sChandaka%20Industrial%20Estate%20Bhubaneswar!5e0!3m2!1sen!2sin!4v1759750289802!5m2!1sen!2sin",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      image: "/image/bhubaneswaroffice.png",
    },
    {
      id: "registered-office",
      name: "Registered Office",
      address: "HIG 84, Sailshree vihar, Chandrasekharpur, Bhubaneswar-751021, India",
      phone: "+91-674-2972299",
      email: "info@anthemgt.com",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3740.3644026362544!2d85.81640167524623!3d20.367807781121087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19096a5bc5a42d%3A0x286395b21d51a6ee!2sSailashree%20Vihar%2C%20Bhubaneswar!5e0!3m2!1sen!2sin!4v1759750289803!5m2!1sen!2sin",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      image: "/placeholder.jpg",
    },
    {
      id: "agartala",
      name: "Agartala Office",
      address: "Adjacent to TFDPC Ltd., East side of Raj Bhavan, PO: Kunjavan, Agartala, Tripura, India",
      phone: "+91-674-2972299",
      email: "info@anthemgt.com",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.718873763321!2d91.28280167534431!3d23.864104478589716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3753f2f0a1c6bb7f%3A0x6b0487c679b3cb6f!2sRaj%20Bhavan%20Agartala!5e0!3m2!1sen!2sin!4v1759750289804!5m2!1sen!2sin",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      image: "/placeholder.jpg",
    },
    {
      id: "bhilai",
      name: "Bhilai Office",
      address: "STPI Incubation Centre, Mangal Bhavan, Nehru Nagar (East), Bhilai, Dist: Durg, Chhattisgarh - 490020, India",
      phone: "+91-674-2972299",
      email: "info@anthemgt.com",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.9667794357497!2d81.332801675269!3d21.233104380468305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a293df0be33604f%3A0xe54d4a8e6308ffc2!2sSTPI%20Bhilai!5e0!3m2!1sen!2sin!4v1759750289805!5m2!1sen!2sin",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      image: "/placeholder.jpg",
    },
    {
      id: "raipur",
      name: "Raipur Office",
      address: "C-12, Jivan Vihar, Telibandha, Raipur, Chhattisgarh, India",
      phone: "+91-674-2972299",
      email: "info@anthemgt.com",
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.3467794357497!2d81.6528016752686!3d21.218104380479105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a28ddf0be33604f%3A0xe54d4a8e6308ffc2!2sTelibandha%20Raipur!5e0!3m2!1sen!2sin!4v1759750289806!5m2!1sen!2sin",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
      image: "/placeholder.jpg",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Hero Section */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/10 via-anthem-bgLight to-sky-100/10">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container px-4 md:px-6 relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Mail className="size-4" />
              Get in Touch
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Let's Start a
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block bg-gradient-to-r from-anthem-blue to-anthem-darkBlue bg-clip-text text-transparent"
              >
                Conversation
              </motion.span>
            </h1>
            <p className="text-base md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto px-2">
              Have a project in mind? We'd love to hear from you and discuss how
              we can help bring your ideas to life.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-primary/70 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Information Cards */}
      <section className="w-full py-10 md:py-16 bg-background relative z-10">
        <div className="container px-4 md:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* Address Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-blue-50/30 backdrop-blur transition-all hover:shadow-xl">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <MapPin className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Visit Our Office</h3>
                  <p className="text-muted-foreground mb-4">
                    Anthem Tower, IDCO Plot No. N24,25,26 & 27,
                    <br />
                    New IT Zone, Chandaka Industrial Estate,
                    <br />
                    Bhubaneswar, Odisha - 751024
                  </p>
                  <Link
                    href="https://maps.app.goo.gl/uP9fND12oDraYFmPA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-white"
                    >
                      Get Directions
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-blue-50/30 backdrop-blur transition-all hover:shadow-xl">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Phone className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Call Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Our friendly team is here to help
                    <br />
                    <span className="text-lg font-medium text-foreground">
                      +91-674-2972299
                    </span>
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Clock className="size-4" />
                    <span className="text-sm">Mon-Fri: 9:00 AM - 6:00 PM</span>
                  </div>
                  <Link href="tel:+916742972299" className="mt-auto w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-white"
                    >
                      Call Now
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Email Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-blue-50/30 backdrop-blur transition-all hover:shadow-xl">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Mail className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Email Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Drop us a line anytime at
                    <br />
                    <span className="text-lg font-medium text-foreground">
                      info@anthemgt.com
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    We'll get back to you within 24 hours
                  </p>
                  <Link
                    href="mailto:info@anthemgt.com"
                    className="mt-auto w-full"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-white"
                    >
                      Send Email
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* WhatsApp Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-green-50/30 backdrop-blur transition-all hover:shadow-xl">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="size-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors duration-300">
                    <MessageCircle className="size-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">WhatsApp Us</h3>
                  <p className="text-muted-foreground mb-4">
                    Chat with us instantly on WhatsApp
                    <br />
                    <span className="text-lg font-medium text-foreground">
                      +91-674-2972299
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Quick responses guaranteed
                  </p>
                  <Link
                    href="https://wa.me/916742972299"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto w-full"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-green-500/40 text-green-700 group-hover:bg-green-500 group-hover:text-white group-hover:border-green-500"
                    >
                      Message on WhatsApp
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Map Section */}
      <section className="w-full py-20 bg-gradient-to-b from-background to-blue-50/30">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div ref={formRef}>
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                animate={isFormInView ? "visible" : "hidden"}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground max-w-md">
                  Fill out the form below and our team will get back to you as
                  soon as possible.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isFormInView ? "visible" : "hidden"}
              >
                <Card className="border-border/40 overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                      >
                        {/* Name Fields - Side by Side */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <motion.div variants={itemVariants}>
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>First Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="John"
                                      {...field}
                                      className="transition-all focus:ring-2 focus:ring-primary/20"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Last Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Doe"
                                      {...field}
                                      className="transition-all focus:ring-2 focus:ring-primary/20"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </motion.div>
                        </div>

                        {/* Email Field */}
                        <motion.div variants={itemVariants}>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="john@example.com"
                                    {...field}
                                    className="transition-all focus:ring-2 focus:ring-primary/20"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>

                        {/* Subject Field */}
                        <motion.div variants={itemVariants}>
                          <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="How can we help you?"
                                    {...field}
                                    className="transition-all focus:ring-2 focus:ring-primary/20"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>

                        {/* Message Field */}
                        <motion.div variants={itemVariants}>
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Message</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Tell us about your project or inquiry..."
                                    rows={5}
                                    {...field}
                                    className="resize-none transition-all focus:ring-2 focus:ring-primary/20"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div variants={itemVariants}>
                          <Button
                            type="submit"
                            variant="anthem"
                            className="w-full h-12 rounded-lg group"
                            disabled={formStatus === "submitting"}
                          >
                            {formStatus === "submitting" ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                Sending...
                              </div>
                            ) : (
                              <>
                                Send Message
                                <Send className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </Form>

                    {/* Form Status Messages */}
                    <AnimatePresence mode="wait">
                      {formStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
                        >
                          <CheckCircle2 className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-green-800">
                              Message Sent Successfully!
                            </h4>
                            <p className="text-sm text-green-600">
                              Thank you for reaching out. We'll get back to you
                              as soon as possible.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {formStatus === "error" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                        >
                          <AlertCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-red-800">
                              Something went wrong
                            </h4>
                            <p className="text-sm text-red-600">
                              There was an error sending your message. Please
                              try again or contact us directly.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Office Locations with Map */}
            <div ref={mapRef}>
              <motion.div
                variants={fadeInVariants}
                initial="hidden"
                animate={isMapInView ? "visible" : "hidden"}
                className="mb-8"
              >
                <h2 className="text-3xl font-bold mb-2">Our Offices</h2>
                <p className="text-muted-foreground max-w-md">
                  Visit us at one of our office locations or connect with us
                  virtually from anywhere in the world.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isMapInView ? "visible" : "hidden"}
              >
                <Tabs value={activeOffice} onValueChange={setActiveOffice} className="w-full">
                  {/* Mobile: dropdown select */}
                  <div className="block md:hidden mb-4">
                    <select
                      value={activeOffice}
                      onChange={(e) => setActiveOffice(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      {officeLocations.map((office) => (
                        <option key={office.id} value={office.id}>
                          {office.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Desktop: tab pills */}
                  <TabsList className="hidden md:flex w-full mb-6 h-auto gap-1 p-1">
                    {officeLocations.map((office) => (
                      <TabsTrigger
                        key={office.id}
                        value={office.id}
                        className="flex-1 text-sm py-2"
                      >
                        {office.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {officeLocations.map((office) => (
                    <TabsContent key={office.id} value={office.id}>
                      <Card className="border-border/40 overflow-hidden">
                        <div className="relative h-48 md:h-64 overflow-hidden">
                          <Image
                            src={office.image || "/placeholder.svg"}
                            alt={office.name}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl font-bold text-white">
                              {office.name}
                            </h3>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <div className="grid gap-4 mb-6">
                            <div className="flex items-start gap-3">
                              <MapPin className="size-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium mb-1">Address</h4>
                                <p className="text-sm text-muted-foreground">
                                  {office.address}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Phone className="size-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium mb-1">Phone</h4>
                                <p className="text-sm text-muted-foreground">
                                  {office.phone}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Mail className="size-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium mb-1">Email</h4>
                                <p className="text-sm text-muted-foreground">
                                  {office.email}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <Clock className="size-5 text-primary flex-shrink-0 mt-0.5" />
                              <div>
                                <h4 className="font-medium mb-1">
                                  Business Hours
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {office.hours}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Interactive Map */}
                          <motion.div
                            variants={mapVariants}
                            className="w-full h-64 rounded-lg overflow-hidden border border-border/40"
                          >
                            <iframe
                              src={office.mapUrl}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              title={`Map showing ${office.name} location`}
                            ></iframe>
                          </motion.div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 bg-background">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Clear answers to common questions about our approach, process, and
              long-term support.
            </p>
          </motion.div>

          {/* FAQ List */}
          <div className="space-y-4">
            {[
              {
                question:
                  "What makes your approach different from other agencies?",
                answer:
                  "We focus on solving business problems first, not just building software. Our solutions are aligned with measurable outcomes like performance, scalability, and ROI.",
              },
              {
                question: "How long does a typical project take to complete?",
                answer:
                  "Timelines depend on scope. MVPs typically take 8–12 weeks, while full-scale platforms range from 3–6 months with clear milestones and sprint-based delivery.",
              },
              {
                question: "Do you offer ongoing support after project completion?",
                answer:
                  "Yes. We provide flexible post-launch support including monitoring, security updates, performance optimization, and feature enhancements.",
              },
              {
                question: "Can you work with our existing team and technologies?",
                answer:
                  "Absolutely. We frequently collaborate with in-house teams and integrate seamlessly with existing systems, tools, and technology stacks.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border border-border/50 rounded-lg bg-background hover:shadow-sm transition-all"
              >
                <details className="group">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 font-semibold text-base list-none">
                    {faq.question}
                    <span className="ml-4 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect with Us Section */}
      <section className="w-full py-20 bg-gradient-to-br from-anthem-blue to-anthem-darkBlue text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />

        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
              Connect With Us
            </h2>
            <p className="text-base md:text-xl text-primary-foreground/80 mb-6 md:mb-8">
              Follow us on social media for the latest updates, insights, and
              announcements.
            </p>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {[
                {
                  icon: <Linkedin className="size-5" />,
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/anthem-global/posts/?feedView=all",
                },
                {
                  icon: <Twitter className="size-5" />,
                  label: "Twitter",
                  href: "https://x.com/Anthem Global1",
                },
                {
                  icon: <Instagram className="size-5" />,
                  label: "Instagram",
                  href: "https://www.instagram.com/dasho.app/",
                },
                {
                  icon: <Facebook className="size-5" />,
                  label: "Facebook",
                  href: "https://www.facebook.com/anthemglobal/",
                },
                /* { icon: <Github className="size-5" />, label: "GitHub", href: "#" },*/
                {
                  icon: <Youtube className="size-5" />,
                  label: "Youtube",
                  href: "https://www.youtube.com/@Anthem GlobalVlogs",
                },
              ].map((social, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={social.href}>
                    <Button
                      size="sm"
                      className="group rounded-full h-10 md:h-12 px-4 md:px-6 text-sm font-medium bg-white text-anthem-blue hover:bg-anthem-bgLight transition-all duration-300 gap-1"
                    >
                      {social.icon}
                      <span className="hidden xs:inline">{social.label}</span>
                      <span className="inline xs:hidden">{social.label.slice(0, 2)}</span>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
