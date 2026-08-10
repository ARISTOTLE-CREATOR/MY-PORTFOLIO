interface ResumeViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeViewer = ({ isOpen, onClose }: ResumeViewerProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm">
      <div className="absolute top-4 right-4 z-[110]">
        <button
          onClick={onClose}
          className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black shadow-lg hover:bg-gray-200"
        >
          Close
        </button>
      </div>

      <iframe
        src="/resume.pdf"
        title="Rapolu Sai Nithin Resume"
        className="h-full w-full border-0"
      />
    </div>
  );
};

export default ResumeViewer;
