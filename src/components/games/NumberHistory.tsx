
import React from "react";
import NumberBall from "./NumberBall";

interface NumberHistoryProps {
  numbers: number[];
  latestNumber?: number;
}

const NumberHistory: React.FC<NumberHistoryProps> = ({ numbers, latestNumber }) => {
  return (
    <div className="bg-secondary/50 p-3 rounded-lg border border-gray-700">
      <h3 className="text-sm text-gray-400 mb-2">Number History</h3>
      <div className="flex flex-wrap gap-2">
        {numbers.map((num) => (
          <NumberBall 
            key={num} 
            number={num} 
            isActive={num === latestNumber}
            size="sm"
          />
        ))}
        {numbers.length === 0 && (
          <p className="text-sm text-gray-500 p-2">No numbers drawn yet</p>
        )}
      </div>
    </div>
  );
};

export default NumberHistory;
