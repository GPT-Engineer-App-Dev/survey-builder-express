import React, { useState } from "react";
import Modal from "@/components/ui/modal";

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl">Your Blank Canvas</h1>
      <p>Chat with the agent to start making edits.</p>
      <Modal
        title="Survey Preview"
        triggerText="Preview Survey"
        onClose={handleModalClose}
      >
        <p>This is where the survey preview will be displayed.</p>
      </Modal>
    </div>
  );
};

export default Index;
