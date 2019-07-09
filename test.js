/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  for (var i = digits.length - 1; i >= 0; i--) {
    if (digits[i] + 1 === 10) {
      digits[i] = 0
      if (i === digits.length - 1) {
        digits.unshift(1)
        break
      }
    } else {
      digits[i] = digits[i] + 1
      break
    }
  }
  return digits
};