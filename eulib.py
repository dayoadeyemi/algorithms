from math import sqrt, floor
from functools import reduce

def primes(n):
	l = [False, False] + [True] * (n-2)
	i = 2
	while i < len(l):
		j = i*i
		while j < len(l):
			l[j] = False
			j=j+i
		i=i+1
	_l = []
	i = 2
	while i < len(l):
		if l[i]:
			_l.append(i)
		i=i+1
	return _l

def chinese_remainder(n, a):
    sum = 0
    prod = reduce(lambda a, b: a*b, n)
 
    for n_i, a_i in zip(n, a):
        p = prod // n_i
        sum += a_i * mul_inv(p, n_i) * p
    return sum % prod
 
 
def mul_inv(a, b):
    b0 = b
    x0, x1 = 0, 1
    if b == 1: return 1
    while a > 1:
        q = a // b
        a, b = b, a%b
        x0, x1 = x1 - q * x0, x0
    if x1 < 0: x1 += b0
    return x1

# def tuples(n, l):
# 	if n == 1:
# 		map(lambda x: [x], l)