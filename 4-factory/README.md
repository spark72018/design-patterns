# Factory Pattern
- Formal definition: 
    - This pattern defines an interface for creating an object, but lets the subclasses decide which type of object to create. The pattern delegates object instantiation to a subclass.
- When we use `new`, we are actually programming to an implementation, since we are instantiating a concrete class. There isn't anything technically wrong with using `new`, it is the most fundamental way of creating an object in a lot of languages. The problem occurs when we look at how **change** impacts our use of `new`.

- Coding to an interface helps us with the Open/Closed principle because our calling code can work with any class that implements that interface through polymorphism (each class can perform their own unique operation internally, but externally they will look the same to the calling code because they will all have the same interface.) 
    - If we have calling code that makes use of concrete classes, that code may have to be changed in the future as classes are added/subtracted, making it not "closed for modification."

- (p. 133) All factory patterns encapsulate object creation. The Factory Method Pattern allows subclasses to decide what type of object to create. Often, the createor abstract class depends on an abstract product (which is produced by the subclass). It has to be an abstract product b/c the creator doesn't need to know what concrete type is created. 

- Dependency Inversion Principle:
    - Depend upon abstractions. Do not depend upon concrete classes. 

