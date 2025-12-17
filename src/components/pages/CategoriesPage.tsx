import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { CarCategories, PremiumCars } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CarCategories[]>([]);
  const [categoryWithCars, setCategoryWithCars] = useState<{ category: CarCategories; cars: PremiumCars[] } | null>(null);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { items } = await BaseCrudService.getAll<CarCategories>('carcategories');
        const activeCategories = items.filter(cat => cat.isActive);
        setCategories(activeCategories);

        // Fetch monster trucks category with its cars
        const monsterTrucksCategory = activeCategories.find(cat => cat.slug === 'monster-trucks');
        if (monsterTrucksCategory) {
          const { items: allCars } = await BaseCrudService.getAll<PremiumCars>('premiumcars', ['category']);
          const monsterTruckCars = allCars.filter(
            car => car.availability && typeof car.category === 'object' && car.category?._id === monsterTrucksCategory._id
          );
          setCategoryWithCars({
            category: monsterTrucksCategory,
            cars: monsterTruckCars,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePrevCar = () => {
    if (categoryWithCars) {
      setCurrentCarIndex((prev) => (prev === 0 ? categoryWithCars.cars.length - 1 : prev - 1));
    }
  };

  const handleNextCar = () => {
    if (categoryWithCars) {
      setCurrentCarIndex((prev) => (prev === categoryWithCars.cars.length - 1 ? 0 : prev + 1));
    }
  };

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
              Premium <span className="text-primary">Collection</span>
            </h1>
            <p className="font-paragraph text-lg md:text-xl text-secondary/70 max-w-3xl mx-auto">
              Explore our exclusive range of luxury vehicles, each category curated for the discerning driver
            </p>
          </motion.div>
        </div>
      </section>

      {/* Monster Trucks Featured Section */}
      {categoryWithCars && categoryWithCars.cars.length > 0 && (
        <section className="py-16 px-6 lg:px-20">
          <div className="max-w-[120rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
                {/* Left Side - Featured Car */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                      {categoryWithCars.category.categoryName}
                    </h2>
                    <p className="font-paragraph text-lg text-secondary/70 mb-8">
                      {categoryWithCars.category.categoryDescription}
                    </p>
                  </div>

                  {/* Featured Car Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-heading font-bold text-white mb-2">
                        {categoryWithCars.cars[currentCarIndex].make} {categoryWithCars.cars[currentCarIndex].model}
                      </h3>
                      <p className="font-paragraph text-secondary/70 mb-4">
                        {categoryWithCars.cars[currentCarIndex].description}
                      </p>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/5 rounded-lg p-4">
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Year</p>
                          <p className="font-paragraph text-lg font-semibold text-white">
                            {categoryWithCars.cars[currentCarIndex].year}
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Horsepower</p>
                          <p className="font-paragraph text-lg font-semibold text-white">
                            {categoryWithCars.cars[currentCarIndex].horsepower} HP
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Top Speed</p>
                          <p className="font-paragraph text-lg font-semibold text-white">
                            {categoryWithCars.cars[currentCarIndex].topSpeed} mph
                          </p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4">
                          <p className="font-paragraph text-xs text-secondary/50 mb-1">Price</p>
                          <p className="font-paragraph text-lg font-semibold text-primary">
                            ${categoryWithCars.cars[currentCarIndex].price?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={handlePrevCar}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                          aria-label="Previous car"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <span className="font-paragraph text-sm text-secondary/70">
                          {currentCarIndex + 1} / {categoryWithCars.cars.length}
                        </span>
                        <button
                          onClick={handleNextCar}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                          aria-label="Next car"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>

                      <Link
                        to={`/category/${categoryWithCars.category.slug}`}
                        className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg font-paragraph font-semibold hover:bg-primary/90 transition-colors"
                      >
                        View All
                        <ArrowRight className="ml-2" size={16} />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right Side - Car Image and Carousel */}
                <div className="flex flex-col">
                  {/* Main Image */}
                  <motion.div
                    key={categoryWithCars.cars[currentCarIndex]._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative h-80 lg:h-96 rounded-xl overflow-hidden mb-6"
                  >
                    <Image
                      src={
                        categoryWithCars.cars[currentCarIndex].mainImage ||
                        'https://static.wixstatic.com/media/04c535_71f86e604c7d4d12be1b7c5c9e515781~mv2.png?originWidth=384&originHeight=256'
                      }
                      alt={`${categoryWithCars.cars[currentCarIndex].make} ${categoryWithCars.cars[currentCarIndex].model}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Thumbnail Carousel */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {categoryWithCars.cars.map((car, index) => (
                      <motion.button
                        key={car._id}
                        onClick={() => setCurrentCarIndex(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentCarIndex
                            ? 'border-primary'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <Image
                          src={
                            car.mainImage ||
                            'https://static.wixstatic.com/media/04c535_71f86e604c7d4d12be1b7c5c9e515781~mv2.png?originWidth=384&originHeight=256'
                          }
                          alt={`${car.make} ${car.model}`}
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

      {/* Categories Grid */}
      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-[120rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group block relative h-96 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all"
                >
                  {/* Category Image */}
                  <div className="absolute inset-0">
                    <Image
                      src={category.categoryImage || 'https://static.wixstatic.com/media/04c535_ef5bed72b8b046d9901835dcd5ed762b~mv2.png?originWidth=576&originHeight=384'}
                      alt={category.categoryName || 'Car category'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  </div>

                  {/* Category Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h2 className="text-3xl font-heading font-bold text-white mb-3 group-hover:text-primary transition-colors">
                      {category.categoryName}
                    </h2>
                    <p className="font-paragraph text-sm text-secondary/80 mb-4 line-clamp-2">
                      {category.categoryDescription}
                    </p>
                    <div className="inline-flex items-center font-paragraph text-sm text-primary group-hover:translate-x-2 transition-transform">
                      View Collection
                      <ArrowRight className="ml-2" size={16} />
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/30 rounded-xl transition-colors pointer-events-none" />
                </Link>
              </motion.div>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-secondary/50">
                No categories available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
