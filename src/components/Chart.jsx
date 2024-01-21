import { Sparklines, SparklinesLine } from 'react-sparklines';
import { useRef, useEffect } from 'react';
const Chart = ( { chart }) => {
  
  return (
    <div className='chart sombra contenedor'>
          <Sparklines data={chart}>
            <SparklinesLine color="blue" />
          </Sparklines>
        </div>
  )
}

export default Chart