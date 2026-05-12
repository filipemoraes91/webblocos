import CryptoJS from 'crypto-js';

export function descript(token) {
    return window.atob(token.split('.')[1]);
}

export const criptografar = (codigo, data) => {
    const message = codigo + '.' + data;
    const chave = CryptoJS.enc.Utf8.parse('stackblocoadm@anexos');
    const mensagemCriptografada = CryptoJS.AES.encrypt(message, chave, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return mensagemCriptografada.toString(CryptoJS.format.Hex);
};

export const descriptografar = (mensagemCriptografadaHex) => {
    const chaveUtf8 = CryptoJS.enc.Utf8.parse('stackblocoadm@anexos');
    const mensagemCriptografadaBytes = CryptoJS.enc.Hex.parse(mensagemCriptografadaHex);
    const bytesDescriptografados = CryptoJS.AES.decrypt({
        ciphertext: mensagemCriptografadaBytes
    }, chaveUtf8, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    const mensagemDescriptografada = bytesDescriptografados.toString(CryptoJS.enc.Utf8);

    return mensagemDescriptografada;
};

export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};