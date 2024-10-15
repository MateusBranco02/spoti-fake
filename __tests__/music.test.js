const Music = require('../src/music.js');

describe('Módulo de Músicas', () => {
    test('Cadastrar música com sucesso!', () => {
        const music = new Music('Boiadeira', 'Ana Castela', 'Playlist Ana Castela', '03:15', 'Sertanejo');

        expect(music.title).toBe('Boiadeira');
        expect(music.artist).toBe('Ana Castela');
        expect(music.album).toBe('Playlist Ana Castela');
        expect(music.duration).toBe('03:15');
        expect(music.genre).toBe('Sertanejo');
    });

    test('Tentar cadastrar a música com algum campo em branco!', () => {
        expect(() => {
            new Music('Nosso Quadro', 'Ana Castela', '', '02:54', 'Sertanejo');
        }).toThrow('Você deve preencher todos os campos!');
    });

    test('Validar se o campo duration foi preenchido no formato correto!', () => {
        const music = new Music('Dona de Mim', 'Ana Castela', 'Playlist Ana Castela', '02:25', 'Sertanejo');
        expect(music.duration).toBe('02:25');
    });

    test('Preencher campo duration no formato incorreto!', () => {
        expect(() => {
            new Music('Neon', 'Ana Castela', 'Playlist Ana Castela', '3:29', 'Sertanejo');
        }).toThrow('Formato da duração inválido, deve seguir o exemplo: "02:45"!');
    });
});
