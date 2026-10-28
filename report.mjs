import {writeFileSync} from 'node:fs';
import {runSuite} from './engine.js';
const results=runSuite(); const report={generatedAt:new Date().toISOString(),scope:'Checkout business logic; not browser E2E',passed:results.filter(r=>r.passed).length,total:results.length,results};
writeFileSync('test-report.json',JSON.stringify(report,null,2));
console.log(`${report.passed}/${report.total} regression cases passed`);
if(report.passed!==report.total)process.exitCode=1;
