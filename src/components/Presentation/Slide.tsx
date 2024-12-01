import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SlideProps {
  children: React.ReactNode;
  className?: string;
  background?: string;
}

export function Slide({ children, className, background }: SlideProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'min-h-screen w-full flex items-center justify-center p-8',
        className
      )}
      style={{
        background: background || 'var(--background)',
      }}
    >
      <div className="max-w-7xl w-full">{children}</div>
    </motion.div>
  );
}