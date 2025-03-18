import { useState } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const faqs = [
  {
    question: "What is the difference between psychiatry and therapy?",
    answer:
      "Psychiatrists are medical doctors who can prescribe medication and focus on the biological aspects of mental health. Therapists provide counseling and psychological support to help you work through emotional and behavioral challenges.",
  },
  {
    question: "Why should I seek mental health support at Sweekar?",
    answer:
      "Sweekar offers comprehensive mental health care with qualified professionals, complete confidentiality, and personalized treatment plans. We provide both online and in-person sessions for your convenience.",
  },
  {
    question:
      "How long will therapy or psychiatry take to make me feel better?",
    answer:
      "The duration varies for each individual depending on their specific needs and goals. Some people notice improvements after a few sessions, while others benefit from longer-term support.",
  },
  {
    question: "How to book a session at Sweekar?",
    answer:
      "You can book a session through our website by selecting your preferred professional and time slot, or contact our client care team for assistance.",
  },
];

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ backgroundColor: "#F5F1E8", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={() => setExpanded(expanded === index ? false : index)}
            sx={{
              mb: 2,
              "&:before": { display: "none" },
              boxShadow: "none",
              border: "1px solid",
              borderColor: "grey.200",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="text.secondary">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
};

export default FAQ;
