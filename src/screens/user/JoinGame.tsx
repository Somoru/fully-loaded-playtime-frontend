
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";

// Mock game data (would be fetched from API)
const mockGameData = {
  partyCode: "ABC123",
  hostName: "John Doe",
  ticketPrice: 100,
  maxTicketsPerPlayer: 5,
};

const JoinGame = () => {
  const { partyCode } = useParams();
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const game = {...mockGameData, partyCode: partyCode || mockGameData.partyCode};
  
  const totalAmount = game.ticketPrice * ticketCount;

  const handleDecreaseTickets = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };

  const handleIncreaseTickets = () => {
    if (ticketCount < game.maxTicketsPerPlayer) {
      setTicketCount(ticketCount + 1);
    } else {
      toast({
        title: "Maximum Limit Reached",
        description: `You can only purchase up to ${game.maxTicketsPerPlayer} tickets per game`,
        variant: "destructive",
      });
    }
  };

  const handleJoinGame = () => {
    setLoading(true);
    
    // Simulate payment and joining game
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Game Joined Successfully",
        description: `You've purchased ${ticketCount} tickets for Party Code ${game.partyCode}`,
      });
      navigate(`/waiting-room/${game.partyCode}`);
    }, 1500);
  };

  return (
    <>
      <Header title="Join Game" showBackButton />
      
      <div className="min-h-screen pt-20 pb-6 px-4">
        <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
          <div className="bg-secondary rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-6">Game Details</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Party Code</span>
                <span className="font-medium">{game.partyCode}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Host</span>
                <span className="font-medium">{game.hostName}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Ticket Price</span>
                <span className="font-medium">₹{game.ticketPrice}</span>
              </div>
              
              <div className="border-t border-gray-700 my-4"></div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Number of Tickets
                </label>
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleDecreaseTickets}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                    disabled={ticketCount <= 1}
                    aria-label="Decrease ticket count"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  
                  <span className="font-bold text-2xl">{ticketCount}</span>
                  
                  <button
                    onClick={handleIncreaseTickets}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700"
                    disabled={ticketCount >= game.maxTicketsPerPlayer}
                    aria-label="Increase ticket count"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1 text-right">
                  Max {game.maxTicketsPerPlayer} tickets per player
                </p>
              </div>
              
              <div className="border-t border-gray-700 my-4"></div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg">Total Amount</span>
                <span className="text-xl font-bold text-housie-gold">₹{totalAmount}</span>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleJoinGame}
            className="w-full button-gold py-6 text-lg"
            disabled={loading}
          >
            {loading ? "Processing Payment..." : `Join & Pay ₹${totalAmount}`}
          </Button>
          
          <p className="text-center text-xs text-gray-500">
            By joining, you agree to the game rules and payment terms
          </p>
        </div>
      </div>
    </>
  );
};

export default JoinGame;
