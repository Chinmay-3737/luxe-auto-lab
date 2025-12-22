import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Gauge, Zap, Fuel, Check } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { PremiumCars, TestDriveBookings } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<PremiumCars | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    preferredDate: '',
    preferredTime: '',
  });

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      try {
        const carData = await BaseCrudService.getById<PremiumCars>('premiumcars', id, ['category']);
        setCar(carData);
      } catch (error) {
        console.error('Error fetching car:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!car) return;

    const bookingData: TestDriveBookings = {
      _id: crypto.randomUUID(),
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      carModel: `${car.make} ${car.model}`,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      bookingStatus: 'Pending',
    };

    try {
      await BaseCrudService.create('testdrivebookings', bookingData, { premiumcars: [car._id] });
      setBookingSubmitted(true);
      toast({
        title: 'Booking Submitted!',
        description: 'We will contact you shortly to confirm your test drive.',
      });
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        preferredDate: '',
        preferredTime: '',
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit booking. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Car Not Found</h2>
            <Link to="/categories" className="text-primary hover:text-primary/80 font-paragraph">
              Back to Categories
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Image */}
      <section className="relative pt-20 h-[70vh]">
        <Image
          src={car.mainImage || 'https://static.wixstatic.com/media/04c535_0f36b1b736a042fc8826397611529864~mv2.png?originWidth=1280&originHeight=448'}
          alt={`${car.make} ${car.model}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </section>

      {/* Car Details */}
      <section className="px-6 lg:px-20 -mt-32 relative z-10">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Info */}
              <div>
                <div className="mb-6">
                  <span className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-lg font-paragraph text-sm mb-4">
                    {car.year}
                  </span>
                  <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">
                    {car.make}
                  </h1>
                  <h2 className="text-3xl md:text-4xl font-heading font-semibold text-secondary/80 mb-6">
                    {car.model}
                  </h2>
                  <p className="font-paragraph text-lg text-secondary/70 leading-relaxed">
                    {car.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8 pb-8 border-b border-white/10">
                  <p className="font-paragraph text-sm text-secondary/50 mb-2">Starting Price</p>
                  <p className="text-5xl font-heading font-bold text-primary">
                    ${car.price?.toLocaleString()}
                  </p>
                </div>

                {/* Specifications */}
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-6">Specifications</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {car.engineType && (
                      <div className="bg-black/30 rounded-lg p-4 flex items-start space-x-3">
                        <Fuel className="text-primary mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Engine</p>
                          <p className="font-paragraph text-sm text-white font-semibold">{car.engineType}</p>
                        </div>
                      </div>
                    )}
                    {car.horsepower && (
                      <div className="bg-black/30 rounded-lg p-4 flex items-start space-x-3">
                        <Zap className="text-primary mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Horsepower</p>
                          <p className="font-paragraph text-sm text-white font-semibold">{car.horsepower} HP</p>
                        </div>
                      </div>
                    )}
                    {car.topSpeed && (
                      <div className="bg-black/30 rounded-lg p-4 flex items-start space-x-3">
                        <Gauge className="text-primary mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Top Speed</p>
                          <p className="font-paragraph text-sm text-white font-semibold">{car.topSpeed} mph</p>
                        </div>
                      </div>
                    )}
                    <div className="bg-black/30 rounded-lg p-4 flex items-start space-x-3">
                      <Check className="text-primary mt-1 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-paragraph text-xs text-secondary/50 mb-1">Availability</p>
                        <p className="font-paragraph text-sm text-white font-semibold">
                          {car.availability ? 'In Stock' : 'Sold Out'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 360 View Link */}
                {car.threeSixtyViewUrl && (
                  <div className="mt-8">
                    <a
                      href={car.threeSixtyViewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-white/5 border border-white/20 text-white font-paragraph text-sm rounded-lg hover:bg-white/10 transition-colors"
                    >
                      View 360° Tour
                    </a>
                  </div>
                )}
              </div>

              {/* Right Column - Test Drive Booking */}
              <div>
                <div className="bg-black/30 rounded-xl p-8 border border-white/10">
                  <div className="flex items-center space-x-3 mb-6">
                    <Calendar className="text-primary" size={24} />
                    <h3 className="text-2xl font-heading font-bold text-white">Book a Test Drive</h3>
                  </div>

                  {bookingSubmitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="text-primary" size={32} />
                      </div>
                      <h4 className="text-xl font-heading font-semibold text-white mb-2">Booking Submitted!</h4>
                      <p className="font-paragraph text-sm text-secondary/70">
                        We'll contact you shortly to confirm your test drive appointment.
                      </p>
                      <Button
                        onClick={() => setBookingSubmitted(false)}
                        className="mt-6 bg-white/5 hover:bg-white/10 text-white border border-white/20"
                      >
                        Book Another
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitBooking} className="space-y-4">
                      <div>
                        <label className="block font-paragraph text-sm text-secondary/70 mb-2">
                          Full Name *
                        </label>
                        <Input
                          type="text"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleInputChange}
                          required
                          className="bg-white/5 border-white/20 text-white placeholder:text-secondary/30"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block font-paragraph text-sm text-secondary/70 mb-2">
                          Email *
                        </label>
                        <Input
                          type="email"
                          name="customerEmail"
                          value={formData.customerEmail}
                          onChange={handleInputChange}
                          required
                          className="bg-white/5 border-white/20 text-white placeholder:text-secondary/30"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block font-paragraph text-sm text-secondary/70 mb-2">
                          Phone *
                        </label>
                        <Input
                          type="tel"
                          name="customerPhone"
                          value={formData.customerPhone}
                          onChange={handleInputChange}
                          required
                          className="bg-white/5 border-white/20 text-white placeholder:text-secondary/30"
                          placeholder="+91 8766476895"
                        />
                      </div>

                      <div>
                        <label className="block font-paragraph text-sm text-secondary/70 mb-2">
                          Preferred Date *
                        </label>
                        <Input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          required
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>

                      <div>
                        <label className="block font-paragraph text-sm text-secondary/70 mb-2">
                          Preferred Time *
                        </label>
                        <Input
                          type="time"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          required
                          className="bg-white/5 border-white/20 text-white"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white font-paragraph text-sm uppercase tracking-wider h-12"
                      >
                        Submit Booking Request
                      </Button>

                      <p className="font-paragraph text-xs text-secondary/50 text-center">
                        We'll contact you within 24 hours to confirm your appointment
                      </p>
                    </form>
                  )}
                </div>

                {/* Customization CTA */}
                <div className="mt-6 bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-xl p-6">
                  <h4 className="text-lg font-heading font-semibold text-white mb-2">
                    Want to Customize This Car?
                  </h4>
                  <p className="font-paragraph text-sm text-secondary/70 mb-4">
                    Our expert team can personalize every detail to match your vision
                  </p>
                  <Link
                    to="/customization"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white font-paragraph text-sm rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Start Customization
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      {car.galleryImages && (
        <section className="py-24 px-6 lg:px-20">
          <div className="max-w-[120rem] mx-auto">
            <h3 className="text-3xl font-heading font-bold text-white mb-8">Gallery</h3>
            <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
              {[car.mainImage, car.galleryImages].filter(Boolean).map((img, index) => (
                <div key={index} className="flex-shrink-0 w-96 h-64 rounded-xl overflow-hidden">
                  <Image
                    src={img || 'https://static.wixstatic.com/media/04c535_9f47ab7a454b47138c2e909aab91c340~mv2.png?originWidth=384&originHeight=256'}
                    alt={`${car.make} ${car.model} - Image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
