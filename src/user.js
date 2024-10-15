const Playlist = require('./playlist');
let usuarios = [];

class Usuario {
    constructor(name, email, birthDate, playlists = []) {
        this.name = name;
        this.email = email;
        this.birthDate = birthDate;
        this.playlists = playlists; // Inicia vazia
    }

    // Função para criar uma playlist para o usuário
    criarPlaylist(name, description) {
        const playlist = new Playlist(name, description);
        this.playlists.push(playlist);
        return playlist;
    }

    // Função para adicionar música a uma playlist
    addMusicaPlaylist(playlistName, music) {
        const playlist = this.playlists.find(p => p.name === playlistName);
        if (!playlist) throw new Error('Playlist não encontrada!');
        playlist.addSong(music);
    }

    // Função para remover música de uma playlist
    removerMusicaPlaylist(playlistName, musicTitle) {
        const playlist = this.playlists.find(p => p.name === playlistName);
        if (!playlist) throw new Error('Playlist não encontrada!');
        playlist.removeSong(musicTitle);
    }

    // Função para listar músicas de uma playlist
    listarMusicaPlaylist(playlistName) {
        const playlist = this.playlists.find(p => p.name === playlistName);
        if (!playlist) throw new Error('Playlist não encontrada!');
        return playlist.listSongs();
    }
}

// Função para validar e-mail
function validacaoEmail(email) {
    const usuario = email.substring(0, email.indexOf("@"));
    const dominio = email.substring(email.indexOf("@") + 1);

    const emailValido =
        usuario.length >= 1 &&
        dominio.length >= 3 &&
        usuario.indexOf("@") === -1 &&
        dominio.indexOf("@") === -1 &&
        usuario.indexOf(" ") === -1 &&
        dominio.indexOf(" ") === -1 &&
        dominio.indexOf(".") !== -1 &&
        dominio.indexOf(".") >= 1 &&
        dominio.lastIndexOf(".") < dominio.length - 1;

    return emailValido;
}

function addUser(name, email, birthDate) {
    if (!name || !email) {
        throw new Error("Nome e e-mail são obrigatórios!");
    }

    if (!validacaoEmail(email)) {
        throw new Error("E-mail inválido");
    }

    const usuarioExistente = usuarios.find(user => user.name === name);

    if (usuarioExistente) {
        throw new Error("Nome de usuário já existe");
    }

    const novoUsuario = new Usuario(name, email, birthDate);
    usuarios.push(novoUsuario);
    return novoUsuario;
}

function listarUsuarios() {
    return usuarios;
}

function limparUsuarios() {
    usuarios = [];
}

module.exports = { Usuario, addUser, listarUsuarios, limparUsuarios };
