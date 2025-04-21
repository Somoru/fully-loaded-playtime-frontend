
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth screens
import PhoneLogin from "./screens/auth/PhoneLogin";
import VerifyOTP from "./screens/auth/VerifyOTP";
import Onboarding from "./screens/auth/Onboarding";

// User screens
import Dashboard from "./screens/user/Dashboard";
import JoinGame from "./screens/user/JoinGame";
import WaitingRoom from "./screens/user/WaitingRoom";
import TicketsView from "./screens/user/TicketsView";
import LiveGame from "./screens/user/LiveGame";
import GameSummary from "./screens/user/GameSummary";

// Admin screens
import AdminDashboard from "./screens/admin/AdminDashboard";
import CreateGame from "./screens/admin/CreateGame";
import GameMonitor from "./screens/admin/GameMonitor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<PhoneLogin />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/onboarding" element={<Onboarding />} />
          
          {/* User Routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/join-game/:partyCode" element={<JoinGame />} />
          <Route path="/waiting-room/:partyCode" element={<WaitingRoom />} />
          <Route path="/tickets/:partyCode" element={<TicketsView />} />
          <Route path="/live-game/:partyCode" element={<LiveGame />} />
          <Route path="/game-summary/:partyCode" element={<GameSummary />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-game" element={<CreateGame />} />
          <Route path="/admin/monitor/:partyCode" element={<GameMonitor />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

