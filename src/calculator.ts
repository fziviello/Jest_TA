const Calculator = {

    sum(a,b){
        return a+b;
    },

    sub(a,b){
        return a-b;
    },

    mul(a,b){
        return a*b;
    },

    div(a,b){
        if(a == 0 && b == 0) {
            return Infinity;
        }
        else if(b == 0) {
            throw new Error("Cannot divide by 0");
        } else {
            return a/b;
        }
    }
}

export { Calculator };