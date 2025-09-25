"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowBack,
  Person,
  Phone,
  CalendarToday,
  AccessTime,
  VideoCall,
  LocationOn
} from "@mui/icons-material";

interface ScheduleSessionProps {
  mode: "in-person" | "online";
  onNavigate: (screen: string) => void;
}

const ScheduleSession: React.FC<ScheduleSessionProps> = ({ mode, onNavigate }) => {
  const [sessionType, setSessionType] = useState("Counselling (1 hour)");
  const [sessionDate, setSessionDate] = useState("11/12/2024");
  const [sessionTime, setSessionTime] = useState("HH : MM");
  const [sessionDetails, setSessionDetails] = useState("");
  const [onlineLink, setOnlineLink] = useState("");

  const patientInfo = {
    name: "Shubham Naik",
    phone: "+91 9876543210"
  };

  const practitionerInfo = {
    name: "Saria Dilon",
    phone: "+91 9876543210"
  };

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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ArrowBack 
            sx={{ color: '#000', marginRight: '8px', cursor: 'pointer' }} 
            onClick={() => onNavigate('doctors')}
          />
          <h1 className="header-title" style={{ margin: 0 }}>
            Schedule Session
          </h1>
        </div>
        <Person sx={{ color: '#000' }} />
      </div>

      {/* Content */}
      <div style={{ padding: '0 20px', paddingBottom: '100px' }}>
        {/* Patient Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <div className="form-group">
            <label className="form-label">Patient</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #DFDAFB 0%, #F9CCC5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#000',
                marginRight: '12px'
              }}>
                {patientInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
                  {patientInfo.name}
                </div>
                <div style={{ fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ fontSize: '14px', marginRight: '4px' }} />
                  {patientInfo.phone}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Assign Practitioner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card"
        >
          <div className="form-group">
            <label className="form-label">Assign Practitioner</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                background: 'linear-gradient(135deg, #DFDAFB 0%, #F9CCC5 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: '#000',
                marginRight: '12px'
              }}>
                {practitionerInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
                  {practitionerInfo.name}
                </div>
                <div style={{ fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ fontSize: '14px', marginRight: '4px' }} />
                  {practitionerInfo.phone}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Session Type */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <div className="form-group">
            <label className="form-label">Session Type</label>
            <select 
              className="form-input"
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
            >
              <option value="Counselling (1 hour)">Counselling (1 hour)</option>
              <option value="Therapy (45 min)">Therapy (45 min)</option>
              <option value="Consultation (30 min)">Consultation (30 min)</option>
            </select>
          </div>
        </motion.div>

        {/* Session Mode */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card"
        >
          <div className="form-group">
            <label className="form-label">Session Mode</label>
            <div className="radio-group">
              <div className="radio-item">
                <input
                  type="radio"
                  id="in-person"
                  name="sessionMode"
                  value="in-person"
                  checked={mode === "in-person"}
                  onChange={() => {}}
                  className="radio-input"
                />
                <label htmlFor="in-person" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <LocationOn sx={{ fontSize: '16px', marginRight: '4px' }} />
                  In-Person
                </label>
              </div>
              <div className="radio-item">
                <input
                  type="radio"
                  id="online"
                  name="sessionMode"
                  value="online"
                  checked={mode === "online"}
                  onChange={() => {}}
                  className="radio-input"
                />
                <label htmlFor="online" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                  <VideoCall sx={{ fontSize: '16px', marginRight: '4px' }} />
                  Online
                </label>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Session Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card"
        >
          <div className="form-group">
            <label className="form-label">Session Date</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)}
                style={{ paddingRight: '40px' }}
              />
              <CalendarToday sx={{ 
                position: 'absolute', 
                right: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#999'
              }} />
            </div>
          </div>
        </motion.div>

        {/* Session Time Slot */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card"
        >
          <div className="form-group">
            <label className="form-label">Session Time Slot</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                value={sessionTime}
                onChange={(e) => setSessionTime(e.target.value)}
                placeholder="HH : MM"
                style={{ paddingRight: '40px' }}
              />
              <AccessTime sx={{ 
                position: 'absolute', 
                right: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: '#999'
              }} />
            </div>
          </div>
        </motion.div>

        {/* Online Session Link (only for online mode) */}
        {mode === "online" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="card"
          >
            <div className="form-group">
              <label className="form-label">Online Session Link</label>
              <input
                type="text"
                className="form-input"
                value={onlineLink}
                onChange={(e) => setOnlineLink(e.target.value)}
                placeholder="Add Online Session Link or WhatsApp Number"
              />
            </div>
          </motion.div>
        )}

        {/* Session Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: mode === "online" ? 0.7 : 0.6 }}
          className="card"
        >
          <div className="form-group">
            <label className="form-label">Session Details (Optional)</label>
            <textarea
              className="form-input"
              value={sessionDetails}
              onChange={(e) => setSessionDetails(e.target.value)}
              placeholder="Enter session details here"
              rows={4}
              style={{ resize: 'vertical', minHeight: '80px' }}
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: mode === "online" ? 0.8 : 0.7 }}
          style={{ 
            display: 'flex', 
            gap: '12px', 
            marginTop: '20px',
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            right: '20px',
            zIndex: 100
          }}
        >
          <button className="btn-secondary" style={{ flex: 1 }}>
            Cancel
          </button>
          <button className="btn-primary" style={{ flex: 1 }}>
            Confirm
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ScheduleSession;
