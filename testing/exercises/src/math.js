const math = {
  isInteger(n){
    return (typeof n === 'number') && (n % 1 === 0);
  },
  checkNumberCoersion(n){
    if(isNaN(+n)) {
      throw Error(`${n} cannot be coersed to number`);
    }
  },
  aritmeticTemplate(arrayElements, operation, identity){
    if(!Array.isArray(arrayElements)) {
      throw Error('arrayElements should be a proper array');
    }
    if(!operation) {
      throw Error('operation parameter is required');
    }
    if(identity === undefined) {
      throw Error('identity parameter is required for aritmetic operations');
    }

    let res = identity;
    for(const n of arrayElements) {
      this.checkNumberCoersion(n);
      switch(operation) {
        case '+':
          res += n;
          break;
        case '*':
          res *= n;
          break;
        default:
          throw Error(`operation ${operation} is not implemented`);
      }
    }
    return res;
  },
  sum(...x){
    return this.aritmeticTemplate(x, '+', 0);
  },
  multiply(...x){
    return this.aritmeticTemplate(x, '*', 1);
  },
  factorial: function factorial(n){
    if(!this.isInteger(n)) {
      throw Error('paremeter should be a number');
    }
    let result=1;
    let i;
    for (i = 2; i <= n; i++)
        result = result * i;
    return result;
  },
  fibonacci: function fibonacci(n){
    if(!this.isInteger(n)) {
      throw Error('paremeter should be a number');
    }
    let i;
    let fib = [];
    fib[0] = 0;
    fib[1] = 1;
    for(i=2; i<=n; i++)
    {
        fib[i] = fib[i-2] + fib[i-1];
    }
    return fib[i-1];
  },
  avg(arr){
    if(!Array.isArray(arr)) {
      throw Error('parameter should be an array.');
    }

    return this.sum(...arr) / arr.length;
  },

  median(arr){
    if(!Array.isArray(arr)) {
      throw Error('paremeter should be an array.');
    }
    arr.forEach(this.checkNumberCoersion);
    const sortedArr = arr.sort((x,y) => x-y);
    const middle = Math.floor((arr.length - 1) / 2);
    if (sortedArr.length % 2) {
        return sortedArr[middle];
    } else {
        return (sortedArr[middle] + sortedArr[middle + 1]) / 2.0;
    }
  }
};

export default math;