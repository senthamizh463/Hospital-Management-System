import React, { useState, useEffect } from 'react';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import { getPatients, createPatient, updatePatient, deletePatient } from './api';
import './App.css'; // Optional: for basic styling

function App() {
    const [patients, setPatients] = useState([]);
    const [currentPatient, setCurrentPatient] = useState(null);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await getPatients();
            setPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    const handleAddOrUpdatePatient = async (patientData) => {
        try {
            if (currentPatient) {
                await updatePatient(currentPatient._id, patientData);
                setCurrentPatient(null); // Clear form after update
            } else {
                await createPatient(patientData);
            }
            fetchPatients(); // Refresh list
        } catch (error) {
            console.error("Error saving patient:", error);
        }
    };

    const handleEditPatient = (patient) => {
        setCurrentPatient(patient);
    };

    const handleDeletePatient = async (id) => {
        try {
            await deletePatient(id);
            fetchPatients(); // Refresh list
        } catch (error) {
            console.error("Error deleting patient:", error);
        }
    };

    return (
        <div className="App">
            <h1>Hospital Management System</h1>
            <PatientForm currentPatient={currentPatient} onSubmit={handleAddOrUpdatePatient} />
            <PatientList patients={patients} onEdit={handleEditPatient} onDelete={handleDeletePatient} />
        </div>
    );
}

export default App;