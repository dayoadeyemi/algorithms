N=10000001
phi = []
for n in range(0, N+1):
    phi.append(n)
for p in range(2, N):
    if phi[p] == p:
        for q in range(p, N, p):
            phi[q] = phi[q] // p * (p - 1)

def powers_mod_k(a,k, M):
    n = 0
    output = 1
    while n < M:
        yield output
        output = (output * a) % k
        n = n + 1

def r_max(a):
    return max((a1 + a2) % (a * a) for a1, a2 in zip(powers_mod_k(a-1, a*a, phi[a*a]), powers_mod_k(a+1, a*a, phi[a*a])))

print(r_max(7))
print(sum(r_max(a) for a in range(3, 1001)))