// const {findPrimesSync} = require('./prime.js');
function isPrime(n){
  if(n<2) return false;

  for(let i=2;i<n;i++)
      if(n%i===0)
          return false;

  return true;
}

function findPrimesSync(min,max){
  let primes=[];
  for(let i=min;i<=max;i++){
      if(isPrime(i))
          primes.push(i);
  }
  return primes;
}

function findPrimes(min,max,cb){
  let primes=[];
  for(let i=min;i<=max;i++){
      if(isPrime(i))
          primes.push(i);
  }
  //return primes;
  cb(primes);
}
function printFindPrimesResult(minnametable,maxnametable){
    
  console.log(`Finding Primes in rangd ${minnametable}-${maxnametable}`)
  let primes= findPrimesSync(minnametable,maxnametable );
  resultsCell.textContent=`${primes.length}`

}



let jobcounter = 1
const form = document.getElementById("inputform")
const minrange = document.getElementById("min")
const maxrange = document.getElementById("max")
const tableBody = document.querySelector('#dataTable tbody');
form.addEventListener('submit', (e)=>{
  e.preventDefault()
  const minnametable = minrange.value
const maxnametable = maxrange.value
if(minnametable === '' || maxnametable === '') {
  alert("Both fields are required!");
  return; // Exit if the fields are empty
}
let jobid = jobcounter
 jobcounter++

const newrow = document.createElement('tr')
const jonidcell = document.createElement('td')
const minCell = document.createElement('td')
const maxCell = document.createElement('td')
const results = document.createElement('td')

jonidcell.textContent = jobid
minCell.textContent = minnametable
maxCell.textContent = maxnametable
results.textContent = "resulting loading";

newrow.appendChild(jonidcell)
newrow.appendChild(minCell)

newrow.appendChild(maxCell)
newrow.appendChild(results)

newrow.style.backgroundColor = 'red';
// resultsCell.textContent = "Results Pending";

tableBody.appendChild(newrow);


minrange.value = ''
maxrange.value = ''

setTimeout(()=>findPrimes(minnametable, maxnametable, (primes) => {
  // Update the results cell after primes are found
  results.textContent = `Primes Found: ${primes.length}`;
  newrow.style.backgroundColor = 'green'; 
}), 10000)

})







// printFindPrimesResult(2,100);

// printFindPrimesResult(2,50000); 