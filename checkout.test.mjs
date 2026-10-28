import test from 'node:test';
import assert from 'node:assert/strict';
import {cases,checkout,runSuite} from './engine.js';
for(const c of cases)test(`${c.id}: ${c.name}`,()=>{const actual=checkout(c.input);for(const [key,value] of Object.entries(c.expected))assert.equal(actual[key],value,key);});
test('Mutation control: suite detects incorrect 20% coupon',()=>assert.equal(runSuite(true).filter(t=>!t.passed).length,3));
