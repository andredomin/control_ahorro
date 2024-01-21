import { Sparklines, SparklinesLine } from 'react-sparklines';
const Chart = ( { chart }) => {
  
  return (
    <div className='chart sombra contenedor' style={{width: '100%', height: '100%' }}>
          <Sparklines className="spark" data={chart} height={100}>
            <SparklinesLine color="blue" />
          </Sparklines>
        </div>
  )
}

export default Chart