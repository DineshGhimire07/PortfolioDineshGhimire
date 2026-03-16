import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { ClipPathLinks } from "../components/ui/ClipPathLinks";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

export default function Connect({ onNavigate }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="min-h-screen bg-black flex flex-col w-full overflow-x-hidden"
    >
      <SEO 
        title="Connect" 
        description="Get in touch with Dinesh Ghimire for brand collaborations, data analytics projects, or business strategy discussions."
        canonical="https://ghimire-dinesh.com.np/connect"
      />
      <Navbar onNavigate={onNavigate} />
      
      {/* Navbar Spacer */}
      <div className="h-40 md:h-64" />

      <div className="flex-1 w-full flex flex-col items-center px-6 pb-20">
        <div className="max-w-4xl w-full space-y-20 mt-20">
          <div className="space-y-4 text-center flex flex-col items-center">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-7xl font-display font-bold tracking-tighter text-white"
            >
              Let's build <br /> something <span className="text-zinc-500 italic">together.</span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <ClipPathLinks />
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </motion.main>
  );
}
