export function docWithId(d) {
    return Object.assign({ id: d.id }, d.data());
}
