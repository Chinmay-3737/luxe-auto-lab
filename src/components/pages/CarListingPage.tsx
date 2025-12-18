import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { PremiumCars, CarCategories } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function CarListingPage() {
  const { slug } = useParams<{ slug: string }>();
  const [cars, setCars] = useState<PremiumCars[]>([]);
  const [category, setCategory] = useState<CarCategories | null>(null);
  const [monsterTruckCars, setMonsterTruckCars] = useState<PremiumCars[]>([]);
  const [currentMonsterTruckIndex, setCurrentMonsterTruckIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'high'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category
        const { items: categories } = await BaseCrudService.getAll<CarCategories>('carcategories');
        const currentCategory = categories.find(cat => cat.slug === slug);
        setCategory(currentCategory || null);

        // Fetch all cars with category reference
        const { items: allCars } = await BaseCrudService.getAll<PremiumCars>('premiumcars', ['category']);

        if (currentCategory) {
          // Filter cars for current category
          const filteredCars = allCars.filter(
            car => car.availability && typeof car.category === 'object' && car.category?._id === currentCategory._id
          );
          setCars(filteredCars);
        }

        // Always fetch monster truck cars for the featured section
        const monsterTrucksCategory = categories.find(cat => cat.slug === 'monster-trucks');
        if (monsterTrucksCategory) {
          const monsterTrucks = allCars.filter(
            car => car.availability && typeof car.category === 'object' && car.category?._id === monsterTrucksCategory._id
          );
          setMonsterTruckCars(monsterTrucks);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const filteredCars = cars.filter(car => {
    if (priceFilter === 'all') return true;
    if (priceFilter === 'low') return (car.price || 0) < 200000;
    if (priceFilter === 'high') return (car.price || 0) >= 200000;
    return true;
  });

  const handlePrevMonsterTruck = () => {
    setCurrentMonsterTruckIndex((prev) =>
      prev === 0 ? monsterTruckCars.length - 1 : prev - 1
    );
  };

  const handleNextMonsterTruck = () => {
    setCurrentMonsterTruckIndex((prev) =>
      prev === monsterTruckCars.length - 1 ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold text-white mb-4">Category Not Found</h2>
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 lg:px-20">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/categories"
              className="inline-flex items-center font-paragraph text-sm text-secondary/70 hover:text-primary mb-6 transition-colors"
            >
              ← Back to Categories
            </Link>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tight">
              {category.categoryName}
            </h1>
            <p className="font-paragraph text-lg text-secondary/70 max-w-3xl">
              {category.categoryDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Monster Trucks Featured Section */}
      {monsterTruckCars.length > 0 && (
        <section className="py-16 px-6 lg:px-20">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
                {/* Left Side - Featured Monster Truck */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                      Monster Trucks
                    </h2>
                    <p className="font-paragraph text-lg text-secondary/70 mb-8">
                      Experience the ultimate in off-road power and performance with our exclusive monster truck collection
                    </p>
                  </div>

                  {/* Featured Monster Truck Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-heading font-bold text-white mb-2">
                        {monsterTruckCars[currentMonsterTruckIndex].make} {monsterTruckCars[currentMonsterTruckIndex].model}
                      </h3>
                      <p className="font-paragraph text-secondary/70 mb-4">
                        {monsterTruckCars[currentMonsterTruckIndex].description}
                      </p>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/5 rounded-lg p-4">
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Year</p>
                          <p className="font-paragraph text-lg font-semibold text-white">
                            {monsterTruckCars[currentMonsterTruckIndex].year}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Horsepower</p>
                          <p className="font-paragraph text-lg font-semibold text-white">
                            {monsterTruckCars[currentMonsterTruckIndex].horsepower} HP
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Top Speed</p>
                          <p className="font-paragraph text-lg font-semibold text-white">
                            {monsterTruckCars[currentMonsterTruckIndex].topSpeed} mph
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Price</p>
                          <p className="font-paragraph text-lg font-semibold text-primary">
                            ${monsterTruckCars[currentMonsterTruckIndex].price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handlePrevMonsterTruck}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                          aria-label="Previous monster truck"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <span className="font-paragraph text-sm text-secondary/70">
                          {currentMonsterTruckIndex + 1} / {monsterTruckCars.length}
                        </span>
                        <button
                          onClick={handleNextMonsterTruck}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                          aria-label="Next monster truck"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      <Link
                        to="/category/monster-trucks"
                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors"
                      >
                        View All
                        <ArrowRight className="ml-2" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right Side - Monster Truck Image and Carousel */}
                <div className="flex flex-col">
                  {/* Main Image */}
                  <motion.div
                    key={monsterTruckCars[currentMonsterTruckIndex]._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-80 lg:h-96 rounded-xl overflow-hidden mb-6"
                  >
                    <Image
                      src={
                        monsterTruckCars[currentMonsterTruckIndex].mainImage ||
                        'https://static.wixstatic.com/media/04c535_71f86e604c7d4d12be1b7c5c9e515781~mv2.png?originWidth=384&originHeight=256'
                      }
                      alt={`${monsterTruckCars[currentMonsterTruckIndex].make} ${monsterTruckCars[currentMonsterTruckIndex].model}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Thumbnail Carousel */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {monsterTruckCars.map((truck, index) => (
                      <motion.button
                        key={truck._id}
                        onClick={() => setCurrentMonsterTruckIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentMonsterTruckIndex
                            ? 'border-primary'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <Image
                          src={
                            truck.mainImage ||
                            'https://static.wixstatic.com/media/04c535_71f86e604c7d4d12be1b7c5c9e515781~mv2.png?originWidth=384&originHeight=256'
                          }
                          alt={`${truck.make} ${truck.model}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ... keep existing code (Filter Section) ... */}
      <section className="px-6 lg:px-20 pb-8">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-secondary/50" />
              <span className="font-paragraph text-sm text-secondary/70">
                {filteredCars.length} {filteredCars.length === 1 ? 'vehicle' : 'vehicles'} available
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPriceFilter('all')}
                className={`px-4 py-2 rounded-lg font-paragraph text-sm transition-colors ${
                  priceFilter === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-secondary/70 hover:bg-white/10'
                }`}
              >
                All Prices
              </button>
              <button
                onClick={() => setPriceFilter('low')}
                className={`px-4 py-2 rounded-lg font-paragraph text-sm transition-colors ${
                  priceFilter === 'low'
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-secondary/70 hover:bg-white/10'
                }`}
              >
                Under $200K
              </button>
              <button
                onClick={() => setPriceFilter('high')}
                className={`px-4 py-2 rounded-lg font-paragraph text-sm transition-colors ${
                  priceFilter === 'high'
                    ? 'bg-primary text-white'
                    : 'bg-white/5 text-secondary/70 hover:bg-white/10'
                }`}
              >
                $200K+
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="py-8 px-6 lg:px-20 pb-24">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/car/${car._id}`}
                  className="group block bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all"
                >
                  {/* Car Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={car.mainImage || 'https://static.wixstatic.com/media/04c535_71f86e604c7d4d12be1b7c5c9e515781~mv2.png?originWidth=384&originHeight=256'}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-lg">
                      <span className="font-paragraph text-xs text-white font-semibold">
                        {car.year}
                      </span>
                    </div>
                  </div>

                  {/* Car Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-primary transition-colors">
                      {car.make} {car.model}
                    </h3>
                    <p className="font-paragraph text-sm text-secondary/70 mb-4 line-clamp-2">
                      {car.description}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {car.horsepower && (
                        <div className="bg-black/30 rounded-lg p-2">
                          <p className="font-paragraph text-xs text-secondary/50">Horsepower</p>
                          <p className="font-paragraph text-sm text-white font-semibold">{car.horsepower} HP</p>
                        </div>
                      )}
                      {car.topSpeed && (
                        <div className="bg-black/30 rounded-lg p-2">
                          <p className="font-paragraph text-xs text-secondary/50">Top Speed</p>
                          <p className="font-paragraph text-sm text-white font-semibold">{car.topSpeed} mph</p>
                        </div>
                      )}
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <p className="font-paragraph text-xs text-secondary/50 mb-1">Starting at</p>
                        <p className="text-2xl font-heading font-bold text-primary">
                          ${car.price?.toLocaleString()}
                        </p>
                      </div>
                      <div className="inline-flex items-center font-paragraph text-sm text-white group-hover:translate-x-2 transition-transform">
                        View Details
                        <ArrowRight className="ml-2" size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

           {filteredCars.length === 0 && (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary/50">
                No vehicles available in this category at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
