import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ModalAhorro from './components/ModalAhorro'
import ListadoGastos from './components/ListadoGastos'
import ListadoAhorro from './components/ListadoAhorro'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/gasto.png'
import IconoAhorro from './img/icono_ahorro.svg'
import Chart from './components/Chart'
function App() {
  
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto') ?? 0))
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const[modal, setModal] = useState(false)
  const[modal2, setModal2] = useState(false)
  const[animarModal, setAnimarModal] = useState(false)

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [ahorros, setAhorros] = useState(localStorage.getItem('ahorros') ? JSON.parse(localStorage.getItem('ahorros')) : [])
  const [ahorroEditar, setAhorroEditar] = useState({})
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])
  const [ahorrosFiltrados, setAhorrosFiltrados] = useState([])
  useEffect(() =>{
    if( Object.keys(gastoEditar).length>0){
      setModal(true)
      setTimeout(() => {
      setAnimarModal(true)
    }, 500);
    }
  }, [gastoEditar])

  useEffect(() =>{
    if( Object.keys(ahorroEditar).length>0){
      setModal2(true)
      setTimeout(() => {
      setAnimarModal(true)
    }, 500);
    }
  }, [ahorroEditar])

  useEffect(() => {
    if (!modal) {
      setTimeout(() => {
        setAnimarModal(false);
      }, 500);
    }
  }, [modal]);

  useEffect(() => {
    if (!modal2) {
      setTimeout(() => {
        setAnimarModal(false);
      }, 500);
    }
  }, [modal2]);

  useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto ??  0)
  }, [presupuesto])

  useEffect(() => {
localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    localStorage.setItem('ahorros', JSON.stringify(ahorros) ?? [])
      }, [ahorros])

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
      const ahorrosFiltrados = ahorros.filter( ahorro => ahorro.categoria === filtro)
      setAhorrosFiltrados(ahorrosFiltrados)
    }
  }, [filtro])

  useEffect(()=> {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if(presupuestoLS > 0 ){
      setIsValidPresupuesto(true)
    }
  }, []);

  const handleNuevoGasto =()=>{
    setModal(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
    setGastoEditar({})
   
  }

  const handleNuevoAhorro =()=>{
    setModal2(true)
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
    setAhorroEditar({})
  }

  const guardarGasto = gasto => {
    if(gasto.id){
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
      setGastoEditar({})
    }

    console.log("Before setting animarModal to false");
    setAnimarModal(false);
  
    setTimeout(() => {
      console.log("Inside setTimeout - Before setting modal2 to false");
      setModal(false);
    }, 500);
  }

  const guardarAhorro = ahorro => {
    if (ahorro.id) {
      const ahorrosActualizados = ahorros.map(ahorroState =>
        ahorroState.id === ahorro.id ? ahorro : ahorroState
      );
      setAhorros(ahorrosActualizados);
    } else {
      ahorro.id = generarId();
      ahorro.fecha = Date.now();
      setAhorros([...ahorros, ahorro]);
      setAhorroEditar({});
    }
  
    console.log("Before setting animarModal to false");
    setAnimarModal(false);
  
    setTimeout(() => {
      console.log("Inside setTimeout - Before setting modal2 to false");
      setModal2(false);
    }, 500);
  };
  
   
  

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id);
    setGastos(gastosActualizados);
  }

  const eliminarAhorro = id => {
    const ahorrosActualizados = ahorros.filter( ahorro => ahorro.id !== id);
    setAhorros(ahorrosActualizados);
  }
  return (
  <>
    <div className={modal ? 'fijar' : ''}>
      <Header
        ahorros={ahorros}
        setAhorros={setAhorros}
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      
      />
      {isValidPresupuesto && (
        <>
          <main>
            
          <Filtros 
             filtro={filtro}
             setFiltro={setFiltro}
          />
              <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} filtro={filtro} gastosFiltrados={gastosFiltrados}/>
              <ListadoAhorro ahorros={ahorros} setAhorroEditar={setAhorroEditar} eliminarAhorro={eliminarAhorro} filtro={filtro} ahorrosFiltrados={ahorrosFiltrados} />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} 
                alt='icono nuevo gasto'
                onClick={handleNuevoGasto}
            
            />
          </div>
          <div className={modal2 ? 'fijar' : ''}>
            <div className='nuevo-ahorro'>
              <img id='nuevo-ahorro' src={IconoAhorro} 
                  alt='icono nuevo ahorro'
                  onClick={handleNuevoAhorro}

              />
            </div> 
            
          </div>
        </>
      )}

      {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar} setGastoEditar={setGastoEditar}/>}
      {modal2 && <ModalAhorro modal2={modal2} setModal2={setModal2} guardarAhorro={guardarAhorro} animarModal={animarModal} setAnimarModal={setAnimarModal} ahorroEditar={ahorroEditar} setAhorroEditar={setAhorroEditar}/>}
    </div>


    
  </>
  )
    
}

export default App
