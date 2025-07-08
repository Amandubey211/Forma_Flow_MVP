import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "./Button";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  const confirmButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);

  // This effect handles focus trapping for accessibility.
  useEffect(() => {
    if (isOpen) {
      // Focus the cancel button by default for safety
      setTimeout(() => cancelButtonRef.current?.focus(), 100);

      const handleKeyDown = (event) => {
        if (event.key === "Tab") {
          // Trap focus within the modal
          if (event.shiftKey) {
            // Shift+Tab
            if (document.activeElement === cancelButtonRef.current) {
              event.preventDefault();
              confirmButtonRef.current?.focus();
            }
          } else {
            // Tab
            if (document.activeElement === confirmButtonRef.current) {
              event.preventDefault();
              cancelButtonRef.current?.focus();
            }
          }
        } else if (event.key === "Escape") {
          onClose();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
            className="relative w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 p-2 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3
                id="dialog-title"
                className="text-xl font-semibold text-slate-900"
              >
                {title}
              </h3>
              <div className="mt-2">
                <p id="dialog-description" className="text-sm text-slate-500">
                  {message}
                </p>
              </div>
            </div>
            <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
              <Button
                ref={confirmButtonRef}
                variant="destructive"
                onClick={onConfirm}
              >
                Delete
              </Button>
              <Button
                ref={cancelButtonRef}
                variant="secondary"
                onClick={onClose}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
