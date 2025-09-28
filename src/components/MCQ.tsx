"use client";

import { useMemo, useRef, useState } from "react";
import { Button, Heading, List, Text } from "@chakra-ui/react";
import { supabase } from "@/app/config";
import { useAuth } from "@/app/providers/AuthContext";
import Results from "./Results";

type Option = {
  text: string;
  is_correct: boolean;
};

type Question = {
  question: string;
  options: Option[];
};

type McqProps = {
  data: Question[];
  setScore?: (score: number) => void;
};

type SaveResultsProps = {
  userId: string;
  testName: string;
  score: number;
  totalQuestions: number;
};

function MCQ({ data, setScore }: McqProps) {
  const { session } = useAuth();
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [scoreLocal, setScoreLocal] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [level, setLevel] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalQuestions = data.length;
  const currentQuestion = useMemo(() => data[currentIndex], [data, currentIndex]);
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const hasSelectedCurrent = Boolean(responses[currentIndex]);

  const handleSelect = (qIndex: number, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [qIndex]: value,
    }));
  };

  const mapScoreToLevel = (score: number, total: number) => {
    const pct = score / total;
    if (pct >= 0.5) return "N5";
    return "ABSOLUTE_BEGINNER";
  };

  const saveResult = async ({ userId, testName, score, totalQuestions: total }: SaveResultsProps) => {
    const awarded_level = mapScoreToLevel(score, total);

    const { error } = await supabase
      .from("user_test_results")
      .insert({
        user_id: userId,
        test_name: testName,
        score,
        total_questions: total,
        awarded_level,
      });

    if (error) {
      console.error("Failed to save test result", error);
    }
  };

  const evaluateScore = () => {
    let total = 0;

    data.forEach((q, qIndex) => {
      const correctText = q.options.find((o) => o.is_correct)?.text?.trim();
      const chosenText = responses[qIndex]?.trim();
      if (correctText && chosenText && chosenText === correctText) {
        total += 1;
      }
    });

    const awarded = mapScoreToLevel(total, data.length);
    setScoreLocal(total);
    setScore?.(total);
    setLevel(awarded);

    if (session?.user?.id) {
      void saveResult({
        userId: session.user.id,
        testName: "JLPT N5 MCQ",
        score: total,
        totalQuestions: data.length,
      });
    }
  };

  const handleSubmit = () => {
    if (Object.keys(responses).length !== totalQuestions) {
      return;
    }

    evaluateScore();
    setShowResults(true);
  };

  const handleReview = () => {
    setShowResults(false);
    setCurrentIndex(0);
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!hasSelectedCurrent) return;

    if (isLastQuestion) {
      handleSubmit();
      return;
    }

    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="relative flex w-99 flex-1 !p-1 flex-col gap-6 rounded-lg overflow-hidden bg-blue-950/60 px-6 py-6 text-gray-100 shadow-inner"
    >
      <div className="flex items-center justify-between text-sm uppercase tracking-wide text-cyan-300">
        <Text fontWeight="semibold">Question {currentIndex + 1}</Text>
        <Text>of {totalQuestions}</Text>
      </div>

      <Heading size="md" className="leading-snug text-white">
        {currentQuestion.question}
      </Heading>

      <List.Root as="ol" className="flex gap-4">
        {currentQuestion.options.map((opt, i) => {
          const optionId = `q-${currentIndex}-option-${i}`;

          return (
            <>
            <List.Item key={optionId} className="w-full flex flex-row items-center !mb-2 rounded-xl !border !border-cyan-800/40 bg-cyan-900/20  transition hover:border-cyan-500/60">
              
              
              <label htmlFor={optionId} className="text-gray-300 flex items-center gap-2 !p-1">
                <input
                id={optionId}
                type="radio"
                name={`q-${currentIndex}`}
                value={opt.text}
                checked={responses[currentIndex] === opt.text}
                onChange={(e) => handleSelect(currentIndex, e.target.value)}
                className="h-5 w-5 accent-cyan-400"
              />
                {opt.text}
              </label>
            </List.Item>
            </>
          );
        })}
      </List.Root>

      <div className="mt-auto flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          colorPalette="cyan"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <Button
          type="button"
          variant="solid"
          colorPalette="cyan"
          onClick={handleNext}
          disabled={!hasSelectedCurrent}
        >
          {isLastQuestion ? "Submit" : "Next"}
        </Button>
      </div>

      {showResults && (
        <Results
          total={data.length}
          correct={scoreLocal ?? 0}
          level={level}
          onReview={handleReview}
        />
      )}
    </div>
  );
}

export default MCQ;
