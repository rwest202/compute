import primes from './primes.json';

export const isPrime = (p) => {
    if (p in primes) {
        return primes[p];
    }
    for (let i = 2, s = Math.sqrt(p); i <= s; i++) {
        if (p % i === 0) {
            return false;
        }
    }
    return p > 1;
};
