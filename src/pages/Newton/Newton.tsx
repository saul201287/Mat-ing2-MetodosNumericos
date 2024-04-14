import { useContext, useEffect, useState } from "react"
import newtonRaphson, { NewtonIterationsData } from "../../services/MetodoNewtonRaphson"
import ExpressionContext from "../../context/ExpressionContext"
import MethodTable from "../../components/MethodTable/MethodTable"

type methodData = {
    root: number | null,
    iterations: NewtonIterationsData[]
}

export default function Newton() {
    const headers = ["xn", "fxn"]
    const {expression} = useContext(ExpressionContext)
    const [methodData, setMethodData] = useState<methodData>({
        root: 0,
        iterations: []
    })

    useEffect (() => {
        if (expression.compiledFn && expression.compiledDerivative && expression.interval)
        setMethodData(newtonRaphson(expression.compiledFn, expression.compiledDerivative, expression.interval[0]))
    },[])

    useEffect(()=> {
        console.log(methodData)
    },[methodData])
    return (
        <section className='falsa-posicion'>
            <h1>Newton Raphson</h1>

            <MethodTable headers={headers} methodData={methodData.iterations}/>

            <h3>La raiz es: <span id='raiz'>{methodData.root}</span></h3>
        </section>
    )
}