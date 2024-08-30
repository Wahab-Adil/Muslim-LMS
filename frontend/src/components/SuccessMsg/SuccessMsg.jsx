import Swal from "sweetalert2";

const SuccessMsg = ({ title, icon, message }) => {
  Swal.fire({
    icon: icon,
    title: title,
    text: message,
  });
};

export default SuccessMsg;
