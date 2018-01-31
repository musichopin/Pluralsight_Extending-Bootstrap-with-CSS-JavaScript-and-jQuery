// *********************************
// * Strip currency symbols, 
// * thousands separators and spaces
// *********************************
function stripCurrency(value, symbol, separator) {
  symbol = (typeof symbol == 'undefined' ? '$' : symbol);
  separator = (typeof separator == 'undefined' ? ',' : separator);

  value = value.replace(symbol, "")
							 .replace(separator, "")
							 .replace(" ", "");
                // **last 2 line was not used in this ex**

  return value;
}

// ************************************
// * Format number with currency symbol
// ************************************
function formatCurrency(value, decimals, decpoint, separator, symbol) {
  decimals = (typeof decimals == 'undefined' ? 2 : decimals);
  decpoint = (typeof decpoint == 'undefined' ? '.' : decpoint);
  separator = (typeof separator == 'undefined' ? ',' : separator);
  symbol = (typeof symbol == 'undefined' ? '$' : symbol);

  // break into array based on where decimal point symbol is
  var parts = value.toFixed(decimals).toString().split(decpoint);

  // create currency with separator character if it has more than 3 digits
  // **not matter in this example**
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  // join currency, parts[0] and parts[1] (which is after decimal)
  return (symbol + parts.join(decpoint)).toLocaleString();
}
