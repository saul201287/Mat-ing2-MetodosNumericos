import { EvalFunction } from "mathjs";

export interface NewtonIterationsData {
    i: number;
    xn: number;
    fxn:number;
}

function newtonRaphson(
    func: EvalFunction,
    funcDer: EvalFunction,
    xi: number,
    tolerance: number = 0.0001,
    maxIterations: number = 100
): { root: number | null, iterations: NewtonIterationsData[] }{
    const iterations: NewtonIterationsData[] = [];
    let i = 1;
    let root: number | null = null;

    while (i < maxIterations) {
        const fxn = func.evaluate({x:xi});
        const fxnDeri = funcDer.evaluate({x:xi});
        const xn = xi - (fxn/fxnDeri);

        if(Math.abs(fxn) < tolerance){
            root = xn;
        }

        iterations.push({i, xn, fxn});

        if(root != null){
            break;
        }

        xi = xn;

        i++
    }
    return {root, iterations};
}

export default newtonRaphson;
