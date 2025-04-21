
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Gamepad, ShieldCheck } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="w-full max-w-md space-y-12 animate-fade-in">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-housie-gold/30 rounded-full animate-pulse-slow"></div>
              <div className="absolute inset-3 bg-housie-gold/60 rounded-full flex items-center justify-center">
                <Gamepad className="h-10 w-10 text-housie-darkPurple" />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            Fully Loaded <span className="text-housie-gold">Housie</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            India's favorite digital tambola game
          </p>
          
          <div className="space-y-4">
            <Button 
              onClick={() => navigate("/login")} 
              className="w-full py-6 text-lg button-gold"
            >
              Play Now
            </Button>
            
            <Button 
              onClick={() => navigate("/admin")} 
              variant="outline"
              className="w-full py-6 text-lg flex justify-center items-center gap-2"
            >
              <ShieldCheck className="h-5 w-5" />
              Admin Login
            </Button>
          </div>
        </div>
        
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2">How to Play</h2>
            <p className="text-gray-400">
              Join a game, select your tickets, and mark numbers as they're called.
              Win exciting prizes for completing patterns!
            </p>
          </div>
          
          <div className="flex justify-center gap-8 text-xs text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

