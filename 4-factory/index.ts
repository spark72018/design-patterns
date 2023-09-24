/**
 * Example #1 - Pizza store that programs to concrete classes
 */
class Pizza {
    prepare() {}
    bake() {}
    cut() {}
    box() {}
}
class CheesePizza extends Pizza {}
class GreekPizza extends Pizza{}
class PepperoniPizza extends Pizza {}
class PizzaStore {
    constructor() {}

    orderPizza(type: string): Pizza {
        let pizza = new Pizza();
        
        // this is what varies, we can move into a Factory to encapsulate
        // object creation
        if (type === "cheese") {
            pizza = new CheesePizza();
        } else if (type === "greek") {
            pizza = new GreekPizza();
        } else if (type === "pepperoni") {
            pizza = new PepperoniPizza();
        }
        // whenever we have more types of pizzas, this 
        // pre-existing code will have to be modified

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }
}

// The Simple Factory isn't really a pattern, more of an idiom, and commonly used.
class SimplePizzaFactory {
    // can be a static method so we don't have to instantiate SimplePizzaFactory
    // but we lose subclassing
    createPizza(type: string): Pizza | null {
        let pizza: Pizza | null = null;

        if (type === "cheese") {
            pizza = new CheesePizza();
        } else if (type === "greek") {
            pizza = new GreekPizza();
        } else if (type === "pepperoni") {
            pizza = new PepperoniPizza();
        }

        return pizza;
    }

    // we can also create methods for other clients besides PizzaStore
    // methods to get descriptions/price for another class like PizzaShopMenu
}

class PizzaStoreWithFactory {
    private factory: SimplePizzaFactory;

    constructor(factory: SimplePizzaFactory) {
        this.factory = factory;
    }

    orderPizza(type: string): Pizza | null {
        const pizza = this.factory.createPizza(type);

        if (!pizza) return null;

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }
}