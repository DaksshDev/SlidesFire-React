import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Heart, ExternalLink, Link, BookOpen, Code2,
  Image as ImageIcon, Sparkles, Palette, Stars, 
  Lightbulb, Rocket, Zap, Camera, Wand2, ZoomIn, ZoomOut, Settings2,
  ScrollText
} from 'lucide-react';
import { AnimatedList } from '@/components/Presentation/AnimatedList';
import { cn } from "@/lib/utils";
import confetti from 'canvas-confetti';
import { useState } from 'react';

// Define reusable animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

const scaleIn = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { duration: 0.8 }
};

// Add new animation variants
const slideInFromRight = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8 }
};

const rotateIn = {
  initial: { rotate: 180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  transition: { duration: 0.8 }
};

const bounceIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: [0, 1.2, 1],
    opacity: 1
  },
  transition: { 
    duration: 0.8,
    times: [0, 0.8, 1]
  }
};

const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Add new animation variant for image hover
const imageHoverEffect = {
  whileHover: { 
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
  },
  transition: { type: "spring", stiffness: 300 }
};

// Add new animation variant for sparkle effect
const sparkleEffect = {
  animate: {
    rotate: [0, 10, -10, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Update the animation variants at the top of the file
const glowEffect = {
  animate: {
    scale: [1, 1.05, 1],
    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  },
  whileHover: {
    scale: 1.1,
    filter: "brightness(1.5) drop-shadow(0 0 8px currentColor)",
  }
};

const flashEffect = {
  animate: {
    opacity: [1, 0.5, 1],
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const colorShiftEffect = {
  animate: {
    filter: ["hue-rotate(0deg)", "hue-rotate(360deg)"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const pulseEffect = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Add these new animation variants
const popIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0
  }
};

// Animated background component with floating blobs
function BlobBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        {/* Primary blob with slow floating animation */}
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        {/* Secondary blob with offset animation */}
        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 -right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </motion.div>
    </div>
  );
}

// Confetti animation function for celebration effects
function fireConfetti() {
  const count = 200;
  const defaults = {
    zIndex: 1000,
  };

  function fire(particleRatio: number, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Create three bursts of confetti for a more dynamic effect
  fire(0.25, {
    spread: 50,
    startVelocity: 45,
    origin: { x: 0, y: 1 },
    colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'],
  });

  fire(0.25, {
    spread: 50,
    startVelocity: 45,
    origin: { x: 1, y: 1 },
    colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'],
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    origin: { x: 0.5, y: 1 },
    colors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'],
  });
}

// Random Word Generator Component
function RandomWordGenerator() {
  const words = [
    "Innovative", "Dynamic", "Interactive", "Customizable", 
    "Powerful", "Flexible", "Engaging", "Responsive",
    "Modern", "Seamless", "Intuitive", "Efficient"
  ];
  
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  const generateWord = () => {
    setIsAnimating(true);
    const newWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(newWord);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 justify-center">
        <Wand2 className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-semibold">Custom Feature Demo</h3>
      </div>
      
      <div className="h-20 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWord}
            {...popIn}
            className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text"
          >
            {currentWord}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generateWord}
        disabled={isAnimating}
        className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg 
                 flex items-center justify-center gap-2 font-medium
                 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Wand2 className="w-4 h-4" />
        Generate Word
      </motion.button>

      <p className="text-sm text-muted-foreground text-center">
        Click to generate a random word with animation
      </p>
    </div>
  );
}

// Update type definition
type SlideProps = {
  scrollEnabled?: boolean;  // Make optional
  setScrollEnabled?: (enabled: boolean) => void;  // Make optional
};

// Update slides array to handle optional props
export const slides = [
  // Slide 1: Welcome
  {
    id: 1,
    content: ({ scrollEnabled = false, setScrollEnabled }: SlideProps) => (
      <div className="text-center space-y-8">
        {setScrollEnabled && ( // Only render button if setter is provided
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-4 right-4 px-3 py-2 bg-primary/10 
                      text-primary rounded-lg flex items-center gap-2 
                      font-medium hover:bg-primary/20 transition-colors"
            onClick={() => setScrollEnabled(!scrollEnabled)}
          >
            <ScrollText className="w-4 h-4" />
            {scrollEnabled ? "Disable Scroll" : "Enable Scroll"}
          </motion.button>
        )}
        
        <motion.div {...scaleIn}>
          <Github className="w-24 h-24 mx-auto text-primary" />
        </motion.div>
        <motion.h1 {...fadeInUp} className="text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Welcome to FireSlides
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          A React-based presentation framework for developers who love to code
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-8 p-4 bg-primary/10 rounded-xl max-w-lg mx-auto backdrop-blur-sm border border-primary/20"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Pro Tip:</span> Press H to toggle controls visibility, 
            and F11 for fullscreen mode! Use the scroll toggle for overflow content. 🚀
          </p>
        </motion.div>
      </div>
    ),
    background: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--card)))',
  },

  // Slide 2: Key Features
  {
    id: 2,
    content: (
      <div className="space-y-8">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Key Features
        </motion.h2>
        <div className="grid grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50"
          >
            <AnimatedList
              items={[
                'Beautiful animations with Framer Motion',
                'Dark/Light mode support',
                'Keyboard navigation',
                'Responsive design',
                'Interactive elements'
              ]}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-card to-card/50 p-8 rounded-2xl shadow-lg border border-border/50"
          >
            <h3 className="text-2xl font-semibold mb-6 text-center">Controls</h3>
            <div className="space-y-4">
              {[
                { key: '→ / Space', desc: 'Next slide' },
                { key: '←', desc: 'Previous slide' },
                { key: 'H', desc: 'Toggle controls' },
                { key: 'F11', desc: 'Fullscreen' }
              ].map((control, index) => (
                <motion.div
                  key={control.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between p-2 bg-background/50 rounded-lg"
                >
                  <span className="font-mono bg-primary/10 px-2 py-1 rounded">{control.key}</span>
                  <span>{control.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <BlobBackground />
      </div>
    ),
  },

  // Slide 3: Creating Slides
  {
    id: 3,
    content: (
      <div className="space-y-8">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Creating Slides
        </motion.h2>
        <div className="grid grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50"
          >
            <h3 className="text-2xl font-semibold mb-6">Basic Structure</h3>
            <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">
{`{
  id: 1,
  content: (
    <div className="space-y-8">
      <motion.h2>Title</motion.h2>
      <p>Content</p>
    </div>
  )
}`}
              </code>
            </pre>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50"
          >
            <h3 className="text-2xl font-semibold">Tips</h3>
            <AnimatedList
              items={[
                'Edit slides in src/config/slides.tsx',
                'Use Framer Motion for animations',
                'Leverage TailwindCSS for styling',
                'Import and use any React component'
              ]}
            />
          </motion.div>
        </div>
        <BlobBackground />
      </div>
    ),
  },

  // Slide 4: Animation Examples with more animations
  {
    id: 4,
    content: (
      <div className="space-y-8">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Animation Examples
        </motion.h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              title: "Fade Up",
              animation: {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8 }
              }
            },
            {
              title: "Scale",
              animation: {
                initial: { opacity: 0, scale: 0 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.8 }
              }
            },
            {
              title: "Slide In",
              animation: {
                initial: { opacity: 0, x: -50 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.8 }
              }
            },
            {
              title: "Rotate",
              animation: {
                initial: { rotate: 180, opacity: 0 },
                animate: { rotate: 0, opacity: 1 },
                transition: { duration: 0.8 }
              }
            },
            {
              title: "Bounce",
              animation: {
                initial: { scale: 0, opacity: 0 },
                animate: { 
                  scale: [0, 1.2, 1],
                  opacity: 1
                },
                transition: { 
                  duration: 0.8,
                  times: [0, 0.8, 1]
                }
              }
            },
            {
              title: "Slide Right",
              animation: {
                initial: { x: 100, opacity: 0 },
                animate: { x: 0, opacity: 1 },
                transition: { duration: 0.8 }
              }
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-semibold text-center">{item.title}</h3>
              <motion.div
                {...item.animation}
                className="h-32 bg-primary/10 rounded-xl flex items-center justify-center"
              >
                {item.title}
              </motion.div>
            </motion.div>
          ))}
        </div>
        <BlobBackground />
      </div>
    ),
  },

  // New Slide: Watermark Customization
  {
    id: 5,
    content: (
      <div className="space-y-8">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Customizing the Watermark
        </motion.h2>
        <div className="grid grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50"
          >
            <h3 className="text-2xl font-semibold mb-6">Watermark Configuration</h3>
            <pre className="bg-background/50 p-4 rounded-lg overflow-x-auto">
              <code className="text-sm">
{`// In App.tsx
<div className="fixed bottom-4 right-4 
     text-sm text-muted-foreground/50">
  Powered by FireSlides
</div>`}
              </code>
            </pre>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50"
          >
            <h3 className="text-2xl font-semibold">Customization Tips</h3>
            <AnimatedList
              items={[
                'Edit text in App.tsx',
                'Adjust position with Tailwind classes',
                'Modify opacity with text-muted-foreground/50',
                'Style with additional Tailwind classes',
                'Remove completely if desired'
              ]}
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-primary/10 rounded-xl max-w-lg mx-auto backdrop-blur-sm border border-primary/20"
        >
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-primary">Note:</span> The watermark helps spread the word about FireSlides while keeping it unobtrusive
          </p>
        </motion.div>
        <BlobBackground />
      </div>
    ),
  },

  // New Slide: Typography Showcase
  {
    id: 6,
    content: (
      <div className="space-y-12">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Typography Examples
        </motion.h2>
        <div className="grid grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50"
          >
            <div className="space-y-4">
              <h1 className="text-5xl font-bold">Heading 1</h1>
              <h2 className="text-4xl font-semibold">Heading 2</h2>
              <h3 className="text-3xl font-medium">Heading 3</h3>
              <h4 className="text-2xl">Heading 4</h4>
              <p className="text-xl">Large Paragraph Text</p>
              <p className="text-base">Regular Paragraph Text</p>
              <p className="text-sm text-muted-foreground">Small Muted Text</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8 bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Text Styles</h3>
              <p className="font-bold">Bold Text Example</p>
              <p className="italic">Italic Text Example</p>
              <p className="underline">Underlined Text</p>
              <p className="bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text font-bold">
                Gradient Text
              </p>
              <p className="text-primary">Primary Color Text</p>
              <div className="bg-primary/10 p-4 rounded-lg">
                <p className="text-primary">Highlighted Block</p>
              </div>
            </div>
          </motion.div>
        </div>
        <BlobBackground />
      </div>
    ),
  },

  // New Slide: Interactive Elements
  {
    id: 7,
    content: (
      <div className="space-y-12">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Interactive Elements
        </motion.h2>
        <div className="grid grid-cols-3 gap-8">
          {/* Hover Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="p-6 bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 hover:border-primary/50 cursor-pointer"
          >
            <BookOpen className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Hover Scale</h3>
            <p className="text-sm text-muted-foreground">
              Card scales up on hover with a smooth transition
            </p>
          </motion.div>

          {/* Pulsing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            {...pulseAnimation}
            className="p-6 bg-primary/10 backdrop-blur-sm rounded-2xl shadow-lg border border-primary/20"
          >
            <Code2 className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pulse Animation</h3>
            <p className="text-sm text-muted-foreground">
              Continuous subtle pulsing effect
            </p>
          </motion.div>

          {/* Interactive Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 space-y-4"
          >
            <Link className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Interactive Links</h3>
            <div className="space-y-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </motion.a>
              <motion.button
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('https://framer.com/motion', '_blank')}
              >
                <span>Framer Motion</span>
                <ExternalLink className="w-3 h-3" />
              </motion.button>
            </div>
          </motion.div>
        </div>
        <BlobBackground />
      </div>
    ),
  },

  // New Slide: Image Showcase
  {
    id: 8,
    content: (
      <div className="space-y-12">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Working with Images
        </motion.h2>
        <div className="grid grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <ImageIcon className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Image Examples</h3>
            </div>
            <motion.div
              className="relative aspect-video rounded-lg overflow-hidden"
              {...imageHoverEffect}
            >
              <img
                src="https://i0.wp.com/picjumbo.com/wp-content/uploads/magical-spring-forest-scenery-during-morning-breeze-free-photo.jpg?w=600&quality=80"
                alt="Nature"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                <p className="text-white">Hover Effect with Gradient Overlay</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50"
          >
            <div className="flex items-center gap-3 mb-4">
              <Camera className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-semibold">Image Styles</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.img
                src="https://img.freepik.com/premium-photo/sample-robot-dinosaur-from-robotic-constructor_185937-44.jpg?semt=ais_hybrid"
                alt="Tech"
                className="w-full h-40 object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              <motion.div
                className="w-full h-40 rounded-lg overflow-hidden"
                whileHover={{ filter: "brightness(1.2)" }}
              >
                <img
                  src="https://henryegloff.com/media/How-to-Code-a-Basic-Webpage-Using-HTML-Tutorial-2.jpg"
                  alt="Code"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
        <BlobBackground />
      </div>
    ),
  },

  // New Slide: Icons and Effects
  {
    id: 9,
    content: (
      <div className="space-y-12">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Icons & Effects
        </motion.h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              icon: <Stars className="w-8 h-8" />,
              title: "Glow Effect",
              effect: glowEffect
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Flash Effect",
              effect: flashEffect
            },
            {
              icon: <Palette className="w-8 h-8" />,
              title: "Color Shift",
              effect: colorShiftEffect
            },
            {
              icon: <Rocket className="w-8 h-8" />,
              title: "Float Effect",
              effect: {
                animate: {
                  y: [0, -10, 0],
                  transition: { 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }
              }
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: "Sparkle Effect",
              effect: sparkleEffect
            },
            {
              icon: <Lightbulb className="w-8 h-8" />,
              title: "Pulse Effect",
              effect: pulseEffect
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center gap-4 p-6 bg-card/50 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 hover:border-primary/50"
            >
              <motion.div
                className="text-primary"
                initial="initial"
                animate="animate"
                whileHover="whileHover"
                {...item.effect}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Interactive Confetti Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fireConfetti()}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold 
                     flex items-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Stars className="w-5 h-5" />
            Click for Celebration!
            <Stars className="w-5 h-5" />
          </motion.button>
          <p className="text-sm text-muted-foreground">
            Try the interactive confetti effect
          </p>
        </motion.div>

        <BlobBackground />
      </div>
    ),
  },

  // New Slide: Fully Customizable
  {
    id: 10,
    content: (
      <div className="space-y-12">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Fully Customizable
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center space-y-4"
        >
          <p className="text-xl text-muted-foreground">
            FireSlides is built to be extended. Add your own components, animations, and interactive features!
          </p>
        </motion.div>

        {/* Random Word Generator Demo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto bg-card/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-border/50"
        >
          <RandomWordGenerator />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto grid grid-cols-2 gap-6"
        >
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50">
            <h3 className="text-lg font-semibold mb-3">Easy to Extend</h3>
            <p className="text-sm text-muted-foreground">
              Add your own React components and integrate them seamlessly into your slides.
            </p>
          </div>
          <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50">
            <h3 className="text-lg font-semibold mb-3">Interactive Features</h3>
            <p className="text-sm text-muted-foreground">
              Create engaging presentations with custom interactive elements.
            </p>
          </div>
        </motion.div>

        <BlobBackground />
      </div>
    ),
  },

  // Replace the Customize Your View slide with a Good Luck slide
  {
    id: 10,
    content: (
      <div className="space-y-12 text-center">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          This slide is for good luck
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl text-muted-foreground"
        >
          You can move on to the next slide
        </motion.p>

        <BlobBackground />
      </div>
    ),
  },

  // Update the Embed Content slide
  {
    id: 11,
    content: (
      <div className="space-y-12">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Embed Content
        </motion.h2>

        <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* YouTube Player */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-video rounded-xl overflow-hidden shadow-xl border border-border/50"
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Never Gonna Give You Up"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="absolute inset-0"
            />
          </motion.div>

          {/* Code Example */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              How to Embed
            </h3>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50">
              <pre className="text-sm text-muted-foreground overflow-x-auto">
                <code>{`// Add to your slides
{
  id: yourSlideNumber,
  content: (
    <div className="relative aspect-video 
                rounded-xl overflow-hidden">
      <iframe
        width="100%"
        height="100%"
        src="https://youtube.com/embed/VIDEO_ID"
        title="YouTube Video"
        allow="accelerometer; autoplay; 
               clipboard-write; encrypted-media"
        className="absolute inset-0"
      />
    </div>
  )
}`}</code>
              </pre>
            </div>
            <p className="text-sm text-muted-foreground">
              Replace VIDEO_ID with your YouTube video ID to embed any video
            </p>
          </motion.div>
        </div>

        <BlobBackground />
      </div>
    ),
  },

  // How to Contribute Slide
  {
    id: 12,
    content: (
      <div className="space-y-12">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          How to Contribute
        </motion.h2>

        <motion.div className="max-w-2xl mx-auto space-y-8">
          <AnimatedList
            items={[
              'Fork the repository on GitHub',
              'Create a new branch for your feature',
              'Make your changes and commit them',
              'Push to your fork and submit a pull request',
              'Join our community of contributors!'
            ]}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50"
          >
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              Quick Start
            </h3>
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>{`git clone https://github.com/YourUsername/FireSlides.git
cd FireSlides
npm install
npm run dev`}</code>
            </pre>
          </motion.div>
        </motion.div>

        <BlobBackground />
      </div>
    ),
  },

  // Contribute Now Slide
  {
    id: 13,
    content: (
      <div className="space-y-12">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Join Our Community
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto text-center"
        >
          <motion.a
            href="https://github.com/DaksshDev/SlidesFire-React"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-6 h-6" />
            Contribute on GitHub
          </motion.a>
        </motion.div>

        <BlobBackground />
      </div>
    ),
  },

  // Update the Scroll Control slide
  {
    id: 14,
    content: ({ scrollEnabled = false, setScrollEnabled }: SlideProps) => (
      <div className="space-y-12">
        <motion.h2 {...fadeInUp} className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text">
          Scroll Control
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-8"
        >
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">Fixed Mode</span> (Default)
              </h3>
              <p className="text-sm text-muted-foreground">
                Professional presentation mode with fixed positioning. Content stays within viewport for a clean, slide-like experience.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-border/50">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span className="text-primary">Scroll Mode</span> (Optional)
              </h3>
              <p className="text-sm text-muted-foreground">
                Changes to relative positioning, enabling native scroll behavior for overflow content.
              </p>
            </div>
          </div>

          <div className="bg-muted/50 p-6 rounded-xl">
            <p className="text-sm text-muted-foreground mb-4">
              <span className="font-semibold text-primary">Implementation:</span> Simple position toggle on the main container.
            </p>
            <pre className="text-xs overflow-x-auto">
              <code>{`<div className={cn(
  "w-full h-screen",
  scrollEnabled ? "relative" : "fixed w-full h-screen inset-0",
  textSelectable ? "" : "select-none"
)}>`}</code>
            </pre>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setScrollEnabled(!scrollEnabled)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg 
                       flex items-center gap-2 font-medium"
            >
              <ScrollText className="w-4 h-4" />
              {scrollEnabled ? "Disable Scroll" : "Enable Scroll"}
            </motion.button>
          </motion.div>
        </motion.div>

        <BlobBackground />
      </div>
    ),
  },

  // Update the Final Call-to-Action slide to id: 14
  {
    id: 14,
    content: (
      <div className="text-center space-y-8 relative">
        <motion.div 
          {...scaleIn}
          onAnimationComplete={() => {
            fireConfetti();
          }}
        >
          <Heart className="w-24 h-24 mx-auto text-primary" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 text-transparent bg-clip-text"
        >
          Start Creating!
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <p className="text-xl text-muted-foreground">
            Now you're ready to create your own amazing presentations
          </p>
          <div className="mt-12 space-y-2">
            <motion.a
              href="https://github.com/DaksshDev/SlidesFire-React"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-4 h-4" />
              View source on GitHub
            </motion.a>
          </div>
        </motion.div>
        <BlobBackground />
      </div>
    ),
    background: 'linear-gradient(to right, hsl(var(--background)), hsl(var(--card)))',
  }
];