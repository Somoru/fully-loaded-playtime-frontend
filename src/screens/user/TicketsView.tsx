
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import HousieTicket from "@/components/games/HousieTicket";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data - tickets for a specific game
const mockTickets = [
  {
    id: "T12345",
    numbers: [
      [null, 12, 21, null, 45, 56, null, 78, 82],
      [3, null, 24, 39, null, 57, 61, null, 87],
      [6, 17, null, null, 48, null, 69, 75, null],
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

const TicketsView = () => {
  const { partyCode } = useParams();
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  
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
  
  const currentTicket = mockTickets[currentTicketIndex];
  
  return (
    <>
      <Header title={`Your Tickets: ${partyCode}`} showBackButton />
      
      <div className="min-h-screen pt-20 pb-6 px-4">
        <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
          <div className="text-center mb-2">
            <p className="text-sm text-gray-400">
              Ticket {currentTicketIndex + 1} of {mockTickets.length}
            </p>
          </div>
          
          <div className="relative">
            <HousieTicket
              ticketId={currentTicket.id}
              numbers={currentTicket.numbers}
              markedNumbers={[]} // No numbers marked in waiting room
            />
            
            {mockTickets.length > 1 && (
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 pointer-events-none">
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={goToPrevTicket}
                  className="rounded-full h-8 w-8 pointer-events-auto"
                  aria-label="Previous ticket"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <Button
                  size="icon"
                  variant="secondary"
                  onClick={goToNextTicket}
                  className="rounded-full h-8 w-8 pointer-events-auto"
                  aria-label="Next ticket"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium mb-2">How to Play</h3>
            <ul className="text-sm text-gray-400 space-y-1 list-disc pl-5">
              <li>Numbers are called out one by one by the host</li>
              <li>If a called number appears on your ticket, it will be automatically marked</li>
              <li>Win prizes by completing lines or the full ticket</li>
              <li>Your tickets will be saved for future reference</li>
            </ul>
          </div>
          
          {mockTickets.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {mockTickets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTicketIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentTicketIndex
                      ? "bg-housie-gold"
                      : "bg-gray-600"
                  }`}
                  aria-label={`Go to ticket ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TicketsView;
