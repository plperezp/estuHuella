# EstuHuella

## [¡Accede a la app!](https://estuhuella.netlify.app/)

![App Logo](src/assets/estuhuellaLogo.png)

## Descripcion

Descubre tu impacto ambiental con esta innovadora app que mide tu huella de carbono y te ofrece recomendaciones personalizadas para reducirla. Conecta con otros usuarios en un foro interactivo y lleva el control de tu progreso en un área privada, donde también podrás personalizar tu perfil con avatares únicos.

#### [Client Repo here](https://github.com/plperezp/estuHuella)

#### [Server Repo here](https://github.com/plperezp/EstuHuellaBackend)

## Technologies & Libraries used

HTML, CSS, Javascript, React, axios, React Context,

## Backlog Functionalities

- Implementacion de sistema de comentarios en el foro
- Minijuego de memorización con tematica de reciclaje

# Estructura Cliente

## User Stories

- **404** - Como usuario, quiero ver una página de error 404 agradable cuando acceda a una página que no existe para saber que fue mi error.
- **500** - Como usuario, quiero ver una página de error agradable cuando el equipo de desarrollo comete un error para saber que no es mi culpa.
- **homepage** - Como usuario, quiero poder acceder a la página de inicio para ver de qué trata la app y acceder a las opciones de inicio de sesión y registro.
- **sign up** - Como usuario, quiero registrarme en la página web para poder ver todos los eventos a los que podría asistir.
- **login** - Como usuario, quiero poder iniciar sesión en la página web para volver a acceder a mi cuenta.
- **logout** - Como usuario, quiero poder cerrar sesión en la página web para asegurarme de que nadie acceda a mi cuenta.
- **foro** - Como usuario, quiero ver todos los post generados por los diferentes usuarios en el foro
- **post create** - Como usuario, quiero crear un post para interactuar con otros usuarios.
- **crea tu huella** - Como usuario, quiero poder obtener mi huella tras rellenar un formulario con mis habitos. -**area privada** - Como usuario, deseo poder acceder a mi area privada donde visualizar mis datos personales, el record de mi huella asi como mi avatar

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)

| Path       | Page           | Components                         | Permissions                 | Behavior                                                     |
| ---------- | -------------- | ---------------------------------- | --------------------------- | ------------------------------------------------------------ |
| `/`        | Home           | AnimationLogo                      | public                      | Home page                                                    |
| `/signup`  | Signup         |                                    |                             | Signup form,link to login, navigate to login                 |
| `/login`   | Login          |                                    |                             | Login form, link to signup, navigate to homepage after login |
| `/huella`  | Crea tu huella | AnimacionPorcentaje, CalculoHuella | user only `<Private>`       | Crea tu huella page                                          |
| `/foro`    | Foro           | ModalForo SearchBar                | user `<Private>` and public | Shows all post and let create a new one if is logged in      |
| `/private` | Area Privada   | AnimacionAvatar                    | user only `<Private>`       | Shows private area                                           |
| `/error`   | ErrorPage      |                                    | public                      | Shows error 500                                              |
| `/*`       | NotFoundPage   |                                    | public                      | Shows error 404                                              |

## Other Components

- Navbar
- Footer

## Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Backlog Service

  - foro.filter(text)
  - huella.create
  - huella.update
  - medihuella.create
  - post.create
  - post.update(id)
  - post.delete(id)
  - post.details
  - habito.create
  - habito.detalis

## Context

- auth.context

## Links

### Collaborators

[Pedro Perez](https://github.com/plperezp)

[Javier Gascon](https://github.com/Javitocatral)

### Project

[Repository Link Client](https://github.com/plperezp/estuHuella)

[Repository Link Server](https://github.com/plperezp/EstuHuellaBackend)

[Deploy Link](https://estuhuella.netlify.app/)

### Figma

[Link to Figma board](https://www.figma.com/board/M510f4zYpGq3Z3zKPJlnfl/Proyecto-3-Concepto?node-id=0-1&node-type=canvas&t=a8997toAEHOPyQ6U-0)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1MX8W-Ci-ZkHRk1eyR087m2wlMNpNEcPWQS_2-rd7DWE/edit#slide=id.p)
