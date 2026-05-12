// import CryptoJS from 'crypto-js';
// import { dataHoraAtual } from '../date';

export function descript(token) {
    return window.atob(token.split('.')[1]);
}

// export const criptografar = (codigo) => {
//     const message = codigo + '.' + dataHoraAtual();
//     const chave = CryptoJS.enc.Utf8.parse('stackblocoadm@anexos');
//     const mensagemCriptografada = CryptoJS.AES.encrypt(message, chave, {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//     });
//     return mensagemCriptografada.toString(CryptoJS.format.Hex);
// };

// export const descriptografar = (mensagemCriptografadaHex) => {
//     try {
//         const chaveUtf8 = CryptoJS.enc.Utf8.parse('stackblocoadm@anexos');
//         const mensagemCriptografadaBytes = CryptoJS.enc.Hex.parse(mensagemCriptografadaHex);
//         const bytesDescriptografados = CryptoJS.AES.decrypt({
//             ciphertext: mensagemCriptografadaBytes
//         }, chaveUtf8, {
//             mode: CryptoJS.mode.ECB,
//             padding: CryptoJS.pad.Pkcs7
//         });
//         const mensagemDescriptografada = bytesDescriptografados.toString(CryptoJS.enc.Utf8);

//         return mensagemDescriptografada;
//     } catch {
//         return '';
//     }
// };