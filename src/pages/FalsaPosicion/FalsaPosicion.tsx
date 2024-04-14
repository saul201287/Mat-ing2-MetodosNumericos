import { useContext, useEffect, useState } from 'react'
import MethodTable from '../../components/MethodTable/MethodTable'
import { FalsaIterationsData, falsePositionMethod } from '../../services/MetodoFalsaPosicion'
import './FalsaPosicion.css'
import ExpressionContext from '../../context/ExpressionContext'

type methodData = {
    root: number | null,
    iterations: FalsaIterationsData[]
}

export default function FalsaPosicion() {

    const headers = ["a", "b","fa", "fb", "xi","fxi", "f(a)*f(xr)", "e"]
    const {expression} = useContext(ExpressionContext)
    const [methodData, setMethodData] = useState<methodData>({
        root: 0,
        iterations: []
    })
    
    function fx(x: number): number {
        return x ** 3 - 2 * x - 5;
    }

    useEffect(()=> {
        if (expression.compiledFn && expression.interval)
        setMethodData(falsePositionMethod(expression.compiledFn,expression.interval[0],expression.interval[1]))
        
    },[])

    useEffect(()=> {
        console.log(methodData)
    },[methodData])

    return(
        <section className='falsa-posicion'>

            <h1>Falsa Posicion</h1>

            <MethodTable headers={headers} methodData={methodData.iterations}/>
        </section>
    )
}