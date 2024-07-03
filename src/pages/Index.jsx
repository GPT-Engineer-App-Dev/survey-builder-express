import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-3xl">Your Blank Canvas</h1>
      <p>Chat with the agent to start making edits.</p>
      <Button onClick={() => navigate("/survey-builder")} className="mt-4">Go to Survey Builder</Button>
    </div>
  );
};

export default Index;