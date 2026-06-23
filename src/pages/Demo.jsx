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

  // Add contact to API function
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
        headers: { "Content-Type": "application/json" }
      });
      if (response.ok) {
        console.log("Contact created successfully");
        navigate("/");
        dispatch({ type: "clear_contact_fields" })
      }
    } catch (error) { console.log(error) }
  }

  // Edit contact in API function
  async function editContact(contactID) {
    try {
      const response = await fetch("https://playground.4geeks.com/contact/agendas/juanitodr94/contacts/" + contactID, {
        method: "PUT",
        body: JSON.stringify({
          name: store.formData.fullName,
          phone: store.formData.phone,
          email: store.formData.email,
          address: store.formData.address
        }),
        headers: { "Content-Type": "application/json" }
      })
      if (response.ok) {
        console.log("Contact edited successfully");
        navigate("/");
        dispatch({ type: "clear_contact_fields" })
      }
    } catch (error) { console.log(error) }
  }

  return (
    <div className="container d-flex flex-column align-items-center gap-4 mt-4">
      <h1>{store.editContact ? "Edit contact" : "Add new contact"}</h1>
      <div className="d-flex flex-column gap-2 w-75">
        <label htmlFor="fullName"><span><i className="fa-solid fa-user me-2"></i></span>Full name</label>
        <input type="text" name="fullName" id="fullName"
          onChange={handleControlFunction}
          value={store.formData.fullName} />

        <label htmlFor="email"><span><i className="fa-solid fa-envelope me-2"></i></span>E-mail</label>
        <input type="text" name="email" id="email"
          onChange={handleControlFunction}
          value={store.formData.email} />

        <label htmlFor="phone"><span><i className="fa-solid fa-phone me-2"></i></span>Phone</label>
        <input type="text" name="phone" id="phone"
          onChange={handleControlFunction}
          value={store.formData.phone} />

        <label htmlFor="address"><span><i className="fa-solid fa-location-dot me-2"></i></span>Address</label>
        <input type="text" name="address" id="address"
          onChange={handleControlFunction}
          value={store.formData.address} />

        <button style={{ display: store.editContact ? "block" : "none" }} onClick={()=>editContact(store.idToEdit)} type="button" className="btn btn-primary">Edit contact</button>
        <button style={{ display: store.editContact ? "none" : "block" }} onClick={addContact} type="button" className="btn btn-primary">Add contact</button>
      </div>
      <Link to="/">
        <button type="button" className="btn btn-success">or get back to contact list</button>
      </Link>
    </div>
  )

};
