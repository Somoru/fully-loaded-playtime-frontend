
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import OTPInput from "@/components/ui/otp-input";

const VerifyOTP = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get the phone number from location state
  const phoneNumber = location.state?.phoneNumber || "";

  useEffect(() => {
    // Redirect to login if phone number is not provided
    if (!phoneNumber) {
      navigate("/login");
      return;
    }

    // Timer for resending OTP
    const timer = timeLeft > 0 && setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer as NodeJS.Timeout);
  }, [phoneNumber, navigate, timeLeft]);

  const handleResend = () => {
    toast({
      title: "OTP Resent",
      description: "A new verification code has been sent to your phone",
    });
    setTimeLeft(30);
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate API verification
    setTimeout(() => {
      setLoading(false);
      
      // For demo purposes, check if user exists (all OTPs are valid)
      const isNewUser = otp === "123456"; // For demo: 123456 means new user
      
      if (isNewUser) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    }, 1000);
  };

  const handleOtpComplete = (value: string) => {
    setOtp(value);
  };

  return (
    <>
      <Header title="Verify OTP" showBackButton />
      
      <div className="min-h-screen pt-20 pb-6 px-4 flex flex-col">
        <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">Verification Code</h1>
            <p className="mt-2 text-gray-400">
              We've sent a 6-digit code to {phoneNumber.slice(0, 2)}******{phoneNumber.slice(-2)}
            </p>
          </div>

          <div className="space-y-8">
            <OTPInput length={6} onComplete={handleOtpComplete} />
            
            <div className="text-center">
              <Button
                onClick={handleVerify}
                className="w-full button-gold"
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>

              <div className="mt-4">
                {timeLeft > 0 ? (
                  <p className="text-sm text-gray-400">
                    Resend OTP in <span className="text-housie-gold">{timeLeft}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResend}
                    className="text-sm text-housie-purple hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
