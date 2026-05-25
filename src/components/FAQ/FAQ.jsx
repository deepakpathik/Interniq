import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import './FAQ.css';

const FAQ_DATA = [
  {
    question: "What are the best internships available?",
    answer: "We offer a wide variety of internships across domains like Software Development, Marketing, Design, and more. You can use our filters to find the best match for your skills and interests."
  },
  {
    question: "How to apply for internships?",
    action: "apply",
    answer: "To apply, simply click on the 'Apply' button on any internship card. Make sure your profile and resume are completely updated before applying to increase your chances of selection."
  },
  {
    question: "Are there any work from home internships?",
    answer: "Yes! Thousands of companies offer remote internships. You can easily find them by selecting the 'Work from home' filter in the sidebar."
  },
  {
    question: "Do I need any prior experience to get an internship?",
    answer: "Not necessarily. Many internships are designed for freshers and students who are looking to gain their first professional experience. Look for internships that match your current skill level."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="is-faq-container">
      <h2 className="is-faq-heading">Frequently asked questions</h2>
      <div className="is-faq-list">
        {FAQ_DATA.map((faq, index) => (
          <div 
            key={index} 
            className={`is-faq-item ${openIndex === index ? 'is-faq-open' : ''}`}
          >
            <button 
              className="is-faq-question" 
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              <span className="is-faq-icon">
                {openIndex === index ? <Minus size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
              </span>
            </button>
            <div 
              className="is-faq-answer-wrapper"
              style={{
                maxHeight: openIndex === index ? '200px' : '0',
                opacity: openIndex === index ? 1 : 0
              }}
            >
              <div className="is-faq-answer">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
