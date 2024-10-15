const { criarUsuario, criarPlaylistUsuario, addMusicaPlaylist, listarMusicaPlaylist, removerMusicaPlaylist } = require('../src/app');
const Music = require('../src/music');

describe('Testes de Integração', () => {
    test('Deve realizar o fluxo completo: criar usuário, playlist, adicionar e remover música', () => {
        // Criar um novo usuário
        const usuario = criarUsuario('Ana Clara', 'ana@gmail.com', '1992-07-15');
        expect(usuario.name).toBe('Ana Clara');
        expect(usuario.email).toBe('ana@gmail.com');

        // Criar uma playlist para o usuário
        const playlist = criarPlaylistUsuario('Ana Clara', 'Playlist Favorita', 'Minhas músicas favoritas');
        expect(playlist.name).toBe('Playlist Favorita');

        // Adicionar uma música à playlist
        const musicData = {
            title: 'Boiadeira',
            artist: 'Ana Castela',
            album: 'Playlist Ana Castela',
            duration: '03:15',
            genre: 'Sertanejo'
        };
        addMusicaPlaylist('Ana Clara', 'Playlist Favorita', musicData);

        // Verificar que a música foi adicionada corretamente
        let musicas = listarMusicaPlaylist('Ana Clara', 'Playlist Favorita');
        expect(musicas.length).toBe(1);
        expect(musicas[0].title).toBe('Boiadeira');

        // Adicionar outra música
        const musicData2 = {
            title: 'Neon',
            artist: 'Ana Castela',
            album: 'Playlist Ana Castela',
            duration: '03:25',
            genre: 'Sertanejo'
        };
        addMusicaPlaylist('Ana Clara', 'Playlist Favorita', musicData2);

        // Verificar que ambas as músicas estão na playlist
        musicas = listarMusicaPlaylist('Ana Clara', 'Playlist Favorita');
        expect(musicas.length).toBe(2);
        expect(musicas[1].title).toBe('Neon');

        // Remover uma música da playlist
        removerMusicaPlaylist('Ana Clara', 'Playlist Favorita', 'Boiadeira');

        // Verificar que a música foi removida corretamente
        musicas = listarMusicaPlaylist('Ana Clara', 'Playlist Favorita');
        expect(musicas.length).toBe(1);
        expect(musicas[0].title).toBe('Neon');
    });

    test('Deve lançar erro ao tentar adicionar música a playlist inexistente', () => {
        criarUsuario('Pedro Souza', 'pedro@gmail.com', '1985-09-10');
        const musicData = {
            title: 'Neon',
            artist: 'Ana Castela',
            album: 'Playlist Ana Castela',
            duration: '03:25',
            genre: 'Sertanejo'
        };

        expect(() => {
            addMusicaPlaylist('Pedro Souza', 'Playlist Inexistente', musicData);
        }).toThrow('Playlist não encontrada!');
    });

    test('Deve lançar erro ao tentar listar músicas de uma playlist inexistente', () => {
        criarUsuario('Maria Ferreira', 'maria@gmail.com', '1998-12-05');

        expect(() => {
            listarMusicaPlaylist('Maria Ferreira', 'Playlist Inexistente');
        }).toThrow('Playlist não encontrada!');
    });
});
