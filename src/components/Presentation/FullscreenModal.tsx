import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';
import { FaFire } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

interface FullscreenModalProps {
  onEnterFullscreen: () => void;
  onDismiss: () => void;
}

export function FullscreenModal({ onEnterFullscreen, onDismiss }: FullscreenModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.7 }}
        className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-2xl p-8 max-w-md w-full border border-orange-500/20 shadow-2xl"
      >
        <div className="text-center space-y-6 mb-8">
          <motion.div 
            className="relative w-24 h-24 mx-auto"
            initial={{ rotate: -10 }}
            animate={{ rotate: 10 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl blur-xl opacity-20" />
            <div className="relative bg-gradient-to-br from-orange-500/80 to-pink-600/80 w-full h-full rounded-2xl flex items-center justify-center">
              <FaFire className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">
              Enhance Your Experience! 🎥
            </h2>
            <p className="text-gray-400">Use fullscreen for the best presentation experience</p>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={onEnterFullscreen}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 
              text-white py-6 rounded-lg font-medium shadow-lg shadow-orange-500/20
              transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30
              flex items-center justify-center gap-2"
          >
            <Maximize2 className="w-5 h-5" />
            Go Fullscreen
          </Button>
          
          <Button
            variant="ghost"
            onClick={onDismiss}
            className="w-full text-gray-400 hover:text-gray-300"
          >
            Maybe Later
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
} 