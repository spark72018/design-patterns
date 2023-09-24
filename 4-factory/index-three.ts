/**
 * More general example of the Factory Method pattern can be seen below.
 * We'll often hear developers say this pattern lets subclasses decide
 * which class to instantiate. By "decide", we don't mean the subclasses
 * themselves decide at runtime, rather the creator class has no knowledge
 * of the product class, and is written in a way (statically) so that the choice
 * is decided purely by the choice of subclass we use.
 */

abstract class Product {}

/** 
 * All concrete products must implement the same interface as Product
 * so that the clients of the products can refer to the same interface,
 * no matter what class we end up with. 
*/
class ConcreteProduct extends Product{}

/**
 * The creator abstract class is responsible for having all the methods
 * to manipulate a product, but not creating the actual product itself. (the factory method)
 * 
 * The factory method and Creator class don't always have to be abstract,
 * we can define the factory method to return a default product, so that
 * when there are no subclasses, we still get a product.
 * 
 */
abstract class Creator {
    // we encapsulate the type of object creation in this method, 
    // so the subclass decides how to create the object,
    abstract factoryMethod();

    anOperation() {}
}

/**
 * The concrete creator implements the factory method, usually the method
 * that produces the actual product (object). If we add additional products
 * or change a product's implementation, we don't have to touch the creator
 * as long as the interface remains the same.
 */
class ConcreteCreator extends Creator {

}
