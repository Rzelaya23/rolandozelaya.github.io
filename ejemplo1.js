document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('idNewForm');
    const btnCrear = document.getElementById('idBtnCrear');
    const btnAddElement = document.getElementById('idBtnAddElement');
    const btnValidar = document.getElementById('idBtnValidar');
    const cmbElemento = document.getElementById('idCmbElemento');
    const modal = new bootstrap.Modal(document.getElementById('idModal'));
    const tituloElemento = document.getElementById('idTituloElemento');
    const nombreElemento = document.getElementById('idNombreElemento');

    btnCrear.addEventListener('click', () => {
        if (cmbElemento.value) {
            modal.show();
        } else {
            alert('Seleccione un tipo de elemento.');
        }
    });

    btnAddElement.addEventListener('click', () => {
        const id = nombreElemento.value.trim();
        if (id === '' || document.getElementById(id)) {
            alert('El ID del control no puede estar vacío o repetido.');
            return;
        }

        const label = document.createElement('label');
        label.setAttribute('for', id);
        label.textContent = tituloElemento.value;

        let input;
        switch (cmbElemento.value) {
            case 'text':
            case 'number':
            case 'date':
            case 'password':
            case 'radio':
            case 'checkbox':
            case 'color':
            case 'email':
                input = document.createElement('input');
                input.type = cmbElemento.value;
                break;
            case 'select':
                input = document.createElement('select');
                break;
            case 'textarea':
                input = document.createElement('textarea');
                break;
        }

        input.id = id;
        input.name = id;
        input.className = 'form-control mb-3';

        form.appendChild(label);
        form.appendChild(input);
    });

    btnValidar.addEventListener('click', () => {
        const elements = form.elements;
        let valid = true;
        for (let element of elements) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                if (element.value.trim() === '') {
                    valid = false;
                    alert(`El campo ${element.name} está vacío.`);
                    break;
                }
            }
        }
        if (valid) {
            alert('Todos los campos están llenos.');
        }
    });
});