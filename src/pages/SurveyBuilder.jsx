import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const SurveyBuilder = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const addQuestion = () => {
    setQuestions([...questions, { type: selectedQuestionType, title: "", options: [] }]);
  };

  const deleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, updatedQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  };

  const handleSendSurvey = () => {
    toast("Survey sent successfully!");
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Question Types</h2>
        <div className="space-y-2">
          {["Single Select", "Multi Select", "Text", "Number", "Slider", "Sorting"].map((type) => (
            <Button key={type} onClick={() => setSelectedQuestionType(type)}>{type}</Button>
          ))}
        </div>
        <Button className="mt-4" onClick={addQuestion}>Add Question</Button>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Survey Canvas</h2>
        {questions.map((question, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <Input
              placeholder="Question Title"
              value={question.title}
              onChange={(e) => updateQuestion(index, { ...question, title: e.target.value })}
              className="mb-2"
            />
            {question.type === "Single Select" && (
              <RadioGroup>
                {question.options.map((option, i) => (
                  <RadioGroupItem key={i} value={option}>
                    <Input
                      placeholder="Option"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[i] = e.target.value;
                        updateQuestion(index, { ...question, options: newOptions });
                      }}
                    />
                  </RadioGroupItem>
                ))}
                <Button onClick={() => updateQuestion(index, { ...question, options: [...question.options, ""] })}>Add Option</Button>
              </RadioGroup>
            )}
            {question.type === "Multi Select" && (
              <div>
                {question.options.map((option, i) => (
                  <div key={i} className="flex items-center mb-2">
                    <Checkbox />
                    <Input
                      placeholder="Option"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...question.options];
                        newOptions[i] = e.target.value;
                        updateQuestion(index, { ...question, options: newOptions });
                      }}
                      className="ml-2"
                    />
                  </div>
                ))}
                <Button onClick={() => updateQuestion(index, { ...question, options: [...question.options, ""] })}>Add Option</Button>
              </div>
            )}
            {question.type === "Text" && (
              <Textarea
                placeholder="Text Response"
                value={question.options[0] || ""}
                onChange={(e) => updateQuestion(index, { ...question, options: [e.target.value] })}
              />
            )}
            {question.type === "Number" && (
              <Input
                type="number"
                placeholder="Number Response"
                value={question.options[0] || ""}
                onChange={(e) => updateQuestion(index, { ...question, options: [e.target.value] })}
              />
            )}
            {question.type === "Slider" && (
              <Slider
                value={question.options[0] || 0}
                onValueChange={(value) => updateQuestion(index, { ...question, options: [value] })}
              />
            )}
            {question.type === "Sorting" && (
              <div>
                {question.options.map((option, i) => (
                  <Input
                    key={i}
                    placeholder="Option"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...question.options];
                      newOptions[i] = e.target.value;
                      updateQuestion(index, { ...question, options: newOptions });
                    }}
                    className="mb-2"
                  />
                ))}
                <Button onClick={() => updateQuestion(index, { ...question, options: [...question.options, ""] })}>Add Option</Button>
              </div>
            )}
            <Button variant="destructive" onClick={() => deleteQuestion(index)}>Delete Question</Button>
          </div>
        ))}
        <Button onClick={() => setIsPreviewOpen(true)}>Preview Survey</Button>
        <Button onClick={handleSendSurvey} className="ml-2">Send Survey</Button>
      </div>
      {isPreviewOpen && (
        <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Survey Preview</ModalTitle>
            </ModalHeader>
            <div className="p-4">
              {questions.map((question, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-bold mb-2">{question.title}</h3>
                  {question.type === "Single Select" && (
                    <RadioGroup>
                      {question.options.map((option, i) => (
                        <RadioGroupItem key={i} value={option}>{option}</RadioGroupItem>
                      ))}
                    </RadioGroup>
                  )}
                  {question.type === "Multi Select" && (
                    <div>
                      {question.options.map((option, i) => (
                        <div key={i} className="flex items-center mb-2">
                          <Checkbox />
                          <span className="ml-2">{option}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {question.type === "Text" && (
                    <Textarea placeholder="Text Response" />
                  )}
                  {question.type === "Number" && (
                    <Input type="number" placeholder="Number Response" />
                  )}
                  {question.type === "Slider" && (
                    <Slider />
                  )}
                  {question.type === "Sorting" && (
                    <div>
                      {question.options.map((option, i) => (
                        <div key={i} className="mb-2">{option}</div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <ModalFooter>
              <Button onClick={() => setIsPreviewOpen(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default SurveyBuilder;