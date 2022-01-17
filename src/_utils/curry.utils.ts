export function curry(func: Function) {

    return function curried(...args: any[]) {
        if (args.length >= func.length) {
            // @ts-ignore
            return func.apply(this, args);
        } else {
            return function (...args2: any[]) {
                // @ts-ignore
                return curried.apply(this, args.concat(args2));
            }
        }
    };

}

export function curryOnce(func: Function) {

    return function curried(...args: any[]) {
        return function (...args2: any[]) {
            // @ts-ignore
            return func.apply(this, args.concat(args2));
        }
    };

}
