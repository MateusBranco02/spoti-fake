class Music {
    constructor(title, artist, album, duration, genre) {

        if (!title || !artist || !album || !duration || !genre) {
            throw new Error('Você deve preencher todos os campos!');
        }

        if (!this.validarDuracao(duration)) {
            throw new Error('Formato da duração inválido, deve seguir o exemplo: "02:45"! ')
        }

        this.title = title
        this.artist = artist
        this.album = album
        this.duration = duration
        this.genre = genre
    }

    validarDuracao(duration) {
        const formatoDuracao = /^[0-5][0-9]:[0-5][0-9]$/;
        return formatoDuracao.test(duration);
    }

    exibirDetalhes() {
        return `Título: ${this.title} \nArtista: ${this.artist} \nÁlbum: ${this.album} \nDuração: ${this.duration} \nGênero: ${this.genre}`;
    }
}

const musica = new Music('Iris', 'Jada Facer', 'spotfy', '02:45', 'romantico');
console.log(musica.exibirDetalhes());