import { useState } from 'react'

export default function SkillsContainer({isPrint}){
  const [entries, setEntries] = useState([crypto.randomUUID()]);
  const addEntry = () => setEntries([...entries, crypto.randomUUID()]);
  const removeEntry = e => setEntries([...entries].filter(entry => entry !== e.target.parentElement.id));

  return (
    <section className="skills-info">
      <h2>HABILIDADES</h2>
      <ul>
        {entries.map( entry => 
          <li key={entry} id={entry}>
            <SkillEntry itemId={entry} isPrint={isPrint} onRemove={removeEntry} /> 
          </li> 
        )}
      </ul>
      {isPrint && <button onClick={addEntry}>nova habilidade</button>}
    </section>
  )
}

export function SkillEntry({isPrint, itemId, onRemove}){
  const [value, setValue] = useState('');
  const handleValue = e => setValue(e.target.value);

  return (
    <>
      <div>
          {isPrint && <label htmlFor={'skill-'+itemId}>descrição: </label>}
          {isPrint
          ? <input type="text" id={'skill-'+itemId} value={value} onChange={handleValue}/>
          : <span>{value}</span>
          }
      </div>
      {isPrint && <button onClick={onRemove}>remover</button>}
    </>
  )
}
