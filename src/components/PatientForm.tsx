"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Alert,
  Snackbar,
  CircularProgress,
  Divider,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import {
  Person,
  Phone,
  WhatsApp,
  Email,
  LocationOn,
  Search,
  Add,
  Edit,
  Delete
} from "@mui/icons-material";
import { motion } from "framer-motion";

interface Patient {
  id: string;
  name: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  whatsappSameAsMobile: boolean;
  createdAt: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  mobileNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  whatsappNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "WhatsApp number must be 10 digits")
    .when("whatsappSameAsMobile", {
      is: false,
      then: (schema) => schema.required("WhatsApp number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  email: Yup.string()
    .email("Invalid email format")
    .notRequired(),
  address: Yup.string()
    .min(10, "Address must be at least 10 characters")
    .notRequired(),
});

interface PatientFormProps {
  onNavigate: (screen: string) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ onNavigate }) => {
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "John Doe",
      mobileNumber: "9876543210",
      whatsappNumber: "9876543210",
      email: "john.doe@email.com",
      address: "123 Main St, City, State 12345",
      whatsappSameAsMobile: true,
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      name: "Jane Smith",
      mobileNumber: "9876543211",
      whatsappNumber: "9876543212",
      email: "jane.smith@email.com",
      address: "456 Oak Ave, City, State 12345",
      whatsappSameAsMobile: false,
      createdAt: "2024-01-20"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const initialValues = {
    name: "",
    mobileNumber: "",
    whatsappNumber: "",
    email: "",
    address: "",
    whatsappSameAsMobile: false,
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newPatient: Patient = {
      id: Date.now().toString(),
      name: values.name,
      mobileNumber: values.mobileNumber,
      whatsappNumber: values.whatsappSameAsMobile ? values.mobileNumber : values.whatsappNumber,
      email: values.email,
      address: values.address,
      whatsappSameAsMobile: values.whatsappSameAsMobile,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setPatients([...patients, newPatient]);
    setShowSuccess(true);
    resetForm();
    setIsSubmitting(false);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setOpenEditDialog(true);
  };

  const handleDelete = (patientId: string) => {
    setPatients(patients.filter(p => p.id !== patientId));
  };

  const handleWhatsAppChange = (checked: boolean, setFieldValue: any, mobileNumber: string) => {
    setFieldValue("whatsappSameAsMobile", checked);
    if (checked) {
      setFieldValue("whatsappNumber", mobileNumber);
    } else {
      setFieldValue("whatsappNumber", "");
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mobileNumber.includes(searchTerm) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
          <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
          Patient Management
        </Typography>

        <Grid container spacing={3}>
          {/* Add Patient Form */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: 'fit-content' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Add sx={{ mr: 1 }} />
                  Add New Patient
                </Typography>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="name"
                            label="Full Name"
                            fullWidth
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            InputProps={{
                              startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="mobileNumber"
                            label="Mobile Number"
                            fullWidth
                            error={touched.mobileNumber && Boolean(errors.mobileNumber)}
                            helperText={touched.mobileNumber && errors.mobileNumber}
                            InputProps={{
                              startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={values.whatsappSameAsMobile}
                                onChange={(e) => handleWhatsAppChange(e.target.checked, setFieldValue, values.mobileNumber)}
                                color="primary"
                              />
                            }
                            label="WhatsApp number same as mobile number"
                          />
                        </Grid>

                        {!values.whatsappSameAsMobile && (
                          <Grid item xs={12}>
                            <Field
                              as={TextField}
                              name="whatsappNumber"
                              label="WhatsApp Number"
                              fullWidth
                              error={touched.whatsappNumber && Boolean(errors.whatsappNumber)}
                              helperText={touched.whatsappNumber && errors.whatsappNumber}
                              InputProps={{
                                startAdornment: <WhatsApp sx={{ mr: 1, color: 'action.active' }} />
                              }}
                            />
                          </Grid>
                        )}

                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="email"
                            label="Email ID"
                            type="email"
                            fullWidth
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            InputProps={{
                              startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            name="address"
                            label="Address"
                            fullWidth
                            multiline
                            rows={3}
                            error={touched.address && Boolean(errors.address)}
                            helperText={touched.address && errors.address}
                            InputProps={{
                              startAdornment: <LocationOn sx={{ mr: 1, color: 'action.active', alignSelf: 'flex-start', mt: 1 }} />
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={isSubmitting}
                            sx={{ py: 1.5 }}
                          >
                            {isSubmitting ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              "Add Patient"
                            )}
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>

          {/* Patient List */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Existing Patients ({filteredPatients.length})
                  </Typography>
                </Box>

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

                <List sx={{ maxHeight: 400, overflowY: 'auto' }}>
                  {filteredPatients.map((patient, index) => (
                    <motion.div
                      key={patient.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <ListItem
                        sx={{
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          mb: 1,
                          '&:hover': {
                            boxShadow: 2,
                            transform: 'translateY(-2px)',
                            transition: 'all 0.2s ease-in-out'
                          }
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            {patient.name.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={patient.name}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                <Phone sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                {patient.mobileNumber}
                              </Typography>
                              {patient.email && (
                                <Typography variant="body2" color="text.secondary">
                                  <Email sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                                  {patient.email}
                                </Typography>
                              )}
                              {patient.whatsappSameAsMobile && (
                                <Chip
                                  label="WhatsApp Same"
                                  size="small"
                                  color="success"
                                  sx={{ mt: 0.5 }}
                                />
                              )}
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => handleEdit(patient)}
                            sx={{ mr: 1 }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            edge="end"
                            onClick={() => handleDelete(patient.id)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </motion.div>
                  ))}
                </List>

                {filteredPatients.length === 0 && (
                  <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                    {searchTerm ? 'No patients found matching your search' : 'No patients added yet'}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Success Snackbar */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success">
            Patient added successfully!
          </Alert>
        </Snackbar>
      </motion.div>
    </Box>
  );
};

export default PatientForm;
