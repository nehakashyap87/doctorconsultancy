"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid, 
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab
} from "@mui/material";
import { Add, Event, Person, VideoCall, LocationOn } from "@mui/icons-material";
import { motion } from "framer-motion";

interface Session {
  id: string;
  patientName: string;
  time: string;
  type: "In-Person" | "Online";
  status: "scheduled" | "completed" | "cancelled";
}

interface CalendarScreenProps {
  onNavigate: (screen: string) => void;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ onNavigate }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [openAddSession, setOpenAddSession] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      patientName: "John Doe",
      time: "10:00 AM",
      type: "In-Person",
      status: "scheduled"
    },
    {
      id: "2", 
      patientName: "Jane Smith",
      time: "2:30 PM",
      type: "Online",
      status: "scheduled"
    }
  ]);

  const [newSession, setNewSession] = useState({
    patientName: "",
    time: "",
    type: "In-Person" as "In-Person" | "Online"
  });

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => {
      const sessionDate = new Date();
      return sessionDate.toDateString() === date.toDateString();
    });
  };

  const handleAddSession = () => {
    if (newSession.patientName && newSession.time) {
      const session: Session = {
        id: Date.now().toString(),
        patientName: newSession.patientName,
        time: newSession.time,
        type: newSession.type,
        status: "scheduled"
      };
      setSessions([...sessions, session]);
      setNewSession({ patientName: "", time: "", type: "In-Person" });
      setOpenAddSession(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "primary";
      case "completed": return "success";
      case "cancelled": return "error";
      default: return "default";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "Online" ? <VideoCall /> : <LocationOn />;
  };

  return (
    <Box sx={{ p: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          <Event sx={{ mr: 1, verticalAlign: 'middle' }} />
          Session Calendar
        </Typography>

        <Grid container spacing={3}>
          {/* Calendar */}
          <Grid item xs={12} md={8}>
            <Card sx={{ height: 'fit-content' }}>
              <CardContent>
                <Calendar
                  onChange={(value: any) => setSelectedDate(value as Date)}
                  value={selectedDate}
                  className="react-calendar"
                  tileContent={({ date }) => {
                    const daySessions = getSessionsForDate(date);
                    return daySessions.length > 0 ? (
                      <Box sx={{ mt: 1 }}>
                        {daySessions.slice(0, 2).map((session, index) => (
                          <Chip
                            key={index}
                            label={`${session.time} - ${session.patientName}`}
                            size="small"
                            color={getStatusColor(session.status) as any}
                            sx={{ 
                              fontSize: '0.7rem', 
                              height: '20px',
                              mb: 0.5,
                              display: 'block'
                            }}
                          />
                        ))}
                        {daySessions.length > 2 && (
                          <Typography variant="caption" color="text.secondary">
                            +{daySessions.length - 2} more
                          </Typography>
                        )}
                      </Box>
                    ) : null;
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Sessions List */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Sessions for {selectedDate.toLocaleDateString()}
                </Typography>
                
                {getSessionsForDate(selectedDate).length === 0 ? (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    No sessions scheduled for this date
                  </Typography>
                ) : (
                  <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    {getSessionsForDate(selectedDate).map((session) => (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            mb: 2, 
                            p: 2,
                            '&:hover': {
                              boxShadow: 2,
                              transform: 'translateY(-2px)',
                              transition: 'all 0.2s ease-in-out'
                            }
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Person sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                              {session.patientName}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            {getTypeIcon(session.type)}
                            <Typography variant="body2" sx={{ ml: 1 }}>
                              {session.time} - {session.type}
                            </Typography>
                          </Box>
                          
                          <Chip
                            label={session.status}
                            size="small"
                            color={getStatusColor(session.status) as any}
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </Card>
                      </motion.div>
                    ))}
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Add Session Dialog */}
        <Dialog open={openAddSession} onClose={() => setOpenAddSession(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Session</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Patient Name"
              fullWidth
              variant="outlined"
              value={newSession.patientName}
              onChange={(e) => setNewSession({...newSession, patientName: e.target.value})}
              sx={{ mb: 2 }}
            />
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Time Slot</InputLabel>
              <Select
                value={newSession.time}
                onChange={(e) => setNewSession({...newSession, time: e.target.value})}
                label="Time Slot"
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Session Type</InputLabel>
              <Select
                value={newSession.type}
                onChange={(e) => setNewSession({...newSession, type: e.target.value as "In-Person" | "Online"})}
                label="Session Type"
              >
                <MenuItem value="In-Person">In-Person</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddSession(false)}>Cancel</Button>
            <Button onClick={handleAddSession} variant="contained">Add Session</Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add session"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={() => setOpenAddSession(true)}
        >
          <Add />
        </Fab>
      </motion.div>
    </Box>
  );
};

export default CalendarScreen;
