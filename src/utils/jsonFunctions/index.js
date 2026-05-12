import { setSession } from "../storage";

export function updatePasta(objeto, id, novosDados) {
    if (objeto.id === id) {
        Object.assign(objeto, novosDados);
        return true;
    }
    if (objeto.pastas) {
        for (const pasta of objeto.pastas) {
            if (updatePasta(pasta, id, novosDados)) {
                return true;
            }
        }
    }
    return false;
}

export function updateItem(objeto, id, novosDados) {
    if (objeto.videos) {
        const video = objeto.videos.find(video => video.id === id);
        if (video) {
            Object.assign(video, novosDados);
            return true;
        }
    }
    if (objeto.pastas) {
        for (const pasta of objeto.pastas) {
            if (updateItem(pasta, id, novosDados)) {
                return true;
            }
        }
    }
    return false;
}

export function deletePasta(objeto, id) {
    if (objeto.pastas) {
        const index = objeto.pastas.findIndex(pasta => pasta.id === id);
        if (index !== -1) {
            objeto.pastas.splice(index, 1);
            return true;
        }
    }
    for (const pasta of (objeto.pastas || [])) {
        if (deletePasta(pasta, id)) {
            return true;
        }
    }
    return false;
}

export function deleteItem(objeto, id) {
    if (objeto.videos) {
        const index = objeto.videos.findIndex(video => video.id === id);
        if (index !== -1) {
            objeto.videos.splice(index, 1);
            return true;
        }
    }
    for (const pasta of (objeto.pastas || [])) {
        if (deleteItem(pasta, id)) {
            return true;
        }
    }
    return false;
}

export function subirItem(data, idPasta, idItem) {
    // Encontrar a pasta pelo ID
    function buscarPastaRecursiva(pasta) {
        // Se a pasta atual tiver o ID desejado
        if (pasta.id === idPasta) {
            return pasta;
        }
        // Percorrer as subpastas recursivamente
        for (let subpasta of pasta.pastas) {
            const resultado = buscarPastaRecursiva(subpasta);
            if (resultado) {
                return resultado;
            }
        }
        // Se a pasta não for encontrada, retornar null
        return null;
    }

    // Encontrar a pasta pelo ID
    const pasta = buscarPastaRecursiva(data);

    // Se a pasta existir
    if (pasta) {
        // Encontrar o vídeo pelo ID
        const video = pasta.videos.find(v => v.id === idItem);

        // Se o vídeo existir
        if (video) {
            // Encontrar o índice do vídeo na lista de vídeos da pasta
            const indice = pasta.videos.indexOf(video);

            // Se o vídeo não estiver no topo da lista
            if (indice > 0) {
                // Trocar o vídeo de posição com o vídeo anterior na lista
                [pasta.videos[indice], pasta.videos[indice - 1]] = [pasta.videos[indice - 1], pasta.videos[indice]];

                //console.log("Vídeo movido para cima com sucesso!");
                setSession('videos', JSON.stringify(data, null, 2)); // Exibir o JSON atualizado
                //console.log(JSON.stringify(data, null, 2)); // Exibir o JSON atualizado
            } else {
                //console.log("O vídeo já está no topo da lista.");
            }
        } else {
            //console.log("Vídeo não encontrado na pasta.");
        }
    } else {
        //console.log("Pasta não encontrada.");
    }
}

// Função para descer um vídeo dentro de uma pasta
export function descerItem(data, idPasta, idItem) {
    function buscarPastaRecursiva(pasta) {
        // Se a pasta atual tiver o ID desejado
        if (pasta.id === idPasta) {
            return pasta;
        }
        // Percorrer as subpastas recursivamente
        for (let subpasta of pasta.pastas) {
            const resultado = buscarPastaRecursiva(subpasta);
            if (resultado) {
                return resultado;
            }
        }
        // Se a pasta não for encontrada, retornar null
        return null;
    }

    // Encontrar a pasta pelo ID
    const pasta = buscarPastaRecursiva(data);

    // Se a pasta existir
    if (pasta) {
        // Encontrar o vídeo pelo ID
        const video = pasta.videos.find(v => v.id === idItem);

        // Se o vídeo existir
        if (video) {
            // Encontrar o índice do vídeo na lista de vídeos da pasta
            const indice = pasta.videos.indexOf(video);

            // Se o vídeo não estiver no final da lista
            if (indice < pasta.videos.length - 1) {
                // Trocar o vídeo de posição com o próximo vídeo na lista
                [pasta.videos[indice], pasta.videos[indice + 1]] = [pasta.videos[indice + 1], pasta.videos[indice]];

                //console.log("Vídeo movido para baixo com sucesso!");
                setSession('videos', JSON.stringify(data, null, 2)); // Exibir o JSON atualizado
                //console.log(JSON.stringify(data, null, 2)); // Exibir o JSON atualizado
            } else {
                //console.log("O vídeo já está no final da lista.");
            }
        } else {
            //console.log("Vídeo não encontrado na pasta.");
        }
    } else {
        //console.log("Pasta não encontrada.");
    }
}


export function buscarPastaRecursiva(pasta, idPasta) {
    // Se a pasta atual tiver o ID desejado
    if (pasta.id === idPasta) {
        return pasta;
    }
    // Percorrer as subpastas recursivamente
    for (let subpasta of pasta.pastas) {
        const resultado = buscarPastaRecursiva(subpasta, idPasta);
        if (resultado) {
            return resultado;
        }
    }
    // Se a pasta não for encontrada, retornar null
    return null;
}


export function subirPasta(data, idPasta) {
    // Função auxiliar para buscar a pasta pai recursivamente
    function buscarPastaPaiRecursiva(pastaPai, pastaFilha) {
        // Verificar se a pasta atual é a pasta filha desejada
        if (pastaPai && pastaPai.pastas && pastaPai.pastas.length && pastaPai.pastas.includes(pastaFilha)) {
            return pastaPai;
        }
        // Percorrer as subpastas recursivamente
        for (let subpasta of pastaPai.pastas) {
            const resultado = buscarPastaPaiRecursiva(subpasta, pastaFilha);
            if (resultado) {
                return resultado;
            }
        }
        // Se a pasta pai não for encontrada, retornar null
        return null;
    }

    // Função auxiliar para encontrar a posição de uma pasta dentro da lista de pastas
    function encontrarPosicaoDaPasta(pastaPai, pastaFilha) {
        return pastaPai.pastas.indexOf(pastaFilha);
    }

    // Encontrar a pasta pelo ID
    const pasta = buscarPastaRecursiva(data, idPasta);

    // Se a pasta existir
    if (pasta) {
        // Encontrar a pasta pai da pasta atual
        const pastaPai = buscarPastaPaiRecursiva(data, pasta);

        // Se a pasta pai existir e a pasta não estiver no topo da lista
        if (pastaPai && pastaPai.pastas.length > 1) {
            const indice = encontrarPosicaoDaPasta(pastaPai, pasta);
            if (indice > 0) {
                // Trocar a pasta de posição com a pasta anterior na lista
                [pastaPai.pastas[indice], pastaPai.pastas[indice - 1]] = [pastaPai.pastas[indice - 1], pastaPai.pastas[indice]];

                //console.log("Pasta movida para cima com sucesso!");
                //console.log(JSON.stringify(data, null, 2)); // Exibir o JSON atualizado
            } else {
                //console.log("A pasta já está no topo da lista.");
            }
        } else {
            //console.log("A pasta não pode ser movida para cima.");
        }
    } else {
        //console.log("Pasta não encontrada.");
    }
}

// Função para descer uma pasta dentro de uma pasta pai
export function descerPasta(data, idPasta) {
    // Função auxiliar para buscar a pasta pai recursivamente
    function buscarPastaPaiRecursiva(pastaPai, pastaFilha) {
        // Verificar se a pasta atual é a pasta filha desejada
        if (pastaPai && pastaPai.pastas && pastaPai.pastas.length && pastaPai.pastas.includes(pastaFilha)) {
            return pastaPai;
        }
        // Percorrer as subpastas recursivamente
        for (let subpasta of pastaPai.pastas) {
            const resultado = buscarPastaPaiRecursiva(subpasta, pastaFilha);
            if (resultado) {
                return resultado;
            }
        }
        // Se a pasta pai não for encontrada, retornar null
        return null;
    }

    // Função auxiliar para encontrar a posição de uma pasta dentro da lista de pastas
    function encontrarPosicaoDaPasta(pastaPai, pastaFilha) {
        return pastaPai.pastas.indexOf(pastaFilha);
    }

    // Encontrar a pasta pelo ID
    const pasta = buscarPastaRecursiva(data, idPasta);

    // Se a pasta existir
    if (pasta) {
        // Encontrar a pasta pai da pasta atual
        const pastaPai = buscarPastaPaiRecursiva(data, pasta);

        // Se a pasta pai existir e a pasta não estiver no final da lista
        if (pastaPai && pastaPai.pastas.length > 1) {
            const indice = encontrarPosicaoDaPasta(pastaPai, pasta);
            if (indice < pastaPai.pastas.length - 1) {
                // Trocar a pasta de posição com a pasta seguinte na lista
                [pastaPai.pastas[indice], pastaPai.pastas[indice + 1]] = [pastaPai.pastas[indice + 1], pastaPai.pastas[indice]];

                //console.log("Pasta movida para baixo com sucesso!");
                //console.log(JSON.stringify(data, null, 2)); // Exibir o JSON atualizado
            } else {
                //console.log("A pasta já está no final da lista.");
            }
        } else {
            //console.log("A pasta não pode ser movida para baixo.");
        }
    } else {
        //console.log("Pasta não encontrada.");
    }
}

export function formatJson(JSON, pasta, item, evento) {
    switch (evento) {
        case 'upItem':
            subirItem(JSON, pasta.id, item.id)
            break;
        case 'downItem':
            descerItem(JSON, pasta.id, item.id)
            break;
        case 'upPasta':
            subirPasta(JSON, pasta.id)
            break;
        case 'downPasta':
            descerPasta(JSON, pasta.id)
            break;
        case 'deletePasta':
            deletePasta(JSON, pasta.id);
            break;
        case 'deleteItem':
            deleteItem(JSON, item.id);
            break;
        case 'editarPasta':
        // setItemSelect(iniItem);
        case 'novaPasta':
            adicionarObjetoPorId(JSON, pasta.id, item);
            break;
        // default:
        // setPastaSelect(pasta);
        // setTipoEvento(evento);
        // setOpenForm(true);
        // break;
    }
}

export function adicionarObjetoPorId(jsonData, idBusca, novoObjeto) {
    // console.log(jsonData, idBusca, novoObjeto)
    // Verifica se o ID da pasta atual corresponde ao ID de busca
    if (jsonData.id === idBusca) {
        // Adiciona o novo objeto ao array de pastas
        jsonData.pastas.push(novoObjeto);
        return true
    }

    // Se houver subpastas, percorre recursivamente
    if (jsonData.pastas && jsonData.pastas.length > 0) {
        for (let i = 0; i < jsonData.pastas.length; i++) {
            // Chama a função recursivamente em cada subpasta
            const added = adicionarObjetoPorId(jsonData.pastas[i], idBusca, novoObjeto);
            if (added) return true; // Se o objeto foi adicionado, interrompe o loop
        }
    }

    return false; // Retorna false se o objeto não foi adicionado em nenhuma parte da árvore
}

export function encontrarMaiorId(jsonData) {
    let maiorCodigo = -Infinity; // Inicializa com o menor valor possível

    jsonData.forEach(item => {
        if (item.codigo > maiorCodigo) {
            maiorCodigo = item.codigo; // Atualiza se encontrar um valor maior
        }
    });

    return maiorCodigo; // Retorna o maior código encontrado
}