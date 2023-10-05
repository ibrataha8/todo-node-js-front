import { useState } from "react"; // Update import statements
import PropTypes from "prop-types"; // Import PropTypes if you want to use it

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi"; // Import the necessary icon component
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

function PopUpModal({ id, onDelete }) {
  const [openModal, setOpenModal] = useState(false); // Use boolean instead of string
  const handleCloseModal = () => setOpenModal(false); // Create a separate function to close the modal
  const handleDelete = async e => {
    const response = await axios.delete(
      "http://127.0.0.1:3000/deleteTodo/" + id
    );
    console.log(e, response);
    onDelete();
    handleCloseModal();
  };
  return (
    <>
      <p
        className="text-sm text-red-600 hover:text-red-700 hover:text-red-500"
        onClick={() => setOpenModal(true)}
      >
        <DeleteIcon />
      </p>
      <Modal show={openModal} size="md" popup onClose={handleCloseModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Todo ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, Im sure
              </Button>
              <Button color="gray" onClick={handleCloseModal}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

// Optional PropTypes for type checking
PopUpModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  setOpenModal: PropTypes.func.isRequired,
};

export default PopUpModal;
