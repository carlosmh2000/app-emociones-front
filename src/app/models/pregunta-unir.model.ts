import { autoserializeAs } from 'dcerialize';

export class PreguntaUnir {
    @autoserializeAs(() => Number)
    public id: number;

    @autoserializeAs(() => String)
    public img_1: string;

    @autoserializeAs(() => String)
    public texto_1: string;

    @autoserializeAs(() => String)
    public img_2: string;

    @autoserializeAs(() => String)
    public texto_2: string;

    @autoserializeAs(() => String)
    public musica: string;

    @autoserializeAs(() => Number)
    public numEjer: number;

    constructor(id = null, img_1 = null, texto_1 = '', img_2 = null, texto_2 = '', musica = '', numEjer = null) {
        this.id = id;
        this.img_1 = img_1;
        this.texto_1 = texto_1;
        this.img_2 = img_2;
        this.texto_2 = texto_2;
        this.musica = musica;
        this.numEjer = numEjer;
    }
}
