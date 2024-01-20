import { useState, useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'
const ModalAhorro = ({ animarModal, setAnimarModal, ahorroEditar, setAhorroEditar, guardarAhorro, modal2, setModal2 }) => {
    const [mensaje, setMensaje] = useState('')
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')
    
    const handleSubmit = e => {
        e.preventDefault();

        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')
            setTimeout(()=> {
                setMensaje('')
            }, 2000)
            return;
        }

        guardarAhorro({nombre, cantidad, categoria, id, fecha})
    }
    
    useEffect(() => {
        if(Object.keys(ahorroEditar).length>0){
            setNombre(ahorroEditar.nombre)
            setCantidad(ahorroEditar.cantidad)
            setCategoria(ahorroEditar.categoria)
            setId(ahorroEditar.id)
            setFecha(ahorroEditar.fecha)
        }
    }, []);
    

    
    const ocultarModal = () => {
        try {
          console.log('cerrar');
          setAnimarModal(false);
          setTimeout(() => {
            setModal2(false);
            setAhorroEditar({})
          }, 500);
        } catch (error) {
          console.error('Error closing modal:', error);
        }
      };
      
  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img
            src={CerrarBtn}
            alt='cerrar modal'
            onClick={ocultarModal}
            />
      </div>
      <form 
        onSubmit={handleSubmit}
        className={` formulario ${animarModal ? "animar" : 'cerrar'}`}>
        <legend>{ahorroEditar.nombre ? 'Editar Ingreso' : 'Nuevo Ingreso'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        <div className='campo'>
            <label htmlFor='nombre'>Nombre Ingreso</label>
            <input
                id='nombre'
                type="text"
                placeholder='Añade el Nombre del Ingreso'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
            />
        </div>
        <div className='campo'>
            <label htmlFor='cantidad'>Cantidad</label>
            <input
                id='cantidad'
                type="number"
                placeholder='Añade la cantidad del ingreso: ej. 300'
                value={cantidad}
                onChange={e => setCantidad(Number(e.target.value))}
            />
        </div>
        <div className='campo'>
            <label htmlFor='categoria'>Categoria</label>
            <select id='categoria' value={categoria} onChange={ e => setCategoria(e.target.value)}>
                <option value="">-- Seleccione --</option>
                <option value="ahorro">Ahorro</option>
                <option value="inversion">Inversion</option>
                <option value="salario">Salario</option> 
            </select>
        </div>
        <input type="submit" value={ahorroEditar.nombre ? 'Guardar cambios' : 'Añadir Ingreso'} />
      </form>
    </div>
  )
}

export default ModalAhorro