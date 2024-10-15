const { Usuario, addUser, listarUsuarios } = require('./user');
const Music = require('./music');

let usuarios = listarUsuarios();

// Função para criar um usuário
function criarUsuario(name, email, birthDate) {
    return addUser(name, email, birthDate);
}

// Função para adicionar uma música a uma playlist de um usuário
function addMusicaPlaylist(userName, playlistName, musicData) {
    const usuario = usuarios.find(u => u.name === userName);
    if (!usuario) {
        throw new Error('Usuário não encontrado!');
    }

    const music = new Music(musicData.title, musicData.artist, musicData.album, musicData.duration, musicData.genre);
    usuario.addMusicaPlaylist(playlistName, music);
}

// Função para criar uma playlist para um usuário
function criarPlaylistUsuario(userName, playlistName, description) {
    const usuario = usuarios.find(u => u.name === userName);
    if (!usuario) {
        throw new Error('Usuário não encontrado!');
    }

    return usuario.criarPlaylist(playlistName, description);
}

// Função para remover uma música de uma playlist
function removerMusicaPlaylist(userName, playlistName, musicTitle) {
    const usuario = usuarios.find(u => u.name === userName);
    if (!usuario) {
        throw new Error('Usuário não encontrado!');
    }

    usuario.removerMusicaPlaylist(playlistName, musicTitle);
}

// Função para listar as músicas de uma playlist
function listarMusicaPlaylist(userName, playlistName) {
    const usuario = usuarios.find(u => u.name === userName);
    if (!usuario) {
        throw new Error('Usuário não encontrado!');
    }

    return usuario.listarMusicaPlaylist(playlistName);
}

module.exports = { criarUsuario, criarPlaylistUsuario, addMusicaPlaylist, listarMusicaPlaylist, removerMusicaPlaylist };
