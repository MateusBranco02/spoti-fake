class Playlist {
    constructor(name, description) {
        if (!name || !description) {
            throw new Error('Nome e descrição são obrigatórios!');
        }
        this.name = name;
        this.description = description;
        this.songs = [];
    }

    // Método para adicionar música à playlist
    addSong(music) {
        if (!music || !music.title) {
            throw new Error('Música inválida!');
        }
        this.songs.push(music);
    }

    // Método para remover música da playlist pelo título
    removeSong(musicTitle) {
        const index = this.songs.findIndex(song => song.title === musicTitle);
        if (index === -1) {
            throw new Error('Música não encontrada na playlist!');
        }
        this.songs.splice(index, 1);
    }

    // Método para listar todas as músicas da playlist
    listSongs() {
        if (this.songs.length === 0) {
            return 'Nenhuma música na playlist';
        }
        return this.songs;
    }
}

module.exports = Playlist;
