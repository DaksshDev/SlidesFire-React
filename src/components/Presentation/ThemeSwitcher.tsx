import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { motion } from 'framer-motion';
import { FaFire } from 'react-icons/fa';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const [showWarning, setShowWarning] = useState(false);

  const handleThemeToggle = () => {
    if (theme === 'dark') {
      setShowWarning(true);
    } else {
      toggleTheme();
    }
  };

  return (
    <>
      <Button
        variant="secondary"
        size="default"
        className="fixed bottom-4 left-4 shadow-lg border border-border w-10 h-10 p-0"
        onClick={handleThemeToggle}
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5 text-foreground" />
        ) : (
          <Moon className="h-5 w-5 text-foreground" />
        )}
      </Button>

      {showWarning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-[9999]"
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
                  Light Mode Warning! ☀️
                </h2>
                <p className="text-gray-400">Your eyes might never forgive you for this decision.</p>
                <p className="text-sm text-gray-500 italic">
                  (Pro tip: Dark mode is easier on your eyes and looks cooler too!)
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                onClick={() => {
                  toggleTheme();
                  setShowWarning(false);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 
                  text-white py-6 rounded-lg font-medium shadow-lg shadow-orange-500/20
                  transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30
                  flex items-center justify-center gap-2"
              >
                <Sun className="w-5 h-5" />
                I Like Pain 😎
              </Button>
              
              <Button
                variant="ghost"
                onClick={() => setShowWarning(false)}
                className="w-full text-gray-400 hover:text-gray-300"
              >
                Keep My Eyes Safe
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}