import React from "react";

const Modal = (props) => {
    return (
        <>
            <button type="button" className="btn contact-list-button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                {props.buttonLabel}
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title fs-5" id="exampleModalLabel">{props.modalTitle}</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {props.modalBody}
                        </div>
                        <div className="modal-footer">
                            {props.actionButton}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;