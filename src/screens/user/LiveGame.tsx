
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import HousieTicket from "@/components/games/HousieTicket";
import NumberBall from "@/components/games/NumberBall";
import NumberHistory from "@/components/games/NumberHistory";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, UserCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock tickets data - each row: 5 numbers & 4 nulls in shuffled positions (to simulate real Housie)
const mockTickets = [
  {
    id: "T12345",
    numbers: [
      [null, 12, 21, null, 45, 56, null, 78, 82], // 5 numbers
      [3, null, 24, 39, null, 57, 61, null, 87],  // 5 numbers
      [6, 17, null, null, 48, null, 69, 75, null], // 5 numbers
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

// Helper keys for localStorage
const LS_KEY = "housie_livegame_state_v1";
const TIMER_INTERVAL = 5000; // ms

const LiveGame = () => {
  const { partyCode } = useParams();
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [currentNumber, setCurrentNumber] = useState<number | null>(null);
  const [updates, setUpdates] = useState(mockUpdates);
  const [lastDrawTime, setLastDrawTime] = useState<number | null>(null);
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentTicket = mockTickets[currentTicketIndex];

  // Restore from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentTicketIndex(parsed.currentTicketIndex ?? 0);
        setDrawnNumbers(parsed.drawnNumbers ?? []);
        setCurrentNumber(parsed.currentNumber ?? null);
        setUpdates(parsed.updates ?? mockUpdates);
        setLastDrawTime(parsed.lastDrawTime ?? Date.now());
      } catch {
        // No-op, start fresh if corrupted
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(
      LS_KEY,
      JSON.stringify({
        currentTicketIndex,
        drawnNumbers,
        currentNumber,
        updates,
        lastDrawTime,
      })
    );
  }, [currentTicketIndex, drawnNumbers, currentNumber, updates, lastDrawTime]);

  // Simulate number drawing with persistence
  useEffect(() => {
    // If game over, do nothing
    if (drawnNumbers.length >= 90) return;

    // Calculate ms left to next draw
    let timeout: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    function drawNumberAndSetTimer() {
      // Avoid duplicates
      let availableNumbers = Array.from({ length: 90 }, (_, i) => i + 1).filter(
        (num) => !drawnNumbers.includes(num)
      );
      if (availableNumbers.length === 0) return;

      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const newNumber = availableNumbers[randomIndex];

      setCurrentNumber(newNumber);
      setDrawnNumbers((prev) => [...prev, newNumber]);
      setLastDrawTime(Date.now());

      if (drawnNumbers.length === 9) {
        // On 10th number, simulate prize update only once
        addUpdate("Full House won by Player789", "7:35 PM");

        toast({
          title: "Game Update",
          description: "Full House won by Player789!",
        });

        setTimeout(() => {
          toast({
            title: "Game Completed",
            description: "The game has ended. Check your results!",
          });
        }, 5000);
      }
    }

    // Logic for game resume after reload
    if (lastDrawTime !== null && drawnNumbers.length > 0) {
      const elapsed = Date.now() - lastDrawTime;
      // Draw immediately if interval already passed, else wait
      if (elapsed >= TIMER_INTERVAL) {
        drawNumberAndSetTimer();
        interval = setInterval(drawNumberAndSetTimer, TIMER_INTERVAL);
        intervalRef.current = interval;
      } else {
        timeout = setTimeout(() => {
          drawNumberAndSetTimer();
          interval = setInterval(drawNumberAndSetTimer, TIMER_INTERVAL);
          intervalRef.current = interval;
        }, TIMER_INTERVAL - elapsed);
      }
    } else if (drawnNumbers.length === 0) {
      // Draw first number on initial load
      drawNumberAndSetTimer();
      interval = setInterval(drawNumberAndSetTimer, TIMER_INTERVAL);
      intervalRef.current = interval;
    }
    // Cleanup on unmount
    return () => {
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
    // Only re-run if drawnNumbers or lastDrawTime changes
    // eslint-disable-next-line
  }, [drawnNumbers, lastDrawTime, toast]);

  const addUpdate = (message: string, time: string) => {
    setUpdates((prev) => [
      { id: prev.length + 1, message, time },
      ...prev,
    ]);
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
          <Badge variant="outline" className="bg-housie-red/10 text-housie-red border-housie-red/20 font-extrabold tracking-wide">
            LIVE
          </Badge>
        }
      />

      <div className="min-h-screen pt-20 pb-6 px-2 sm:px-4 bg-gradient-to-br from-[#FDE1D3] via-[#E5DEFF] to-[#D3E4FD]">
        <div className="w-full max-w-lg mx-auto animate-fade-in">
          <div className="text-center mb-8">
            {currentNumber && (
              <div className="mb-4">
                <p className="text-base font-bold text-housie-purple mb-2 tracking-wider">
                  Current Number
                </p>
                <NumberBall number={currentNumber} isActive size="xl" />
              </div>
            )}
          </div>

          <div className="text-center mb-2">
            <p className="text-lg font-bold text-housie-darkPurple">
              Ticket {currentTicketIndex + 1} <span className="text-base font-semibold text-gray-400">
                of {mockTickets.length}
              </span>
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
                  className="rounded-full h-10 w-10 sm:h-10 sm:w-10 pointer-events-auto border-2 border-housie-gold bg-housie-gold/60 hover:bg-housie-lightGold shadow"
                  aria-label="Previous ticket"
                >
                  <ChevronLeft className="h-6 w-6 text-housie-darkPurple" />
                </Button>

                <Button
                  size="icon"
                  variant="secondary"
                  onClick={goToNextTicket}
                  className="rounded-full h-10 w-10 sm:h-10 sm:w-10 pointer-events-auto border-2 border-housie-gold bg-housie-gold/60 hover:bg-housie-lightGold shadow"
                  aria-label="Next ticket"
                >
                  <ChevronRight className="h-6 w-6 text-housie-darkPurple" />
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
                  className={`w-3 h-3 rounded-full border-2 transition-all
                    ${index === currentTicketIndex
                      ? "bg-housie-gold border-housie-gold scale-110"
                      : "bg-gray-300 border-gray-400 scale-90"
                    }`}
                  aria-label={`Go to ticket ${index + 1}`}
                />
              ))}
            </div>
          )}

          <NumberHistory numbers={drawnNumbers} latestNumber={currentNumber || undefined} />

          <div className="mt-6">
            <h3 className="text-base font-bold text-housie-purple mb-2">
              Game Updates
            </h3>
            <div className="space-y-2">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className="flex items-center gap-2.5 bg-[#f2fcf2] p-3 rounded-lg border border-housie-gold/70 shadow-sm"
                >
                  <UserCheck className="h-5 w-5 text-housie-gold shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-housie-darkPurple">{update.message}</p>
                    <span className="text-xs text-housie-purple">{update.time}</span>
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
