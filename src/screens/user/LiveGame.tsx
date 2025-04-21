
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import HousieTicket from "@/components/games/HousieTicket";
import NumberBall from "@/components/games/NumberBall";
import NumberHistory from "@/components/games/NumberHistory";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock tickets data
const mockTickets = [
  {
    id: "T12345",
    numbers: [
      [null, 12, 21, null, 45, 56, null, 78, 82],
      [3, null, 24, 39, null, 57, 61, null, 87],
      [6, 17, null, null, 48, null, 69, 75, null],
    ],
  },
  {
    id: "T12346",
    numbers: [
      [8, null, 28, 38, null, 55, null, 71, 83],
      [null, 19, null, 32, 47, null, 64, 76, null],
      [2, null, 29, null, 43, 52, 68, null, 90],
    ],
  },
];

// Mock game updates
const mockUpdates = [
  { id: 1, message: "First Line won by Player123", time: "7:15 PM" },
  { id: 2, message: "Second Line won by Player456", time: "7:22 PM" },
];

const LiveGame = () => {
  const { partyCode } = useParams();
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [updates, setUpdates] = useState(mockUpdates);
  const { toast } = useToast();
  
  const currentTicket = mockTickets[currentTicketIndex];
  
  // Simulate number drawing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    const drawNumber = () => {
      // Generate a number that hasn't been drawn yet
      let availableNumbers = Array.from({ length: 90 }, (_, i) => i + 1)
        .filter(num => !drawnNumbers.includes(num));
      
      if (availableNumbers.length === 0) {
        clearInterval(interval);
        return;
      }
      
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const newNumber = availableNumbers[randomIndex];
      
      setCurrentNumber(newNumber);
      setDrawnNumbers(prev => [...prev, newNumber]);
      
      // Simulate prize updates
      if (drawnNumbers.length === 10) {
        addUpdate("Full House won by Player789", "7:35 PM");
        
        // Show toast
        toast({
          title: "Game Update",
          description: "Full House won by Player789!",
        });
        
        // End the game after a delay
        setTimeout(() => {
          toast({
            title: "Game Completed",
            description: "The game has ended. Check your results!",
          });
          
          // Navigate to summary page would go here in a real app
        }, 5000);
        
        clearInterval(interval);
      }
    };
    
    // Draw first number immediately
    if (drawnNumbers.length === 0) {
      drawNumber();
    }
    
    // Draw subsequent numbers at intervals
    interval = setInterval(drawNumber, 5000);
    
    return () => clearInterval(interval);
  }, [drawnNumbers, toast]);
  
  const addUpdate = (message: string, time: string) => {
    const newUpdate = {
      id: updates.length + 1,
      message,
      time,
    };
    setUpdates(prev => [newUpdate, ...prev]);
  };
  
  const goToPrevTicket = () => {
    setCurrentTicketIndex((prev) => 
      prev > 0 ? prev - 1 : mockTickets.length - 1
    );
  };
  
  const goToNextTicket = () => {
    setCurrentTicketIndex((prev) => 
      prev < mockTickets.length - 1 ? prev + 1 : 0
    );
  };
  
  return (
    <>
      <Header 
        title={`Live Game: ${partyCode}`} 
        showBackButton
        rightAction={
          <Badge variant="outline" className="bg-housie-red/10 text-housie-red border-housie-red/20">
            LIVE
          </Badge>
        }
      />
      
      <div className="min-h-screen pt-20 pb-6 px-4">
        <div className="w-full max-w-md mx-auto animate-fade-in">
          <div className="text-center mb-8">
            {currentNumber && (
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Current Number</p>
                <NumberBall number={currentNumber} isActive size="xl" />
              </div>
            )}
          </div>
          
          <div className="text-center mb-2">
            <p className="text-sm text-gray-400">
              Ticket {currentTicketIndex + 1} of {mockTickets.length}
            </p>
          </div>
          
          <div className="relative mb-6">
            <HousieTicket
              ticketId={currentTicket.id}
              numbers={currentTicket.numbers}
              markedNumbers={drawnNumbers}
            />
            
            {mockTickets.length > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 pointer-events-none">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={goToPrevTicket}
                  className="rounded-full h-8 w-8 pointer-events-auto"
                  aria-label="Previous ticket"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={goToNextTicket}
                  className="rounded-full h-8 w-8 pointer-events-auto"
                  aria-label="Next ticket"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          {mockTickets.length > 1 && (
            <div className="flex justify-center gap-2 mb-6">
              {mockTickets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTicketIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentTicketIndex
                      ? "bg-housie-gold"
                      : "bg-gray-600"
                  }`}
                  aria-label={`Go to ticket ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          <NumberHistory numbers={drawnNumbers} latestNumber={currentNumber || undefined} />
          
          <div className="mt-6">
            <h3 className="text-sm text-gray-400 mb-2">Game Updates</h3>
            
            <div className="space-y-2">
              {updates.map((update) => (
                <div 
                  key={update.id} 
                  className="flex items-center gap-2.5 bg-secondary/50 p-3 rounded-lg border border-gray-700"
                >
                  <UserCheck className="h-5 w-5 text-housie-gold shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">{update.message}</p>
                    <span className="text-xs text-gray-500">{update.time}</span>
                  </div>
                </div>
              ))}
              
              {updates.length === 0 && (
                <p className="text-sm text-gray-500 p-3">No updates yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveGame;
