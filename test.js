var myPow = function (x, n) {
  var x = n > 0 ? x : 1/x
  n = Math.abs(n)
  var map = new Map()
  var pow = (x,n) => {
    var result 
    if(map.has(n)) {
      return map.get(n)
    }
    if(n === 0) return 1
    if(n === 1) return x
    var m = Math.floor(n/2)
    result = pow(x,m) * pow(x,n-m)
    map.set(n,result)
    return result
  }
  return pow(x,n)
};