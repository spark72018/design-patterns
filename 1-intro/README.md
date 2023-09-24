*Program to an interface, not an implementation*: 
- In the beginning of the book, we are faced with a problem where we have a **Duck** class, from which different types of ducks can be instantiated. 
- We are going to keep all the things that stay the same within the Duck class. The things that vary, in this case we are looking at the *fly* and *quack* behavior, are going to be their own classes that will hold the implementation of the respective behavior. 
- We do not put the implementation in the Duck superclass, or a specialized implementation in the subclass itself. Either of these cases is an example of programming to an implementation. 
- In the new design, the Duck subclasses will use a behavior represented by an interface (FlyBehavior, and QuackBehavior) so that the actual implementation of the behavior is hidden away inside the new behavior classes. 

"Program to an interface" really means "Program to a supertype" (p. 12):
- We don't necessarily mean a Java interface here. The concept is to take advantage of polymorphism and program to a supertype (so make it more generic), that way at runtime, the actual object isn't locked into the code. 
- "Program to a supertype" can also be rephrased as: declare the type of a variable to be of a supertype, so that the object that is assigned to that variable can be of any concrete implementations of that supertype, such that the class assigning the variable doesn't need to know the actual object type.

"Favor composition over inheritance": Composition generally gives more flexibility. (HAS-A relationship instead of IS-A)

For this chapter and example, we have been using the Strategy Pattern, which is formally defined as:

Strategy Pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. Strategy lets the algorithm vary independently from clients that use it. 