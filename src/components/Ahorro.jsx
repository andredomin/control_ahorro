
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions

} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatearFecha } from '../helpers'

import IconoAhorro from '../img/icono_ahorro.svg'


const diccionarioIconos = {
    ahorro : IconoAhorro,
    inversion: IconoAhorro,
    salario: IconoAhorro
}
const Ahorro = ({ahorro, setAhorroEditar, ahorroEdit, eliminarAhorro}) => {

  const leadingActions = () =>(
    <LeadingActions>
      <SwipeAction onClick={()=> {
        setAhorroEditar(ahorro)}}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () =>(
    <TrailingActions>
      <SwipeAction onClick={()=> eliminarAhorro(ahorro.id) } destructive={true}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  
  return (
    <SwipeableList>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
    <div className='gasto sombra'>
      <div className='contenido-gasto'>
        <img src={diccionarioIconos[ahorro.categoria]}
        alt='icono-gasto' />
        <div className='descripcion-gasto'>
            <p className='categoria'>
                {ahorro.categoria}
            </p>
            <p className='nombre-gasto'>
                {ahorro.nombre}
            </p>
            <p className='fecha-gasto'>
                Agregado el: {''}
                <span>{formatearFecha(ahorro.fecha)}</span>
            </p>
            
        </div>
      </div>
      <p className='cantidad-gasto'>
                {ahorro.cantidad}€
            </p>
    </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Ahorro
