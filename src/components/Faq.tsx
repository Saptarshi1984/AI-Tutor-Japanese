"use client";
import { useState } from "react";
import { FaAnglesUp } from "react-icons/fa6";
import { FaAnglesDown } from "react-icons/fa6";
import { motion } from "framer-motion";

interface FaqProps {
  func: (input: string) => Promise<void>;
}

const Faq: React.FC<FaqProps> = ({ func }) => {
  const [showFaq, setShowFaq] = useState(true);

  const faq = [
    "Do I need to buy subscription to learn Japanese?",
    "How long will it take me to become fluent in Japanese?",
    "Does the app support beginner, intermediate, and advanced levels?",
    "What are the effective method to learn Japanese?",
    "Can I learn Japanese Character in the app?",
  ];

  const handleClick = async (question: string) => {
    await func(question);
  };

  return (
    <>
      {showFaq && (
        <motion.div
          className=" absolute bottom-10 left-2 !text-[0.6rem]"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 1, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ul className="flex flex-col gap-2">
            {faq.map((q, i) => (
              <a
                className="cursor-pointer"
                onClick={() => handleClick(q)}
                key={i}
              >
                <li
                  className="max-w-lg !p-[6px] text-gray-300 !border-1 !border-teal-600 !rounded-xl
                       hover:bg-cyan-300 hover:text-black"
                >
                  {q}
                </li>
              </a>
            ))}
          </ul>
        </motion.div>
      )}
      <button
        className="absolute bottom-0 left-[40%] w-16 rounded-sm items-center 
      !p-1 !text-xs !text-cyan-400 !m-auto flex flex-col cursor-pointer"
        onClick={() => setShowFaq((prev) => !prev)}
        type="button"
      >
        {!showFaq && (
          <span className="animate-pulse text-yellow-600 ">
            <FaAnglesUp />
          </span>
        )}
        FAQ
        {showFaq && (
          <span className="animate-pulse text-yellow-600 ">
            <FaAnglesDown />
          </span>
        )}
      </button>
    </>
  );
};

export default Faq;
