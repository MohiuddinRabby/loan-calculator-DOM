//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display='none';
    //show loader
    document.getElementById('loader-img').style.display='block';
    setTimeout(calculateResult,2000)
    e.preventDefault();
});

//calculateResult function 

function calculateResult() {
    //UI variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const princpal = parseFloat(amount.value);
    const calculateInterest = parseFloat(interest.value) / 100 / 12;
    const calculatePayment = parseFloat(years.value) * 12;

    //calculate monthly payment 
    const x = Math.pow(1 + calculateInterest, calculatePayment);
    const monthly = (princpal * x * calculateInterest) / (x - 1);
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayment).toFixed(2);
        totalInterest.value = ((monthly * calculatePayment) - princpal).toFixed(2);
        //show result
        document.getElementById('results').style.display='block';
        //hide loader
        document.getElementById('loader-img').style.display='none';
    } else {
        showErrors('Please check numbers');
    }
}
//show error function 
function showErrors(error) {
    //hide result
    document.getElementById('results').style.display='none';
    //hide loader
    document.getElementById('loader-img').style.display='none';
    //create div
    const errDiv = document.createElement('div');
    //getElements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //add classname
    errDiv.className = 'alert alert-danger';
    errDiv.appendChild(document.createTextNode(error));
    //insert error div
    card.insertBefore(errDiv, heading);
    //clear error after 3 s3conds
    setTimeout(clearError,3000);

}
function clearError(){
    document.querySelector('.alert').remove();
}