
import React from "react";

interface TicketProps {
  ticketId: string;
  numbers: (number | null)[][];
  markedNumbers?: number[];
}

const HousieTicket: React.FC<TicketProps> = ({ ticketId, numbers, markedNumbers = [] }) => {
  return (
    <div className="bg-secondary border border-gray-700 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <span className="text-xs text-gray-400">Ticket ID</span>
        <span className="text-xs font-medium">{ticketId}</span>
      </div>
      
      <div className="grid grid-rows-3 gap-1 bg-gray-800/50 rounded-md p-1.5">
        {numbers.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-between">
            {row.map((num, colIndex) => (
              <div 
                key={`${rowIndex}-${colIndex}`} 
                className={`ticket-cell ${
                  num === null 
                    ? "ticket-cell-empty" 
                    : markedNumbers.includes(num) 
                      ? "ticket-cell-marked" 
                      : "ticket-cell-number"
                }`}
              >
                {num !== null && num}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HousieTicket;
