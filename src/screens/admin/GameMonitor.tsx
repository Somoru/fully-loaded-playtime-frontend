
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, PauseCircle, RefreshCw, Users, Ticket, CircleDollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NumberBall from "@/components/games/NumberBall";
import NumberHistory from "@/components/games/NumberHistory";

// Game status options
type GameStatus = "not_started" | "live" | "paused" | "completed";

const GameMonitor = () => {
  const { partyCode } = useParams();
  const { toast } = useToast();
  
  // Game state
  const [gameStatus, setGameStatus] = useState<GameStatus>("not_started");
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [drawingInterval, setDrawingInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Game statistics
  const [stats, setStats] = useState({
    playersJoined: 12,
    ticketsSold: 32,
    moneyPooled: 3200,
  });
  
  // Prize status
  const [prizes, setPrizes] = useState([
    { type: "First Line", amount: 500, winners: [] as string[] },
    { type: "Full House", amount: 1000, winners: [] as string[] },
  ]);
  
  const handleStartGame = () => {
    if (gameStatus !== "not_started" && gameStatus !== "paused") return;
    
    setGameStatus("live");
    toast({
      title: "Game Started",
      description: "Numbers will be drawn automatically",
    });
    
    // Start automatic number drawing
    const interval = setInterval(() => {
      drawNextNumber();
    }, 5000);
    
    setDrawingInterval(interval);
  };
  
  const handlePauseGame = () => {
    if (gameStatus !== "live") return;
    
    setGameStatus("paused");
    toast({
      title: "Game Paused",
      description: "Number drawing has been paused",
    });
    
    // Clear the drawing interval
    if (drawingInterval) {
      clearInterval(drawingInterval);
      setDrawingInterval(null);
    }
  };
  
  const drawNextNumber = () => {
    // Generate a number that hasn't been drawn yet
    const availableNumbers = Array.from({ length: 90 }, (_, i) => i + 1)
      .filter(num => !drawnNumbers.includes(num));
    
    if (availableNumbers.length === 0) {
      // All numbers have been drawn
      if (drawingInterval) {
        clearInterval(drawingInterval);
        setDrawingInterval(null);
      }
      setGameStatus("completed");
      toast({
        title: "Game Completed",
        description: "All numbers have been drawn",
      });
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];
    
    setCurrentNumber(newNumber);
    setDrawnNumbers(prev => [...prev, newNumber]);
    
    // Mock prize claims after certain numbers drawn
    if (drawnNumbers.length === 10) {
      claimPrize("First Line", "Player123");
    }
    
    if (drawnNumbers.length === 25) {
      claimPrize("Full House", "Player456");
    }
  };
  
  const claimPrize = (prizeType: string, playerName: string) => {
    const updatedPrizes = prizes.map(prize => {
      if (prize.type === prizeType && prize.winners.length === 0) {
        return { ...prize, winners: [...prize.winners, playerName] };
      }
      return prize;
    });
    
    setPrizes(updatedPrizes);
    
    toast({
      title: "Prize Claimed",
      description: `${playerName} has won ${prizeType}!`,
    });
  };
  
  const getStatusBadge = () => {
    switch (gameStatus) {
      case "not_started":
        return (
          <Badge className="bg-gray-700 text-gray-200">NOT STARTED</Badge>
        );
      case "live":
        return (
          <Badge className="bg-housie-red/10 text-housie-red border-housie-red/20">
            LIVE
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            PAUSED
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            COMPLETED
          </Badge>
        );
    }
  };
  
  return (
    <>
      <Header 
        title="Game Monitor" 
        showBackButton
        rightAction={getStatusBadge()}
      />
      
      <div className="min-h-screen pt-20 pb-6 px-4">
        <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
          <div className="bg-secondary rounded-xl p-5 border border-gray-700">
            <h2 className="text-xl font-bold mb-2">Party Code: {partyCode}</h2>
            <p className="text-gray-400 text-sm mb-4">Apr 21, 2025</p>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg">
                <Users className="h-5 w-5 text-housie-purple mb-1" />
                <p className="text-xs text-gray-400">Players</p>
                <p className="text-lg font-bold">{stats.playersJoined}</p>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg">
                <Ticket className="h-5 w-5 text-housie-blue mb-1" />
                <p className="text-xs text-gray-400">Tickets</p>
                <p className="text-lg font-bold">{stats.ticketsSold}</p>
              </div>
              
              <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg">
                <CircleDollarSign className="h-5 w-5 text-housie-gold mb-1" />
                <p className="text-xs text-gray-400">Pool</p>
                <p className="text-lg font-bold">₹{stats.moneyPooled}</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              {(gameStatus === "not_started" || gameStatus === "paused") && (
                <Button 
                  onClick={handleStartGame}
                  className="flex-1 flex gap-1.5 items-center bg-green-600 hover:bg-green-700"
                >
                  <PlayCircle className="h-4 w-4" />
                  {gameStatus === "paused" ? "Resume Game" : "Start Game"}
                </Button>
              )}
              
              {gameStatus === "live" && (
                <Button 
                  onClick={handlePauseGame}
                  className="flex-1 flex gap-1.5 items-center bg-yellow-600 hover:bg-yellow-700"
                >
                  <PauseCircle className="h-4 w-4" />
                  Pause Game
                </Button>
              )}
              
              {gameStatus === "completed" && (
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={() => console.log("End game")}
                >
                  End Game
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-secondary rounded-xl p-5 border border-gray-700 text-center">
            <h3 className="text-sm text-gray-400 mb-4">Current Number</h3>
            
            {currentNumber ? (
              <NumberBall number={currentNumber} isActive size="xl" />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-800 mx-auto flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-gray-600" />
              </div>
            )}
            
            <div className="mt-6">
              <NumberHistory numbers={drawnNumbers} latestNumber={currentNumber || undefined} />
            </div>
          </div>
          
          <div className="bg-secondary rounded-xl p-5 border border-gray-700">
            <h3 className="font-medium mb-4">Prize Overview</h3>
            
            <div className="space-y-3">
              {prizes.map((prize, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-gray-800/50 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium">{prize.type}</h4>
                    <p className="text-sm text-housie-gold">₹{prize.amount}</p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Winner</p>
                    {prize.winners.length > 0 ? (
                      <p className="text-sm">{prize.winners.join(", ")}</p>
                    ) : (
                      <p className="text-sm text-gray-600">Not claimed</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameMonitor;
