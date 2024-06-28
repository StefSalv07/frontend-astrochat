import React, { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

function Faq({ questions }) {
  const [activeQuestion, setActiveQuestion] = useState(null);

  return (
    <div className="flex justify-center items-center">
      <div className="w-full m-auto bg-gray-300 p-8 rounded-lg shadow-md">
        <div className="mb-6">
          <h2 className="mb-5 sub-heading">Frequently Asked Questions</h2>
          {questions.map((q) => (
            <div key={q.id} className="mb-4 last:mb-0">
              <button
                className="w-full text-left body-1 focus:outline-none p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center font-bold  tracking-wide"
                onClick={() =>
                  setActiveQuestion(activeQuestion === q.id ? null : q.id)
                }
              >
                {q.question}
                {activeQuestion === q.id ? <FaMinusCircle /> : <FaPlusCircle />}
              </button>
              <AnimatePresence>
                {activeQuestion === q.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 text-gray-600 ml-4"
                  >
                    <p className="body-1  tracking-wide">{q.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;
