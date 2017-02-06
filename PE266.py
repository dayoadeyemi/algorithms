from math import sqrt, floor
from functools import reduce

def primes(n, ps):
	M = ps[len(ps) - 1];
	while M < n:
		i = 0
		M=M+1
		while i < len(ps) and ps[i] < sqrt(M) and M % ps[i] != 0:
			i=i+1
		if 	M % ps[i] != 0:
			ps.append(M)
	return ps

def PSR(n):
	i = floor(sqrt(n))
	while n % i != 0:
			i=i-1
	return i
	

pms = primes(190, [2,3])
M =  reduce(lambda x, y: x*y, pms)
m = int(sqrt(M))
l1 = []
l2 = []
i = 0
while i < len(pms):
    if i%2 == 0:
        l1.append(pms[i])
    else:
        l2.append(pms[i])
    i=i+1
    

def f(n, xxs, s):
	if len(xxs) == 0:
		return [s]
	x, *xs = xxs
	f1 = [s] if x > n else f(n/x, xs, x*s)
	f2 = f(n, xs, s)
	return f1 + f2

print(l1, l2)
print(m)
v1 = f(m, l1, 1)
v2 = sorted(f(m, l2, 1))

mx = 1;
for u in v1:
	y0 = 0
	y1 = len(v2)-1
	while (y1-y0>1):
		y = int((y1 + y0)/2)
		if u*v2[y] > m:
			y1 = y
		else:
			y0 = y
	mx = max(mx, u*v2[y0])

print(mx%(10**16))