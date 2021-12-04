//Formulario Agregar usuario
const botonAgregarUsuario = document.querySelector("#boton-agregar-usuario");
const formulario = document.querySelector("#formulario");
const inputNombre = document.querySelector("#input-nombre");
const inputEmail = document.querySelector("#input-email");
const inputDireccion = document.querySelector("#input-direccion");
const inputTelefono = document.querySelector("#input-tel");
const botonAgregar = document.querySelector("#boton-agregar");
const cerrarAgregarUsuario = document.querySelector("#cerrar-agregar-usuario");

// Formulario editar usuario
const formularioEditar = document.querySelector("#formulario-editar");
const inputEditarNombre = document.querySelector("#input-editar-nombre");
const inputEditarEmail = document.querySelector("#input-editar-email");
const inputEditarDireccion = document.querySelector("#input-editar-direccion");
const inputEditarTelefono = document.querySelector("#input-editar-tel");
const botonEnviarEdicion = document.querySelector("#enviar-edicion");
const cerrarEditarUsuario = document.querySelector("#cerrar-editar-usuario");

// Funciones

botonAgregarUsuario.onclick = () => {
  formulario.classList.add("is-active");
};

cerrarAgregarUsuario.onclick = () => {
  formulario.classList.remove("is-active");
};

cerrarEditarUsuario.onclick = () => {
  formularioEditar.classList.remove("is-active");
};

const pedirInfoActualizada = () => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users")
    .then((res) => res.json())
    .then((data) => {
      crearTablaHTML(data);
      editarUsuario();
      eliminarUsuario();
    });
};

pedirInfoActualizada();

const crearTablaHTML = (data) => {
  const tabla = document.querySelector("#tabla");
  const html = data.reduce(
    (acc, curr) => {
      return (
        acc +
        `  
    <tr>
      <td>${curr.fullname}</td>
      <td>${curr.email}</td>
      <td>${curr.address}</td>
      <td>${curr.phone}</td>
      <td>
      <button id="${curr.id}" class="button is-info is-small is-rounded boton-editar"><i class="far fa-edit"></i></button>
      <button id="${curr.id}" class="button is-danger is-small is-rounded boton-eliminar"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
    `
      );
    },
    `
    <tr>
      <th>Nombre</th>
      <th>Email</th>
      <th>Direccion</th>
      <th>Telefono</th>
      <th>Acciones</th>
    </tr>
    `
  );

  tabla.innerHTML = html;
};

const agregarUsuarioNuevo = () => {
  fetch("https://601da02bbe5f340017a19d60.mockapi.io/users", {
    method: "POST",
    body: JSON.stringify({
      address: inputDireccion.value,
      email: inputEmail.value,
      fullname: inputNombre.value,
      phone: inputTelefono.value,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      pedirInfoActualizada();
      formulario.classList.remove("is-active");
    });
};

botonAgregar.onclick = (e) => {
  e.preventDefault();
  agregarUsuarioNuevo();
  formulario.classList.remove("is-active");
};

// Eliminar usuario
const eliminarUsuario = () => {
  let botonesEliminar = document.querySelectorAll(".boton-eliminar");
  for (let i = 0; i < botonesEliminar.length; i++) {
    botonesEliminar[i].onclick = () => {
      let id = botonesEliminar[i].id;
      fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          pedirInfoActualizada();
        });
    };
  }
};

const mostrarUsuarioAEditar = (id) => {
  fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      formularioEditar.classList.add("is-active");
      inputEditarDireccion.value = data.address;
      inputEditarEmail.value = data.email;
      inputEditarNombre.value = data.fullname;
      inputEditarTelefono.value = data.phone;
    });
};

const editarUsuario = () => {
  const botonesEditar = document.querySelectorAll(".boton-editar");
  for (let i = 0; i < botonesEditar.length; i++) {
    botonesEditar[i].onclick = () => {
      const id = botonesEditar[i].id;
      mostrarUsuarioAEditar(id);
      botonEnviarEdicion.onclick = (e) => {
        e.preventDefault();
        fetch(`https://601da02bbe5f340017a19d60.mockapi.io/users/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            address: inputEditarDireccion.value,
            email: inputEditarEmail.value,
            fullname: inputEditarNombre.value,
            phone: inputEditarTelefono.value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            pedirInfoActualizada();
          });
          formularioEditar.classList.remove("is-active");
      };
    };
  }
};
