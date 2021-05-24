export class Registro{

  public format:string;
  public text:string;
  public type:string;
  public icon:string;
  public created:Date;

  constructor(format: string, text: string){
    this.format = format;
    this.text = text;
    this.created = new Date();
    this.determinarTipo();
  }

  private determinarTipo(){
    const defaultType = 'No reconocido';
    const objetosPosibles = {
      'http':'http',
      'geo:':'geo'
    };
    const iconDefault = 'create';
    const objetosIconos = {
      'http':'globe',
      'geo:':'location',
    }
    const textCut = this.text.substr(0,4);
    console.log('Tipo',textCut);
    this.type = objetosPosibles[textCut] || defaultType;
    this.icon = objetosIconos[textCut] || iconDefault
  }
}
