// Initial (bad) setup for Starbuzz Coffee:
abstract class Beverage {
    private description: string;

    constructor(description: string) {
        this.description = description;
    }

    getDescription(): string {
        return this.description;
    }

    abstract cost(): number;
}

class HouseBlend extends Beverage {
    constructor(description: string) {
        super(description);
    }

    cost(): number {
        return 2.45;
    }
}

class DarkRoast extends Beverage {
    constructor(description: string) {
        super(description);
    }

    cost(): number {
        return 3.10;
    }
}

const houseBlend = new HouseBlend("Our signature house blend!");
const darkRoast = new DarkRoast("Our delightfully bold dark roast.");

console.log(houseBlend.getDescription());
console.log(houseBlend.cost());

console.log(darkRoast.getDescription());
console.log(darkRoast.cost());

/**
 * On top of coffee, we can have condiments, this will lead into class explosion:
 * 
 * class HouseBlendWithSteamedMilkAndMocha {}
 * class EspressoWithSteamedMilkAndMocha {}
 * class EspressoWithWhipAndSoy {}
 * ....100s of other classes that represent each drink + condiments
 * 
 * What if we tried having instance variables in the base Beverage class 
 * to keep track of all the condiments? Let's try that out below:
 * */
abstract class BeverageTwo {
    private description: string;
    private milk = false;
    private soy = false;
    private mocha = false;
    private whip = false;

    constructor(description: string) {
        this.description = description;
    }

    cost(): number {
        let condimentCost = 0;
        if (this.hasMilk()) {
            condimentCost += .50;
        }

        // same thing for all the other condiments

        return condimentCost;
    }

    hasMilk(): boolean {
        return this.milk;
    }
    setMilk(hasMilk: boolean): void {
        this.milk = hasMilk;
    }
    // ...getters/setters for the rest of the condiments
}

class HouseBlendTwo extends BeverageTwo {
    constructor(description: string) {
        super(description);
    }

    cost(): number {
        return 1.99 + super.cost();
    }
}

class DarkRoastTwo extends BeverageTwo {}

const houseBlendTwo = new HouseBlendTwo('Second signature house blend.');
houseBlendTwo.setMilk(true);

console.log(`House blend two cost: ${houseBlendTwo.cost()}`);

/**
 * This leads to a fewer # of classes, so that must mean we're all good?
 * Not necessarily, there can be potential problems in case the design might
 * need to change in the future. 
 * 
 * Changes in price for condiments will make us modify existing code (Open/Close Principle)
 * New condiments will make us add new methods and alter cost method in base class (Open/Close Principle)
 * New beverages, like Tea, will inherit all the instance variables/methods that it might not need.
 * What if customer wants double mocha?
 * 
 * What we can do instead is (finally) decorate a class with whatever it needs. It might look
 * something like this:
 * 1. Take a DarkRoast object
 * 2. Decoraate it with a Mocha object
 * 3. Decorate it with a Whip object
 * 4. Call the cost() method and rely on delegation to add on the condiment costs
 * 
 * Decorators have the same supertype as the objects they decorate so that the delegation
 * of responsibilities through the wrappers of objects can happen.
 * 
 * Because decorators share the same supertype as the object they're wrapping, they can be
 * passed around wherever the wrapped object is being passed around. 
 * 
 * Objects can be decorated at any time, dynamically at runtime.
 */

abstract class BeverageThree {
    public description: string; // originally made private, but had to change to public since TypeScript only allows functions to be decorators

    constructor(description: string) {
        this.description = description;
    }

    abstract cost(): number;
}

class HouseBlendThree extends BeverageThree {
    constructor(description: string) {
        super(description);
    }

    cost(): number {
        return 1.99;
    }
}

function milkDecorator(beverage: BeverageThree): BeverageThree {
    const milkCost = .20;

    return {
        description: beverage.description + ", with Milk",
        cost(): number {
            return beverage.cost() + milkCost;
        },
    };
}

function mochaDecorator(beverage: BeverageThree): BeverageThree {
    const mochaCost = .15;

    return {
        description: beverage.description + ", with Mocha",
        cost(): number {
            return beverage.cost() + mochaCost;
        },
    }
}

const houseBlendThree = new HouseBlendThree("Our third and final form of our signature blend");
const doubleMochaWithMilkHouseBlendThree = mochaDecorator(mochaDecorator(milkDecorator(houseBlendThree)));

console.log(' ');
console.log(`Decoarated house blend description: ${doubleMochaWithMilkHouseBlendThree.description}`);
console.log(`Cost of decorated house blend: ${doubleMochaWithMilkHouseBlendThree.cost()}`);