"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  FilterList, 
  GridView,
  ArrowBack,
  Phone,
  ExpandMore,
  ExpandLess,
  Person
} from "@mui/icons-material";

interface Doctor {
  id: string;
  name: string;
  phone: string;
  expertise: string;
  gender: string;
  sessionMode: string;
  sessionFee: string;
  isExpanded?: boolean;
}

interface AvailableDoctorsProps {
  onNavigate: (screen: string) => void;
  onSelectTime: () => void;
}

const AvailableDoctors: React.FC<AvailableDoctorsProps> = ({ onNavigate, onSelectTime }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedDoctor, setExpandedDoctor] = useState<string | null>("1");

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Tejas Sharma",
      phone: "+91 98765 43210",
      expertise: "Gynaecology",
      gender: "Male",
      sessionMode: "In-Person & Online",
      sessionFee: "₹1,500/-",
      isExpanded: true
    },
    {
      id: "2",
      name: "Dr. Priya Kapoor",
      phone: "+91 98765 43210",
      expertise: "IVF Specialist",
      gender: "Female",
      sessionMode: "In-Person & Online",
      sessionFee: "₹2,000/-",
      isExpanded: false
    },
    {
      id: "3",
      name: "Dr. Pranav Saxena",
      phone: "+91 98765 43210",
      expertise: "Gynaecology",
      gender: "Male",
      sessionMode: "In-Person & Online",
      sessionFee: "₹1,800/-",
      isExpanded: false
    },
    {
      id: "4",
      name: "Dr. Toshib Bagde",
      phone: "+91 98765 43210",
      expertise: "Psychologist",
      gender: "Female",
      sessionMode: "Online",
      sessionFee: "₹1,200/-",
      isExpanded: false
    }
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.expertise.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExpanded = (doctorId: string) => {
    setExpandedDoctor(expandedDoctor === doctorId ? null : doctorId);
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
            onClick={() => onNavigate('dashboard')}
          />
          <h1 className="header-title" style={{ margin: 0 }}>
            Available Doctors
          </h1>
        </div>
        <Person sx={{ color: '#000' }} />
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
        <GridView sx={{ color: '#999', mr: 1 }} />
        <FilterList sx={{ color: '#999' }} />
      </div>

      {/* Doctors List */}
      <div style={{ paddingBottom: '20px' }}>
        {filteredDoctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`doctor-card ${expandedDoctor === doctor.id ? 'expanded' : ''}`}
            onClick={() => toggleExpanded(doctor.id)}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #DFDAFB 0%, #F9CCC5 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#000',
                  marginRight: '12px'
                }}>
                  {doctor.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#000', marginBottom: '4px' }}>
                    {doctor.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ fontSize: '14px', marginRight: '4px' }} />
                    {doctor.phone}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginTop: '2px' }}>
                    {doctor.expertise}
                  </div>
                </div>
              </div>
              <div>
                {expandedDoctor === doctor.id ? <ExpandLess /> : <ExpandMore />}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedDoctor === doctor.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #F0F0F0' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Expertise</div>
                    <div style={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                      {doctor.expertise}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Gender</div>
                    <div style={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                      {doctor.gender}
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Session mode</div>
                  <div style={{ fontSize: '14px', color: '#000', fontWeight: '500' }}>
                    {doctor.sessionMode}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Session Fee</div>
                    <div style={{ fontSize: '16px', color: '#000', fontWeight: '600' }}>
                      {doctor.sessionFee}
                    </div>
                  </div>
                </div>

                <button 
                  className="btn-primary" 
                  style={{ width: '100%' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectTime();
                  }}
                >
                  Book Now
                </button>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AvailableDoctors;
