import { useState } from 'react'

export default function AcademicContainer({isPrint}){
  const [itemIds, setItemIds] = useState([crypto.randomUUID()]);

  const addEntry = () => {
    setItemIds([...itemIds, crypto.randomUUID()]);
  };

  const removeEntry = e => {
    setItemIds([...itemIds].filter(key => key !== e.target.parentElement.parentElement.id));
  }

  return (
    <section className='academics-info'>
      <h2>FORMAÇÃO ACADÊMICA</h2>
      <ul>
        { itemIds.map(itemId => <AcademicEntry key={itemId} itemId={itemId} onRemove={removeEntry} isPrint={isPrint}/>) }
      </ul>
      {isPrint && <button onClick={addEntry} disabled={itemIds.length >= 3}>Novo registro</button>}
    </section>
  )
}
export function AcademicEntry({isPrint, itemId, onRemove}){
  const [isMobile, setIsMobile] = useState(false);
  window.matchMedia('(max-width: 720px)').addEventListener('change', e => {
    if(e.matches){
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });

  function spanDivider(){
    if(isPrint){
      return !isMobile && <span> - </span>;
    }
  }
  
  return (
    <li id={itemId}>
      <div>
        <TitleOfStudyInfo itemId={itemId} isPrint={isPrint} title='Curso' description='Ex: Administração / Engenharia da Computação' />
        {spanDivider()}
        <SchoolName itemId={itemId} isPrint={isPrint} title='Nome da instituição' description='Prefira o nome mais famoso da instituição. Ex: Estácio de Sá ao invés de UNESA, and UFRJ ao invés de Universidade Federal do Rio de Janeiro' />
        {!isPrint && <span> (</span>}
        <DateOfStudyInfo itemId={itemId} isPrint={isPrint} title={['Período do curso', 'Data do término do curso']} description={['Digite somente o número do período', 'Clique no campo e escolha mês e ano']}/>
        {!isPrint && <span>) </span>}
        {isPrint && <button onClick={onRemove}>remover</button>}
      </div>
    </li>
  )
}
function SchoolName({itemId, isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <div>
      {isPrint && <label htmlFor={'school-name_'+itemId}>Nome da instituição: </label>}

      {isPrint
      ? <input type="text" id={'school-name_'+itemId} name={'school-name_'+itemId} value={value} onChange={handleChange} data-title={title} data-description={description}/>
      : <span id={'school-name'+itemId}>{value}</span>
      }
    </div>
  )
}
function TitleOfStudyInfo({itemId, isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <div>
      {isPrint && <label htmlFor={'title-of-study_'+itemId}>Curso: </label>}
      {isPrint
        ? <input type="text" id={'title-of-study_'+itemId} name={'title-of-study_'+itemId} value={value} onChange={handleChange} data-title={title} data-description={description} />
        : <p id={'title-of-study-'+itemId}>{value}</p>
      }
    </div>
  )
}
function DateOfStudyInfo({isPrint, itemId, title, description}){
  const [valuePeriod, setValuePeriod] = useState('');
  const [valueConclusion, setValueConclusion] = useState('');
  const [cursando, setCursando] = useState(true);

  const handleChangePeriod = e => setValuePeriod(e.target.value <= '15' ? e.target.value : e.target.value > '0' ? e.target.value : '1');

  const handleChangeConclusion = e => setValueConclusion(e.target.value);

  const handleCursando = e => setCursando( cursando ? false : true )

  function cursandoInput(){
    if(cursando){
      if(isPrint){
        return <input type="number" min='1' max='15' id={'date-of-study_'+itemId+'_period'} name={'date-of-study_'+itemId+'_period'} value={valuePeriod} onChange={handleChangePeriod} data-title={title[0]} data-description={description[0]}/>
      }
      else {
        return <span id={'date-of-study'+itemId}> cursando - {valuePeriod}º período</span>
      }
    }
    else {
      if(isPrint){
        return <input type="month" min={new Date().getFullYear() - 14+'-01'} max={new Date().getFullYear()+'-'+((new Date().getMonth()+1).toString().padStart(2, '0'))} id={'date-of-study_'+itemId+'_conclusion'} name={'date-of-study_'+itemId+'_conclusion'} value={valueConclusion} onChange={handleChangeConclusion} data-title={title[1]} data-description={description[1]}/>
      } else {
        return <span id={'date-of-study_'+itemId+'_conclusion'}> concluído em {valueConclusion}</span>
      }
    }
  };

  function cursandoLabel(){
    if(isPrint){
      return cursando
        ? <label htmlFor={'date-of-study_'+itemId+'_period'} data-title={title[0]} data-description={description[0]}>Digite o período atual: </label>
        : <label htmlFor={'date-of-study_'+itemId+'_conclusion'} data-title={title[1]} data-description={description[1]}>Concluído em: </label>;
    }
  }

  return (
    <>
      <div>
        {isPrint && <label htmlFor={'cursando-'+itemId}>Cursando? </label>}
        {isPrint && <input type="checkbox" id={'cursando-'+itemId} name={'cursando-'+itemId} checked={cursando} onChange={handleCursando} />}
        <div>
          {cursandoLabel()}

          {cursandoInput()}
        </div>
      </div>
    </>
  )
}
