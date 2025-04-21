
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Phone } from "lucide-react";

const PhoneLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/verify-otp", { state: { phoneNumber } });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-housie-gold">Fully Loaded Housie</h1>
          <p className="mt-2 text-gray-400">India's favorite digital tambola game</p>
        </div>

        <div className="bg-secondary rounded-xl p-6 border border-gray-700 shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-center">Login with Phone</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm text-gray-400">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Phone className="h-5 w-5 text-gray-500" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="Enter your 10-digit number"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setPhoneNumber(value);
                    }
                  }}
                  className="pl-10"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full button-gold" 
              disabled={loading || phoneNumber.length !== 10}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">
          By continuing, you agree to our Terms of Service & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default PhoneLogin;
