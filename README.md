# QA Automation Lab

An educational QA portfolio project for Deepesh: a demo checkout, 16 executable business-logic regression cases, an interactive results dashboard, JSON evidence export, and a deliberate coupon mutation.

## Run
Requires Node.js 20 or newer. No dependencies are required.

```sh
npm test
npm run report
python3 -m http.server 8080 --directory .
```
Open http://localhost:8080. Click **Run all tests**; 16 cases should pass. Enable **Inject a coupon bug** and run again; three coupon cases should fail. Inspect expected versus actual values, export JSON, and disable the bug to restore normal behavior.

## Rules
- Keyboard price: ₹499; integer quantities 1–10.
- Email is required and must match a basic email format (not mailbox verification).
- SAVE10 is case-insensitive and trims whitespace; it discounts merchandise by 10%.
- Shipping is ₹49 below ₹1,000 merchandise subtotal, free at or above ₹1,000 before discount.
- Unknown coupons reject checkout. All money uses integer paise.
- No payment, order storage, backend, real authentication, or customer data collection.

## Structure
- `engine.js`: shared production logic and explicit test vectors.
- `checkout.test.mjs`: Node assertions plus a mutation-control check.
- `app.js`: browser runner and checkout interaction.
- `test-report.json`: generated results, including actual execution timestamp.
- `TEST-PLAN.md`: scope, traceability and reproducible defect report.
- `.github/workflows/qa.yml`: CI checks and downloadable report.

## Evidence and limitations
`npm test` runs 17 Node tests: 16 regression scenarios plus one mutation-control assertion. These are **business-logic tests**, not automated browser E2E tests. Browser smoke verification is documented in the test plan. The report does not claim code coverage, performance SLAs, security certification, or real customer-system testing. The defect is intentionally seeded for demonstration.

## Interview walkthrough
Explain equivalence partitions (valid/invalid email and coupon), quantity boundaries, combined discount/shipping rules, integer money handling, and why a green suite alone is insufficient. Demonstrate the mutation and explain which tests expose it. Review the code and reproduce the tests yourself before presenting the project.
