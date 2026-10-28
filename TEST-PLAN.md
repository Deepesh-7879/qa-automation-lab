# Checkout QA test plan

## Scope and exit criteria
Validate checkout business rules and negative inputs in a deterministic local environment. Exit: all 16 baseline cases pass, the mutation control detects three failures, and the demo's basic user flows work. Excludes payments, backend APIs, authentication, load testing and real email deliverability.

## Traceability
| Requirement | Cases |
| --- | --- |
| Valid checkout and totals | TC01 |
| 10% normalized coupon, reject unknown | TC02, TC03, TC11 |
| Email validation | TC04, TC05, TC14 |
| Integer quantity 1–10 | TC06–TC10, TC15 |
| Shipping threshold and discount interaction | TC12, TC13, TC16 |

₹1,000 is not exactly reachable with a fixed ₹499 product and integer quantity. TC12/13 exercise the nearest reachable values (₹998 and ₹1,497). A configurable-price version should add exact threshold tests.

## Reproducible seeded defect BUG-001
Severity: medium in this educational demo; incorrect pricing in a real checkout would need business impact assessment.
1. Enable “Inject a coupon bug”.
2. Use quantity 1, email qa@example.com, coupon SAVE10.
3. Validate checkout.
Expected: discount ₹49.90; final total ₹498.10.
Actual in mutation mode: discount ₹99.80; final total ₹448.20.
Root cause: mutation changes discount multiplier from 0.10 to 0.20.
Detection: TC02, TC03 and TC16 assert exact monetary values and fail in mutation mode.
Resolution: disable mutation; rerun regression suite.

## Browser smoke checklist
- Initial page renders, labels are present, no horizontal overflow on small screens.
- Baseline suite shows 16 passed; failed filter shows an empty state.
- Mutation run exposes coupon failures and assertion details.
- Valid checkout displays computed price; malformed email displays an error.
- JSON export downloads the most recent run, preserving mode and timestamp.

The checklist describes intended checks. Verification performed during implementation is recorded separately; unchecked items must not be treated as passed.

## Implementation verification
- Node: 17/17 tests passed (16 regression cases + mutation control).
- Browser: baseline 16/16; mutation 13/16, with TC02, TC03 and TC16 failing.
- Browser: failed-only filter shows the three failures; valid checkout totals ₹548.00; invalid email is rejected.
- Responsive CSS implemented; mobile viewport and exported file contents not independently verified.
