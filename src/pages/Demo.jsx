// Import necessary components from react-router-dom and other parts of the application.
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { Link, useNavigate } from "react-router-dom";

export const Demo = () => {

  const { store, dispatch } = useGlobalReducer()
  const navigate = useNavigate()

  const handleControlFunction = (e) => {
    dispatch({
      type: "update_form_field",
      payload: {
        value: e.target.value,
        name: e.target.name
      }
    })
  }

  const addContactOnKeyEnter = (e) => {
    if (e.key === "Enter") addContact()
  }

  // Add contact to API
  async function addContact() {
    const newContact = {
      name: store.formData.fullName,
      phone: store.formData.phone,
      email: store.formData.email,
      address: store.formData.address
    }
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/juanitodr94/contacts", {
        method: "POST",
        body: JSON.stringify(newContact),
        headers: {"Content-Type": "application/json"}
      });
      if (response.ok) {
        console.log("Contact created successfully");
        navigate("/");
        dispatch({type: "clear_contact_fields"})
      }
    } catch (error) {console.log(error)}
  }

  return (
    <div className="container d-flex flex-column align-items-center gap-4 mt-4">
      <h1>Add a new contact</h1>
      <form action="" method="" className="d-flex flex-column gap-2 w-75">
        <label htmlFor="fullName"><span><i className="fa-solid fa-user me-2"></i></span>Full name</label>
        <input onKeyDown={addContactOnKeyEnter} type="text" name="fullName" id="fullName"
          onChange={handleControlFunction}
          value={store.formData.fullName} />

        <label htmlFor="email"><span><i className="fa-solid fa-envelope me-2"></i></span>E-mail</label>
        <input onKeyDown={addContactOnKeyEnter} type="text" name="email" id="email"
          onChange={handleControlFunction}
          value={store.formData.email} />

        <label htmlFor="phone"><span><i className="fa-solid fa-phone me-2"></i></span>Phone</label>
        <input onKeyDown={addContactOnKeyEnter} type="text" name="phone" id="phone"
          onChange={handleControlFunction}
          value={store.formData.phone} />

        <label htmlFor="address"><span><i className="fa-solid fa-location-dot me-2"></i></span>Address</label>
        <input onKeyDown={addContactOnKeyEnter} type="text" name="address" id="address"
          onChange={handleControlFunction}
          value={store.formData.address} />

        <button onClick={addContact} type="button" className="btn btn-primary">Add contact</button>
      </form>
      <Link to="/">
        <button type="button" className="btn btn-success">or get back to contact list</button>
      </Link>
    </div>
  )

};
