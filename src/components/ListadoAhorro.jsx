import React from 'react'
import Ahorro from './Ahorro'
const ListadoAhorro = ({ahorros, setAhorroEditar, eliminarAhorro, ahorrosFiltrados, filtro }) => {
  return (
    <div className='listado-gastos contenedor'>


        {
          filtro ? (
            <>
            <h2>{ahorrosFiltrados.length ? 'Ingresos' : 'No hay ingresos aún'}</h2>
            {ahorrosFiltrados.map( ahorro => (
            <Ahorro 
            key={ahorro.id}
            ahorro ={ahorro}
            setAhorroEditar={setAhorroEditar}
            eliminarAhorro={eliminarAhorro}
            />
        ))}
        </>

          ) : (
            <>
            <h2>{ahorros.length ? 'Ingresos' : 'No hay ingresos aún'}</h2>
            
            {ahorros.map( ahorro => (
            <Ahorro 
            key={ahorro.id}
            ahorro={ahorro}
            setAhorroEditar={setAhorroEditar}
            eliminarAhorro={eliminarAhorro}
            />
        ))}
         </>
      )
    }    
      </div>
  )
}

export default ListadoAhorro
