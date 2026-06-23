export const initialStore = () => {
  return {
    contacts: [],
    formData: {
      fullName: "",
      email: "",
      phone: "",
      address: ""
    }
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
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
