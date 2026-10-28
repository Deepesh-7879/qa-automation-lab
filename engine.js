export function checkout({quantity=1,email='',coupon=''}={},mutant=false){
 const errors=[];
 if(!Number.isInteger(quantity)||quantity<1||quantity>10)errors.push('Quantity must be a whole number from 1 to 10.');
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))errors.push('Enter a valid email address.');
 const code=coupon.trim().toUpperCase();
 if(code && code!=='SAVE10') errors.push('Unknown coupon. Try SAVE10.');
 if(errors.length)return {ok:false,errors};
 const subtotal=quantity*49900;
 const discount=code==='SAVE10'?Math.round(subtotal*(mutant?0.20:0.10)):0;
 const shipping=subtotal>=100000?0:4900;
 return {ok:true,subtotal,discount,shipping,total:subtotal-discount+shipping};
}
export const cases=[
 ['TC01','Happy path','Checkout', {quantity:1,email:'qa@example.com'}, {ok:true,total:54800}],
 ['TC02','SAVE10 gives 10% off','Discount',{quantity:1,email:'qa@example.com',coupon:'SAVE10'},{ok:true,discount:4990,total:49810}],
 ['TC03','Coupon ignores case and spaces','Discount',{quantity:2,email:'qa@example.com',coupon:' save10 '},{ok:true,discount:9980,total:94720}],
 ['TC04','Empty email rejected','Validation',{quantity:1,email:''},{ok:false}],
 ['TC05','Malformed email rejected','Validation',{quantity:1,email:'qa@'},{ok:false}],
 ['TC06','Zero quantity rejected','Boundary',{quantity:0,email:'qa@example.com'},{ok:false}],
 ['TC07','Negative quantity rejected','Boundary',{quantity:-1,email:'qa@example.com'},{ok:false}],
 ['TC08','Fractional quantity rejected','Boundary',{quantity:1.5,email:'qa@example.com'},{ok:false}],
 ['TC09','Upper limit accepted','Boundary',{quantity:10,email:'qa@example.com'},{ok:true,total:499000}],
 ['TC10','Above upper limit rejected','Boundary',{quantity:11,email:'qa@example.com'},{ok:false}],
 ['TC11','Unknown coupon rejected','Discount',{quantity:1,email:'qa@example.com',coupon:'FREE'},{ok:false}],
 ['TC12','Shipping below threshold','Shipping',{quantity:2,email:'qa@example.com'},{ok:true,shipping:4900,total:104700}],
 ['TC13','Free shipping above threshold','Shipping',{quantity:3,email:'qa@example.com'},{ok:true,shipping:0,total:149700}],
 ['TC14','Email whitespace normalized','Validation',{quantity:1,email:' qa@example.com '},{ok:true}],
 ['TC15','Non-numeric quantity rejected','Boundary',{quantity:NaN,email:'qa@example.com'},{ok:false}],
 ['TC16','Discount and free shipping combined','Shipping',{quantity:3,email:'qa@example.com',coupon:'SAVE10'},{ok:true,discount:14970,shipping:0,total:134730}]
].map(([id,name,group,input,expected])=>({id,name,group,input,expected}));
export function runSuite(mutant=false){return cases.map(c=>{const actual=checkout(c.input,mutant);return {...c,actual,passed:Object.entries(c.expected).every(([k,v])=>actual[k]===v)};});}
