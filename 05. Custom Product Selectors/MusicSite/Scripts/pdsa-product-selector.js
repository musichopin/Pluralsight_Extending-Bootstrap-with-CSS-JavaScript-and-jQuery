﻿// *************************************
// * BEGIN: PDSA Check Boxes in Buttons
// *************************************
// **************************************************************
// * Options you can modify for check boxes in a bootstrap button
// **************************************************************

// ***jquery karışık ve hardcoded olmasın diye bu object oluşturuldu ***
var checkOptions = {
  id: "",
  checkedGlyph: "glyphicon-ok-circle",
  uncheckedGlyph: "glyphicon-unchecked",
  checkedBtnClass: "btn-success",
  uncheckedBtnClass: "btn-primary",
  checkedText: "Selected",
  uncheckedText: "Not Selected"
};

// **************************************************************
// * Options you can modify for calculating a total
// **************************************************************
var totalOptions = {
  id: "#total",
  priceClass: ".price",
  priceContainerClass: ".panel"
}

// ****************************************
// * Calculate total of checked check boxes
// ****************************************


function calculateTotal(ctl) {
  // Get the total amount
  var total = $(totalOptions.id).text();
  // Strip currency symbols and thousands separator
  total = stripCurrency(total);
  // ***total price written on html page within #total div***

  // Get the price from within closest panel
  var price = $(ctl).closest(totalOptions.priceContainerClass)
              .find(totalOptions.priceClass).text();
  // Strip currency symbols and thousands separator
  price = stripCurrency(price); 
  /* ***price corresponding to last button clicked*** */

  if ($(ctl).prop("checked")) {
    // Add to total
    total = parseFloat(total) +
            parseFloat(price);
  }
  else {
    // Subtract from total
    total = parseFloat(total) -
            parseFloat(price);
  }
  // Format the total ($ sign için) and place into HTML
  $(totalOptions.id).text(formatCurrency(total));
}

// *************************************
// * Set check box into 'checked' format
// *************************************
function setChecked(ctl) {
  $(ctl).prev()
   .removeClass(checkOptions.uncheckedGlyph)
   .addClass(checkOptions.checkedGlyph);
  $(ctl).parent()
   .removeClass(checkOptions.uncheckedBtnClass)
   .addClass(checkOptions.checkedBtnClass);
  $($(ctl).next()).text(checkOptions.checkedText);
}

// ****************************************
// * Set check box into 'un-checked' format
// ****************************************
function setUnchecked(ctl) {
  $(ctl).prev()
   .removeClass(checkOptions.checkedGlyph)
   .addClass(checkOptions.uncheckedGlyph);
  $(ctl).parent()
   .removeClass(checkOptions.checkedBtnClass)
   .addClass(checkOptions.uncheckedBtnClass);
  $($(ctl).next()).text(checkOptions.uncheckedText);
}

// ****************************************
// * Connect to 'change' event and toggle 
// * any check boxes marked as 'checked'
// ****************************************
$(document).ready(function () {
  // Connect to 'change' event in order to toggle glyphs
  $(checkOptions.id + " .btn-group input[type='checkbox']").change(function () {
    if ($(this).prop("checked")) {
      setChecked($(this));
    }
    else {
      setUnchecked($(this));
    }
    // Calculate total
    calculateTotal($(this)); /* *jquery için* */
  });

  // Detect checkboxes that are checked and toggle glyphs
  // **aşağıdaki kod checked attribute'unun yazılmasına karşın
  // (bu attribute serverdan gelebilir veya sadece "checked" 
  // attr yazarak modifiye etmek isteyebiliriz).
  // checkOptions.id'ın bir fonksiyonu yok (?)**
  var checked = $(checkOptions.id + " .btn-group input:checked");
  setChecked(checked);
  // Add all 'checked' values to get total 
  // **total price'a etkimesi için**
  for (var i = 0; i < checked.length; i++) {
    calculateTotal($(checked[i]));
    // *alt: setChecked($(checked[i]));*
  }
});
// ***********************************
// * END: PDSA Check Boxes in Buttons
// ***********************************