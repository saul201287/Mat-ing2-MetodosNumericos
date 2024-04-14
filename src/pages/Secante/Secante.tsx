import { useContext, useEffect, useState } from "react"
import ExpressionContext from "../../context/ExpressionContext"
import MethodTable from "../../components/MethodTable/MethodTable"
import secantMethod, { SecanteIterationsData } from "../../services/MedodoSecante"

type methodData = {
    root: number | null,
    iterations: SecanteIterationsData[]
}

export default function Secante() {
    const headers = ["x0", "x1", "fx0", "fx1", "x1", "fxi", "e"]
    const {expression} = useContext(ExpressionContext)
    const [methodData, setMethodData] = useState<methodData>({
        root: 0,
        iterations: []
    })

    useEffect (() => {
        if (expression.compiledFn && expression.interval)
        setMethodData(secantMethod(expression.compiledFn,expression.interval[0],expression.interval[1]))
    },[])

    useEffect(()=> {
        console.log(methodData)
    },[methodData])
    return (
        <section className='falsa-posicion'>
            <h1>Secante</h1>

            <MethodTable headers={headers} methodData={methodData.iterations}/>

            <h3>La raiz es: <span id='raiz'>{methodData.root}</span></h3>
        </section>
    )
}