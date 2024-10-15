const Playlist = require('../src/playlist');
const Music = require('../src/music');

describe('Módulo de Playlists', () => {
    test('Deve criar uma nova playlist com sucesso', () => {
        const playlist = new Playlist('Sertanejo Hits', 'Músicas sertanejas mais tocadas');
        expect(playlist.name).toBe('Sertanejo Hits');
        expect(playlist.description).toBe('Músicas sertanejas mais tocadas');
        expect(playlist.songs.length).toBe(0);
    });

    test('Deve lançar um erro ao tentar criar uma playlist sem nome ou descrição', () => {
        expect(() => {
            new Playlist('', 'Descrição sem nome');
        }).toThrow('Nome e descrição são obrigatórios!');

        expect(() => {
            new Playlist('Playlist sem descrição', '');
        }).toThrow('Nome e descrição são obrigatórios!');
    });

    test('Deve adicionar uma música à playlist com sucesso', () => {
        const playlist = new Playlist('Sertanejo Hits', 'Músicas sertanejas mais tocadas');
        const music = new Music('Boiadeira', 'Ana Castela', 'Playlist Ana Castela', '03:15', 'Sertanejo');

        playlist.addSong(music);
        expect(playlist.songs.length).toBe(1);
        expect(playlist.songs[0].title).toBe('Boiadeira');
    });

    test('Deve lançar um erro ao tentar adicionar uma música inválida', () => {
        const playlist = new Playlist('Sertanejo Hits', 'Músicas sertanejas mais tocadas');
        expect(() => {
            playlist.addSong(null);
        }).toThrow('Música inválida!');
    });

    test('Deve remover uma música da playlist com sucesso', () => {
        const playlist = new Playlist('Sertanejo Hits', 'Músicas sertanejas mais tocadas');
        const music = new Music('Boiadeira', 'Ana Castela', 'Playlist Ana Castela', '03:15', 'Sertanejo');

        playlist.addSong(music);
        playlist.removeSong('Boiadeira');

        expect(playlist.songs.length).toBe(0);
    });

    test('Deve lançar um erro ao tentar remover uma música que não existe', () => {
        const playlist = new Playlist('Sertanejo Hits', 'Músicas sertanejas mais tocadas');
        expect(() => {
            playlist.removeSong('Música Inexistente');
        }).toThrow('Música não encontrada na playlist!');
    });

    test('Deve listar todas as músicas da playlist', () => {
        const playlist = new Playlist('Sertanejo Hits', 'Músicas sertanejas mais tocadas');
        const music1 = new Music('Boiadeira', 'Ana Castela', 'Playlist Ana Castela', '03:15', 'Sertanejo');
        const music2 = new Music('Neon', 'Ana Castela', 'Playlist Ana Castela', '03:25', 'Sertanejo');

        playlist.addSong(music1);
        playlist.addSong(music2);

        const musicList = playlist.listSongs();

        expect(musicList.length).toBe(2);
        expect(musicList[0].title).toBe('Boiadeira');
        expect(musicList[1].title).toBe('Neon');
    });

    test('Deve retornar uma mensagem se a playlist estiver vazia', () => {
        const playlist = new Playlist('Sertanejo Hits', 'Músicas sertanejas mais tocadas');
        expect(playlist.listSongs()).toBe('Nenhuma música na playlist');
    });
});
