// Function to check if a number is prime
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
  }
  return true;
}

// Synchronously find primes within a given range
function findPrimesSync(min, max) {
  let primes = [];
  for (let i = min; i <= max; i++) {
      console.log(`Checking number: ${i}`);  // Log the current number being checked
      if (isPrime(i)) {
          primes.push(i);
          console.log(`Prime found: ${i}`);  // Log the prime number when found
      }
  }
  return primes;
}


let currentBatchStart = 2;
let batchSize = 1000;
const totalRangeEnd = 500000;
let intervalID;
let jobcounter = 1;

const form = document.getElementById("inputform");
const minrange = document.getElementById("min");
const maxrange = document.getElementById("max");
const tableBody = document.querySelector('#dataTable tbody');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const minnametable = minrange.value;
  const maxnametable = maxrange.value;
  
  if (minnametable === '' || maxnametable === '') {
      alert("Both fields are required!");
      return; // Exit if the fields are empty
  }

  let jobid = jobcounter;
  jobcounter++;

  const newrow = document.createElement('tr');
  const jonidcell = document.createElement('td');
  const minCell = document.createElement('td');
  const maxCell = document.createElement('td');
  const results = document.createElement('td');
  const loadingpercentage = document.createElement('td');

  jonidcell.textContent = jobid;
  minCell.textContent = minnametable;
  maxCell.textContent = maxnametable;
  loadingpercentage.textContent = "0%"
  results.textContent = "resulting loading";

  newrow.appendChild(jonidcell);
  newrow.appendChild(minCell);
  newrow.appendChild(maxCell);
  newrow.appendChild(results);
  newrow.appendChild(loadingpercentage);
  newrow.style.backgroundColor = 'red';

  tableBody.appendChild(newrow);

  minrange.value = '';
  maxrange.value = '';

 
  currentBatchStart = parseInt(minnametable);
  const totalRangeEnd = parseInt(maxnametable);

  // Function to process the next batch
   let count =1;
  function processNextBatch() {
      if (currentBatchStart > totalRangeEnd) {
          clearInterval(intervalID);  
          console.log("All batches processed.");
          loadingpercentage.textContent = "100%"
          newrow.style.backgroundColor = 'green'; 
          return;
      }

      const batchEnd = Math.min(currentBatchStart + batchSize - 1, totalRangeEnd);
    
    
      let primes = findPrimesSync(currentBatchStart, batchEnd);
      
      const progress = Math.min(100, Math.floor(((currentBatchStart - parseInt(minnametable, 10)) / (totalRangeEnd - parseInt(minnametable, 10))) * 100));
      loadingpercentage.textContent = `${progress}%`;

      
     
      results.textContent = `Primes Found: ${primes.length}`;
    // Update row color

    // Move to the next batch
       count++
       console.log(count)
      currentBatchStart += batchSize;

  }

  
  intervalID = setInterval(processNextBatch, 2000);
});
