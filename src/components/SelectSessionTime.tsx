"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Close } from "@mui/icons-material";

interface TimeSlot {
  time: string;
  selected: boolean;
}

interface TimeCategory {
  name: string;
  slots: TimeSlot[];
}

interface SelectSessionTimeProps {
  onClose: () => void;
}

const SelectSessionTime: React.FC<SelectSessionTimeProps> = ({ onClose }) => {
  const [timeCategories, setTimeCategories] = useState<TimeCategory[]>([
    {
      name: "Morning",
      slots: [
        { time: "08:00 AM", selected: false },
        { time: "09:00 AM", selected: false },
        { time: "10:00 AM", selected: true },
        { time: "11:00 AM", selected: false }
      ]
    },
    {
      name: "Afternoon",
      slots: [
        { time: "12:00 PM", selected: false },
        { time: "01:00 PM", selected: false },
        { time: "02:00 PM", selected: false },
        { time: "03:00 PM", selected: false }
      ]
    },
    {
      name: "Evening",
      slots: [
        { time: "04:00 PM", selected: false },
        { time: "05:00 PM", selected: false },
        { time: "06:00 PM", selected: false },
        { time: "07:00 PM", selected: false }
      ]
    },
    {
      name: "Night",
      slots: [
        { time: "08:00 PM", selected: false },
        { time: "09:00 PM", selected: false },
        { time: "10:00 PM", selected: false },
        { time: "11:00 PM", selected: false }
      ]
    }
  ]);

  const handleTimeSlotClick = (categoryIndex: number, slotIndex: number) => {
    setTimeCategories(prev => 
      prev.map((category, catIndex) => ({
        ...category,
        slots: category.slots.map((slot, slotIdx) => ({
          ...slot,
          selected: catIndex === categoryIndex && slotIdx === slotIndex
        }))
      }))
    );
  };

  const selectedTime = timeCategories
    .flatMap(cat => cat.slots)
    .find(slot => slot.selected)?.time || "";

  return (
    <div className="modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="modal-content"
      >
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid #F0F0F0'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#000', 
            margin: 0 
          }}>
            Select Session Time
          </h2>
          <Close sx={{ color: '#999', cursor: 'pointer' }} onClick={onClose} />
        </div>

        {/* Time Categories */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {timeCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
              style={{ marginBottom: '20px' }}
            >
              <h3 style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                color: '#666', 
                margin: '0 0 12px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {category.name}
              </h3>
              
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px' 
              }}>
                {category.slots.map((slot, slotIndex) => (
                  <motion.button
                    key={slot.time}
                    className={`time-slot ${slot.selected ? 'selected' : ''}`}
                    onClick={() => handleTimeSlotClick(categoryIndex, slotIndex)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      border: slot.selected ? '2px solid #DFDAFB' : '2px solid #E0E0E0',
                      background: slot.selected 
                        ? 'linear-gradient(135deg, #DFDAFB 0%, #F9CCC5 100%)' 
                        : 'rgba(255, 255, 255, 0.9)',
                      color: slot.selected ? '#000' : '#666',
                      fontWeight: slot.selected ? '600' : '500'
                    }}
                  >
                    {slot.time}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Time Display */}
        {selectedTime && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: '16px',
              padding: '12px',
              background: 'rgba(223, 218, 251, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
              Selected Time
            </div>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#000' }}>
              {selectedTime}
            </div>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          style={{ 
            display: 'flex', 
            gap: '12px', 
            marginTop: '24px',
            paddingTop: '16px',
            borderTop: '1px solid #F0F0F0'
          }}
        >
          <button className="btn-secondary" style={{ flex: 1 }} onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn-primary" 
            style={{ flex: 1 }}
            disabled={!selectedTime}
            onClick={onClose}
          >
            Confirm
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SelectSessionTime;
