import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { CustomizationOptions, CustomizationRequests } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function CustomizationPage() {
  const [options, setOptions] = useState<CustomizationOptions[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    requestTitle: '',
    carModelPreference: '',
    detailedDescription: '',
    colorPreferences: '',
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const { items } = await BaseCrudService.getAll<CustomizationOptions>('customizationoptions');
        setOptions(items);
      } catch (error) {
        console.error('Error fetching customization options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData: CustomizationRequests = {
      _id: crypto.randomUUID(),
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      requestTitle: formData.requestTitle,
      carModelPreference: formData.carModelPreference,
      detailedDescription: formData.detailedDescription,
      colorPreferences: formData.colorPreferences,
      submissionDateTime: new Date().toISOString(),
      requestStatus: 'Pending',
    };

    try {
      await BaseCrudService.create(
        'customizationrequests',
        requestData,
        selectedOptions.length > 0 ? { selectedoptions: selectedOptions } : undefined
      );
      setRequestSubmitted(true);
      toast({
        title: 'Request Submitted!',
        description: 'Our customization team will contact you shortly.',
      });
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        requestTitle: '',
        carModelPreference: '',
        detailedDescription: '',
        colorPreferences: '',
      });
      setSelectedOptions([]);
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit request. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const optionsByType = options.reduce((acc, option) => {
    const type = option.optionType || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(option);
    return acc;
  }, {} as Record<string, CustomizationOptions[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/04c535_8aaa816977cb4de08e632c2497ed0128~mv2.png?originWidth=1152&originHeight=576"
            alt="Car customization"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>

        <div className="relative z-10 max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Sparkles className="text-primary" size={32} />
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white tracking-tight">
                Customization <span className="text-primary">Studio</span>
              </h1>
            </div>
            <p className="font-paragraph text-lg md:text-xl text-secondary/70 max-w-3xl mx-auto">
              Transform your dream car into reality with our expert customization services. From color selection to complete body modifications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Customization Options */}
      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Customization Options
            </h2>
            <p className="font-paragraph text-lg text-secondary/70">
              Select the options that match your vision
            </p>
          </motion.div>

          {Object.entries(optionsByType).map(([type, typeOptions], typeIndex) => (
            <div key={type} className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {typeOptions.map((option, index) => (
                  <motion.div
                    key={option._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => toggleOption(option._id)}
                    className={`relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border cursor-pointer transition-all ${
                      selectedOptions.includes(option._id)
                        ? 'border-primary bg-primary/5'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    {/* Selection Indicator */}
                    {selectedOptions.includes(option._id) && (
                      <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Check size={16} className="text-white" />
                      </div>
                    )}

                    {/* Preview Image */}
                    {option.previewImage && (
                      <div className="mb-4 h-40 rounded-lg overflow-hidden">
                        <Image
                          src={option.previewImage}
                          alt={option.optionName || 'Customization option'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Color Swatch */}
                    {option.colorHexCode && (
                      <div className="mb-4 flex items-center space-x-3">
                        <div
                          className="w-12 h-12 rounded-lg border-2 border-white/20"
                          style={{ backgroundColor: option.colorHexCode }}
                        />
                        <span className="font-paragraph text-sm text-secondary/70">
                          {option.colorHexCode}
                        </span>
                      </div>
                    )}

                    <h4 className="text-xl font-heading font-semibold text-white mb-2">
                      {option.optionName}
                    </h4>
                    <p className="font-paragraph text-sm text-secondary/70 mb-3">
                      {option.description}
                    </p>

                    {option.materialFinish && (
                      <p className="font-paragraph text-xs text-secondary/50 mb-2">
                        Finish: {option.materialFinish}
                      </p>
                    )}

                    {option.priceAdjustment && (
                      <p className="font-paragraph text-sm text-primary font-semibold">
                        {option.priceAdjustment}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {options.length === 0 && (
            <div className="text-center py-12">
              <p className="font-paragraph text-lg text-secondary/50">
                Customization options will be available soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Alloys Section - Quick Selection */}
      <section className="py-16 px-6 lg:px-20 bg-gradient-to-b from-black/50 to-black">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Premium Alloy Wheels
            </h2>
            <p className="font-paragraph text-lg text-secondary/70">
              Elevate your vehicle's appearance with our exclusive alloy wheel collection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Matte Finish Alloys',
                description: 'Sophisticated matte black finish with premium durability',
                finish: 'Matte Black',
                price: '+$2,500',
                image: 'https://static.wixstatic.com/media/04c535_a948e600af30481999ba86515d73e75c~mv2.png?originWidth=896&originHeight=448'
              },
              {
                name: 'High-Performance Alloys',
                description: 'Lightweight forged alloys for enhanced performance',
                finish: 'Polished Chrome',
                price: '+$4,200',
                image: 'https://static.wixstatic.com/media/04c535_a6304e7ea1ee415483debc80c589fbf7~mv2.png?originWidth=896&originHeight=448'
              },
              {
                name: 'Budget-Friendly Alloys',
                description: 'Quality alloy wheels at an affordable price point',
                finish: 'Gunmetal Gray',
                price: '+$1,200',
                image: 'https://static.wixstatic.com/media/04c535_963d0b77a899476d80bf856ad24c7bb0~mv2.png?originWidth=896&originHeight=448'
              }
            ].map((alloy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => toggleOption(`alloy-${index}`)}
                className={`relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border cursor-pointer transition-all ${
                  selectedOptions.includes(`alloy-${index}`)
                    ? 'border-primary bg-primary/5'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {/* Selection Indicator */}
                {selectedOptions.includes(`alloy-${index}`) && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10">
                    <Check size={16} className="text-white" />
                  </div>
                )}

                {/* Image */}
                <div className="h-40 overflow-hidden bg-black/50">
                  <Image
                    src={alloy.image}
                    alt={alloy.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-heading font-semibold text-white mb-2">
                    {alloy.name}
                  </h4>
                  <p className="font-paragraph text-sm text-secondary/70 mb-3">
                    {alloy.description}
                  </p>

                  <p className="font-paragraph text-xs text-secondary/50 mb-2">
                    Finish: {alloy.finish}
                  </p>

                  <p className="font-paragraph text-sm text-primary font-semibold">
                    {alloy.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alloy Wheels Gallery - Comprehensive Showcase */}
      <section className="py-20 px-6 lg:px-20 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #FF0000, transparent 50%)',
        }} />

        <div className="max-w-[120rem] mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
              Complete <span className="text-primary">Alloy Collection</span>
            </h2>
            <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
              Explore our full range of premium alloy wheels, each designed to enhance your vehicle's performance and aesthetics
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Classic Black',
                specs: '18" | 5x120 | 9.5J',
                image: 'https://static.wixstatic.com/media/04c535_73aa591ed3284e138f65029b4320cfb6~mv2.png?originWidth=1152&originHeight=768',
                price: '+$1,800'
              },
              {
                name: 'Sport Chrome',
                specs: '19" | 5x120 | 10J',
                image: 'https://static.wixstatic.com/media/04c535_3598601e9d4b4b119aa5367b64a56c7f~mv2.png?originWidth=1152&originHeight=768',
                price: '+$2,200'
              },
              {
                name: 'Racing Red',
                specs: '20" | 5x120 | 10.5J',
                image: 'https://static.wixstatic.com/media/04c535_6fd23c04e6674bcb8fcb17d55bb54557~mv2.png?originWidth=1152&originHeight=768',
                price: '+$3,500'
              },
              {
                name: 'Titanium Gray',
                specs: '19" | 5x120 | 9.5J',
                image: 'https://static.wixstatic.com/media/04c535_de8c24aaaedc414087d8e4a79f02133a~mv2.png?originWidth=1152&originHeight=768',
                price: '+$2,100'
              },
              {
                name: 'Pearl White',
                specs: '18" | 5x120 | 9J',
                image: 'https://static.wixstatic.com/media/04c535_a948e600af30481999ba86515d73e75c~mv2.png?originWidth=896&originHeight=448',
                price: '+$1,950'
              },
              {
                name: 'Gunmetal Pro',
                specs: '20" | 5x120 | 10J',
                image: 'https://static.wixstatic.com/media/04c535_a6304e7ea1ee415483debc80c589fbf7~mv2.png?originWidth=896&originHeight=448',
                price: '+$2,800'
              },
              {
                name: 'Matte Black Pro',
                specs: '21" | 5x120 | 11J',
                image: 'https://static.wixstatic.com/media/04c535_963d0b77a899476d80bf856ad24c7bb0~mv2.png?originWidth=896&originHeight=448',
                price: '+$4,500'
              },
              {
                name: 'Carbon Fiber',
                specs: '20" | 5x120 | 10.5J',
                image: 'https://static.wixstatic.com/media/04c535_b4e79ab9c667433988738eb88367d2fe~mv2.png?originWidth=1920&originHeight=1024',
                price: '+$5,200'
              }
            ].map((wheel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 hover:bg-white/10"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-black/50">
                  <Image
                    src={wheel.image}
                    alt={wheel.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                    {wheel.name}
                  </h3>
                  <p className="font-paragraph text-xs text-secondary/60 mb-3 tracking-wider">
                    {wheel.specs}
                  </p>
                  <p className="font-paragraph text-sm text-primary font-semibold">
                    {wheel.price}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>

          {/* Gallery Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 bg-gradient-to-r from-primary/10 to-transparent rounded-xl p-8 border border-primary/20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-heading font-semibold text-white mb-2">Premium Quality</h4>
                <p className="font-paragraph text-sm text-secondary/70">
                  All alloys are manufactured using high-grade materials and precision engineering for durability and performance.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-heading font-semibold text-white mb-2">Custom Fitment</h4>
                <p className="font-paragraph text-sm text-secondary/70">
                  Available in multiple sizes and bolt patterns to fit virtually any vehicle. Custom offsets available upon request.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-heading font-semibold text-white mb-2">Expert Installation</h4>
                <p className="font-paragraph text-sm text-secondary/70">
                  Professional installation and wheel balancing included with every purchase. Lifetime warranty on defects.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Request Form */}
      <section className="py-16 px-6 lg:px-20 bg-gradient-to-b from-black to-black/95">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/10"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 text-center">
              Submit Customization Request
            </h2>
            <p className="font-paragraph text-lg text-secondary/70 text-center mb-8">
              Tell us about your dream car and our experts will bring it to life
            </p>

            {requestSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="text-primary" size={40} />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-white mb-3">Request Submitted!</h3>
                <p className="font-paragraph text-lg text-secondary/70 mb-6">
                  Our customization team will review your request and contact you within 48 hours.
                </p>
                <Button
                  onClick={() => setRequestSubmitted(false)}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/20"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmitRequest} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm text-secondary/70 mb-2">
                      Request Title *
                    </label>
                    <Input
                      type="text"
                      name="requestTitle"
                      value={formData.requestTitle}
                      onChange={handleInputChange}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-secondary/30"
                      placeholder="Custom Paint Job"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-paragraph text-sm text-secondary/70 mb-2">
                    Car Model Preference
                  </label>
                  <Input
                    type="text"
                    name="carModelPreference"
                    value={formData.carModelPreference}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-secondary/30"
                    placeholder="e.g., Lamborghini Aventador, Ferrari 488"
                  />
                </div>

                <div>
                  <label className="block font-paragraph text-sm text-secondary/70 mb-2">
                    Color Preferences
                  </label>
                  <Input
                    type="text"
                    name="colorPreferences"
                    value={formData.colorPreferences}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/20 text-white placeholder:text-secondary/30"
                    placeholder="e.g., Matte Black, Neon Red accents"
                  />
                </div>

                <div>
                  <label className="block font-paragraph text-sm text-secondary/70 mb-2">
                    Detailed Description *
                  </label>
                  <Textarea
                    name="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="bg-white/5 border-white/20 text-white placeholder:text-secondary/30 resize-none"
                    placeholder="Describe your customization vision in detail. Include any specific requirements, inspirations, or features you'd like..."
                  />
                </div>

                {selectedOptions.length > 0 && (
                  <div className="bg-black/30 rounded-lg p-4">
                    <p className="font-paragraph text-sm text-secondary/70 mb-2">
                      Selected Options: {selectedOptions.length}
                    </p>
                    <p className="font-paragraph text-xs text-secondary/50">
                      Your selected customization options will be included with this request
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-paragraph text-sm uppercase tracking-wider h-12"
                >
                  Submit Customization Request
                </Button>

                <p className="font-paragraph text-xs text-secondary/50 text-center">
                  Our expert team will review your request and provide a detailed quote within 48 hours
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
