// Postfix++ Interpreter
class PostfixInterpreter {
    constructor() {
        this.stack = [];
        this.symbolTable = new Map();
    }

    // Evaluate a single line of Postfix++ code
    evaluate(line) {
        const tokens = line.trim().split(/\s+/);
    
        for (let token of tokens) {
            if (!isNaN(token)) {
                this.stack.push(Number(token));
            } else if (this.isOperator(token)) {
                this.performOperation(token);
            } else if (token === "=") {
                this.assignVariable();
                return "Variable assigned successfully";
            } else if (/^[A-Za-z]+$/.test(token)) {
                if (this.symbolTable.has(token)) {
                    this.stack.push(this.symbolTable.get(token));
                } else {
                    this.stack.push(token);
                }
            } else {
                throw new Error(`Invalid token: ${token}`);
            }
        }
    
        return this.stack.length > 0 ? this.stack[this.stack.length - 1] : null;
    }
    
    
    
    

    // Check if a token is a valid operator
    isOperator(token) {
        return ["+", "-", "*", "/"].includes(token);
    }

    // Perform an arithmetic operation
    performOperation(operator) {
        if (this.stack.length < 2) {
            throw new Error("Insufficient operands on the stack");
        }

        const b = this.stack.pop();
        const a = this.stack.pop();
        let result;

        switch (operator) {
            case "+":
                result = a + b;
                break;
            case "-":
                result = a - b;
                break;
            case "*":
                result = a * b;
                break;
            case "/":
                if (b === 0) throw new Error("Division by zero");
                result = a / b;
                break;
            default:
                throw new Error(`Unknown operator: ${operator}`);
        }

        this.stack.push(result);
    }

    // Assign a value to a variable
    assignVariable() {
        if (this.stack.length < 2) {
            throw new Error("Insufficient operands for assignment");
        }
    
        const value = this.stack.pop(); // Value to assign
        const variable = this.stack.pop(); // Variable name
    
        if (typeof variable !== "string" || !/^[A-Za-z]+$/.test(variable)) {
            throw new Error(`Invalid variable name: ${variable}`);
        }
    
        this.symbolTable.set(variable, value); // Assign value to variable
    }
    
}

// Example usage
const interpreter = new PostfixInterpreter();

try {
    console.log(interpreter.evaluate("A 5 =")); 
    console.log(interpreter.evaluate("C 6 =")); 
    console.log(interpreter.evaluate("A C *")); 
} catch (error) {
    console.error(error.message);
}


