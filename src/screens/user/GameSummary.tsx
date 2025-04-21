
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import HousieTicket from "@/components/games/HousieTicket";
import NumberHistory from "@/components/games/NumberHistory";
import { Button } from "@/components/ui/button";
import { Award } from "lucide-react";

// Mock tickets data with results
const mockTickets = [
  {
    id: "T12345",
    numbers: [
      [null, 12, 21, null, 45, 56, null, 78, 82],
      [3, null, 24, 39, null, 57, 61, null, 87],
      [6, 17, null, null, 48, null, 69, 75, null],
    ],
    matchedCount: 12,
    prizes: ["Second Line"],
    winAmount: 500,
  },
  {
    id: "T12346",
    numbers: [
      [8, null, 28, 38, null, 55, null, 71, 83],
      [null, 19, null, 32, 47, null, 64, 76, null],
      [2, null, 29, null, 43, 52, 68, null, 90],
    ],
    matchedCount: 8,
    prizes: [],
    winAmount: 0,
  },
];

// Mock drawn numbers
const mockDrawnNumbers = [2, 3, 6, 12, 17, 19, 21, 24, 32, 39, 43, 45, 47, 48, 52, 56, 57, 61, 69, 75];

// Mock game stats
const mockGameStats = {
  totalPlayers: 32,
  totalTickets: 76,
  duration: "28 minutes",
  date: "Apr 21, 2025",
  prizes: [
    { type: "First Line", amount: 1000, winner: "Player456" },
    { type: "Second Line", amount: 500, winner: "YOU" },
    { type: "Full House", amount: 2000, winner: "Player789" },
  ],
};

const GameSummary = () => {
  const { partyCode } = useParams();
  const navigate = useNavigate();
  
  const totalWinnings = mockTickets.reduce((sum, ticket) => sum + ticket.winAmount, 0);
  
  return (
    <>
      <Header title="Game Summary" showBackButton />
      
      <div className="min-h-screen pt-20 pb-6 px-4">
        <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
          <div className="bg-secondary rounded-xl p-5 border border-gray-700">
            <h2 className="text-lg font-bold mb-1">Game Results</h2>
            <p className="text-gray-400 text-sm mb-4">Party Code: {partyCode}</p>
            
            {totalWinnings > 0 ? (
              <div className="flex items-center gap-3 p-3 bg-housie-gold/20 rounded-lg mb-4">
                <Award className="h-6 w-6 text-housie-gold" />
                <div>
                  <p className="font-medium">Congratulations!</p>
                  <p className="text-sm">
                    You won <span className="text-housie-gold font-bold">₹{totalWinnings}</span>
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-gray-800/50 rounded-lg mb-4">
                <p className="text-sm">
                  Better luck next time! You didn't win any prizes in this game.
                </p>
              </div>
            )}
            
            <div className="border-t border-gray-700 my-4"></div>
            
            <h3 className="font-medium mb-3">Your Tickets</h3>
            
            <div className="space-y-6">
              {mockTickets.map((ticket) => (
                <div key={ticket.id}>
                  <HousieTicket
                    ticketId={ticket.id}
                    numbers={ticket.numbers}
                    markedNumbers={mockDrawnNumbers}
                  />
                  
                  <div className="mt-2 flex justify-between text-sm">
                    <div>
                      <span className="text-gray-400">Numbers Matched:</span>{" "}
                      <span className="font-medium">{ticket.matchedCount}/{mockDrawnNumbers.length}</span>
                    </div>
                    
                    {ticket.prizes.length > 0 && (
                      <div className="text-housie-gold font-medium">
                        Won: {ticket.prizes.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-secondary rounded-xl p-5 border border-gray-700">
            <h3 className="font-medium mb-3">Game Stats</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Date</span>
                <span>{mockGameStats.date}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Duration</span>
                <span>{mockGameStats.duration}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Players</span>
                <span>{mockGameStats.totalPlayers}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Tickets Sold</span>
                <span>{mockGameStats.totalTickets}</span>
              </div>
              
              <div className="border-t border-gray-700 my-3"></div>
              
              <h4 className="font-medium">Prize Distribution</h4>
              
              <table className="w-full text-sm">
                <tbody>
                  {mockGameStats.prizes.map((prize, index) => (
                    <tr key={index} className="border-b border-gray-800 last:border-none">
                      <td className="py-2">{prize.type}</td>
                      <td className="py-2 text-right">₹{prize.amount}</td>
                      <td className={`py-2 text-right ${prize.winner === "YOU" ? "text-housie-gold font-bold" : ""}`}>
                        {prize.winner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-secondary/50 rounded-xl p-5 border border-gray-700">
            <h3 className="font-medium mb-3">Number History</h3>
            <NumberHistory numbers={mockDrawnNumbers} />
          </div>
          
          <Button
            onClick={() => navigate("/dashboard")}
            className="w-full button-gold"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </>
  );
};

export default GameSummary;
