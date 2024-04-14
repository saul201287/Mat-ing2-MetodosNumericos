import { useContext, useEffect, useState } from 'react'
import MethodTable from '../../components/MethodTable/MethodTable'
import '../FalsaPosicion/FalsaPosicion.css'
import ExpressionContext from '../../context/ExpressionContext'
import bisectionMethod, { BiseccionIterationData } from '../../services/MetodoBiseccion'
type methodData = {
    root: number | null,
    iterations: BiseccionIterationData[]
}

export default function Biseccion () {
    const headers = ["x1", "x2", "xp", "fxp", "e"]
    const {expression} = useContext(ExpressionContext)
    const [methodData, setMethodData] = useState<methodData>({
        root: 0,
        iterations: []
    })

    useEffect (() => {
        if (expression.compiledFn && expression.interval)
        setMethodData(bisectionMethod(expression.compiledFn,expression.interval[0],expression.interval[1]))
    },[])

    useEffect(()=> {
        console.log(methodData)
    },[methodData])
    return (
        <section className='falsa-posicion'>
            <h1>Biseccion</h1>

            <MethodTable headers={headers} methodData={methodData.iterations}/>

            <h3>La raiz es: <span id='raiz'>{methodData.root}</span></h3>
        </section>
    )
}