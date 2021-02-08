// listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);
document.getElementById('form-reset').addEventListener('submit', resetInput); 
document.querySelector('.results').style.display = 'none';

// Calculate results




function calculateResults(e) {
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
    document.querySelector('.results').style.display = 'block'
    UImonthlyPayment.value = UImonthly.toFixed(2);
    UItotalPayment.value = (UImonthly * UIcalculatedPayment).toFixed(2);
    UItotalInterest.value = ((UImonthly * UIcalculatedPayment)-UIpirnciple).toFixed(2);
  } else {
    showError('Please Check your input')
  }
  e.preventDefault();
}

function showError(error){
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