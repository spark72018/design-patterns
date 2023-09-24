class Duck {
    private flyBehavior;
    private quackBehavior;

    constructor(
        flyBehavior: FlyBehavior,
        quackBehavior: QuackBehavior
    ) {
        this.flyBehavior = flyBehavior;
        this.quackBehavior = quackBehavior;
    }

    performFly(): void {
        // we delegate the behavior to the FlyBehavior class
        // this class does not need to know about fly behavior
        this.flyBehavior.fly();
    }

    performQuack(): void {
        // like above, delegate behavior to QuackBehavior family
        // both fly and quack are examples of us programming to an interface
        this.quackBehavior.quack();
    }

    // setters - for dynamic setting of our behavior objects at runtime
    setFlyBehavior(flyBehavior: FlyBehavior): void {
        this.flyBehavior = flyBehavior;
    }

    setQuackBehavior(quackBehavior: QuackBehavior): void {
        this.quackBehavior = quackBehavior;
    }
}

// think of each set of behaviors below as a family of algorithms
interface QuackBehavior {
    quack: () => void;
}

class Quack implements QuackBehavior {
    quack(): void {
        console.log("Regular quack!");
    }
}

class Squeak implements QuackBehavior {
    quack(): void {
        console.log("Rubber ducky squeak.");
    }
}

class MuteQuack implements QuackBehavior {
    quack(): void {
        console.log("No quack. Can't do anything");
    }
}

// think of each set of behaviors below as a family of algorithms
interface FlyBehavior {
    fly: () => void;
}

class FlyWithWings {
    fly(): void {
        console.log("Regular fly with wings");
    }
}

class FlyNoWay {
    fly(): void {
        console.log("Cannot fly!");
    }
}

class DuckOne extends Duck {
    constructor(
        flyBehavior: FlyBehavior,
        quackBehavior: QuackBehavior
    ) {
        super(flyBehavior, quackBehavior);
    }
}

const duckOne = new DuckOne(
    new FlyWithWings(),
    new Quack()
);

duckOne.performFly();
duckOne.performQuack();

duckOne.setFlyBehavior(new FlyNoWay());
duckOne.setQuackBehavior(new Squeak());

duckOne.performFly();
duckOne.performQuack();