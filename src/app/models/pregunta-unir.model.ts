import { autoserializeAs } from 'dcerialize';

export class PreguntaUnir {
    @autoserializeAs(() => Number)
    public id: number;

    @autoserializeAs(() => String, 'img_1')
    public color: string;

    @autoserializeAs(() => String, 'texto_1')
    public texto_color: string;

    @autoserializeAs(() => String, 'img_1')
    public asociada: string;

    @autoserializeAs(() => String, 'texto_2')
    public texto_asociada: string;

    @autoserializeAs(() => String)
    public musica: string;

    @autoserializeAs(() => Number)
    public numEjer: number;

    constructor(id = null, color = null, texto_color = '', asociada = null, texto_asociada = '', musica = '', numEjer = null) {
        this.id = id;
        this.color = color;
        this.texto_color = texto_color;
        this.asociada = asociada;
        this.texto_asociada = texto_asociada;
        this.musica = musica;
        this.numEjer = numEjer;
    }
}
