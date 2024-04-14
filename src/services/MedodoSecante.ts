import { EvalFunction } from "mathjs";

export interface SecanteIterationsData {
    i: number,
    x0: number;
    x1: number;
    fx0: number;
    fx1: number;
    xi: number;
    fxi: number;
    e: number;
}
function secantMethod(
    func: EvalFunction,
    x0: number,
    x1: number,
    tolerance: number = 0.0001,
    maxIterations: number = 100
): {root: number | null, iterations: SecanteIterationsData[]}{
    const iterations: SecanteIterationsData[] = [];
    let i = 2;
    let root: number | null = null;

    while (i < maxIterations) {
        let fx0 = func.evaluate({x:x0});
        let fx1 = func.evaluate({x:x1});
        const xi = x1 - (((x1-x0)/(fx1-fx0))*fx1);
        const fxi = func.evaluate({x:xi});
        let e = 0;
        console.log(iterations)

        if (Math.abs(fxi) < tolerance) {
            root = xi;
        }
        
        if (i == 2) {
            e = xi - x1;
        }else{
            const index = iterations.length - 1
            const prevXi = iterations[index].xi;
            e = xi - prevXi;
        }

        iterations.push({i, x0, x1, fx0, fx1, xi, fxi, e});

        if (root != null) {
            break;
        }

        x0 = x1;
        fx0 = fx1;
        x1 = xi;
        fx1 = fxi;

        i++;
    }
    return {root, iterations};
}

export default secantMethod;