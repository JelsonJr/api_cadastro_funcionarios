import { Validator } from "mongoose"

interface NumberValidator extends Validator {
    (value: number): boolean;
}

const salarioValidator: NumberValidator = (value: number) => value > 0;

export default salarioValidator;