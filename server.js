const express = require('express');
const app = express();
app.use(express.json());

// Mocked eligibility database
const eligibilityDB = {
    // MCC: { eligible: bool, needsLMN: bool }
    '5912': { eligible: true, needsLMN: false },    // Pharmacy
    '8011': { eligible: true, needsLMN: true },     // Doctor
    '5812': { eligible: false, needsLMN: false },   // Restaurant
    '5947': { eligible: true, needsLMN: false },    // Medical equipment
    '7298': { eligible: false, needsLMN: false },   // Non-eligible
};

app.post('/check-eligibility', (req, res) => {
    const {merchant, amount, mcc } = req.body;

    if (!merchant || !amount || !mcc) { // All three fields are required
        return res.status(400).json({ error: 'Missing required fields: merchant, amount, or mcc' });
    }

    const result = eligibilityDB[mcc] || { eligible: false, needsLMN: false }; // Default to non-eligible if MCC not found

    const response = {
        eligible: result.eligible,
        needsLMN: result.needsLMN,
        confidenceScore: result.eligible ? 0.95 : Math.random() * 0.4, // High confidence for eligible, random for non-eligible
        classificationSource: 'mocked-AI',
    };

    res.json(response);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});