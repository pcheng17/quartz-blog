---
title: A really neat proof in linear algebra
tags: [math, linear-algebra]
aliases: [similar-matrices-over-C]
---

**Theorem.** Let $A, B in RR^(n times n)$ be matrices that are similar over $CC$, i.e., there exists an invertible matrix $Q in CC^(n times n)$ such that $A Q = Q B$. It follows that there exists an invertible matrix $P in RR^(n times n)$ such that

$$
A P = P B.
$$

In other words, $A$ and $B$ are similar over $RR$ as well.^[This seems like a crazy claim, right? How can it be possible that two matrices that are similar over $CC$ are necessarily similar over $RR subset CC$?]

<div class="proof">

Let $A$, $B$, and $Q$ be as stated above. We can decompose $Q$ into its real and imaginary components, $Q = Q_1 + i Q_2$, where $Q_1, Q_2 in RR^(n times n)$. Plugging this into $A Q = Q B$ yields

$$
A(Q_1 + i Q_2) = (Q_1 + i Q_2) B quad => quad A Q_1 + i A Q_2 = Q_1 B + i Q_2 B.
$$

Since $A$, $B$, $Q_1$, and $Q_2$ are all real matrices, it must follow that

$$
A Q_1 = Q_1 B quad "and" quad A Q_2 = Q_2 B.
$$

However, we're not done at this point because there's no guarantee that either $Q_1$ or $Q_2$ are invertible.

For $t in RR$, define $f(t) = det(Q_1 + t Q_2)$. Note that this is a polynomial of degree at most $n$. When we formally plug in $i$, we get

$$
f(i) = det(Q_1 + i Q_2) = det(Q) != 0
$$

because $Q$ is invertible by assumption. This means that $f(t)$ is not identically zero, and thus, must have finitely many roots (at most $n$). It follows that there exists a value $alpha in RR$ such that $f(alpha) = det(Q_1 + alpha Q_2) != 0$, which implies that the matrix $P = Q_1 + alpha Q_2 in RR^(n times n)$ is invertible.

Finally, because we showed earlier that $A Q_1 = Q_1 B$ and $A Q_2 = Q_2 B$, we have

$$
A Q_1 + alpha A Q_2 = Q_1 B + alpha Q_2 B quad => quad A(Q_1 + alpha Q_2) = (Q_1 + alpha Q_2) B,
$$

and therefore, there exists an invertible matrix $P in RR^(n times n)$ such that $A P = P B$.

</div>
