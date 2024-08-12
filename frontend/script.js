// Função para cadastrar usuário
async function cadastrarUsuario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarsenha = document.getElementById('confirmarsenha').value;

    if (senha !== confirmarsenha) {
        alert('As senhas não coincidem.');
        return;
    }

    const userData = {
        name: nome,
        email: email,
        password: senha
    };

    try {
        const response = await fetch('http://localhost:3100/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert('Cadastrado com sucesso!');
            window.location.href = 'Login.html';
        } else {
            const errorData = await response.json();
            alert('Erro ao cadastrar: ' + errorData.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar. Tente novamente mais tarde.');
    }
}

// Função para login de usuário
async function loginUsuario(event) {
    event.preventDefault(); // Impedir o comportamento padrão do formulário
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const loginData = {
        email: email,
        password: senha
    };

    try {
        const response = await fetch('http://localhost:3100/users/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const userData = await response.json();
            localStorage.setItem('token', userData.token); // Armazena o token de autenticação
            localStorage.setItem('userId', userData.id);   // Armazena o ID do usuário
            localStorage.setItem('email', loginData.email); // Armazena o e-mail do usuário
            alert('Login bem-sucedido!');
            window.location.href = 'Home.html';
        } else {
            const errorData = await response.json();
            alert('Erro ao fazer login: ' + errorData.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer login. Tente novamente mais tarde.');
    }
}

// Carregar certificados ao carregar a página principal
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("certificadosTableBody")) {
        carregarCertificados();
    }
});

// Função para carregar certificados do banco de dados
async function carregarCertificados() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!userId || !token || !email) {
        alert('Usuário não autenticado.');
        window.location.href = 'Login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:3100/certificates/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'email': email
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            alert('Erro ao carregar certificados: ' + errorData.message);
            return;
        }

        const certificados = await response.json();
        const tableBody = document.getElementById("certificadosTableBody");
        tableBody.innerHTML = '';

        certificados.forEach(cert => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="checkbox" name="selectedCert" value="${cert.id}"></td>
                <td>${cert.titulo}</td>
                <td>${new Date(cert.data).toLocaleDateString()}</td>
                <td>${cert.participante}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao carregar certificados:', error);
        alert('Erro ao carregar certificados. Tente novamente mais tarde.');
    }
}

// Função para cadastrar um novo certificado
async function cadastrarCertificado(event) {
    event.preventDefault();
    const form = document.getElementById('certificadoForm');
    const formData = new FormData(form);
    const certificadoData = {};
    formData.forEach((value, key) => certificadoData[key] = value);

    try {
        const response = await fetch('http://localhost:3100/certificates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'email': localStorage.getItem('email')
            },
            body: JSON.stringify(certificadoData)
        });

        if (response.ok) {
            alert('Certificado cadastrado com sucesso!');
            window.location.href = 'Home.html';
        } else {
            const errorData = await response.json();
            alert('Erro ao cadastrar: ' + errorData.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao cadastrar. Tente novamente mais tarde.');
    }
}

// Função para editar um certificado
async function editarCertificado(event) {
    event.preventDefault();
    const checkboxes = document.querySelectorAll('input[name="selectedCert"]:checked');
    if (checkboxes.length !== 1) {
        alert('Selecione apenas um certificado para editar.');
        return;
    }

    const certificadoId = checkboxes[0].value;
    try {
        const response = await fetch(`http://localhost:3100/certificates/${certificadoId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'email': localStorage.getItem('email')
            }
        });
        const certificado = await response.json();

        localStorage.setItem('certificadoParaEditar', JSON.stringify(certificado));
        window.location.href = 'Editar.html';
    } catch (error) {
        console.error('Erro ao carregar certificado para edição:', error);
        alert('Erro ao carregar certificado. Tente novamente mais tarde.');
    }
}

// Função para carregar dados do certificado na página de edição
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.endsWith('EditarCertificado.html')) {
        const certificado = JSON.parse(localStorage.getItem('certificadoParaEditar'));
        if (certificado) {
            document.getElementById('titulo').value = certificado.titulo;
            document.getElementById('descricao').value = certificado.descricao;
            document.getElementById('horas').value = certificado.horas;
            document.getElementById('data').value = certificado.data;
            document.getElementById('participante').value = certificado.participante;
            document.getElementById('tipo').value = certificado.tipo;
        }
    }
});

// Função para salvar alterações no certificado
async function salvarEdicaoCertificado(event) {
    event.preventDefault();
    const certificado = JSON.parse(localStorage.getItem('certificadoParaEditar'));
    const form = document.getElementById('certificadoForm');
    const formData = new FormData(form);
    const certificadoData = {};
    formData.forEach((value, key) => certificadoData[key] = value);

    try {
        const response = await fetch(`http://localhost:3100/certificates/${certificado.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'email': localStorage.getItem('email')
            },
            body: JSON.stringify(certificadoData)
        });

        if (response.ok) {
            alert('Certificado atualizado com sucesso!');
            window.location.href = 'Home.html';
        } else {
            const errorData = await response.json();
            alert('Erro ao atualizar: ' + errorData.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao atualizar. Tente novamente mais tarde.');
    }
}

// Função para imprimir um certificado
function imprimirCertificado() {
    const checkboxes = document.querySelectorAll('input[name="selectedCert"]:checked');
    if (checkboxes.length !== 1) {
        alert('Selecione apenas um certificado para imprimir.');
        return;
    }

    const certificadoId = checkboxes[0].value;
    imprimirPDF(`Certificado_${certificadoId}.pdf`);
}

// Função para imprimir um arquivo PDF
function imprimirPDF(pdfFileName) {
    const iframe = document.createElement('iframe');
    iframe.src = pdfFileName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    setTimeout(() => iframe.contentWindow.print(), 1000);
}

// Função para excluir um certificado
async function excluirCertificado() {
    const checkboxes = document.querySelectorAll('input[name="selectedCert"]:checked');
    if (checkboxes.length === 0) {
        alert('Selecione pelo menos um certificado para excluir.');
        return;
    }

    if (confirm("Tem certeza de que deseja excluir os certificados selecionados?")) {
        const promises = Array.from(checkboxes).map(async (checkbox) => {
            const certificadoId = checkbox.value;
            try {
                const response = await fetch(`http://localhost:3100/certificates/${certificadoId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Envia o token de autenticação
                    }
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    alert('Erro ao excluir: ' + errorData.message);
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro ao excluir. Tente novamente mais tarde.');
            }
        });

        await Promise.all(promises);
        alert('Certificado(s) excluído(s) com sucesso!');
        carregarCertificados();
    }
}

// Função para filtrar certificados na tabela
function searchCertificates() {
    const input = document.getElementById("searchInput");
    const filter = input.value.toUpperCase();
    const table = document.querySelector("table");
    const tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            tr[i].style.display = txtValue.toUpperCase().indexOf(filter) > -1 ? "" : "none";
        }
    }
}

// Função para marcar ou desmarcar todos os checkboxes
function toggleAll(source) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="selectedCert"]');
    checkboxes.forEach(checkbox => checkbox.checked = source.checked);
}

// Função para abrir um certificado em uma nova janela
function openCertificate() {
    const checkboxes = document.querySelectorAll('input[name="selectedCert"]:checked');
    if (checkboxes.length !== 1) {
        alert('Selecione apenas um certificado para exibir.');
        return;
    }

    const certificadoId = checkboxes[0].value;
    window.open(`Certificado_${certificadoId}.pdf`, '_blank', 'width=800,height=600,resizable=yes,scrollbars=yes,status=yes');
}

// Função para salvar um certificado (função existente)
function Savecertificado(event) {
    alert("Salvo com sucesso!");
}
