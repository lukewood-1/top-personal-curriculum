export default function PrintButton({isPrint, onTriggerPrint}){

  const triggerPrint = () => window.print();

  return (
    <>
    {isPrint && 
      <section className="submitSection">
        <button type="submit" onClick={onTriggerPrint} >Imprimir</button>
      </section>
    }
    </>
  )
}
