import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { CarCategories } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CarCategories[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { items } = await BaseCrudService.getAll<CarCategories>('carcategories');
        const activeCategories = items.filter(cat => cat.isActive);
        setCategories(activeCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

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
