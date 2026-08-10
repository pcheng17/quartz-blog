---
title: C++ value semantics
tags: [cpp]
---

## Pass-by-value

```cpp
void youBorrow(Car myCar);
```

In this situation, passing `myCar` by value means you'll be borrowing a copy of my car. So somehow, we've figured out a way to make a copy of my car for you to borrow. Once the function ends (you're done borrowing my car), the copy of the car disappears and I still have my original car. Any damage you might have done to the car will also vanish with the copy.

## Pass by reference

```cpp
void youBorrow(Car& myCar);
```

In this situation, passing `myCar` by reference means I'm letting you borrow my actual car. Anything you do to it will affect my car. Once the function ends (you're done borrowing my car), my car will have any damages you might have caused, any mileage you might have added, any gas you might have added, etc.

## Pass by const-reference

```cpp
void youBorrow(const Car& myCar);
```

In this situation, passing `myCar` by const-reference means I'm letting you borrow my car but you're not allowed to modify it at all. You're unable to add mileage, add gas, damage it, etc. You just get to look at it. Once the function ends (you're done borrowing my car), my car is guaranteed to be how it was prior to you borrowing it.
