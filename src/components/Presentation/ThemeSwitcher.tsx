import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

      <AlertDialog open={showWarning} onOpenChange={setShowWarning}>
        <AlertDialogContent className="bg-card border border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">
              ⚠️ Light Mode Warning
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-3">
              <p className="text-yellow-500 font-medium">
                You're about to enable light mode!
              </p>
              <p className="text-muted-foreground">
                Your eyes might never forgive you for this decision. Are you sure you want to proceed? 🕶️
              </p>
              <p className="text-xs text-muted-foreground italic">
                (Pro tip: Dark mode is easier on your eyes and looks cooler too!)
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-border">
              Keep My Eyes Safe
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={toggleTheme}
              className="bg-yellow-500 hover:bg-yellow-600"
            >
              I Like Pain 😎
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}