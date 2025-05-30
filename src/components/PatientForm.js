import React, { useState, useEffect } from 'react';
import './styles/PatientForm.css'; // <--- UPDATED PATH HERE

const PatientForm = ({ currentPatient, onSubmit }) => {
    // ... (rest of your component code remains the same)

    const [patient, setPatient] = useState({
        name: '',
        age: '',
        gender: '',
        diagnosis: ''
    });

    useEffect(() => {
        if (currentPatient) {
            setPatient({
                name: currentPatient.name,
                age: currentPatient.age,
                gender: currentPatient.gender,
                diagnosis: currentPatient.diagnosis
            });
        } else {
            setPatient({
                name: '',
                age: '',
                gender: '',
                diagnosis: ''
            });
        }
    }, [currentPatient]);

    const handleChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(patient);
        setPatient({ name: '', age: '', gender: '', diagnosis: '' }); // Clear form
    };

    return (
        <form onSubmit={handleSubmit} className="patient-form-container">
            <h2>{currentPatient ? 'Edit Patient' : 'Add New Patient'}</h2>
            <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={patient.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Age:</label>
                <input type="number" name="age" value={patient.age} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>Gender:</label>
                <select name="gender" value={patient.gender} onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label>Diagnosis:</label>
                <input type="text" name="diagnosis" value={patient.diagnosis} onChange={handleChange} />
            </div>
            <button type="submit" className="form-submit-button">
                {currentPatient ? 'Update Patient' : 'Add Patient'}
            </button>
        </form>
    );
};

export default PatientForm;