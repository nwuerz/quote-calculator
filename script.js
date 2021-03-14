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
  const finalDiv = $('#finalDiv');

  // table display elements
  const form = $('form');
  const weekDisplay = $('#weeklyPrice');
  const semiMonthlyDisplay = $('#semiMonthlyPrice');
  const monthlyPriceDisplay = $('#monthlyPrice');
  const oneTimePriceDisplay = $('#oneTimePrice');
  const weekDiscounted = $('#discountWeekly');
  const semiMonthlyDiscounted = $('#discountSemiMonthly');
  const monthlyDiscounted = $('#discountMonthly');
  const onceTimeDiscounted = $('#discountOnce');

  // input values
  const sfInput = $('#squareFeet');
  const bedInput = $('#beds');
  const bathInput = $('#baths');
  let cleanedRecently = true;
  let hasPets = true;
  let firstName = $('#first-name'); 
  let lastName = $('#last-name');
  let phoneNumber = $('#phone-number');
  let email = $('#email');
  let radioButtons = $('input[class="checkbox"]');

  // helper functions  //
  const toggleVisbility = (button, divToHide, divToShow) => {
    button.on('click', () => {
      divToHide.attr('class', 'hideDiv');
      divToShow.attr('class', 'showDiv');
    })
  }

  const calculatePrices = () => {

    const pricing = {
      once: .10,
      monthly: .08,
      semiMonthly: .07,
      weekly: .05
    };

    const { once, monthly, semiMonthly, weekly } = pricing;

    let squareFeet = $('#squareFeet').val().trim();

    let oneTimePrice = (squareFeet * once);
    let weeklyPrice = (squareFeet * weekly);
    let semiMonthlyPrice = (squareFeet * semiMonthly);
    let monthlyPrice = (squareFeet * monthly);

    let petTax = hasPets === true ? .03 : 0;
    let cleanDiscount = cleanedRecently === true ? .05 : 0;

    oneTimePrice = (oneTimePrice - (oneTimePrice * cleanDiscount) + (oneTimePrice * petTax)).toFixed(2);
    weeklyPrice = (weeklyPrice - (weeklyPrice * cleanDiscount) + (weeklyPrice * petTax)).toFixed(2);
    semiMonthlyPrice = (semiMonthlyPrice - (semiMonthlyPrice * cleanDiscount) + (semiMonthlyPrice * petTax)).toFixed(2);
    monthlyPrice = (monthlyPrice - (monthlyPrice * cleanDiscount) + (monthlyPrice * petTax)).toFixed(2);

    let basePricing = [oneTimePrice, weeklyPrice, semiMonthlyPrice, monthlyPrice]
    let discountedPricing = applyDiscount(basePricing);

    return [basePricing, discountedPricing];
  }

  const applyDiscount = arr => {
    let discountedPrices = arr.map(price => {
      let discountedPrice = (price - (price * .15));
      return discountedPrice.toFixed(2);
    })
    return discountedPrices;
  }

  const displayPrices = () => {
    let priceOptions = calculatePrices();
    let basePrices = priceOptions[0];
    let discountedPrices = priceOptions[1];

    // base pricing display
    weekDisplay.text(`$${basePrices[0]}`);
    semiMonthlyDisplay.text(`$${basePrices[1]}`);
    monthlyPriceDisplay.text(`$${basePrices[2]}`);
    oneTimePriceDisplay.text(`$${basePrices[3]}`);

    // discounted pricing display
    weekDiscounted.text(`$${discountedPrices[0]}`);
    semiMonthlyDiscounted.text(`$${discountedPrices[1]}`);
    monthlyDiscounted.text(`$${discountedPrices[2]}`);
    onceTimeDiscounted.text(`$${discountedPrices[3]}`);
  }

  const delayedVisibility = (button, divToHide, divToShow, delayedDiv) => {
    button.on('click', () => {
      divToHide.attr('class', 'hideDiv');
      divToShow.attr('class', 'showDiv');
      setTimeout(() => {
        divToShow.attr('class', 'hideDiv');
        delayedDiv.attr('class', 'showDiv quoteDiv');
      }, 2000)
      displayPrices();
    });
  }

  const enableButton = (input, button) => {
    input.on('keyup', () => {
      button.attr('disabled', false);
    });
  }

  const verifyUserInfo = e => {
      if(firstName.val() === '' && lastName.val() === '' && phoneNumber.val().length < 10 ) {
        e.preventDefault();
        alert('please enter all required info!');
      } 
  }

  const handleSubmit = () => {
    form.on('submit', e => {
      verifyUserInfo(e);

      try {
        $.ajax({
          type: 'Post',
          url: 'https://formspree.io/f/xvovdekj',
          dataType: "json",
          data: {
            firstName: firstName.val(),
            lastName: lastName.val(),
            email: email.val(),
            themDigitsTho: phoneNumber.val(),
            squareFeet: sfInput.val(),
            bedrooms: bedInput.val(),
            baths: bathInput.val(),
            cleanedRecently,
            hasPets,
            selectedQuote,
            quoteWithDiscount
          }
        })
      } catch (error) {
        alert("Sorry, we couldn't submit your request. Please call (469) 418-0980")
        console.log(error);
      }

      e.preventDefault();
      quoteDiv.attr('class', 'hideDiv');
      finalDiv.attr('class', 'showDiv');

    });
  }

  let selectedQuote = "";
  let quoteWithDiscount = "";

  const setChosenQuote = () => {
    radioButtons.click(e => {
      selectedQuote = e.target.parentElement.nextElementSibling.nextElementSibling.firstElementChild.textContent;
      quoteWithDiscount = e.target.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.textContent;
    });
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
    setChosenQuote()
    handleSubmit();
  }

  init();
});
