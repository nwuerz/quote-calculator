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


  const toggleVisbility = (button, divToHide, divToShow) => {
    button.on('click', () => {
      divToHide.attr('class', 'hideDiv');
      divToShow.attr('class', 'showDiv');
    })
  }

  const init = () => {
    toggleVisbility(startBtn, startDiv, sfDiv);
    toggleVisbility(sfBtn, sfDiv, bedsDiv);
    toggleVisbility(bedsBtn, bedsDiv, bathsDiv);
    toggleVisbility(bathsBtn, bathsDiv, previousDiv);
    toggleVisbility(previousBtn, previousDiv, petsDiv);
    toggleVisbility(petsBtn, petsDiv, loadingDiv);
  }

  init();
});
