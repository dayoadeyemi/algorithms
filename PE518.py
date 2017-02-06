from fractions import gcd

factors = { 1: [] } #{ 1: { 1: 1 } }
primes = []
def factor(n, primes, i, l):
	if n not in factors:
		if l[n]:
			factors[n] = [n]
		else:
			while n % primes[i] != 0:
				i=i+1
			p = primes[i]
			factors[n] = [p] + factor(int(n/p), primes, i, l)
	return factors[n]

def get_factors(prime_factors):
	if len(prime_factors) == 0:
		return []
	x, *xs = prime_factors
	yield x 
	for y in get_factors(xs):
		yield y
		yield x*y

def get_full_comp(comeplement):
	newComp = {};
	for k1 in comeplement:
		v1 = comeplement[k1]
		for k2 in comeplement:
			v2 = comeplement[k2]
			newComp[k1 * k2] = v1 * v2
			newComp[k1] = k2 * v1 * v2
			newComp[k2] = k1 * v1 * v2
			newComp[v1] = k1 * k1 * v2
			newComp[v2] = k1 * v1 * k2
			if k1 * v2 < v1 * k2:
				newComp[k1 * v2] = v1 * k2
			else:
				newComp[v1 * k2] = k1 * v2
	return newComp


def f(n):
	l = [False, False] + [True] * (n-2)
	i = 2
	while i < len(l):
		j = i*i
		while j < len(l):
			l[j] = False
			j=j+i
		i=i+1
	i = 2
	while i < len(l):
		if l[i]:
			primes.append(i)
		i=i+1

	print("got primes")
	# print(primes)
	out = set
	 for k in range(1, n):
	 	for y in range(1, int(((n+1)**0.5)/k + 1)):
	 		if k*y*y-1 < n and l[k*y*y-1]:
	 			for x in range(1, y):
	 				if l[k*x*x-1] and l[k*x*y-1]:
	 					out.add((k*x*x-1, k*x*y - 1, k*y*y-1))


	return sum(item for sublist in out for item in sublist)

	# prime_factors = [factor((p+1), primes, 0, l) for p in primes]
	# factors = None
	# print("got prime factors", prime_factors[9])

	# full_factors = [get_factors(ps) for ps in prime_factors]
	# print("got full factors", list(full_factors[9]))

	# return

	# complements = ({ d: int((primes[j]+1)/d) for d in full_factors[j] if d*d < (primes[j]+1)} for j in range(0, len(primes)))
	# print("got complements")

	# sqcomps = (get_full_comp(comeplement) for comeplement in complements)

	# print("got square complements")
	# out = 0
	# for complement in sqcomps:
	# 	for a_ in complement:
	# 		if a_ > complement[a_]: continue
	# 		a = a_ - 1
	# 		c = complement[a_]-1
	# 		if a < c < n and l[a] and l[c]:
	# 			b = int(((a+1)*(c+1))**0.5)-1
	# 			if a < b < c < n:
	# 				out = out + a + b + c
	# return out

print(f(10**8))
