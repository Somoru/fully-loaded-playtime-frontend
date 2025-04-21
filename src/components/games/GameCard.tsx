
import { Link } from "react-router-dom";
import { Clock, Play, CheckCircle } from "lucide-react";

type GameStatus = "waiting" | "live" | "completed";

interface GameCardProps {
  id: string;
  partyCode: string;
  status: GameStatus;
  hostName: string;
  ticketCount: number;
  date: string;
  winAmount?: number;
}

const GameCard = ({
  id,
  partyCode,
  status,
  hostName,
  ticketCount,
  date,
  winAmount,
}: GameCardProps) => {
  const statusConfig = {
    waiting: {
      icon: <Clock className="h-5 w-5 text-housie-blue" />,
      text: "Waiting for Game",
      color: "text-housie-blue",
      bgColor: "bg-housie-blue/10",
      link: `/waiting-room/${partyCode}`,
    },
    live: {
      icon: <Play className="h-5 w-5 text-housie-red" />,
      text: "Live Game",
      color: "text-housie-red",
      bgColor: "bg-housie-red/10",
      link: `/live-game/${partyCode}`,
    },
    completed: {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Completed Game",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      link: `/game-summary/${partyCode}`,
    },
  };

  const { icon, text, color, bgColor, link } = statusConfig[status];

  return (
    <Link to={link} className="animate-enter">
      <div className="game-card hover:border-housie-purple/50 transition-colors">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-sm text-gray-400">Party Code</span>
            <h3 className="text-xl font-bold text-white">{partyCode}</h3>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${bgColor}`}>
            {icon}
            <span className={`text-xs font-medium ${color}`}>{text}</span>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Host</span>
            <span className="text-white font-medium">{hostName}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Tickets</span>
            <span className="text-white font-medium">{ticketCount}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Date</span>
            <span className="text-white font-medium">{date}</span>
          </div>

          {status === "completed" && winAmount !== undefined && (
            <div className="mt-3 border-t border-gray-700 pt-2 flex justify-between">
              <span className="text-sm text-gray-300">Won</span>
              <span className="text-housie-gold font-bold">₹{winAmount}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
