"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  FilterList, 
  Schedule, 
  Person, 
  Phone, 
  CheckCircle,
  ArrowDownward
} from "@mui/icons-material";

interface Session {
  id: string;
  time: string;
  location: string;
  doctor: string;
  doctorPhone: string;
  duration: string;
  mode: "Online" | "In-Person";
  previousSession: string;
}

interface PastSession {
  id: string;
  time: string;
  doctor: string;
  previousSession: string;
}

interface DashboardProps {
  onNavigate: (screen: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const upcomingSession: Session = {
    id: "1",
    time: "11:00 AM",
    location: "Bandra",
    doctor: "Dr. Kiran Rathi",
    doctorPhone: "+91 98765 43210",
    duration: "01:00 HR",
    mode: "Online",
    previousSession: "Tuesday, March 5, 2023"
  };

  const pastSessions: PastSession[] = [
    {
      id: "1",
      time: "12:00 AM",
      doctor: "Dr. Ramesh Naik",
      previousSession: "Tuesday, March 25, 2023"
    },
    {
      id: "2",
      time: "10:30 AM",
      doctor: "Dr. Suresh Sawant",
      previousSession: "Tuesday, March 15, 2023"
    },
    {
      id: "3",
      time: "09:30 AM",
      doctor: "Dr. Neeta Singh",
      previousSession: "Tuesday, Feb 25, 2023"
    }
  ];

  return (
    <div className="mobile-container">
      {/* Status Bar */}
      <div className="status-bar">
        <span>9:41</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <div style={{ width: '16px', height: '12px', background: '#000', borderRadius: '2px' }}></div>
          <div style={{ width: '16px', height: '12px', background: '#000', borderRadius: '2px' }}></div>
          <div style={{ width: '24px', height: '12px', background: '#000', borderRadius: '6px' }}></div>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#000', margin: 0 }}>
          Good morning, Manjunath Naik
        </h1>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '50%', 
          background: 'linear-gradient(135deg, #DFDAFB 0%, #F9CCC5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontWeight: '600',
          color: '#000'
        }}>
          MN
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <Search sx={{ color: '#999', mr: 1 }} />
        <input
          type="text"
          placeholder="Search Psychologists..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterList sx={{ color: '#999', ml: 1 }} />
      </div>

      {/* Upcoming Session */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
        style={{ marginTop: '8px' }}
      >
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#000', margin: '0 0 16px 0' }}>
          Upcoming Session
        </h2>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ 
            width: '50px', 
            height: '50px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, #DFDAFB 0%, #F9CCC5 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '600',
            color: '#000',
            marginRight: '12px'
          }}>
            KR
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
                {upcomingSession.time}
              </span>
              <span style={{ fontSize: '16px', color: '#666', margin: '0 8px' }}>•</span>
              <span style={{ fontSize: '16px', color: '#666' }}>
                {upcomingSession.location}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
                {upcomingSession.doctor}
              </span>
              <Phone sx={{ fontSize: '16px', color: '#666', marginLeft: '8px' }} />
              <ArrowDownward sx={{ fontSize: '16px', color: '#666', marginLeft: '4px' }} />
            </div>
          </div>                                                                            
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Session Duration: {upcomingSession.duration}
          </span>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Session Mode: {upcomingSession.mode}
          </span>
        </div>

        <button className="btn-primary" style={{ width: '100%', marginBottom: '12px' }}>
          Mark as Completed
        </button>

        <div style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
          Previous Session: {upcomingSession.previousSession}
        </div>
      </motion.div>

      {/* Past Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card"
      >
        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#000', margin: '0 0 16px 0' }}>
          Past Sessions
        </h2>
        
        {pastSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index < pastSessions.length - 1 ? '1px solid #F0F0F0' : 'none'
            }}
          >
            <Schedule sx={{ color: '#DFDAFB', marginRight: '12px' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', color: '#666', marginBottom: '2px' }}>
                {session.time} {session.doctor}
              </div>
              <div style={{ fontSize: '12px', color: '#999' }}>
                Previous Session: {session.previousSession}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Schedule Now Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ padding: '20px', marginTop: 'auto' }}
      >
        <button 
          className="btn-primary" 
          style={{ width: '100%' }}
          onClick={() => onNavigate('doctors')}
        >
          Schedule Now
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
