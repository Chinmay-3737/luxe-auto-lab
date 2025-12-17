import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Filter } from 'lucide-react';
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
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'high'>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category
        const { items: categories } = await BaseCrudService.getAll<CarCategories>('carcategories');
        const currentCategory = categories.find(cat => cat.slug === slug);
        setCategory(currentCategory || null);

        if (currentCategory) {
          // Fetch cars with category reference
          const { items: allCars } = await BaseCrudService.getAll<PremiumCars>('premiumcars', ['category']);
          const filteredCars = allCars.filter(
            car => car.availability && typeof car.category === 'object' && car.category?._id === currentCategory._id
          );
          setCars(filteredCars);
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

      {/* Filter Section */}
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
