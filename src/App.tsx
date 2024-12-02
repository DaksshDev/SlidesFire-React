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
import { PasswordModal } from '@/components/Presentation/PasswordModal';
import { FullscreenModal } from '@/components/Presentation/FullscreenModal';
import { LightModeModal } from '@/components/Presentation/LightModeModal';
import { createRoot } from 'react-dom/client';
import { FaFire } from 'react-icons/fa';

const RotationWarningModal = () => (
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
      <div className="text-center space-y-6">
        <motion.div 
          className="relative w-24 h-24 mx-auto"
          initial={{ rotate: -90 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl blur-xl opacity-20" />
          <div className="relative bg-gradient-to-br from-orange-500/80 to-pink-600/80 w-full h-full rounded-2xl flex items-center justify-center">
            <FaFire className="w-12 h-12 text-white" />
          </div>
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">
            Rotate Your Device! 📱
          </h2>
          <p className="text-gray-400">FireSlides works best in landscape mode for optimal viewing experience.</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

function App() {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(() => {
    const saved = localStorage.getItem('currentSlide');
    return saved ? parseInt(saved) : 1;
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [textSelectable, setTextSelectable] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const hasPassword = localStorage.getItem('slides_password');
    const isAuth = localStorage.getItem('slides_authenticated');
    return !hasPassword || isAuth === 'true';
  });
  const [hasAttempted, setHasAttempted] = useState(false);
  const [showRotationWarning, setShowRotationWarning] = useState(false);

  // Persist current slide
  useEffect(() => {
    localStorage.setItem('currentSlide', currentSlide.toString());
  }, [currentSlide]);

  // Add slide navigation handler
  const handleSlideNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slideNumber = parseInt(e.target.value);
    if (slideNumber >= 1 && slideNumber <= slides.length) {
      setCurrentSlide(slideNumber - 1); // Adjust for zero-based index
    }
  };

  // Check fullscreen on mount and changes
  useEffect(() => {
    const checkFullscreen = () => {
      const isFS = document.fullscreenElement !== null;
      setIsFullscreen(isFS);
      
      if (!isFS && !localStorage.getItem('fullscreen_dismissed')) {
        const modalRoot = document.createElement('div');
        modalRoot.id = 'modal-root';
        document.body.appendChild(modalRoot);
        
        const root = createRoot(modalRoot);
        
        const handleEnterFullscreen = () => {
          document.documentElement.requestFullscreen();
          root.unmount();
          document.body.removeChild(modalRoot);
        };
        
        const handleDismiss = () => {
          localStorage.setItem('fullscreen_dismissed', 'true');
          root.unmount();
          document.body.removeChild(modalRoot);
        };
        
        root.render(
          <FullscreenModal 
            onEnterFullscreen={handleEnterFullscreen} 
            onDismiss={handleDismiss}
          />
        );
      }
    };

    const timer = setTimeout(checkFullscreen, 1000);
    document.addEventListener('fullscreenchange', checkFullscreen);
    
    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', checkFullscreen);
    };
  }, []);

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

  const handlePasswordSubmit = (password: string) => {
    const correctPassword = localStorage.getItem('slides_password') || 'none';
    if (password === correctPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('slides_authenticated', 'true');
    } else {
      setHasAttempted(true);
    }
  };

  // Replace the light mode warning toast with modal
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    if (theme === 'light' && !localStorage.getItem('light_mode_dismissed')) {
      const modalRoot = document.createElement('div');
      modalRoot.id = 'modal-root';
      document.body.appendChild(modalRoot);
      
      const root = createRoot(modalRoot);
      
      const handleSwitchTheme = () => {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
        root.unmount();
        document.body.removeChild(modalRoot);
      };
      
      const handleContinue = () => {
        localStorage.setItem('light_mode_dismissed', 'true');
        root.unmount();
        document.body.removeChild(modalRoot);
      };
      
      root.render(
        <LightModeModal 
          onSwitchTheme={handleSwitchTheme} 
          onContinue={handleContinue}
        />
      );
    }
  }, []);

  // Add mobile detection and auto-scroll enable
  useEffect(() => {
    const enableScrollForMobile = () => {
      if (window.innerWidth <= 768) {
        setScrollEnabled(true);
      }
    };

    // Check on mount
    enableScrollForMobile();
    
    // Check on resize
    window.addEventListener('resize', enableScrollForMobile);
    return () => window.removeEventListener('resize', enableScrollForMobile);
  }, []);

  // Update rotation warning check to be more strict
  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerWidth <= 768) {
        const isPortrait = window.innerHeight > window.innerWidth;
        setShowRotationWarning(isPortrait);
      } else {
        setShowRotationWarning(false);
      }
    };

    // Check immediately
    checkOrientation();
    
    // Add event listeners for both resize and orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', () => {
      // Add small delay to ensure accurate reading after orientation change
      setTimeout(checkOrientation, 100);
    });

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (!isAuthenticated) {
    return <PasswordModal onSubmit={handlePasswordSubmit} hasAttempted={hasAttempted} />;
  }

  return (
    <div className={cn(
      "w-full h-screen bg-background text-foreground overflow-hidden",
      scrollEnabled ? "relative" : "fixed inset-0",
      textSelectable ? "" : "select-none",
      "slide-container"
    )}>
      <motion.div 
        className="fixed top-4 left-4 z-[9999]"
        animate={{ 
          opacity: controlsVisible ? 1 : 0,
          y: controlsVisible ? 0 : -20 
        }}
        transition={{ duration: 0.2 }}
      >
        <ThemeSwitcher />
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div key={currentSlide} className="slide-content">
          <Slide
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
        </motion.div>
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

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md shadow-lg border border-border bg-background">
          <input
            type="number"
            value={currentSlide + 1}
            onChange={handleSlideNumberChange}
            min={1}
            max={slides.length}
            className="w-12 bg-transparent text-sm font-medium text-foreground 
              focus:outline-none text-center [-moz-appearance:_textfield] 
              [&::-webkit-outer-spin-button]:appearance-none 
              [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-sm font-medium text-muted-foreground">
            / {slides.length}
          </span>
        </div>

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
      {showRotationWarning && <RotationWarningModal />}
    </div>
  );
}

export default App;