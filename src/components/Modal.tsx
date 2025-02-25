// import React, { ReactNode } from "react";
// import { IoClose } from "react-icons/io5";

// interface ModalProps {
//   open: boolean;
//   onClose: () => void;
//   children: ReactNode;
// }

// const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
//   return (
//     <div
//       onClick={onClose}
//       className={`
//          fixed inset-0 flex justify-center items-center transition-colors
//          ${open ? "visible bg-black/20" : "invisible"}
//        `}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className={`
//     bg-white rounded-xl shadow p-6 transition-all
//     ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
//   `}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
//         >
//           <IoClose size={45} />
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;

// {
//   /* Prevent clicks outside the modal from closing it */
// }


import React from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 cursor-pointer hover:text-gray-700"
        >
          ✖
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
