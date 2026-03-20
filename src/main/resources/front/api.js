const API = "/filmes";


function mostrarForm(tipo) {
    document.querySelectorAll('[id^="form-"]').forEach(f => f.classList.add('d-none'));
    document.getElementById(`form-${tipo}`).classList.remove('d-none');
}


async function carregarTodosFilmes() {
    try {
        const response = await fetch(API);
        const filmes = await response.json();

        const container = document.getElementById('lista-filmes');
        if (!container) return;

        if (filmes.length === 0) {
            container.innerHTML = '<div class="alert alert-info">Nenhum filme cadastrado</div>';
            return;
        }

        let html = '<div class="row">';
        filmes.forEach(filme => {
            html += `
                <div class="col-md-4 mb-3">
                    <div class="card h-100">
                        <div class="card-body">
                            <h2 class="card-title">${filme.titulo}</h2>
                            <p class="card-text">
                                <strong>Gênero:</strong> ${filme.genero || 'N/A'}<br>
                                <strong>Diretor:</strong> ${filme.diretor || 'N/A'}<br>
                                <strong>Ano:</strong> ${filme.anoPublicacao || 'N/A'}<br>
                                <strong>Preço:</strong> ${filme.preco ? 'R$ ' + filme.preco.toFixed(2) : 'N/A'}<br>
                                <strong>Em cartaz:</strong> ${filme.emCartaz ? 'Sim' : 'Não'}<br>
                                <strong>Id:</strong> ${filme.id || 'N/A'}
                            </p>
                            <button class="btn btn-sm btn-primary" onclick="copiarID('${filme.id}')">
                                Copiar ID
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        container.innerHTML = html;

    } catch (error) {
        console.error('Erro ao carregar filmes:', error);
    }
}

// Função auxiliar para copiar ID
function copiarID(id) {
    navigator.clipboard.writeText(id);
    alert('ID copiado: ' + id);
}

// CADASTRAR
async function cadastrarFilme() {
    const filme = {
        titulo: document.getElementById('titulo').value,
        genero: document.getElementById('genero').value,
        diretor: document.getElementById('diretor').value,
        anoPublicacao: parseInt(document.getElementById('ano').value) || null,
        preco: parseFloat(document.getElementById('preco').value) || null,
        emCartaz: document.getElementById('cartaz').checked
    };

    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(filme)
        });

        const msg = document.getElementById('msg-cadastro');
        if (response.ok) {
            msg.className = 'alert alert-success mt-2';
            msg.textContent = 'Filme cadastrado com sucesso!';
            // Limpar campos
            document.getElementById('titulo').value = '';
            document.getElementById('genero').value = '';
            document.getElementById('diretor').value = '';
            document.getElementById('ano').value = '';
            document.getElementById('preco').value = '';
            document.getElementById('cartaz').checked = false;

            // Atualizar lista de filmes
            carregarTodosFilmes();
        } else {
            throw new Error('Erro no cadastro');
        }
    } catch (error) {
        const msg = document.getElementById('msg-cadastro');
        msg.className = 'alert alert-danger mt-2';
        msg.textContent = 'Erro ao cadastrar filme';
    }
    document.getElementById('msg-cadastro').classList.remove('d-none');

    setTimeout(() => {
        document.getElementById('msg-cadastro').classList.add('d-none');
    }, 3000);
}

// CONSULTAR
async function consultarFilme() {
    const id = document.getElementById('id-consulta').value;
    const resultado = document.getElementById('resultado-consulta');

    if (!id) {
        resultado.innerHTML = '<div class="alert alert-warning">Digite um ID</div>';
        return;
    }

    try {
        const response = await fetch(`${API}/${id}`);

        if (!response.ok) {
            throw new Error('Filme não encontrado');
        }

        const filme = await response.json();

        resultado.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p><strong>ID:</strong> ${filme.id}</p>
                    <p><strong>Título:</strong> ${filme.titulo}</p>
                    <p><strong>Gênero:</strong> ${filme.genero || 'N/A'}</p>
                    <p><strong>Diretor:</strong> ${filme.diretor || 'N/A'}</p>
                    <p><strong>Ano:</strong> ${filme.anoPublicacao || 'N/A'}</p>
                    <p><strong>Preço:</strong> ${filme.preco ? 'R$ ' + filme.preco.toFixed(2) : 'N/A'}</p>
                    <p><strong>Em cartaz:</strong> ${filme.emCartaz ? 'Sim' : 'Não'}</p>
                </div>
            </div>
        `;
    } catch (error) {
        resultado.innerHTML = '<div class="alert alert-danger">Filme não encontrado</div>';
    }
}

// CARREGAR FILME PARA EDIÇÃO
async function carregarFilme() {
    const id = document.getElementById('id-edicao').value;

    if (!id) {
        alert('Digite um ID');
        return;
    }

    try {
        const response = await fetch(`${API}/${id}`);

        if (!response.ok) {
            throw new Error('Filme não encontrado');
        }

        const filme = await response.json();

        document.getElementById('titulo-edit').value = filme.titulo || '';
        document.getElementById('genero-edit').value = filme.genero || '';
        document.getElementById('diretor-edit').value = filme.diretor || '';
        document.getElementById('ano-edit').value = filme.anoPublicacao || '';
        document.getElementById('preco-edit').value = filme.preco || '';
        document.getElementById('cartaz-edit').checked = filme.emCartaz || false;

        document.getElementById('edicao-campos').classList.remove('d-none');
    } catch (error) {
        alert('Filme não encontrado');
    }
}

// EDITAR
async function editarFilme() {
    const id = document.getElementById('id-edicao').value;

    const filme = {
        titulo: document.getElementById('titulo-edit').value,
        genero: document.getElementById('genero-edit').value,
        diretor: document.getElementById('diretor-edit').value,
        anoPublicacao: parseInt(document.getElementById('ano-edit').value) || null,
        preco: parseFloat(document.getElementById('preco-edit').value) || null,
        emCartaz: document.getElementById('cartaz-edit').checked
    };

    try {
        const response = await fetch(`${API}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(filme)
        });

        const msg = document.getElementById('msg-edicao');
        if (response.ok) {
            msg.className = 'alert alert-success mt-2';
            msg.textContent = 'Filme atualizado com sucesso!';

            // Atualizar lista de filmes
            carregarTodosFilmes();
        } else {
            throw new Error('Erro na atualização');
        }
    } catch (error) {
        const msg = document.getElementById('msg-edicao');
        msg.className = 'alert alert-danger mt-2';
        msg.textContent = 'Erro ao atualizar filme';
    }
    document.getElementById('msg-edicao').classList.remove('d-none');

    setTimeout(() => {
        document.getElementById('msg-edicao').classList.add('d-none');
    }, 3000);
}

// DELETAR
async function deletarFilme() {
    const id = document.getElementById('id-delecao').value;

    if (!id) {
        alert('Digite um ID');
        return;
    }

    if (!confirm('Tem certeza que deseja deletar este filme?')) {
        return;
    }

    try {
        const response = await fetch(`${API}/${id}`, {
            method: 'DELETE'
        });

        const msg = document.getElementById('msg-delecao');
        if (response.ok) {
            msg.className = 'alert alert-success mt-2';
            msg.textContent = 'Filme deletado com sucesso!';
            document.getElementById('id-delecao').value = '';

            // Atualizar lista de filmes
            carregarTodosFilmes();
        } else {
            throw new Error('Erro na deleção');
        }
    } catch (error) {
        const msg = document.getElementById('msg-delecao');
        msg.className = 'alert alert-danger mt-2';
        msg.textContent = 'Erro ao deletar filme';
    }
    document.getElementById('msg-delecao').classList.remove('d-none');

    setTimeout(() => {
        document.getElementById('msg-delecao').classList.add('d-none');
    }, 3000);
}

// Carregar filmes quando a página iniciar
document.addEventListener('DOMContentLoaded', function() {
    // Se existir o elemento lista-filmes, carregar os filmes
    if (document.getElementById('lista-filmes')) {
        carregarTodosFilmes();
    }
});