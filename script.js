$(document).ready(() => {
  
  // buttons
  const startBtn = $('#startBtn');
  const sfBtn = $('#sfBtn');
  const bedsBtn = $('#bedsBtn');
  const bathsBtn = $('#bathsBtn');
  const cleanedRecentlyBtn = $('#cleanedRecently');
  const hasPetsBtn = $('#hasPets');
  const previousBtn = $('.previousBtn');
  const petsBtn = $('.petsBtn');
  
  // divs
  const startDiv = $('#startDiv');
  const sfDiv = $('#sfDiv');
  const bedsDiv = $('#bedsDiv');
  const bathsDiv = $('#bathsDiv');
  const previousDiv = $('#previousDiv');
  const petsDiv = $('#petsDiv');
  const loadingDiv = $('#loadingDiv');
  const quoteDiv = $('.quoteDiv');
  const sfInput = $('#squareFeet');
  const bedInput = $('#beds');
  const bathInput = $('#baths');

  // table data
  const weekDisplay = $('#weeklyPrice');
  const weeklyCheckbox = $('#weeklyQuote');
  const semiMonthlyDisplay = $('#semiMonthlyPrice');
  const semiMonthlyCheckbox = $('#semiMonthlyQuote');
  const monthlyPriceDisplay = $('#monthlyPrice');
  const monthlyCheckbox = $('#monthlyQuote');
  const oneTimePriceDisplay = $('#oneTimePrice'); 
  const oneTimeCheckbox = $('#oneTimeQuote');
  const checkboxes = $('.checkbox');

  // values
  let cleanedRecently = true;
  let hasPets = true;

  const pricing = {
    once: .10,
    monthly: .08,
    semiMonthly: .07,
    weekly: .05
  };

  const { once, monthly, semiMonthly, weekly } = pricing;

  // ------------------  //
  const toggleVisbility = (button, divToHide, divToShow) => {
    button.on('click', () => {
      divToHide.attr('class', 'hideDiv');
      divToShow.attr('class', 'showDiv');
    })
  }

  const calculatePrice = () => {
    let squareFeet = $('#squareFeet').val().trim();

    let oneTimePrice = (squareFeet * once).toFixed(2);
    let weeklyPrice = (squareFeet * weekly).toFixed(2);
    let semiMonthlyPrice = (squareFeet * semiMonthly).toFixed(2);
    let monthlyPrice = (squareFeet * monthly).toFixed(2);

    hasPets === true ?  petTax = .03 : petTax = 0;
    cleanedRecently === true ? discount = .05 : discount = 0;

    oneTimePrice = oneTimePrice - (oneTimePrice * discount) + (oneTimePrice * petTax);
    weeklyPrice = weeklyPrice - (weeklyPrice * discount) + (weeklyPrice * petTax);
    semiMonthlyPrice = semiMonthlyPrice - (semiMonthlyPrice * discount) + (semiMonthlyPrice * petTax);
    monthlyPrice = monthlyPrice - (monthlyPrice * discount) + (monthlyPrice * petTax);

    console.log(oneTimePrice + " - one time price")


    weekDisplay.text(`$${weeklyPrice.toFixed(2)}`);
    oneTimePriceDisplay.text(`$${oneTimePrice.toFixed(2)}`);
    semiMonthlyDisplay.text(`$${semiMonthlyPrice.toFixed(2)}`);
    monthlyPriceDisplay.text(`$${monthlyPrice.toFixed(2)}`);
  }

  const delayedVisibility = (button, divToHide, divToShow, delayedDiv) => {
    button.on('click', () => {
      divToHide.attr('class', 'hideDiv');
      divToShow.attr('class', 'showDiv');
      setTimeout(() => {
        divToShow.attr('class', 'hideDiv');
        delayedDiv.attr('class', 'showDiv quoteDiv');
      }, 2000)
      calculatePrice();
    });
  }

  const enableButton = (input, button) => {
    input.on('keyup', () => {
      button.attr('disabled', false);
    });
  }

  handleCheckboxClicks = () => {
    quoteDiv.on('click', (e) => {
    if (e.target.className === 'checkbox') {
      let checkedBox = e.target;

      for (let i = 0; i < checkboxes.length; i++) {
        let uncheckedBox = checkboxes[i];
        uncheckedBox.checked = false;
      }
      checkedBox.checked = true;
    }
    })
  }

  const init = () => {
    toggleVisbility(startBtn, startDiv, sfDiv);
    enableButton(sfInput, sfBtn);
    toggleVisbility(sfBtn, sfDiv, bedsDiv);
    enableButton(bedInput, bedsBtn);
    toggleVisbility(bedsBtn, bedsDiv, bathsDiv);
    enableButton(bathInput, bathsBtn);
    toggleVisbility(bathsBtn, bathsDiv, previousDiv);
    cleanedRecentlyBtn.on('click', () => {
      cleanedRecently = false;
    });
    toggleVisbility(previousBtn, previousDiv, petsDiv);
    hasPetsBtn.on('click', () => {
      hasPets = false;
    });
    delayedVisibility(petsBtn, petsDiv, loadingDiv, quoteDiv);
    handleCheckboxClicks();
  }

  init();
});
