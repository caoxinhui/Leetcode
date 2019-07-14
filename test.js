

var searchMatrix = function (matrix, target) {
  if (matrix.length === 0) return false
  for (var i = 0; i < matrix.length; i++) {
    if (matrix[i].length === 0) return false
    if (target === matrix[i][0] || (matrix[i + 1] && target === matrix[i + 1][0])) return true
    if (target > matrix[i][0]) {
      if(matrix[i+1]) {
        if(matrix[i+1] > target) {
          debugger
          for (var j = 1; j < matrix[0].length; j++) {
            if (matrix[i][j] === target) return true
          }
        }
      } else {
        for (var j = 1; j < matrix[0].length; j++) {
          if (matrix[i][j] === target) return true
        }
      }
      return false
    } else 
    return false
  }
};