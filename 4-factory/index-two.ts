/**
 * Now PizzaStore is so successful, we want to accommodate for regional
 * differences in pizza like New York, Chicago, California, etc.
 * 
 * We still want a PizzaStore class, so that the pizzas are prepared 
 * in the same way
 * 
 * One franchise might want a factory that makes NY style pizzas
 * 
 * Another franchise might want a factory that makes Chicago style pizzas
 * 
 * We could create different factories for each style, and compose the PizzaStore
 * with the appropriate factory. That would look something like:
 * 
 * const nyfactory = new NYPizzaFactory();
 * const nyStore = new PizzaStore(nyFactory);
 * nyStore.orderPizza("Veggie");
 * 
 * const chicagoFactory = new ChicagoPizzaFactory();
 * const chicagoStore = new PizzaStore(chicagoFactory);
 * chicagoFactory.orderPizza("Veggie")
 * 
 * But what if the franchieses started to want to employ their own methods
 * of preparing the pizza? Baking it a little differently, cut it differently, etc.
 * 
 * This can be done by putting createPizza back into the PizzaStore, and 
 * making it an abstract method. Then each subclass of PizzaStore can
 * implement their own style of creating the pizza. It might look like this:
 */
abstract class PizzaStoreAbstract {
    orderPizza(type: string): Pizza | null {
        console.log("PizzaStoreAbstract orderPizza called.");
        // createPizza is abstract, so it has no idea of what concrete classes
        // are involved, so we have better decoupling
        const pizza = this.createPizza(type);

        if (!pizza) return null;

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }

    // this is the factory method that handles object creation, and encapsulates
    // what kind of Pizza to create. orderPizza method does not need to know
    // how it decides what kind of Pizza to create. 
    // So we have a decoupling of the client code in the PizzaStore superclass
    // and the object creation code in the subclass (NYStylePizzaStore, ChicagoStylePizzaStore, etc)
    abstract createPizza(type: string): Pizza | null;
}


/**
 * Another way to look at this framework, is to realize that we have two
 * abstract classes, and formed a relationship between them in a way where
 * we encapsulate product knowledge (the product Pizza class) into the
 * creator class (PizzaStore class). The two abstract classes can be viewed
 * in parallel, both of which have concrete classes extending them. 
 */
abstract class Pizza {
    prepare() {}
    bake() {}
    cut() {}
    box() {}
}

class NYStylePizzaStore extends PizzaStoreAbstract {
    // must be implemented since it's abstract in PizzaStoreAbstract
    createPizza(type: string): Pizza | null {
        console.log(`NYStylePizzaStore createPizza type: ${type}`);
        // let pizza: Pizza | null = null;

        // if (type === "cheese") {
        //     pizza = new NYStyleCheesePizza();
        // } else if (type === "greek") {
        //     pizza = new NYStyleGreekPizza();
        // } else if (type === "pepperoni") {
        //     pizza = new NYStylePepperoniPizza();
        // }

        // return pizza;

        return null;
    }
}

class ChicagoStylePizzaStore extends PizzaStoreAbstract {
    // must be implemented since it's abstract in PizzaStoreAbstract
    createPizza(type: string): Pizza | null {
        // let pizza: Pizza | null = null;

        // if (type === "cheese") {
        //     pizza = new ChicagoStyleCheesePizza();
        // } else if (type === "greek") {
        //     pizza = new ChicagoStyleGreekPizza();
        // } else if (type === "pepperoni") {
        //     pizza = new ChicagoStylePepperoniPizza();
        // }

        // return pizza;

        return null;
    }
}

const nyPizzaStore = new NYStylePizzaStore();
nyPizzaStore.orderPizza("cheese");

/**
 * Before, when the PizzaStore class was directly determining the style and 
 * type of the pizza, the higher level component (PizzaStore) depended directly
 * on the concrete lower-level components (the various Pizzas). Using dependency
 * inversion, we can have both the higher and lower level components depend
 * on an abstraction, the abstract class Pizza. 
 * 
 * The PizzaStore depends on it by not having to know what type of pizza is
 * created, it just calls the factory method createPizza.
 * 
 * The various Pizza classes (NHYStyleClamPizza, ChicagoStyleVeggiePizza, etc)
 * depend on the abstract Pizza class too because they implement the Pizza interface
 * in the abstract Pizza class. Exercise: p. 144
 */