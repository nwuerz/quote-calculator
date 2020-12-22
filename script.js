$(document).ready(() => {
  //values
  const squareFeet = $('#squareFeet').val();
  const bedrooms = $('#beds').val();
  const baths = $('#baths').val();
  const notNew = $('#notNew').val();
  const newCust = $('#new').val();
  const hasPets = $('#hasPets').val();
  const noPets = $('#noPets').val();
  //buttons
  const startBtn = $('#startBtn');
  const sfBtn = $('#sfBtn');
  const bedsBtn = $('#bedsBtn');
  const bathsBtn = $('#bathsBtn');
  const previousBtn = $('.previousBtn');
  const petsBtn = $('.petsBtn');
  //divs
  const startDiv = $('#startDiv');
  const sfDiv = $('#sfDiv');
  const bedsDiv = $('#bedsDiv');
  const bathsDiv = $('#bathsDiv');
  const previousDiv = $('#previousDiv');
  const petsDiv = $('#petsDiv');
  const loadingDiv = $('#loadingDiv');
  const quoteDiv = $('.quoteDiv');

  const toggleVisbility = (button, divToHide, divToShow) => {
    button.on('click', () => {
      divToHide.attr('class', 'hideDiv');
      divToShow.attr('class', 'showDiv');
    })
  };

  const delayedVisibility = (button, divToHide, divToShow, delayedDiv) => {
    button.on('click', () => {
      divToHide.attr('class', 'hideDiv');
      divToShow.attr('class', 'showDiv');
      setTimeout(() => {
        divToShow.attr('class', 'hideDiv');
        delayedDiv.attr('class', 'showDiv');
      }, 2000);
    })
  };

  const init = () => {
    toggleVisbility(startBtn, startDiv, sfDiv);
    toggleVisbility(sfBtn, sfDiv, bedsDiv);
    toggleVisbility(bedsBtn, bedsDiv, bathsDiv);
    toggleVisbility(bathsBtn, bathsDiv, previousDiv);
    toggleVisbility(previousBtn, previousDiv, petsDiv);
    delayedVisibility(petsBtn, petsDiv, loadingDiv, quoteDiv);
  }

  // const calculatePrice = (squareFeet, newCust, hasPets) => {
  //   const oneTime = squareFeet * .10;
  //   const monthly = squareFeet * .08;
  //   const semiMonthly = squareFeet * .07;
  //   const weekly = squareFeet * .05;
  // }

  init();
});
