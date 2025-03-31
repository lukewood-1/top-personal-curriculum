import { useState } from 'react'

export default function ExperienceContainer({isPrint}){
  const [amount, setAmount] = useState([crypto.randomUUID()])

  function addExperienceEntry(){
    setAmount([...amount, crypto.randomUUID()]);
  };

  function removeExperienceEntry(e){
    setAmount([...amount].filter( key => key !== e.target.parentElement.id ))
  }

  return (
    <>
      <section className='experiences-info'>
        <h2>EXPERIÊNCIA PRÉVIA</h2>
        <ul>
          {amount.map( key => (
            <ExperienceEntry 
              key={key} 
              itemId={key} 
              onRemove={removeExperienceEntry} 
              isPrint={isPrint}
            />) )}
        </ul>
        {isPrint && <button onClick={addExperienceEntry}>add. experiência</button>}
      </section>
    </>
  )
}
function NomeDaEmpresaInfo({itemId, isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      {isPrint && <label htmlFor={"nomeDaEmpresa-"+itemId} >Empresa: </label>}
      {isPrint 
        ? <input type="text" id={"nomeDaEmpresa-"+itemId} name={"nomeDaEmpresa-"+itemId} value={value} onChange={handleChange} data-title={title} data-description={description} />
        : <h4 id={'nomeDaEmpresa'+itemId}>{value}</h4>
      }
    </>
  )
}
function NomeDaFuncaoInfo({itemId, isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      {isPrint && <label htmlFor={"nomeDaFuncao-"+itemId}>Função: </label>}
      {isPrint 
        ? <input type="text" id={"nomeDaFuncao-"+itemId} name={"nomeDaFuncao-"+itemId} value={value} onChange={handleChange} data-title={title} data-description={description} />
        : <span id={'nomeDaFuncao-'+itemId}>{value}</span>
      }
    </>
  )
}
function DescricaoFuncaoInfo({itemId, isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      {isPrint
      ?
        <>
          <label htmlFor={'descricaoFuncao-'+itemId}>Descrição da função: </label>
          <textarea rows='5' id={"descricaoFuncao-"+itemId} name={'descricaoFuncao-'+itemId} value={value} onChange={handleChange} data-title={title} data-description={description}></textarea> 
        </>
      :
        <p id={"descricaoFuncao-"+itemId}>Descrição: {value}</p>
      }
    </>
  )
}
export function ExperienceEntry({itemId,onRemove,isPrint}){

  return (
    <>
      <li id={itemId}>
        <div className="job-name_title">
          <NomeDaEmpresaInfo itemId={itemId} isPrint={isPrint} title='Nome da empresa' description='Use o nome fantasia, não a razão social da empresa. Ex: "Loja da Ana", não "Ana Laticínios LTDA."'/>
          <span> (</span><NomeDaFuncaoInfo itemId={itemId} isPrint={isPrint} title='Nome da função' description='Ex: "Operador de Loja, Gerente de departamento"' /><span>) </span>
        </div>
        <div>
          <DescricaoFuncaoInfo itemId={itemId} isPrint={isPrint} title='Descrição da função' description='Uma função é feita de tarefas. Descreva as tarefas que voce executava de forma resumida. Ex: conferência de mercadorias recebidas, pós-atendimento a clientes do setor de eletrônicos via WhatsApp'/>
        </div>
        {isPrint && <button onClick={onRemove}>Remover</button>}
      </li>
    </>
  )
}
