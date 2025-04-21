
import React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type PrizeType = 
  | "First Line" 
  | "Second Line" 
  | "Third Line" 
  | "Four Corners" 
  | "Full House";

interface PrizeInputProps {
  index: number;
  prizeType: PrizeType;
  amount: string;
  maxWinners: string;
  onTypeChange: (index: number, value: PrizeType) => void;
  onAmountChange: (index: number, value: string) => void;
  onMaxWinnersChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
}

const prizeTypes: PrizeType[] = [
  "First Line",
  "Second Line",
  "Third Line",
  "Four Corners",
  "Full House"
];

const PrizeInput: React.FC<PrizeInputProps> = ({
  index,
  prizeType,
  amount,
  maxWinners,
  onTypeChange,
  onAmountChange,
  onMaxWinnersChange,
  onRemove
}) => {
  return (
    <div className="p-3 rounded-lg bg-gray-800/50 mb-3">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium">Prize {index + 1}</h4>
        <button 
          onClick={() => onRemove(index)}
          className="p-1 rounded-full hover:bg-gray-700"
          aria-label="Remove prize"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Prize Type</label>
          <Select 
            value={prizeType} 
            onValueChange={(value) => onTypeChange(index, value as PrizeType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select prize type" />
            </SelectTrigger>
            <SelectContent>
              {prizeTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Amount (₹)</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => onAmountChange(index, e.target.value)}
            placeholder="Enter prize amount"
            min="1"
          />
        </div>
        
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Max Winners</label>
          <Select 
            value={maxWinners} 
            onValueChange={(value) => onMaxWinnersChange(index, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Max winners" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PrizeInput;
