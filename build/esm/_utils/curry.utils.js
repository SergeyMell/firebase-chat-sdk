export function curry(func) {
    return function curried() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (args.length >= func.length) {
            // @ts-ignore
            return func.apply(this, args);
        }
        else {
            return function () {
                var args2 = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args2[_i] = arguments[_i];
                }
                // @ts-ignore
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}
export function curryOnce(func) {
    return function curried() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return function () {
            var args2 = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args2[_i] = arguments[_i];
            }
            // @ts-ignore
            return func.apply(this, args.concat(args2));
        };
    };
}
