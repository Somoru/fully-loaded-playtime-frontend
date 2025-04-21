
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, BarChart } from "lucide-react";
import BottomNav from "@/components/layout/BottomNav";
import GameCard from "@/components/games/GameCard";

// Mock data
const mockGames = [
  {
    id: "g1",
    partyCode: "ABC123",
    hostName: "Admin",
    ticketCount: 25,
    date: "Today, 7:00 PM",
    status: "waiting" as const,
  },
  {
    id: "g2",
    partyCode: "XYZ789",
    hostName: "Admin",
    ticketCount: 43,
    date: "Now",
    status: "live" as const,
  },
  {
    id: "g3",
    partyCode: "DEF456",
    hostName: "Admin",
    ticketCount: 38,
    date: "Yesterday",
    status: "completed" as const,
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  const stats = {
    totalGames: 12,
    activePlayers: 156,
    revenue: 15600,
  };
  
  return (
    <div className="min-h-screen pb-20 pt-4">
      <div className="px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button 
            onClick={() => navigate("/admin/create-game")}
            className="button-gold flex gap-1.5"
          >
            <Plus className="h-4 w-4" />
            Create Game
          </Button>
        </div>

        <div className="bg-secondary rounded-lg p-4 border border-gray-700 mb-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Games</p>
              <p className="text-xl font-bold">{stats.totalGames}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Players</p>
              <p className="text-xl font-bold">{stats.activePlayers}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Revenue</p>
              <p className="text-xl font-bold text-housie-gold">₹{stats.revenue}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Recent Games</h2>
            <Button 
              variant="ghost"
              size="sm"
              className="text-housie-purple flex items-center gap-1 p-0 h-auto hover:bg-transparent"
              onClick={() => navigate("/admin/all-games")}
            >
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockGames.map((game) => (
              <GameCard
                key={game.id}
                id={game.id}
                partyCode={game.partyCode}
                status={game.status}
                hostName={game.hostName}
                ticketCount={game.ticketCount}
                date={game.date}
              />
            ))}
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full flex justify-center items-center gap-2"
          onClick={() => navigate("/admin/reports")}
        >
          <BarChart className="h-4 w-4" />
          View Reports
        </Button>
      </div>
      
      <BottomNav isAdmin />
    </div>
  );
};

export default AdminDashboard;
