import { Calculator } from '../src/calculator';

describe("UNIT test", () => {

    test("Addition", () => {
        expect(Calculator.sum(1,2)).toBe(3);
    });

    test("Subtraction", () => {
        expect(Calculator.sub(2,1)).toBe(1);
    });

    test("Multiplication", () => {
        expect(Calculator.mul(3,2)).toBe(6);
    });

    test("Division", () => {
        expect(Calculator.div(3,2)).toBe(1.5);
    });

    test("Division by 0", () => {
        expect( () => {
            Calculator.div(3,0);
        }).toThrowError("Cannot divide by 0");

    });

    test("Division 0 / 0", () => {
        expect(Calculator.div(0,0)).toBe(Infinity);
    });
});