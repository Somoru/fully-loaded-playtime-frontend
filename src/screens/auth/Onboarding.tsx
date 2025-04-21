
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import { User } from "lucide-react";

const Onboarding = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to continue",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
      toast({
        title: "Welcome to Fully Loaded Housie!",
        description: `Great to have you here, ${name}!`,
      });
    }, 1000);
  };

  return (
    <>
      <Header title="Complete Your Profile" showBackButton />

      <div className="min-h-screen pt-16 pb-6 px-2 bg-gradient-to-b from-housie-darkPurple to-gray-900 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full max-w-[95vw] sm:max-w-md mx-auto space-y-8 animate-fade-in">
            <div className="text-center">
              <div className="mx-auto bg-housie-purple/20 w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4">
                <User size={40} className="text-housie-purple" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold">Tell us your name</h1>
              <p className="mt-2 text-gray-400 text-sm sm:text-base">
                We'll use this to personalize your experience
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="space-y-1.5">
                <label htmlFor="name" className="block text-sm text-gray-400 pl-0.5">
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-base sm:text-lg py-3 px-4 rounded-xl shadow-sm bg-white dark:bg-background"
                  autoComplete="name"
                  required
                  maxLength={32}
                  inputMode="text"
                  pattern="[a-zA-Z ]*"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full py-3 text-base sm:text-lg button-gold rounded-xl"
                disabled={loading || !name.trim()}
              >
                {loading ? "Saving..." : "Continue"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
