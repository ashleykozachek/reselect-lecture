const reselect = require('reselect');

const { createSelector } = reselect;

function getN(input) {
  return input.n;
}

function factorial(x) {
  if (x == 1) { return 1; }
  return x * factorial(x - 1);
}

const n = 10000;
const iMax = 100000;

function unmemoized() {
  for(let i = 0; i < iMax; i++) {
    factorial(n);
  }
}

const selector = createSelector(
  [getN],
  (n) => factorial(n)
)

const input = {
  n,
};

function memoized() {
  for(let i = 0; i < iMax; i++) {
    selector(input);
  }
}

const startUnmemoized = process.hrtime();
unmemoized();
const timeUnmemoized = process.hrtime(startUnmemoized);

const startMemoized = process.hrtime();
memoized();
const timeMemoized = process.hrtime(startMemoized);

console.log(`repetitions: ${iMax}`);
console.log(`n: ${n}`);
console.log(`Unmemoized: ${timeUnmemoized[0]}s ${timeUnmemoized[1] / 1000000}ms`);
console.log(`Memoized: ${timeMemoized[0]}s ${timeMemoized[1] / 1000000}ms`);