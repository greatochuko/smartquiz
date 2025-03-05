const WarningModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <h2 className="text-xl font-bold text-red-600">Warning!</h2>
        <p className="mt-2 text-zinc-600">
          You switched tabs! Please stay on the exam page. If you switch tabs
          again, your exam will be automatically submitted.
        </p>
        <button
          className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default WarningModal;
