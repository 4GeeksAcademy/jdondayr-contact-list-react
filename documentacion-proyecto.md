# Planteamiento
Hay que hacer una lista de contactos usando la [API de la academia](https://playground.4geeks.com/contact/docs). Hay que hacer un CRUD.
El orden correcto es:
1. Read
2. Delete
3. Create
4. Update

# Procedimiento
## El store.js
El ***initialStore*** se compone de:
- Un array ***==contacts==***, que contendrá los contactos bajados desde la API
- Un objeto ***==formData==***, que servirá para recoger en tiempo real lo que introduce el usuario en los inputs de añadir o editar contacto, que se compone de:
	- fullName
	- email
	- phone
	- address
- Un booleano ***==editContact==*** que empieza en false, que recogerá si el usuario está editando un contacto o añadiéndolo, para que el formulario se muestre de una u otra forma.
- Una variable ***idToEdit***, que pasará la ID del contacto concreto que se está editando.

La función ==storeReducer== cuenta con las acciones:
- =="set_edit_contact" ==que recibe como payload el contacto, activa el "modo edición", y establece como valor de los inputs los datos del contacto a editar, para facilitar la labor. También pasa la ID del contacto para la función de editar.
- =="unset_edit_mode"== que desactiva el booleano editContact, y devuelve los valores del formulario a vacíos.
- =="get_contacts"== que recibe la lista de contactos de la API y la establece en el array contacts del store.
- =="update_form_fields"== que recibe de un input con el payload tanto el name como el value de este, y mediante la computed property, establece el valor del input como valor de la propiedad (para tener todas las entradas controladas).
- =="clear_contact_fields"== que vacía el valor de los inputs.

## Home.jsx -> Lista de contactos
### Función getUserContacts
Función asíncrona que recibe la lista de contactos con **fetch** desde la **API**
- Si la respuesta.ok, convierte los datos en JSON y llama a **dispatch** en tipo **get_contacts**, para pasarle el array de contactos.
- Si hay estado 404 (usuario no existe) tira error al catch. La academia va vaciando la lista de usuarios de vez en cuando.
- Si hay error 422 tira error de validación al catch.

### useEffect para tirar la getUserContacts al cargar el componente

### Función deleteContact(idToDelete)
Función asíncrona que recibe la ID del contacto como parámetro. Recibe una respuesta del fetch con method DELETE.
- Si la respuesta.ok, avisa por consola, y vuelve a llamar getUserContacts para recargar la lista.
- Si el estado es 422, tira al catch un error de validación.

###
Return de la lista de contactos
- Hay un h2 "No hay contactos, añade uno" que se muestra únicamente si el **length** del array contactos es = 0.
- Una lista que contiene un map de store.contacts, variable contact, genera li's, con:
	- key: ***contact.id***
	- elementos h3,4,5 con iconos y el contenido de nombre, dirección, teléfono y email del contacto.
	- un botón (Link a /demo) para editar, con dispatch("set_edit_contact") y en el payload el propio contacto.
		- Activa el modo editar
	- un botón para eliminar contacto con la función deleteContact(contact.id)

## Demo.jsx -> Plantilla para añadir o editar contacto
### Función handleControlFunction
Recibe el parámetro evento (e). Es para controlar los inputs.
- Hace dispatch("update_form_field") y en el payload manda:
	- value: e.target.value -> para mandar el valor del input
	- name: e.target.name -> para mandar el nombre del input (se llama igual que los del intialStore)

### Función addContact
Función asíncrona que crea una variable newContact con el body (valor de los inputs) que tiene que recibir la ***API***, y hace fetch "POST", convirtiendo con JSON.stringify el newContact.
- Si la respuesta.ok avisa por consola, vacía los campos con dispatch("clear_contact_fields") y redirige al usuario a Home con ***useNavigate***.

### Función editContact(contactID)
Función asíncrona que hace fetch "PUT" a la ***API***, mandando en JSON.stringify el valor de los inputs.
- Si respuesta.ok, avisa por consola, vacía los campos y envía al usuario a Home con ***useNavigate***.

### Return
Cuando activamos el modo edit, pinchando en alguno de los botones de editar de la lista de contactos, se abre esta vista pero de forma distinta. Hay elementos cuyo display depende de si ese modo está activo o no.
- h1 con título "Edit contact" o "Add new contact" dependiendo del modo edit.
- Input fullName, con onChange handleControlFunction y value store.formData.fullName
- Input email, con onChange handleControlFunction y value store.formData.email
- Input phone, con onChange handleControlFunction y value store.formData.phone
- Input address, con onChange handleControlFunction y value store.formData.address
- Botón para editar contactos con editContact(recibe aquí el idToEdit del store que se ha establecido previamente al pulsar en el botón de editar de cada contacto con set_edit_contact). Este botón estará visible si el modo edit está activo.
- Botón para crear contacto nuevo. Este botón estará visible si se ha pulsado el botón de añadir nuevo contacto en Home, lo que desactiva el modo editar contacto.
- Botón para volver a Home.