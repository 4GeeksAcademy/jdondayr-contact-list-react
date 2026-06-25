import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/Modal.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	// Get user contacts from API function
	async function getUserContacts() {
		try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/juanitodr94/contacts/");
			if (response.ok) {
				const data = await response.json();
				dispatch({
					type: "get_contacts",
					payload: data.contacts
				})
			}
			else if (response.status === 404) {
				alert("User juanitodr94 doesn't exist, it was deleted, please create it again before continue.");
				throw new Error("User doesn't exist. Create it again.")
			}
			else if (response.status === 422) throw new Error("Validation error, the body of the request it's different from expected.")
		} catch (error) { console.log(error) }
	}

	// Bring contacts when components finished loading
	useEffect(() => {
		getUserContacts()
	}, [])

	// Delete contact from API function
	async function deleteContact(idToDelete) {
		try {
			const response = await fetch("https://playground.4geeks.com/contact/agendas/juanitodr94/contacts/" + idToDelete, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			});
			if (response.ok) {
				console.log("Contact deleted successfully")
				getUserContacts()
			}
			else if (response.status === 422) throw new Error("Body of the request it's different from expected.");
		} catch (error) { console.log(error) }
	}

	return (
		<div className="container d-flex flex-column gap-3 mt-3">
			<Link to="/demo" className="align-self-end">
				<button onClick={()=>dispatch({type: "unset_edit_mode"})} className="btn btn-success">Add new contact</button>
			</Link>
			<h2 className="align-self-center" style={{display: (store.contacts.length === 0 ? "block" : "none")}}>There is no contacts on the list, please add one.</h2>
			<ul className="list-group d-flex flex-column gap-2">
				{/* Map over the 'todos' array from the store and render each item as a list element */}
				{store && store.contacts?.map((contact, index) => {
					return (
						<li key={contact.id} className="border p-2 d-flex align-items-center justify-content-between">
							<div className="info ms-5">
								<h3><span><i className="fa-solid fa-user me-3"></i></span>{contact.name}</h3>
								<h4><span><i className="fa-solid fa-location-dot me-3"></i></span>{contact.address}</h4>
								<h5><span><i className="fa-solid fa-phone me-3"></i></span>{contact.phone}</h5>
								<h5><span><i className="fa-solid fa-envelope me-3"></i></span>{contact.email}</h5>
							</div>
							<div className="buttons d-flex flex-column me-5 gap-3">
								<Link to={"/demo"}>
									<button onClick={()=>dispatch({type: "set_edit_contact", payload: contact})} type="button" className="btn contact-list-button">Edit contact</button>
								</Link>
								<button onClick={() => deleteContact(contact.id)} type="button" data-bs-dismiss="modal" className="btn contact-list-button">Delete contact</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}; 