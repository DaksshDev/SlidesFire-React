import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, MousePointerClick } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slide } from '@/components/Presentation/Slide';
import { ThemeSwitcher } from '@/components/Presentation/ThemeSwitcher';
import { slides } from '@/config/slides';
import { useToast } from "@/hooks/use-toast";
import './App.css';
import { cn } from '@/lib/utils';

function App() {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [textSelectable, setTextSelectable] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);

  // Check fullscreen on mount and changes
  useEffect(() => {
    const checkFullscreen = () => {
      const isFS = document.fullscreenElement !== null;
      setIsFullscreen(isFS);
      
      if (!isFS) {
        const { dismiss } = toast({
          title: "Enhance Your Experience! 🎥",
          description: "Use F11 to go fullscreen for the best experience.",
          action: (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                document.documentElement.requestFullscreen();
                dismiss(); // Dismiss the toast when button is clicked
              }}
              className="gap-2"
            >
              <Maximize2 className="h-4 w-4" />
              Go Fullscreen
            </Button>
          ),
          duration: 5000,
        });
      }
    };

    // Add a small delay to ensure the toast system is ready
    const timer = setTimeout(checkFullscreen, 1000);
    
    // Add fullscreen change listener
    document.addEventListener('fullscreenchange', checkFullscreen);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', checkFullscreen);
    };
  }, [toast]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // Add keyboard event listener for controls visibility
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key.toLowerCase()) {
        case 'arrowright':
        case ' ': // Space bar
          nextSlide();
          break;
        case 'arrowleft':
          prevSlide();
          break;
        case 'h': // Toggle controls visibility
          setControlsVisible(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentSlide]); // Keep currentSlide in dependencies

  return (
    <div className={cn(
      "w-full h-screen",
      scrollEnabled ? "relative" : "fixed inset-0",
      textSelectable ? "" : "select-none"
    )}>
      <motion.div 
        className="fixed top-4 left-4"
        animate={{ 
          opacity: controlsVisible ? 1 : 0,
          y: controlsVisible ? 0 : -20 
        }}
        transition={{ duration: 0.2 }}
      >
        <ThemeSwitcher />
      </motion.div>
      
      <AnimatePresence mode="wait">
        <Slide
          key={currentSlide}
          background={slides[currentSlide].background}
        >
          {typeof slides[currentSlide].content === 'function' 
            ? slides[currentSlide].content({ 
                scrollEnabled, 
                setScrollEnabled 
              })
            : slides[currentSlide].content
          }
        </Slide>
      </AnimatePresence>
      
      <motion.div 
        className="fixed bottom-4 left-20 flex items-center space-x-4"
        animate={{ 
          opacity: controlsVisible ? 1 : 0,
          y: controlsVisible ? 0 : 20 
        }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="secondary"
          size="default"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="shadow-lg border border-border w-10 h-10 p-0"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </Button>
        <span className="text-sm font-medium px-3 py-1.5 rounded-md shadow-lg border border-border">
          {currentSlide + 1} / {slides.length}
        </span>
        <Button
          variant="secondary"
          size="default"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="shadow-lg border border-border w-10 h-10 p-0"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </Button>
        <Button
          variant="secondary"
          size="default"
          onClick={() => setTextSelectable(!textSelectable)}
          className="shadow-lg border border-border px-3 flex items-center gap-2"
        >
          {textSelectable ? (
            <>
              <MousePointerClick className="h-4 w-4" />
              <span className="text-sm">Disable Select</span>
            </>
          ) : (
            <>
              <MousePointerClick className="h-4 w-4" />
              <span className="text-sm">Enable Select</span>
            </>
          )}
        </Button>
      </motion.div>

      <div className="fixed bottom-4 right-4 text-sm text-muted-foreground/50">
        Powered by FireSlides
      </div>
    </div>
  );
}

export default App;