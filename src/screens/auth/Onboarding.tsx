
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

      <div className="min-h-screen pt-16 pb-6 px-4 bg-gradient-to-b from-housie-purple/80 to-housie-darkPurple flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <div className="w-full max-w-[95vw] sm:max-w-md mx-auto space-y-10 animate-fade-in">
            <div className="text-center">
              <div className="mx-auto bg-housie-gold/30 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-housie-gold/50">
                <User size={48} className="text-housie-gold" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-housie-gold tracking-wide">
                Tell us your name
              </h1>
              <p className="mt-3 text-housie-lightGold text-base sm:text-lg font-semibold">
                We'll use this to personalize your experience
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm sm:text-base text-housie-lightGold font-semibold pl-0.5"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-lg sm:text-xl py-4 px-5 rounded-2xl shadow-md bg-white dark:bg-background font-semibold text-housie-darkPurple placeholder:text-gray-400"
                  autoComplete="name"
                  required
                  maxLength={32}
                  inputMode="text"
                  pattern="[a-zA-Z ]*"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-4 sm:py-5 text-lg sm:text-xl font-extrabold button-gold rounded-2xl shadow-lg shadow-housie-gold/40"
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

