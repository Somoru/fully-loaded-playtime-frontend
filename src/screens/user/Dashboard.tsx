
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Clock, Play, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GameCard from "@/components/games/GameCard";
import BottomNav from "@/components/layout/BottomNav";

// Mock data
const mockGames = {
  waiting: [
    {
      id: "w1",
      partyCode: "ABC123",
      hostName: "John Doe",
      ticketCount: 2,
      date: "Today, 7:00 PM",
    },
  ],
  live: [
    {
      id: "l1",
      partyCode: "XYZ789",
      hostName: "Jane Smith",
      ticketCount: 3,
      date: "Now",
    },
  ],
  completed: [
    {
      id: "c1",
      partyCode: "DEF456",
      hostName: "Mike Brown",
      ticketCount: 1,
      date: "Yesterday",
      winAmount: 500,
    },
    {
      id: "c2",
      partyCode: "GHI789",
      hostName: "Sarah Williams",
      ticketCount: 2,
      date: "12 Apr 2025",
      winAmount: 0,
    },
  ],
};

const Dashboard = () => {
  const [partyCode, setPartyCode] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoinGame = () => {
    if (!partyCode.trim()) {
      toast({
        title: "Party Code Required",
        description: "Please enter a valid party code to join a game",
        variant: "destructive",
      });
      return;
    }

    navigate(`/join-game/${partyCode}`);
  };

  return (
    <div className="min-h-screen pb-20 pt-4">
      <div className="px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Welcome, Player!</h1>
          <p className="text-gray-400">Ready to play Housie?</p>
        </div>

        <div className="bg-secondary rounded-lg p-4 mb-8 border border-gray-700">
          <h2 className="text-lg font-medium mb-3">Join a Game</h2>
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Enter Party Code"
                value={partyCode}
                onChange={(e) => setPartyCode(e.target.value.toUpperCase())}
                className="pl-9"
                maxLength={6}
              />
            </div>
            <Button onClick={handleJoinGame} className="button-gold">
              Join
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Your Games</h2>
          
          <Tabs defaultValue="waiting" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="waiting" className="flex gap-1.5 items-center">
                <Clock className="h-4 w-4" />
                <span>Waiting</span>
              </TabsTrigger>
              <TabsTrigger value="live" className="flex gap-1.5 items-center">
                <Play className="h-4 w-4" />
                <span>Live</span>
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex gap-1.5 items-center">
                <CheckCircle className="h-4 w-4" />
                <span>Completed</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="waiting" className="space-y-4">
              {mockGames.waiting.length > 0 ? (
                mockGames.waiting.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    partyCode={game.partyCode}
                    status="waiting"
                    hostName={game.hostName}
                    ticketCount={game.ticketCount}
                    date={game.date}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No waiting games</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="live" className="space-y-4">
              {mockGames.live.length > 0 ? (
                mockGames.live.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    partyCode={game.partyCode}
                    status="live"
                    hostName={game.hostName}
                    ticketCount={game.ticketCount}
                    date={game.date}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No live games</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {mockGames.completed.length > 0 ? (
                mockGames.completed.map((game) => (
                  <GameCard
                    key={game.id}
                    id={game.id}
                    partyCode={game.partyCode}
                    status="completed"
                    hostName={game.hostName}
                    ticketCount={game.ticketCount}
                    date={game.date}
                    winAmount={game.winAmount}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No completed games</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <Button
          variant="outline"
          className="w-full flex justify-between items-center text-housie-purple border-housie-purple/30 hover:bg-housie-purple/10"
          onClick={() => navigate("/previous-games")}
        >
          View Previous Games
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Dashboard;
