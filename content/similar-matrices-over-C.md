---
title: A really neat proof in linear algebra
tags: [math, linear-algebra]
---

**Theorem.** Let $A, B \in \mathbb{R}^{n \times n}$ be matrices that are similar over $\mathbb{C}$, i.e., there exists an invertible matrix $Q \in \mathbb{C}^{n \times n}$ such that $AQ = QB$. It follows that there exists an invertible matrix $P \in \mathbb{R}^{n \times n}$ such that

$$
AP = PB.
$$

In other words, $A$ and $B$ are similar over $\mathbb{R}$ as well.

At first, this seems like a crazy claim, right? How can it be possible that two matrices that are similar over $\mathbb{C}$ are necessarily similar over $\mathbb{R} \subset \mathbb{C}$?

**Proof.** Let $A$, $B$, and $Q$ be as stated above. We can decompose $Q$ into its real and imaginary components, $Q = Q_1 + i Q_2$, where $Q_1, Q_2 \in \mathbb{R}^{n \times n}$. Plugging this into $AQ = QB$ yields
$$
A(Q_1 + i Q_2) = (Q_1 + i Q_2)B \quad \implies \quad AQ_1 + i AQ_2 = Q_1 B + i Q_2 B.
$$

Since $A$, $B$, $Q_1$, and $Q_2$ are all real matrices, it must follow that
$$
AQ_1 = Q_1B \quad \text{and} \quad AQ_2 = Q_2 B.
$$
However, we're not done at this point because there's no guarantee that either $Q_1$ or $Q_2$ are invertible.

For $t \in \mathbb{R}$, define $f(t) = \det(Q_1 + t Q_2)$. Note that this is a polynomial of degree at most $n$. When we formally plug in $i$, we get
$$
f(i) = \det(Q_1 + i Q_2) = \det(Q) \neq 0
$$
because $Q$ is invertible by assumption. This means that $f(t)$ is not identically zero, and thus, must have finitely many roots (at most $n$). It follows that there exists a value $\alpha \in \mathbb{R}$ such that $f(\alpha) = \det(Q_1 + \alpha Q_2) \neq 0$, which implies that the matrix $P = Q_1 + \alpha Q_2 \in \mathbb{R}^{n \times n}$ is invertible.

Finally, because we showed earlier that $ AQ_1 = Q_1B $ and $ AQ_2 = Q_2 B $, we have
$$
AQ_1 + \alpha AQ_2 = Q_1B + \alpha Q_2B \quad \implies \quad A(Q_1 + \alpha Q_2) = (Q_1 + \alpha Q_2)B,
$$
and therefore, there exists an invertible matrix $P \in \mathbb{R}^{n \times n}$ such that $AP = PB$. $\quad\square$
