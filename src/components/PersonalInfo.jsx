import { useState } from 'react'

export default function PersonalInfoContainer({isPrint}){
  return (
    <section className='personal-info'>
      {isPrint && <h2>informações Pessoais</h2>}

      <NomeInfo isPrint={isPrint} title='Seu nome' description='Nome completo, vai aparecer no topo do seu currículo'/>

      <div>
        <IdadeInfo isPrint={isPrint} title='Sua idade' description='Substitui a data de nascimento em currículos antigos'/>

        {!isPrint && <span>, </span>}

        <NacionalidadeInfo isPrint={isPrint} title='Nacionalidade' description='Ex: Se você é brasileiro(a), digite "brasileiro(a)"' />
      </div>

      {isPrint && <h3>Endereço</h3> }
      <EnderecoInfo isPrint={isPrint} title='Rua & Número' description='No campo Rua, digite SOMENTE o nome da sua rua. No campo Número, digite também o complemento se houver algum (ex: apt 102, lote 15)'/>

      <div>
        <CEPInfo isPrint={isPrint} title='CEP da sua rua' description='Ex: 21212-545'/>
        {!isPrint && <span> - </span>}

        <BairroInfo isPrint={isPrint} />

        {!isPrint && <span>, </span>}
        <CidadeInfo isPrint={isPrint} />

        {!isPrint && <span>/</span>}
        <EstadoInfo isPrint={isPrint} />
      </div>

      {isPrint && <h3>Informações de Contato</h3>}
      <TelContainer isPrint={isPrint} title='Tel para contato' description='Somente os 9 números, sem DDD. Ex: 99999-9999'/>

      <EmailInfo isPrint={isPrint} title='Email' description='Digite um email que você tem total acesso, o recrutador pode entrar em contato através dele' />
      <hr />
    </section>
  )
}
function NomeInfo({isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      <div className="nome-info">
        {isPrint && <label htmlFor="nome">Nome: </label>}
        {isPrint 
          ? <input type="text" nome="nome" id="nome" onChange={handleChange} value={value} autoComplete='given-name additional-name family-name' data-title={title} data-description={description} />
          : <span id="nome">{value}</span>
        }
      </div>
    </>
  )
}
function IdadeInfo({isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      <span className="idade-info">
        {isPrint && <label htmlFor="idade">Idade: </label>}
        {isPrint 
          ? <input type="number" id="idade" min='13' max='99' size='2' name="idade" onChange={handleChange} value={value} data-title={title} data-description={description}/>
          : <span id="idade">{value} anos</span>
        }
      </span>
    </>
  )
}
function NacionalidadeInfo({isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      <span className="nacionalidade-info">
        {isPrint && <label htmlFor="nacionalidade">Nacionalidade: </label>}
        {isPrint
        ? <input type="text" id="nacionalidade" name="nacionalidade" value={value} onChange={handleChange} autoComplete='auto' data-title={title} data-description={description} />
        : <span id="nacionalidade">{value}</span>
        }
      </span>
    </>
  )
}
function EnderecoInfo({isPrint, title, description}){
  const [valueRua, setValueRua] = useState('');
  const handleRua = e => setValueRua(e.target.value);

  const [valueNumero, setValueNumero] = useState('');
  const handleNumero = e => setValueNumero(e.target.value);

  return (
    <>
      <div>
        <span>
          {isPrint && <label htmlFor="rua">Rua: </label>}
          {isPrint 
          ? <input type="text" id="rua" name="rua" value={valueRua} onChange={handleRua} autoComplete='street-address' data-title={title} data-description={description}/>
          : <span id="rua">{valueRua}</span>
          }
        </span>

        {!isPrint && <span>, </span>}

        <span>
          {isPrint && <label htmlFor="numero">Número: </label>}

          {isPrint
          ? <input type="text" id="numero" name="numero" value={valueNumero} onChange={handleNumero} autoComplete='auto' data-title={title} data-description={description}/>
          : <span id="numero">{valueNumero}</span>
          }
        </span>
      </div>
    </>
  )
}
function CEPInfo({isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      <span className="CEP-info">
        {isPrint && <label htmlFor="cep">CEP: </label>}
        {isPrint
        ? <input type="text" id="cep" name="CEP" value={value} onChange={handleChange} autoComplete='postal-code' data-title={title} data-description={description} />
        : <span id="cep">{value}</span>}
      </span>
    </>
  )
}
function BairroInfo({isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      <span className="bairro-info">
        {isPrint && <label htmlFor="bairro">Bairro: </label>}
        {isPrint
        ? <input type="text" id="bairro" name="bairro" value={value} onChange={handleChange} autoComplete='address-level3' data-title={title} data-description={description}/>
        : <span id="bairro">{value}</span>}
      </span>
    </>
  )
}
function CidadeInfo({isPrint}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      <span className="cidade-info">
        {isPrint && <label htmlFor="city">Cidade: </label>}
        {isPrint
        ? <input type="text" id="city" name="city" value={value} onChange={handleChange} autoComplete='address-level2' />
        : <span id="cidade">{value}</span>}
      </span>
    </>
  )
}
function EstadoInfo({isPrint}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value.toUpperCase());

  return (
    <>
      <span className="estado-info">
        {isPrint && <label htmlFor="estado">Estado: </label>}
        {isPrint
        ? <input type="text" id="estado" minLength='0' maxLength="2" size='2' pattern="/[A-Z]/" value={value} onChange={handleChange} autoComplete='address-level1' />
        : <span id="estado">{value}</span>}
      </span>
    </>
  )
}
function TelContainer({isPrint, title, description}){
  const [entries, setEntries] = useState([crypto.randomUUID()]);

  const addEntry = () => setEntries([...entries, crypto.randomUUID()]);

  const removeEntry = e => {
    setEntries([...entries].filter( entry => entry !== e.target.parentElement.id));
  }

  return (
  <div className="tel-container">
    { entries.map( entry => 
      <span key={entry} id={entry}>
        <TelInfo 
          key={'entry-'+entry} 
          itemId={entry}
          isPrint={isPrint} 
          onRemove={removeEntry} 
          title={title} 
          description={description}
        />
        {entries.indexOf(entry) < entries.length-1 && <span key={'spacer-'+entry} className='spacer'> | </span>}
      </span>
    )}
    {isPrint && <button onClick={addEntry}>add. telefone</button>}
  </div>
  )
}
function TelInfo({isPrint, onRemove, itemId, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <>
      {isPrint && <label htmlFor={"phone-"+itemId}>Tel: </label>}
      {isPrint
      ? <input type="tel" id={"phone-"+itemId} name={"phone-"+itemId} value={value} onChange={handleChange} autoComplete='tel-local' data-title={title} data-description={description} />
      : <span id={'phone-'+itemId}>{value}</span>}
      {isPrint && <button onClick={onRemove}>remover</button>}
    </>
  )
};
function EmailInfo({isPrint, title, description}){
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.target.value);

  return (
    <div className='email'>
      {isPrint && <label htmlFor="email">Email: </label>}
      {isPrint 
      ? <input type="email" id="email" name="email" value={value} onChange={handleChange} autoComplete='email' data-title={title} data-description={description} />
      : <span id="email">{value}</span>}
    </div>
  )
}
