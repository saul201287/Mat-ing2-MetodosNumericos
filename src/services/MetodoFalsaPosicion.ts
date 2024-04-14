import { EvalFunction } from "mathjs";

export interface FalsaIterationsData {
    a: number;
    b: number;
    fa: number;
    fb: number;
    xi: number;
    fxi: number;
    e: number;
}
export function falsePositionMethod(
    func: EvalFunction,
    a: number,
    b: number,
    tolerance: number = 0.0001,
    maxIterations: number = 100
):{root: number | null , iterations: FalsaIterationsData[] } {
    const iterations: FalsaIterationsData[] = [];
    let iteration = 0;
    let root: number | null = null;

    while (iteration < maxIterations) {
        let fa = func.evaluate({x:a});
        let fb = func.evaluate({x:b});
        const xi = ((a*fb) - (b*fa))/(fb-fa);
        const fxi = func.evaluate({x:xi});
        let e = 0;

        if(Math.abs(fxi) < tolerance){
            root = xi;
        }

        if (iteration > 0) {
            const prevXi = iterations[iteration-1].xi;
            e = Math.abs(xi - prevXi);
        }

        iterations.push({a, b, fa, fb, xi, fxi, e});

        if (root != null) {
            break;
        }

        if(func.evaluate({x:a}) * fxi < 0){
            b = xi;
            fb = fxi;
        }else{
            a = xi;
            fa = fxi;
        }
        
        iteration++;
    }
    return { root, iterations };
}

export default falsePositionMethod;
// function fx(x: number): number {
//     return x ** 3 - 2 * x - 5;
// }

// const { root, iteractions } = falsePositionMethod(fx, 2, 3);

// if (root !== null) {
//     console.log(`La raíz aproximada es: ${root.toFixed(6)}`);
// } else {
//     console.log("No se pudo encontrar la raíz dentro de la tolerancia especificada.");
// }

// console.log("Datos de cada iteración:");
// iterations.forEach((data, index) => {
//     console.log(`Iteración ${index + 1}: a = ${data.a.toFixed(6)}, b = ${data.b.toFixed(6)}, f(a) = ${data.fa.toFixed(6)}, f(b) = ${data.fb.toFixed(6)}, xi = ${data.xi.toFixed(6)}, f(xi) = ${data.fxi.toFixed(6)}, error = ${data.e.toFixed(6)}`);
// });