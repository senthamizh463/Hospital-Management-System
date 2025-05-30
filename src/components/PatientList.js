import React from 'react';
import './styles/PatientList.css'; // <--- UPDATED PATH HERE

const PatientList = ({ patients, onEdit, onDelete }) => {
    return (
        <div className="patient-list-container">
            <h2>Patient List</h2>
            {patients.length === 0 ? (
                <p>No patients registered.</p>
            ) : (
                <table className="patient-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Diagnosis</th>
                            <th>Admission Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient._id}>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.gender}</td>
                                <td>{patient.diagnosis || 'N/A'}</td>
                                <td>{new Date(patient.admissionDate).toLocaleDateString()}</td>
                                <td className="patient-actions-buttons">
                                    <button className="edit-button" onClick={() => onEdit(patient)}>Edit</button>
                                    <button className="delete-button" onClick={() => onDelete(patient._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default PatientList;