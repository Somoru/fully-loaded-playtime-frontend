import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad, ShieldCheck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 py-16 bg-gradient-to-b from-housie-darkPurple to-gray-900">
      <div className="w-full max-w-[95vw] sm:max-w-md space-y-12 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <div className="absolute inset-0 bg-housie-gold/30 rounded-full animate-pulse-slow"></div>
              <div className="absolute inset-2 bg-housie-gold/60 rounded-full flex items-center justify-center">
                <Gamepad className="h-8 w-8 sm:h-10 sm:w-10 text-housie-darkPurple" />
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Fully Loaded <span className="text-housie-gold">Housie</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8">
            India's favorite digital tambola game
          </p>

          <div className="space-y-3 sm:space-y-4 w-full">
            <Button 
              onClick={() => navigate("/login")}
              className="w-full py-4 sm:py-6 text-base sm:text-lg button-gold rounded-xl"
            >
              Play Now
            </Button>

            <Button 
              onClick={() => navigate("/admin")}
              variant="outline"
              className="w-full py-4 sm:py-6 text-base sm:text-lg rounded-xl flex justify-center items-center gap-2"
            >
              <ShieldCheck className="h-5 w-5" />
              Admin Login
            </Button>
          </div>
        </div>

        <div className="text-center space-y-8">
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-2">How to Play</h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              Join a game, select your tickets, and mark numbers as they're called.
              Win exciting prizes for completing patterns!
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <span className="underline underline-offset-2">Privacy Policy</span>
            <span className="underline underline-offset-2">Terms of Service</span>
            <span className="underline underline-offset-2">Help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
