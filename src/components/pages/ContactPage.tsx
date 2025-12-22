import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['"+91 8766476895"', '"+91 8766476895"'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@vyronexMotors.com', 'sales@vyronexMotors.com'],
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Pune, Maharashtra', 'India'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 8:00 PM', 'Sat - Sun: 10:00 AM - 6:00 PM'],
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 tracking-tight">
              Get In <span className="text-primary">Touch</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-secondary/70 max-w-3xl mx-auto">
              Have questions about our premium vehicles or customization services? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <item.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-4">
                  {item.title}
                </h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="font-paragraph text-sm text-secondary/70 mb-2">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10"
          >
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
              <div className="text-center">
                <MapPin className="text-primary mx-auto mb-4" size={48} />
                <p className="font-paragraph text-lg text-secondary/70">
                  Pune, Maharashtra, India
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-2xl p-12 md:p-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto mb-8">
              Visit our showroom to explore our exclusive collection of premium vehicles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-paragraph text-sm uppercase tracking-wider rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <Phone className="mr-2" size={18} />
                Call Us Now
              </a>
              <a
                href="mailto:info@elitedrive.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white border border-white font-paragraph text-sm uppercase tracking-wider rounded-lg hover:bg-white hover:text-black transition-colors"
              >
                <Mail className="mr-2" size={18} />
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
