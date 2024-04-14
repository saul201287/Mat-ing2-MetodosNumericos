import { EvalFunction } from "mathjs";

export interface BiseccionIterationData {
    x1: number;
    x2: number;
    xp: number;
    fxp: number;
    e: number;
}

export function bisectionMethod(
    func:EvalFunction,
    x1: number,
    x2: number,
    tolerance: number = 0.0001,
    maxIterations: number = 100
): { root: number | null; iterations: BiseccionIterationData[] } {
    const iterations: BiseccionIterationData[] = [];
    let iteration = 0;
    let root: number | null = null;

    while(iteration < maxIterations){
        const xp = (x1+x2)/2;
        const fxp = func.evaluate({x: xp});
        let e = 0;

        if (Math.abs(fxp)<tolerance) {
            root = xp;
        }

        if(iteration > 0){
            const prevXp = iterations[iteration-1].xp;
            e = Math.abs(xp - prevXp);
        }

        iterations.push({ x1, x2, xp, fxp, e });

        if (root != null) {
            break;
        }
        
        if(func.evaluate({x:x1}) * fxp < 0){
            x2 = xp;
        }else{
            x1 = xp;
        }

        iteration++;
    }
    return {root, iterations};
}

export default bisectionMethod;
// function f(x: number): number {
//     return x ** 3 - 2 * x - 5;
// }

// const {root, iterations} = bisectionMethod(f, 2, 3);

// if (root !== null) {
//     console.log(`La raíz aproximada es: ${root.toFixed(6)}`);
// } else {
//     console.log("No se pudo encontrar la raíz dentro de la tolerancia especificada.");
// }

// console.log("Datos de cada iteración:");
// iterations.forEach((data, index) => {
//     console.log(`Iteración ${index + 1}: x1 = ${data.x1.toFixed(6)}, x2 = ${data.x2.toFixed(6)}, xp = ${data.xp.toFixed(6)}, fxp = ${data.fxp.toFixed(6)}, error = ${data.e.toFixed(6)}`);
// });