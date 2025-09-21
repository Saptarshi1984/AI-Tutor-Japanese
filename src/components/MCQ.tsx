"use client";

import { Heading, Button, List } from "@chakra-ui/react";
import { supabase } from "@/app/config";
import { useState, useRef } from "react";
import Results from "./Results";
import { useAuth } from "@/app/providers/AuthContext";


interface Option {
  text: string;
  is_correct: boolean;
}

interface Question {
  question: string;
  options: Option[];
}

interface McqProps {
  data: Question[];
  setScore?: (score: number) => void;
}

interface saveResultsProps {
  userId: string;
  testName: string;
  score: number;
  totalQuestions: number;
}

function MCQ({ data, setScore }: McqProps) {
  const {session} = useAuth();
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [scoreLocal, setScoreLocal] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [level, setLevel] = useState<string>("");  

  function handleSelect(qIndex:number, value:string) {

    setResponses(prev => ({
      ...prev,
      [qIndex]: value

    }));
  }
  
  function mapScoreToLevel(score: number, total: number): string {
  // example rules: pass 50% => N5 else ABSOLUTE_BEGINNER
  const pct = score / total;
  if (pct >= 0.5) return "N5";
  return "ABSOLUTE_BEGINNER";
}

async function saveResult({
  userId,
  testName,
  score,
  totalQuestions,
}: saveResultsProps) {
  const awarded_level = mapScoreToLevel(score, totalQuestions);

  const { error } = await supabase
    .from("user_test_results")
    .insert({
      user_id: userId,
      test_name: testName,          // e.g. "JLPT N5 MCQ"
      score,
      total_questions: totalQuestions,
      awarded_level,                // "N5" or "ABSOLUTE_BEGINNER"
      // attempt_no: omit -> trigger sets it
    });

  if (error) {
    console.error("Failed to save test result", error);
  }
}
  

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    let total = 0;

    data.forEach((q, qIndex) => {
    const correctText = q.options.find(o => o.is_correct)?.text?.trim();
    const chosenText  = responses[qIndex]?.trim();
    if (correctText && chosenText && chosenText === correctText) {
      total++;
    }
  });
  const awarded = mapScoreToLevel(total, data.length);
  setScoreLocal(total);   // update local score
  setScore?.(total);      // (optional) notify parent
  setLevel(awarded);
  setShowResults(true);   // show results after setting score

  if (session?.user?.id) {
    saveResult({
      userId: session.user.id,
      testName: "JLPT N5 MCQ",
      score: total,
      totalQuestions: data.length,
    });
  }
  //  scroll the form (not window) to top
  formRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }
  function handleReview() {
    // Close results to let user review their answers
    setShowResults(false);
    
    // Optional: scroll to top, highlight answers, etc.
    // window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    
    <form ref={formRef} onSubmit={handleSubmit} className="relative w-full max-h-full !mt-8 !p-2  flex flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth scrollbar-slick bg-blue-950">
      <List.Root as={"ol"} className="w-full flex flex-col gap-4 !ml-12">
        {data.map((q, qIndex) => (
          <li key={qIndex} className="!mb-4">
            <Heading size="sm" mb={2} className=" max-h-[2.8rem]">
              {q.question}
            </Heading>
            <List.Root as={'ol'}  className="!ml-4">
              {q.options.map((opt, i) => (
                <List.Item key={i} className="flex flex-row items-center mb-1">
                  <input 
                    type="radio" 
                    name={`q-${qIndex}`} 
                    value={opt.text}
                    required
                    className="!mr-2"
                    onChange={(e) => handleSelect(qIndex, e.target.value)}                   
                  />
                  {opt.text}
                </List.Item>
              ))}
            </List.Root>
          </li>
        ))}
      </List.Root>
      <Button type="submit" variant={"solid"} colorPalette={'green'} className="mt-4">
        Submit
      </Button>

      
        {showResults && <Results
          total={data.length}
          correct={scoreLocal ?? 0}   // show even if 0
          level={level}
          onReview={handleReview}
        />}
      
           
    </form> 
    
    
  );
}

export default MCQ;