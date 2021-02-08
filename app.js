// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
  // hide results
  document.getElementById('results').style.display = 'none';
  // show loader
  document.getElementById('loading').style.display = 'block';
  setTimeout(calculateResults, 1200);
  e.preventDefault();
});
document.getElementById('form-reset').addEventListener('submit', resetInput); 


// Calculate results




function calculateResults() {
  // UI Variables
  const UIamount = document.getElementById('amount');
  const UIinterest = document.getElementById('interest');
  const UIyears = document.getElementById('years');
  const UImonthlyPayment = document.getElementById('monthly-payment');
  const UItotalPayment = document.getElementById('total-payment');
  const UItotalInterest = document.getElementById('total-interest');

  const UIpirnciple = parseFloat(UIamount.value);
  const UIcalculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const UIcalculatedPayment = parseFloat(UIyears.value) * 12;

  // compute monthly payments 
  const UIx = Math.pow(1 + UIcalculatedInterest, UIcalculatedPayment);
  const UImonthly = (UIpirnciple  * UIx * UIcalculatedInterest) / (UIx - 1);


  if(isFinite(UImonthly)) {
    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
    UImonthlyPayment.value = UImonthly.toFixed(2);
    UItotalPayment.value = (UImonthly * UIcalculatedPayment).toFixed(2);
    UItotalInterest.value = ((UImonthly * UIcalculatedPayment)-UIpirnciple).toFixed(2);
  } else {
    showError('Please Check your input')
  }
}

function showError(error){
  document.getElementById('loading').style.display = 'none';
  // create Div
  const errorDiv = document.createElement('div');
  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector('.heading')
  // Add Class
  errorDiv.className = 'alert alert-danger';
  // Append text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // inset error above heading
  card.insertBefore(errorDiv, heading);
  //clear error after 3s
  setTimeout(clearError, 3000);


}

function resetInput() {
document.getElementById('loan-form').reset();
}

function clearError() {
  document.querySelector('.alert').remove();
}