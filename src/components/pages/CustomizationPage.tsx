import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, RotateCw } from 'lucide-react';
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
import * as THREE from 'three';

export default function CustomizationPage() {
  const [options, setOptions] = useState<CustomizationOptions[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const { toast } = useToast();
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const carRef = useRef<THREE.Group | null>(null);
  const rotationSpeedRef = useRef(0.005);

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

  // Initialize 3D car scene
  useEffect(() => {
    if (!mountRef.current || loading) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 3);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff0000, 0.5);
    pointLight.position.set(-5, 2, 3);
    scene.add(pointLight);

    // Create 3D car model
    const carGroup = new THREE.Group();
    carRef.current = carGroup;

    // Car body
    const bodyGeometry = new THREE.BoxGeometry(2, 1, 4);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      metalness: 0.7,
      roughness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    body.castShadow = true;
    carGroup.add(body);

    // Car roof
    const roofGeometry = new THREE.BoxGeometry(1.8, 0.8, 2);
    const roofMaterial = new THREE.MeshStandardMaterial({
      color: 0xcc0000,
      metalness: 0.7,
      roughness: 0.2,
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 1.3;
    roof.position.z = -0.3;
    roof.castShadow = true;
    carGroup.add(roof);

    // Windows
    const windowGeometry = new THREE.BoxGeometry(0.8, 0.6, 1.2);
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.3,
      roughness: 0.1,
      transparent: true,
      opacity: 0.6,
    });
    const frontWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    frontWindow.position.set(0, 1.2, 0.8);
    carGroup.add(frontWindow);

    const rearWindow = new THREE.Mesh(windowGeometry, windowMaterial);
    rearWindow.position.set(0, 1.2, -0.8);
    carGroup.add(rearWindow);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.5,
      roughness: 0.4,
    });

    const wheels = [
      { x: -0.8, z: 1 },
      { x: 0.8, z: 1 },
      { x: -0.8, z: -1 },
      { x: 0.8, z: -1 },
    ];

    wheels.forEach(({ x, z }) => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(x, 0.4, z);
      wheel.castShadow = true;
      carGroup.add(wheel);
    });

    // Headlights
    const headlightGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const headlightMaterial = new THREE.MeshStandardMaterial({
      color: 0xffff00,
      emissive: 0xffff00,
      emissiveIntensity: 0.5,
    });
    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.position.set(-0.5, 0.6, 2);
    carGroup.add(leftHeadlight);

    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.position.set(0.5, 0.6, 2);
    carGroup.add(rightHeadlight);

    scene.add(carGroup);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(10, 10);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.1,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (carRef.current) {
        carRef.current.rotation.y += rotationSpeedRef.current;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [loading]);

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

      {/* 3D Car Model Section */}
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
              3D Car Customization
            </h2>
            <p className="font-paragraph text-lg text-secondary/70">
              Explore our premium car model in interactive 3D
            </p>
          </motion.div>

          {/* 3D Car Model */}
          <div className="relative h-96 mb-16 rounded-xl overflow-hidden border border-primary/20 bg-black">
            <div ref={mountRef} className="w-full h-full" />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => {
                  rotationSpeedRef.current = rotationSpeedRef.current === 0 ? 0.005 : 0;
                }}
                className="bg-primary/80 hover:bg-primary text-white p-2 rounded-lg transition-colors"
                title="Toggle rotation"
              >
                <RotateCw size={20} />
              </button>
            </div>
          </div>
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
