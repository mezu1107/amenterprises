"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Award, Users, Globe, Target, Heart, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticlesBackground } from "@/components/public/particles-background"

const stats = [
  { value: "150+", label: "Projects Delivered" },
  { value: "50+", label: "Happy Clients" },
  { value: "8+", label: "Years Experience" },
  { value: "15+", label: "Team Members" },
]

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of the curve, embracing new technologies and methodologies to deliver cutting-edge solutions.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Quality is non-negotiable. We strive for excellence in every line of code and pixel we create.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We work closely with our clients, treating every project as a partnership toward shared success.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Transparency and honesty guide everything we do, from project estimates to delivery timelines.",
  },
]

const team = [
  { name: "Ahmad Malik", role: "Founder & CEO", initial: "A" },
  { name: "Sarah Johnson", role: "Lead Developer", initial: "S" },
  { name: "Michael Chen", role: "Design Director", initial: "M" },
  { name: "Emily Rodriguez", role: "Project Manager", initial: "E" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <ParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-6 text-balance">
              Building the{" "}
              <span className="gradient-text">Future Together</span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              We're a passionate team of developers, designers, and innovators dedicated to transforming ideas into powerful digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2018, AM Enterprises started with a simple mission: to help businesses succeed in the digital age through innovative technology solutions.
                </p>
                <p>
                  What began as a small team of passionate developers has grown into a full-service digital agency serving clients across the globe. We've had the privilege of working with startups, SMEs, and enterprise clients across various industries.
                </p>
                <p>
                  Today, we continue to push boundaries, embracing new technologies like AI and machine learning while staying true to our core values of quality, innovation, and client success.
                </p>
              </div>
              <Link href="/contact" className="inline-block mt-8">
                <Button className="bg-gradient-to-r from-primary to-accent text-white">
                  Work With Us
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
              <div className="absolute inset-0 glass-card flex items-center justify-center">
                <span className="text-9xl font-bold text-muted-foreground/10">AM</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="glass-card rounded-2xl p-6 text-center hover:border-primary/30 transition-all"
              >
                <div className="size-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                  <value.icon className="size-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The talented individuals behind our success.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="size-32 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4 text-white text-4xl font-bold group-hover:scale-105 transition-transform">
                  {member.initial}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Join Our Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're looking to build something amazing or join our team, we'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent text-white">
                  Start a Project
                </Button>
              </Link>
              <Link href="/careers">
                <Button size="lg" variant="outline">
                  View Careers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
