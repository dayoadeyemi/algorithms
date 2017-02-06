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

# def tuples(n, l):
# 	if n == 1:
# 		map(lambda x: [x], l)