
const ResumeViewer = () => {
  return (
    <div className="min-h-screen w-full bg-white">
      <iframe
        src="/resume.pdf"
        title="Resume"
        className="w-full h-screen border-0"
      />
    </div>
  );
};

export default ResumeViewer;
