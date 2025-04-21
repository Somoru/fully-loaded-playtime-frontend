
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
      
      <div className="min-h-screen pt-20 pb-6 px-4 flex flex-col">
        <div className="w-full max-w-md mx-auto space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="mx-auto bg-housie-purple/20 w-24 h-24 rounded-full flex items-center justify-center mb-4">
              <User size={48} className="text-housie-purple" />
            </div>
            <h1 className="text-2xl font-bold">Tell us your name</h1>
            <p className="mt-2 text-gray-400">
              We'll use this to personalize your experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm text-gray-400">
                Your Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg"
                autoComplete="name"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full button-gold" 
              disabled={loading || !name.trim()}
            >
              {loading ? "Saving..." : "Continue"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Onboarding;
