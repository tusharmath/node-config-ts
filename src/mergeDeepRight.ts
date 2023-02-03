export const mergeDeepRight = (a: any, b: any): any => {
    if (a === undefined) return b
    if (b === undefined) return a
    if (typeof a === 'object' && typeof b === 'object') {
        return Object.keys({...a, ...b}).reduce((acc, key) => {
            return {...acc, [key]: mergeDeepRight(a[key], b[key])}
        }, {})
    }
    return b
}
