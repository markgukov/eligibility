A simple Express mock server that checks whether a transaction is HSA/FSA eligible.

To run the server:
```
npm install express
node server.js
```

Sample curl call:
```
curl -X POST http://localhost:3000/check-eligibility \
  -H "Content-Type: application/json" \
  -d '{"merchant": "ABC Pharmacy", "amount": 25.50, "mcc": "5912"}'
```

Sample response:
```
{
    "eligible": true,
    "needsLMN": false,
    "confidenceScore": 0.95,
    "classificationSource": "mocked-AI"
}
```