"use client";

import { useState } from "react";
import Dashboard from "@/components/Dashboard";
import AvailableDoctors from "@/components/AvailableDoctors";
import ScheduleSession from "@/components/ScheduleSession";
import SelectSessionTime from "@/components/SelectSessionTime";
import CalendarScreen from "@/components/CalendarScreen";
import PatientForm from "@/components/PatientForm";
import SessionScheduler from "@/components/SessionScheduler";

type Screen = 
  | "dashboard" 
  | "doctors" 
  | "schedule-in-person" 
  | "schedule-online" 
  | "select-time"
  | "calendar"
  | "add-patient"
  | "session-scheduler";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("dashboard");
  const [showTimeModal, setShowTimeModal] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <Dashboard onNavigate={(screen: string) => setCurrentScreen(screen as Screen)} />;
      case "doctors":
        return <AvailableDoctors onNavigate={(screen: string) => setCurrentScreen(screen as Screen)} onSelectTime={() => setShowTimeModal(true)} />;
      case "schedule-in-person":
        return <ScheduleSession mode="in-person" onNavigate={(screen: string) => setCurrentScreen(screen as Screen)} />;
      case "schedule-online":
        return <ScheduleSession mode="online" onNavigate={(screen: string) => setCurrentScreen(screen as Screen)} />;
      case "calendar":
        return <CalendarScreen onNavigate={(screen: string) => setCurrentScreen(screen as Screen)} />;
      case "add-patient":
        return <PatientForm onNavigate={(screen: string) => setCurrentScreen(screen as Screen)} />;
      case "session-scheduler":
        return <SessionScheduler onNavigate={(screen: string) => setCurrentScreen(screen as Screen)} />;
      default:
        return <Dashboard onNavigate={(screen: string) => setCurrentScreen(screen as Screen)} />;
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #DFDAFB 0%, #F9CCC5 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start'
    }}>
      {renderScreen()}
      
      {/* Time Selection Modal */}
      {showTimeModal && (
        <SelectSessionTime onClose={() => setShowTimeModal(false)} />
      )}
    </div>
  );
}