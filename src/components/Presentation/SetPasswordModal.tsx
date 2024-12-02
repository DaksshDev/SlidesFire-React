import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { FaFire } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SetPasswordModalProps {
  onSubmit: (password: string) => void;
  onCancel: () => void;
}

export function SetPasswordModal({ onSubmit, onCancel }: SetPasswordModalProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

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
              Set New Password
            </h2>
            <p className="text-gray-400">Protect your presentation with a password</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border-2 border-gray-700/50 text-gray-100 pr-12
                focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20
                transition-all duration-200 group-hover:border-orange-500/30"
              placeholder="Enter new password"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300
                transition-colors duration-200"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 
                text-white py-3 rounded-lg font-medium shadow-lg shadow-orange-500/20
                transition-all duration-200 hover:shadow-xl hover:shadow-orange-500/30
                flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              Set Password
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="w-full text-gray-400 hover:text-gray-300"
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
} 