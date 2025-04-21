import React from "react";

interface TicketProps {
  ticketId: string;
  numbers: (number | null)[][];
  markedNumbers?: number[];
}

const getStyledCellClass = (num: number | null, markedNumbers: number[]) => {
  if (num === null) {
    return "ticket-cell-empty";
  }
  if (markedNumbers.includes(num)) {
    return "ticket-cell-marked";
  }
  return "ticket-cell-number";
};

// Helper to pad each row to 9 cells, with empty spaces
function normalizeRow(row: (number | null)[]) {
  // Remove extra nulls/numbers if row > 5 numbers
  const nonNullNumbers = row.filter((n) => n !== null).slice(0, 5);

  // Place numbers at correct columns (Housie rule: 9 columns per row, 5 numbers per row)
  // If already using the right row structure: return as is
  if (row.length === 9 && nonNullNumbers.length === 5) {
    return row;
  }
  // Otherwise, scatter numbers with empty spaces
  let paddedRow = Array(9).fill(null);
  let inserted = 0;
  for (let i = 0; i < 9; i++) {
    if (inserted < nonNullNumbers.length && (i % 2 === 0 || i === 4)) {
      paddedRow[i] = nonNullNumbers[inserted];
      inserted++;
    }
  }
  // If less than 5, fill at the first available empty columns
  for (let i = 0; i < 9 && inserted < nonNullNumbers.length; i++) {
    if (paddedRow[i] === null) {
      paddedRow[i] = nonNullNumbers[inserted++];
    }
  }
  return paddedRow;
}

const HousieTicket: React.FC<TicketProps> = ({ ticketId, numbers, markedNumbers = [] }) => {
  return (
    <div className="bg-gradient-to-br from-[#FDE1D3] to-[#E5DEFF] border-4 border-housie-gold rounded-xl p-3 sm:p-5 w-full shadow-xl">
      <div className="flex justify-between mb-3">
        <span className="text-xs text-housie-purple font-bold tracking-widest uppercase opacity-70">Ticket ID</span>
        <span className="text-xs font-bold tracking-tight text-housie-darkPurple">{ticketId}</span>
      </div>
      
      <div className="grid grid-rows-3 gap-1 bg-white rounded-lg px-2 py-3 shadow-md">
        {numbers.map((row, rowIndex) => {
          const paddedRow = normalizeRow(row);

          return (
            <div key={rowIndex} className="grid grid-cols-9 gap-1 sm:gap-2">
              {paddedRow.map((num, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`flex items-center justify-center aspect-square rounded-md border text-lg sm:text-2xl font-extrabold 
                    ${num === null
                      ? "bg-transparent"
                      : markedNumbers.includes(num)
                        ? "bg-housie-gold text-housie-darkPurple border-housie-gold glow-marked"
                        : "bg-housie-purple/90 text-white border-housie-purple"
                    }
                    transition-all duration-200 
                    ${num !== null ? "shadow-md" : "opacity-50"}
                  `}
                  style={{
                    minWidth: '32px',
                    maxWidth: '40px',
                    minHeight: '32px',
                    maxHeight: '40px',
                  }}
                >
                  {num !== null ? num : ""}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HousieTicket;
