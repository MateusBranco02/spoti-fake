const { Usuario, addUser, limparUsuarios } = require('../src/user');
const Music = require('../src/music');

describe('Módulo de Usuários', () => {
    beforeEach(() => {
        limparUsuarios();
    });

    test('Deve adicionar um novo usuário com sucesso', () => {
        const usuario = addUser('John Doe', 'john@example.com', '1990-01-01');
        expect(usuario.name).toBe('John Doe');
        expect(usuario.email).toBe('john@example.com');
        expect(usuario.playlists.length).toBe(0);
    });

    test('Deve lançar um erro ao tentar adicionar um usuário com email inválido', () => {
        expect(() => {
            addUser('John Doe', 'john-email.com', '1990-01-01');
        }).toThrow('E-mail inválido');
    });

    test('Deve lançar um erro ao tentar adicionar um usuário sem nome ou email', () => {
        expect(() => {
            addUser('', '', '1990-01-01');
        }).toThrow('Nome e e-mail são obrigatórios!');
    });

    test('Deve lançar um erro se o nome de usuário já existir', () => {
        addUser('John Doe', 'john@example.com', '1990-01-01');
        expect(() => {
            addUser('John Doe', 'john2@example.com', '1990-01-01');
        }).toThrow('Nome de usuário já existe');
    });

    test('Usuário deve criar uma playlist e adicionar músicas', () => {
        const usuario = addUser('John Doe', 'john@example.com', '1990-01-01');
        const playlist = usuario.criarPlaylist('Minha Playlist', 'Minhas músicas favoritas');

        const music = new Music('Boiadeira', 'Ana Castela', 'Playlist Ana Castela', '03:15', 'Sertanejo');
        usuario.addMusicaPlaylist(playlist.name, music);

        expect(usuario.playlists.length).toBe(1);
        expect(usuario.playlists[0].songs.length).toBe(1);
        expect(usuario.playlists[0].songs[0].title).toBe('Boiadeira');
    });

    test('Usuário deve remover uma música da playlist', () => {
        const usuario = addUser('John Doe', 'john@example.com', '1990-01-01');
        const playlist = usuario.criarPlaylist('Minha Playlist', 'Minhas músicas favoritas');

        const music = new Music('Boiadeira', 'Ana Castela', 'Playlist Ana Castela', '03:15', 'Sertanejo');
        usuario.addMusicaPlaylist(playlist.name, music);
        usuario.removerMusicaPlaylist(playlist.name, 'Boiadeira');

        expect(usuario.playlists[0].songs.length).toBe(0);
    });

    test('Deve listar todas as músicas de uma playlist', () => {
        const usuario = addUser('John Doe', 'john@example.com', '1990-01-01');
        const playlist = usuario.criarPlaylist('Minha Playlist', 'Minhas músicas favoritas');

        const music1 = new Music('Boiadeira', 'Ana Castela', 'Playlist Ana Castela', '03:15', 'Sertanejo');
        const music2 = new Music('Neon', 'Ana Castela', 'Playlist Ana Castela', '03:25', 'Sertanejo');

        usuario.addMusicaPlaylist(playlist.name, music1);
        usuario.addMusicaPlaylist(playlist.name, music2);

        const musicas = usuario.listarMusicaPlaylist(playlist.name);

        expect(musicas.length).toBe(2);
        expect(musicas[0].title).toBe('Boiadeira');
        expect(musicas[1].title).toBe('Neon');
    });
});
