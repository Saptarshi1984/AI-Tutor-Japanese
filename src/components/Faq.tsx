import React from "react";

const Faq = () => {
  const faq = [
    "Do I need to buy subscription to learn Japanese?",
    "How long will it take me to become fluent in Japanese?",
    "Does the app support beginner, intermediate, and advanced levels?",
    "What are the effective method to learn Japanese?",
    "Can I learn Japanese Character in the app?",
  ];
  return (
    <div className="absolute !text-[0.6rem] bottom-4">
      <ul className="flex flex-col gap-2">
        {faq.map((q, i) => (
        <a key={i} href="">
        <li className="max-w-lg !p-[6px] text-gray-300 !border-1 !border-teal-600 !rounded-xl
                       hover:bg-cyan-300 hover:text-black" >
          {q}
          </li>
        </a>
        ))}
      </ul>
    </div>
  );
};

export default Faq;
