import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import Chart from "./Chart";

const ControlPresupuesto = ({presupuesto, gastos, setGastos, ahorros, setAhorros, setPresupuesto, setIsValidPresupuesto}) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado,setGastado] = useState(0)
    const [ahorrado, setAhorrado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(10)
    const [totalIngresos, setTotalIngresos] = useState(0)
    const [chart, setChart] = useState([])
    
    useEffect(() => {
        
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto + totalGastado;
        const totalIngresos = ahorros.reduce((total, ahorro) => ahorro.cantidad + total, 0);
        const totalAhorrado = (totalIngresos-totalGastado);
        const nuevoPorcentaje = (((totalAhorrado)/presupuesto)*100).toFixed(2);
        const totalFinalInChart = totalAhorrado
        const totalFinalGaChart = totalGastado
        const newchart = [0, totalFinalGaChart, totalFinalInChart]
        
    
        setChart(newchart)
        setAhorrado(totalAhorrado)
        setGastado(totalGastado)
        setTotalIngresos(totalIngresos)
        setTimeout(() =>{
          setPorcentaje(nuevoPorcentaje)

        }, 1500)

        

    }, [gastos, ahorros])

   


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-ES', {
            style: 'currency',
            currency: 'EUR',
        })
    }

    const handleResetApp = () => {
      const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')

      if(resultado) {
        setGastos([])
        setAhorros([])
        setPresupuesto(0)
        setIsValidPresupuesto(false)
      } 
    }
  return (
  <>
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      
      <div>
        
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje >= 100 ? '#c4ad00' : '#3e434b',
            trailColor: '#F5F5F5',
            textColor: porcentaje >= 100 ? '#c4ad00' : '#3e434b',
          })} 
          value={porcentaje}
          text={`${porcentaje}% Ahorrado`}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear app
        </button>
        <p>
            <span>Objetivo:  {formatearCantidad(presupuesto)}</span>
        </p>
        <p className={`${disponible <0 ? 'negativo' : ''}`}>
            <span>Ahorrado: </span> <span id="green">{formatearCantidad(ahorrado)}</span>
        </p>
        <p>
            <span>Gastado: </span> <span id="red">{formatearCantidad(gastado)}</span> 
        </p>
      </div>
      
    </div>
    
    <Chart chart={chart} />
    
  </>
  )
}

export default ControlPresupuesto
