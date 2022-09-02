function fn() {
    console.log(v);
}
function foo() {
    const v = 3;
    const g = fn;
    return g;
}
const vprinter = foo();
vprinter();