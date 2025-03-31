import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import PersonalInfoContainer from './components/PersonalInfo.jsx'
import Objective from './components/Objective.jsx'
import AcademicContainer, { AcademicEntry } from './components/AcademicSection.jsx'
import ExperienceContainer, { ExperienceEntry } from './components/ExperienceContainer.jsx'
import AdditionalInfoContainer, { AdditionalInfoEntry } from './components/AdditionalInfoContainer.jsx'
import SkillsContainer, { SkillEntry } from './components/SkillsContainer.jsx';

function Main({children}){
  const [isPrint, setIsPrint] = useState(true);
  const [canLegend, setCanLegend] = useState(true);

  const handleToggleLegend = e => setCanLegend(!canLegend);

  const onPrint = () => {
    setIsPrint(false);
  }
  const offPrint = () => {
    setIsPrint(true);
  }
  function isMobile(){
    return window.matchMedia('(max-width: 600px)').matches
  }

  window.addEventListener('beforeprint', onPrint);
  window.addEventListener('afterprint', offPrint);

  function Intro({isPrint}){
    return isPrint && 
      <div className='intro'>
        <h1 className='headline'>Criador de Currículos</h1>
        <h2 className='subheadline'>De graça, sem cadastro!</h2>
        <h3>Como utilizar esse site?</h3>
        <ol>
          <li>Preencha os campos;</li>
          <li>Imprima a página(menu do navegador > opção imprimir);</li>
          {!isMobile() && <li>
            <label htmlFor="toggleLegend">
              Legendas(dicas de preenchimento dos campos): 
            </label>
            <input className='legend-btn' type="checkbox" id="toggleLegend" onChange={handleToggleLegend} checked={canLegend}/>
            <span>{canLegend ? <strong>(ligadas)</strong> : <strong>(desligadas)</strong>}</span>
          </li>
          }
          <li>Pronto!</li>
        </ol>
      </div>
    }

// Add floating window with help legends
  function LegendModal(){
    const [info, setInfo] = useState(
      {transform: 'scaleX(0)', x: '0px', y: '0px', title: '', description: '', show: '0'}
    );

    const element = (
      <div className='legend' style={{
        opacity: info.show,
        transform: info.transform,
        left: info.x,
        top: info.y,
        display: 'absolute',
      }}>
        <h3 style={{textAlign: 'center'}}>Legenda</h3>
        <h4>{info.title}</h4>
        <p>{info.description}</p>
      </div>
    );

    const isDesktop = () => window.matchMedia('(width >= 1024px)').matches;
    const isMobile = () => window.matchMedia('(max-width: 1023px)').matches;

    function handleHoverInfo(e){
      if(e.target.matches('[data-title]')){
        if(isDesktop()){
          setInfo(
          {
            transform: 'scaleX(1)',
            x: (e.target.offsetLeft+e.target.offsetWidth+25)+'px',
            y: (e.target.offsetTop-e.target.offsetHeight)+'px',
            title: e.target.getAttribute('data-title'),
            description: e.target.getAttribute('data-description'),
            show: '1',
          })
        }
        else if(isMobile()){
          setInfo({
            ...info,
            x: (e.target.offsetLeft)+'px',
            y: (e.target.offsetTop - (e.target.offsetHeight*9))+'px',
            title: e.target.getAttribute('data-title'),
            description: e.target.getAttribute('data-description'),
            show: '1',
            transform: 'scale(1, 0.8)',
          })
        }
      } else {
        setInfo(
          {
            ...info,
            transform: 'scaleX(0)',
            show: '0',
          }
        )
      }
    };

    document.body.addEventListener('mouseover', handleHoverInfo);

    return element
  }

  return (
    <div className='global-container'>
      <Intro isPrint={isPrint} />
      {(canLegend && !isMobile()) && <LegendModal />}
      <PersonalInfoContainer isPrint={isPrint} />

      <Objective isPrint={isPrint} title='Objetivo' description='Digite SOMENTE o nome do cargo desejado.'/>
      {isPrint && <hr />}

      <AcademicContainer isPrint={isPrint}>
        <AcademicEntry isPrint={isPrint} />
      </AcademicContainer>
      {isPrint && <hr />}

      <SkillsContainer isPrint={isPrint} />
      {isPrint && <hr />}

      <ExperienceContainer isPrint={isPrint}>
        <ExperienceEntry isPrint={isPrint} />
      </ExperienceContainer>
      {isPrint && <hr />}

      <AdditionalInfoContainer isPrint={isPrint} />
      {isPrint && <hr />}

      {isPrint &&
      <section className='print-info-section'>
        <h2>Impressão do seu currículo</h2>
        <p>Depois de preencher os campos acima, é só usar o modo imporessão do seu navegador! Veja como abaixo</p>
        <div className="print-options">
          <details>
              <summary>PC</summary>
              Quando terminar de preencher os campos acima, voce pode imprimir o seu currículo clicando na página com o botão direito do mouse e então na opção 'imprimir'. Na tela de impressão, recomendamos que disabilite a opção "cabeçalho e rodapé". Boa sorte!
          </details>
          <details>
            <summary>Celular</summary>
            Clique na função 'compartilhar' no seu navegador, e dentro dessa clique em 'imprimir'
          </details>
        </div>
      </section>
      }
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Main>
    </Main>
  </StrictMode>,
)
