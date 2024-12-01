import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedListProps {
  items: string[];
  className?: string;
}

export function AnimatedList({ items, className }: AnimatedListProps) {
  return (
    <motion.ul className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="flex items-center space-x-2"
        >
          <div className="h-2 w-2 bg-primary rounded-full" />
          <span>{item}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}