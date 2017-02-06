import math
def isPrime(n):
    for i in range(2, 1+int(math.sqrt(n))):
        if n % i == 0: return False
    return True
def boundedProducts(lst, L):
    prods = [1]
    for l in lst:
        new = []
        for k in l:
            for m in prods:
                if k*m <= L:
                    new.append(k*m)
                else:
                    break
        prods += new
        prods.sort()
    return prods

def S(L):
    pwrs2 = [2**k for k in range(int(math.log(L, 2))+1)]
    pwrs3 = [3**k for k in range(int(math.log(L, 3))+1)]
    pwrs5 = [5**k for k in range(int(math.log(L, 5))+1)]
    hamming = [a*b*c for a in pwrs2 for b in pwrs3 for c in pwrs5 if a*b*c < L]
    hprimes = []
    for h in hamming:
        if h+1 > 5 and isPrime(h+1):
            hprimes.append([h+1])
    mem = [pwrs2[1:],pwrs3[1:],pwrs5[1:]]
    return sum(boundedProducts(mem+hprimes, L))

print(S(10**12)%2**32)