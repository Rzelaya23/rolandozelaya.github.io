document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('frmRegistro');
    const btnRegistro = document.getElementById('btnRegistro');
    const modal = new bootstrap.Modal(document.getElementById('idModal'));
    const modalBody = document.getElementById('idBodyModal');

    btnRegistro.addEventListener('click', () => {
        if (validateForm()) {
            showModal();
        }
    });

    function validateForm() {
        const nombre = document.getElementById('idNombre').value.trim();
        const apellidos = document.getElementById('idApellidos').value.trim();
        const fechaNac = document.getElementById('idFechaNac').value;
        const correo = document.getElementById('idCorreo').value.trim();
        const password = document.getElementById('idPassword').value.trim();
        const passwordRepetir = document.getElementById('idPasswordRepetir').value.trim();
        const intereses = document.querySelectorAll('input[type="checkbox"]:checked');
        const carrera = document.querySelector('input[name="idRdCarrera"]:checked');
        const pais = document.getElementById('idCmPais').value;

        if (!nombre || !apellidos || !fechaNac || !correo || !password || !passwordRepetir) {
            alert('Todos los campos son obligatorios.');
            return false;
        }

        if (new Date(fechaNac) > new Date()) {
            alert('La fecha de nacimiento no puede ser mayor a la fecha actual.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo)) {
            alert('El correo electrónico no es válido.');
            return false;
        }

        if (password !== passwordRepetir) {
            alert('Las contraseñas no coinciden.');
            return false;
        }

        if (intereses.length === 0) {
            alert('Debe seleccionar al menos un interés.');
            return false;
        }

        if (!carrera) {
            alert('Debe seleccionar una carrera.');
            return false;
        }

        if (pais === 'Seleccione una opcion') {
            alert('Debe seleccionar un país de origen.');
            return false;
        }

        return true;
    }

    function showModal() {
        const nombre = document.getElementById('idNombre').value.trim();
        const apellidos = document.getElementById('idApellidos').value.trim();
        const fechaNac = document.getElementById('idFechaNac').value;
        const correo = document.getElementById('idCorreo').value.trim();
        const intereses = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.nextElementSibling.textContent);
        const carrera = document.querySelector('input[name="idRdCarrera"]:checked').nextElementSibling.textContent;
        const pais = document.getElementById('idCmPais').selectedOptions[0].text;

        const table = document.createElement('table');
        table.className = 'table table-striped';

        const tbody = document.createElement('tbody');

        const data = [
            { label: 'Nombres', value: nombre },
            { label: 'Apellidos', value: apellidos },
            { label: 'Fecha de Nacimiento', value: fechaNac },
            { label: 'Correo Electrónico', value: correo },
            { label: 'Intereses', value: intereses.join(', ') },
            { label: 'Carrera', value: carrera },
            { label: 'País de Origen', value: pais }
        ];

        data.forEach(item => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.textContent = item.label;
            const td = document.createElement('td');
            td.textContent = item.value;
            tr.appendChild(th);
            tr.appendChild(td);
            tbody.appendChild(tr);
        });

        table.appendChild(tbody);
        modalBody.innerHTML = '';
        modalBody.appendChild(table);
        modal.show();
    }
});