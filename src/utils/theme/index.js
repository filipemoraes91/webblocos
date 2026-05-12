import { getLocal, setLocal } from "../storage";

export const getTheme = () => {
    if (getLocal('theme')) {
        return getLocal('theme');
    } else {
        setLocal('theme', 'light')
        return 'light';
    }
}

// export function getBackground() {
//     if (getTheme() === 'dark') {
//         return "#343944"
//     } else {
//         return "#f1f1f1"
//     }
// }

// export const getBackground2 = () => {
//     return { background: '#333' }
// }

export function getThemeContraste() {
    let tema = getLocal('theme');
    if (tema) {
        if (tema === 'light')
            return '#333333'
        if (tema === 'dark')
            return '#f1f1f1'
    } else {
        setLocal('theme', 'light')
        return '#f1f1f1';
    }
}

export const getThemeContrasteColor = () => {
    let tema = getLocal('theme');
    if (tema) {
        if (tema === 'light')
            return { color: '#333333' }
        if (tema === 'dark')
            return { color: 'white' }
    } else {
        setLocal('theme', 'light')
        return { color: '#333333' }
    }
}

export function getLayout() {
    if (getLocal('layout')) {
        return getLocal('layout')
    } else {
        return 'padrao'
    }
}

export function setLayout(valor) {
    setLocal('layout', valor)
    window.location.reload();
}

export function heightScreen(ajuste = 0) {
    return visualViewport.height + ajuste;
}

export const heightDefault = (ativarPesquisa) => {
    let ajuste = ativarPesquisa ? -170 : -95;
    return visualViewport.height + ajuste;
}

export function setTheme(value) {
    setLocal('theme', value)
    window.location.reload();
}