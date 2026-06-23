export const initialStore = () => {
  return {
    contacts: [],
    formData: {
      fullName: "",
      email: "",
      phone: "",
      address: ""
    },
    editContact: false,
    idToEdit: null
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_edit_contact":
      const contact = action.payload;
      return {
        ...store,
        editContact: true,
        formData: {
          fullName: contact.name,
          email: contact.email,
          phone: contact.phone,
          address: contact.address
        },
        idToEdit: contact.id
      }
    case "unset_edit_mode":
      return {
        ...store,
        editContact: false,
        formData: {fullName: "", email: "", phone: "", address: ""}
      }
    case "get_contacts":
      return {
        ...store,
        contacts: action.payload
      }
    case "update_form_field":
      const {value, name} = action.payload
      return {
        ...store,
        formData: {
          ...store.formData,
          [name]: value
        }
      }
    case "clear_contact_fields":
      return {
        ...store,
        formData: {fullName: "", email: "", phone: "", address: ""}
      }
    default:
      throw Error('Unknown action.');
  }
}
