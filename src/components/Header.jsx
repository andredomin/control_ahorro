import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPresupuesto from './NuevoPresupuesto'

const Header = ({ presupuesto, setPresupuesto, isValidPresupuesto, setIsValidPresupuesto, ahorros, setAhorros, gastos, setGastos}) => {
  return (
    <header>
        <h1>Objetivo de Ahorro</h1>
        {isValidPresupuesto ? (
            <ControlPresupuesto
            gastos={gastos}
            setGastos={setGastos}
            setAhorros={setAhorros}
            ahorros={ahorros} 
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
            
            />
        ) : (
            <NuevoPresupuesto 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        />

        )}
        
    </header>
  )
}

export default Header
