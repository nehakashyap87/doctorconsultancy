"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Alert,
  Snackbar,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  CalendarToday,
  AccessTime,
  Person,
  VideoCall,
  LocationOn,
  CheckCircle,
  Schedule,
  Search
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { motion } from "framer-motion";
import dayjs, { Dayjs } from "dayjs";

interface Patient {
  id: string;
  name: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  whatsappSameAsMobile: boolean;
}

interface Session {
  id: string;
  patientId: string;
  patientName: string;
  sessionDate: string;
  sessionTime: string;
  sessionType: "In-Person" | "Online";
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

const validationSchema = Yup.object({
  patientId: Yup.string().required("Please select a patient"),
  sessionDate: Yup.date().required("Session date is required"),
  sessionTime: Yup.string().required("Session time is required"),
  sessionType: Yup.string().oneOf(["In-Person", "Online"]).required("Session type is required"),
  notes: Yup.string().notRequired(),
});

interface SessionSchedulerProps {
  onNavigate: (screen: string) => void;
}

const SessionScheduler: React.FC<SessionSchedulerProps> = ({ onNavigate }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const steps = [
    "Select Patient",
    "Choose Date & Time",
    "Select Session Type",
    "Review & Confirm"
  ];

  // Mock data - in real app, this would come from API
  useEffect(() => {
    setPatients([
      {
        id: "1",
        name: "John Doe",
        mobileNumber: "9876543210",
        whatsappNumber: "9876543210",
        email: "john.doe@email.com",
        address: "123 Main St, City, State 12345",
        whatsappSameAsMobile: true
      },
      {
        id: "2",
        name: "Jane Smith",
        mobileNumber: "9876543211",
        whatsappNumber: "9876543212",
        email: "jane.smith@email.com",
        address: "456 Oak Ave, City, State 12345",
        whatsappSameAsMobile: false
      },
      {
        id: "3",
        name: "Bob Johnson",
        mobileNumber: "9876543213",
        whatsappNumber: "9876543213",
        email: "bob.johnson@email.com",
        address: "789 Pine St, City, State 12345",
        whatsappSameAsMobile: true
      }
    ]);
  }, []);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mobileNumber.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedPatient(null);
  };

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newSession: Session = {
      id: Date.now().toString(),
      patientId: values.patientId,
      patientName: selectedPatient?.name || "",
      sessionDate: values.sessionDate.format('YYYY-MM-DD'),
      sessionTime: values.sessionTime,
      sessionType: values.sessionType,
      status: "scheduled",
      notes: values.notes
    };

    setSessions([...sessions, newSession]);
    setShowSuccess(true);
    handleReset();
    setIsSubmitting(false);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Patient
            </Typography>
            <TextField
              fullWidth
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />
              }}
              sx={{ mb: 2 }}
            />
            <List>
              {filteredPatients.map((patient) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ListItem
                    component="div"
                    onClick={() => setSelectedPatient(patient)}
                    sx={{
                      border: 1,
                      borderColor: selectedPatient?.id === patient.id ? 'primary.main' : 'divider',
                      borderRadius: 1,
                      backgroundColor: selectedPatient?.id === patient.id ? 'action.selected' : 'inherit',
                      mb: 1,
                      '&:hover': {
                        boxShadow: 2,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease-in-out'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <Person color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={patient.name}
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            📞 {patient.mobileNumber}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            📧 {patient.email}
                          </Typography>
                          {patient.whatsappSameAsMobile && (
                            <Chip label="WhatsApp Same" size="small" color="success" />
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                </motion.div>
              ))}
            </List>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose Date & Time
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Session Date"
                    value={dayjs()}
                    minDate={dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          startAdornment: <CalendarToday sx={{ mr: 1, color: 'action.active' }} />
                        }
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Time Slot</InputLabel>
                  <Select
                    value=""
                    label="Time Slot"
                    startAdornment={<AccessTime sx={{ mr: 1, color: 'action.active' }} />}
                  >
                    {timeSlots.map((slot) => (
                      <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Select Session Type
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="session-type"
                name="sessionType"
                value=""
                onChange={() => {}}
              >
                <FormControlLabel
                  value="In-Person"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOn sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body1">In-Person</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Physical consultation at clinic
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="Online"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <VideoCall sx={{ mr: 1, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="body1">Online</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Virtual consultation via video call
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review & Confirm
            </Typography>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Session Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Patient
                  </Typography>
                  <Typography variant="body1">
                    {selectedPatient?.name || "Not selected"}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Date
                  </Typography>
                  <Typography variant="body1">
                    {dayjs().format('MMMM DD, YYYY')}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Time
                  </Typography>
                  <Typography variant="body1">
                    10:00 AM
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Type
                  </Typography>
                  <Typography variant="body1">
                    In-Person
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          <Schedule sx={{ mr: 1, verticalAlign: 'middle' }} />
          Schedule Session
        </Typography>

        <Card>
          <CardContent>
            <Stepper activeStep={activeStep} orientation="horizontal">
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 3 }}>
              {getStepContent(activeStep)}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={() => handleSubmit({})}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Schedule Session"
                  )}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={activeStep === 0 && !selectedPatient}
                >
                  Next
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={4000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success">
            Session scheduled successfully!
          </Alert>
        </Snackbar>
      </motion.div>
    </Box>
  );
};

export default SessionScheduler;
