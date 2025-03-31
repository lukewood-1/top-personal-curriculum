import { useState } from 'react'

export default function AdditionalInfoContainer({isPrint}){
  const [children, setChildren] = useState([crypto.randomUUID()]);

  const addChild = () => setChildren([...children, crypto.randomUUID()])

  const removeChild = e => {
    setChildren([...children].filter( key => key !== e.target.parentElement.id));
  }

  return (
    <section className='additional-info'>
      <h2>INFORMAÇÕES ADICIONAIS</h2>
      <ul>
        {
          children.map( child => (<AdditionalInfoEntry key={child} itemId={child} onRemove={removeChild} isPrint={isPrint} title='Informações adicionais' description='Qualquer informação relevevante para a vaga desejada. Ex: Inglês fluente se a função lida com estrangeiros - Escreva "Inglês fluente"' />))
        }
      </ul>
      {isPrint && <button onClick={addChild}>Add. info</button>}
    </section>
  )
}
export function AdditionalInfoEntry({itemId, onRemove, isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <li id={itemId}>
      <span>
        {isPrint && <label htmlFor={'AdditionalInfo-'+itemId}>descrição: </label>}
        {isPrint 
          ? <textarea style={{verticalAlign: 'middle', width: 'fit-content', height: 'fit-content'}} rows='1' id={'AdditionalInfo-'+itemId} name={'AdditionalInfo-'+itemId} value={value} onChange={handleChange} data-title={title} data-description={description} ></textarea>
          : <p id={'AdditionalInfo-'+itemId}>{value}</p>
        }
      </span>
      {isPrint && <button onClick={onRemove}>remover</button>}
    </li> 
  )
}
