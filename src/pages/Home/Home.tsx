import "./Home.css";
import { useContext, useEffect, useState } from "react";
import Graphic from "../../components/Graphic/Graphic";
import ExpressionContext from "../../context/ExpressionContext";
import { compile, derivative } from "mathjs";
import { navigate } from "wouter/use-browser-location";

export default function Home() {
  const { expression, setExpression } = useContext(ExpressionContext);
  const [method, setMethod] = useState(null);

  const derivate = (fn: string) => {
    try {
      return derivative(fn, "x").toString();
    } catch (e: any) {
      return "";
    }
  };

  const evaluateFunction = (fn: string) => {
    let auxfn;
    try {
      compile(fn);
      auxfn = fn;
    } catch (e: any) {
      auxfn = "";
    } finally {
      return auxfn;
    }
  };

  const setFunction = (e: any) => {
    const string = e.target.value;
    const newFn = {
      fn: evaluateFunction(string),
      derivative: derivate(string),
    };
    setExpression(newFn);
  };

  const selectMethod = ({ target }: any) => {
    const { value } = target;
    setMethod(value);
  };

  const submitMethodData = (e: any) => {
    e.preventDefault();
    const inputa = document.querySelector("#a") as HTMLInputElement;
    if (method !== "newton") {
      const inputb = document.querySelector("#b") as HTMLInputElement;
      const a = Number.parseFloat(inputa.value);
      const b = Number.parseFloat(inputb.value);
      expression.interval = [a, b];
    } else {
      expression.interval = [Number.parseFloat(inputa.value), 0];
      expression.compiledDerivative = compile(expression.derivative);
    }
    expression.compiledFn = compile(expression.fn);
    console.log(expression);
    setExpression(expression);
    navigate(`/${method}`);
  };

  useEffect(() => {
    console.log(expression);
  }, [expression]);

  return (
    <section className="home">
      <h2>Metodos Numericos Mat-Ing-2</h2>
      <form
        className="selection-method"
        aria-required
        onSubmit={submitMethodData}>
        {/* <Expressions expression={expression} SetExpression={SetExpression}/> */}
        <input
          type="text"
          id="funcion"
          onInput={setFunction}
          placeholder="ingrese la funcion"
          required
        />
       
          <fieldset className="interval-input">
            <h3>Ingrese el intervalo</h3>
            <label>
              a: <input type="number" id="a" required step="0.1" />
            </label>
            <label>
              b: <input type="number" id="b" required step="0.1" />
            </label>
          </fieldset>
        
        <Graphic expression={expression} />
        <div>
          <input
            id="biseccion"
            type="radio"
            name="metodo"
            value="biseccion"
            onInput={selectMethod}
          />
          <label htmlFor="biseccion">Biseccion</label>
          <input
            id="falsa"
            type="radio"
            name="metodo"
            value="falsa-posicion"
            onInput={selectMethod}
          />
          <label htmlFor="falsa">Falsa posicion</label>
          <input
            id="secante"
            type="radio"
            name="metodo"
            value="secante"
            required
            onInput={selectMethod}
          />
          <label htmlFor="secante">Secante</label>
          <input
            id="newton"
            type="radio"
            name="metodo"
            value="newton"
            onInput={selectMethod}
          />
          <label htmlFor="newton">Newton Raphson</label>
        </div>
        <button value={"Calcular"}>
          <svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="128" height="128" fill="url(#pattern0_320_2)" />
            <defs>
              <pattern
                id="pattern0_320_2"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1">
                <use href="#image0_320_2" transform="scale(0.0078125)" />
              </pattern>
              <image
                id="image0_320_2"
                width="128"
                height="128"
                href="data:image/png;base64,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"
              />
            </defs>
          </svg>

          <h1>Calcular</h1>
        </button>
      </form>
    </section>
  );
}
