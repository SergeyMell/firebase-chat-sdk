export function arrayToObject(items: string[]): Record<string, boolean> {
    return Object.fromEntries(items.map(item => [item, true]))
}

export function objectToArray(dict: Record<string, boolean>): string[] {
    return Object.entries(dict)
        .filter(([key, value]) => !!value)
        .map(([key, value]) => key);
}
