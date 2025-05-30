const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// GET all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find({});
        res.status(200).json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single patient
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new patient
router.post('/', async (req, res) => {
    const patient = new Patient({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        diagnosis: req.body.diagnosis
    });

    try {
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update) a patient
router.put('/:id', async (req, res) => {
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // `new: true` returns the updated doc, `runValidators` runs schema validators
        );
        if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json(updatedPatient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a patient
router.delete('/:id', async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) return res.status(404).json({ message: 'Patient not found' });
        res.status(200).json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;