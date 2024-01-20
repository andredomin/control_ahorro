import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({presupuesto, gastos, setGastos, ahorros, setAhorros, setPresupuesto, setIsValidPresupuesto}) => {
    
    const [disponible, setDisponible] = useState(0)
    const [gastado,setGastado] = useState(0)
    const [ahorrado, setAhorrado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(10)
    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto + totalGastado;
        const totalAhorrado = ahorros.reduce((total, ahorro) => ahorro.cantidad + total, 0)
        const nuevoPorcentaje = (((totalAhorrado-totalGastado)/presupuesto)*100).toFixed(2);
        
        setAhorrado(totalAhorrado)
        setGastado(totalGastado)
        setTimeout(() =>{
          setPorcentaje(nuevoPorcentaje)
        }, 1500)

    }, [gastos, ahorros])


    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
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
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje >= 100 ? '#c4ad00' : '#3B82F6',
            trailColor: '#F5F5F5',
            textColor: porcentaje >= 100 ? '#c4ad00' : '#3B82F6',
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
            <span>Objetivo: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible <0 ? 'negativo' : ''}`}>
            <span>Ahorrado: </span> {formatearCantidad(ahorrado)}
        </p>
        <p>
            <span>Gastado: </span> {formatearCantidad(gastado)} 
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto
