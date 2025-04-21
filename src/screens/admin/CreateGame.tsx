
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import PrizeInput, { PrizeType } from "@/components/admin/PrizeInput";

interface Prize {
  type: PrizeType;
  amount: string;
  maxWinners: string;
}

const CreateGame = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [ticketPrice, setTicketPrice] = useState("");
  const [maxTicketsPerPlayer, setMaxTicketsPerPlayer] = useState("5");
  const [prizes, setPrizes] = useState<Prize[]>([
    { type: "First Line", amount: "500", maxWinners: "1" },
    { type: "Full House", amount: "1000", maxWinners: "1" },
  ]);
  const [loading, setLoading] = useState(false);
  const [createdPartyCode, setCreatedPartyCode] = useState<string | null>(null);
  
  const handleAddPrize = () => {
    if (prizes.length >= 5) {
      toast({
        title: "Maximum Limit Reached",
        description: "You can add up to 5 prizes per game",
        variant: "destructive",
      });
      return;
    }
    
    const availablePrizeTypes: PrizeType[] = ["First Line", "Second Line", "Third Line", "Four Corners", "Full House"];
    const usedTypes = prizes.map(p => p.type);
    const unusedTypes = availablePrizeTypes.filter(type => !usedTypes.includes(type));
    
    if (unusedTypes.length === 0) {
      toast({
        title: "All Prize Types Used",
        description: "You've already added all available prize types",
        variant: "destructive",
      });
      return;
    }
    
    setPrizes([...prizes, { type: unusedTypes[0], amount: "500", maxWinners: "1" }]);
  };
  
  const handleRemovePrize = (index: number) => {
    setPrizes(prizes.filter((_, i) => i !== index));
  };
  
  const handlePrizeTypeChange = (index: number, value: PrizeType) => {
    const newPrizes = [...prizes];
    newPrizes[index].type = value;
    setPrizes(newPrizes);
  };
  
  const handlePrizeAmountChange = (index: number, value: string) => {
    const newPrizes = [...prizes];
    newPrizes[index].amount = value;
    setPrizes(newPrizes);
  };
  
  const handleMaxWinnersChange = (index: number, value: string) => {
    const newPrizes = [...prizes];
    newPrizes[index].maxWinners = value;
    setPrizes(newPrizes);
  };
  
  const handleCreateGame = () => {
    if (!ticketPrice) {
      toast({
        title: "Ticket Price Required",
        description: "Please enter a ticket price",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Generate random party code
      const randomPartyCode = Array.from({ length: 6 }, () =>
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".charAt(
          Math.floor(Math.random() * "ABCDEFGHJKLMNPQRSTUVWXYZ23456789".length)
        )
      ).join("");
      
      setCreatedPartyCode(randomPartyCode);
      
      toast({
        title: "Game Created Successfully",
        description: `Party Code: ${randomPartyCode}`,
      });
    }, 1500);
  };
  
  return (
    <>
      <Header title="Create Game" showBackButton />
      
      <div className="min-h-screen pt-20 pb-6 px-4">
        <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
          {!createdPartyCode ? (
            <div className="space-y-6">
              <div className="bg-secondary rounded-xl p-5 border border-gray-700">
                <h2 className="text-xl font-bold mb-6">Game Settings</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="ticketPrice" className="block text-sm text-gray-400 mb-1">
                      Ticket Price (₹)
                    </label>
                    <Input
                      id="ticketPrice"
                      type="number"
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(e.target.value)}
                      placeholder="Enter ticket price"
                      min="10"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="maxTickets" className="block text-sm text-gray-400 mb-1">
                      Max Tickets per Player
                    </label>
                    <Input
                      id="maxTickets"
                      type="number"
                      value={maxTicketsPerPlayer}
                      onChange={(e) => setMaxTicketsPerPlayer(e.target.value)}
                      placeholder="Enter max tickets"
                      min="1"
                      max="10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-secondary rounded-xl p-5 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Prizes</h2>
                  <Button
                    size="sm"
                    onClick={handleAddPrize}
                    disabled={prizes.length >= 5}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    Add Prize
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {prizes.map((prize, index) => (
                    <PrizeInput
                      key={index}
                      index={index}
                      prizeType={prize.type}
                      amount={prize.amount}
                      maxWinners={prize.maxWinners}
                      onTypeChange={handlePrizeTypeChange}
                      onAmountChange={handlePrizeAmountChange}
                      onMaxWinnersChange={handleMaxWinnersChange}
                      onRemove={handleRemovePrize}
                    />
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleCreateGame}
                className="w-full button-gold py-6 text-lg"
                disabled={loading || !ticketPrice || prizes.length === 0}
              >
                {loading ? "Creating Game..." : "Create Game"}
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="bg-secondary rounded-xl p-6 border border-gray-700 mb-8">
                <h2 className="text-xl font-bold mb-2">Game Created!</h2>
                <p className="text-gray-400 mb-6">Share this party code with players</p>
                
                <div className="bg-housie-gold/20 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-300 mb-1">Party Code</p>
                  <p className="text-4xl font-bold text-housie-gold tracking-wider">
                    {createdPartyCode}
                  </p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Ticket Price</span>
                    <span>₹{ticketPrice}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Tickets/Player</span>
                    <span>{maxTicketsPerPlayer}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prizes</span>
                    <span>{prizes.length}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate("/admin")}
                >
                  Back to Dashboard
                </Button>
                
                <Button
                  className="flex-1 button-gold"
                  onClick={() => navigate(`/admin/monitor/${createdPartyCode}`)}
                >
                  Monitor Game
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateGame;
