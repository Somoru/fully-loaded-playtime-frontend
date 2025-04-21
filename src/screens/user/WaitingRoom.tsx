
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import { Users, Ticket, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockGameData = {
  partyCode: "ABC123",
  hostName: "John Doe",
  startTime: "7:00 PM",
  ticketCount: 2,
  playersJoined: 1, // Initial player count
  maxPlayers: 20,
};

const WaitingRoom = () => {
  const { partyCode } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [playerCount, setPlayerCount] = useState(mockGameData.playersJoined);
  const [dots, setDots] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  
  // Simulate players joining
  useEffect(() => {
    const playerInterval = setInterval(() => {
      if (playerCount < mockGameData.maxPlayers) {
        setPlayerCount((prev) => Math.min(prev + Math.floor(Math.random() * 2), mockGameData.maxPlayers));
      }
    }, 3000);
    
    return () => clearInterval(playerInterval);
  }, [playerCount]);
  
  // Animated dots for waiting text
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    
    return () => clearInterval(dotsInterval);
  }, []);
  
  // Simulate game starting after some time
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setGameStarted(true);
      
      toast({
        title: "Game Starting!",
        description: "The host has started the game. Get ready!",
      });
      
      // Navigate to live game after a short delay
      setTimeout(() => {
        navigate(`/live-game/${partyCode}`);
      }, 1500);
    }, 15000); // Start after 15 seconds for demo
    
    return () => clearTimeout(startTimeout);
  }, [navigate, partyCode, toast]);

  const game = { ...mockGameData, partyCode: partyCode || mockGameData.partyCode };
  
  return (
    <>
      <Header title="Waiting Room" showBackButton />
      
      <div className="min-h-screen pt-20 pb-6 px-4">
        <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
          <div className="bg-secondary rounded-xl p-6 border border-gray-700 text-center">
            <h2 className="text-xl font-bold mb-2">Party Code: {game.partyCode}</h2>
            <p className="text-gray-400 mb-8">Hosted by {game.hostName}</p>
            
            <div className="relative mx-auto w-28 h-28 mb-6">
              <div className="absolute inset-0 bg-housie-purple/20 rounded-full animate-pulse-slow"></div>
              <div className="absolute inset-2 bg-housie-purple/30 rounded-full animate-pulse-slow [animation-delay:0.3s]"></div>
              <div className="absolute inset-4 bg-housie-purple/40 rounded-full animate-pulse-slow [animation-delay:0.6s]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                {gameStarted ? (
                  <RefreshCw className="h-10 w-10 text-housie-gold animate-spin" />
                ) : (
                  <Users className="h-10 w-10 text-housie-gold" />
                )}
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-1">
              {gameStarted ? "Game Starting" : `Waiting for Host${dots}`}
            </h3>
            
            <div className="flex justify-center gap-6 mb-8">
              <div className="text-center">
                <p className="text-gray-400 text-sm">Players Joined</p>
                <p className="text-xl font-bold">{playerCount}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm">Your Tickets</p>
                <p className="text-xl font-bold">{game.ticketCount}</p>
              </div>
            </div>
            
            <Button
              onClick={() => navigate(`/tickets/${game.partyCode}`)}
              variant="outline"
              className="flex gap-2 mx-auto"
            >
              <Ticket className="h-4 w-4" />
              View My Tickets
            </Button>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium mb-2">Game Rules</h3>
            <ul className="text-sm text-gray-400 space-y-1 list-disc pl-5">
              <li>First Line: Complete any horizontal line on your ticket</li>
              <li>Second Line: Complete any other horizontal line</li>
              <li>Full House: Complete all numbers on your ticket</li>
              <li>Say "Housie" in chat when you win a prize</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingRoom;
