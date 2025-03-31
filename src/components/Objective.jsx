import { useState } from 'react'

export default function Objective({isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      <section className="objective">
        {isPrint && <h2>OBJETIVO</h2>}
        {isPrint && <label htmlFor="objective">Cargo desejado: </label>}
        {isPrint
        ? <input type="text" id="objective" name="objective" value={value} onChange={handleChange} data-title={title} data-description={description} />
        : <p>
            <span style={{fontWeight: 'bold', fontSize: '22px'}}>OBJETIVO: </span>
            {value}
          </p>
        }
      </section>
    </>
  )
}
