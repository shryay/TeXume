import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import config from "../config";

const backendURL = config.backendURL;
export default function LatexEditor() {
  const [latexCode, setLatexCode] = useState(`
\\documentclass[12pt]{article}
\\usepackage[margin=1in]{geometry}

\\begin{document}

% Header
\\begin{center}
    {\\Huge \\textbf{John Doe}}\\\\
    123 Main Street, City, ST 12345 \\\\
    (123) 456-7890 \\quad
    john.doe@email.com \\quad
    linkedin.com/in/johndoe \\quad
    github.com/johndoe
\\end{center}

\\hrule
\\vspace{0.2in}

% Education
\\noindent\\textbf{Education} \\\\
\\textbf{Bachelor of Science in Computer Science} \\hfill May 2024 \\\\
University of Example, City, ST \\\\
GPA: 3.8/4.0

\\vspace{0.2in}
\\hrule
\\vspace{0.2in}

% Experience
\\noindent\\textbf{Experience} \\\\
\\textbf{Software Developer Intern}, Example Corp \\hfill Jun 2023 -- Aug 2023 \\\\
- Developed internal tools using Python to automate reporting, reducing manual effort by 40\\% \\\\
- Collaborated with frontend and backend teams to improve API performance

\\vspace{0.1in}

\\textbf{Research Assistant}, University of Example \\hfill Jan 2023 -- May 2023 \\\\
- Assisted in developing a machine learning model to detect fraudulent transactions \\\\
- Conducted literature reviews and contributed to a published paper

\\vspace{0.2in}
\\hrule
\\vspace{0.2in}

% Projects
\\noindent\\textbf{Projects} \\\\
\\textbf{Movie Recommendation System} \\\\
- Built a collaborative filtering model using Python and Scikit-Learn to recommend movies \\\\
- Implemented web interface with Flask

\\vspace{0.1in}
\\textbf{Portfolio Website} \\\\
- Designed and deployed a personal website using HTML, CSS, and basic JavaScript

\\vspace{0.2in}
\\hrule
\\vspace{0.2in}

% Skills
\\noindent\\textbf{Skills} \\\\
Programming: Python, Java, C++, HTML, CSS, JavaScript \\\\
Tools: Git, MySQL, Linux, VS Code

\\vspace{0.2in}
\\hrule
\\vspace{0.2in}

% Certifications
\\noindent\\textbf{Certifications} \\\\
- Python for Everybody – Coursera \\\\
- Java Programming and Software Engineering Fundamentals – Coursera

\\hrule

\\end{document}
  `);
  const [pdfBlobUrl, setPdfBlobUrl] = useState("");
  const [isCompiling, setIsCompiling] = useState(false);
  const [error, setError] = useState(null);

  const compileLatex = async () => {
    setIsCompiling(true);
    setError(null);
    try {
      const res = await fetch(`${backendURL}/api/compile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: latexCode }),
      });

      if (!res.ok) throw new Error("Compilation failed");

      const blob = await res.blob();
      setPdfBlobUrl(URL.createObjectURL(blob));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCompiling(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left: Editor */}
      <div className="flex h-full w-1/2 flex-col border-r border-gray-700">
        <div className="flex-1">
          <MonacoEditor
            height="100%"
            defaultLanguage="latex"
            theme="vs-dark"
            value={latexCode}
            onChange={(value) => setLatexCode(value || "")}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
            }}
          />
        </div>
      </div>

      {/* Right: PDF Preview */}
      <div className="flex h-full w-1/2 flex-col">
        <div className="p-2 flex justify-end border-b border-gray-200">
          <button
            onClick={compileLatex}
            disabled={isCompiling}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-70"
          >
            {isCompiling ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Compiling...
              </>
            ) : (
              "Compile"
            )}
          </button>
        </div>

        <div className="flex-1 bg-gray-100 relative">
          {error && (
            <div className="absolute inset-0 bg-red-100 p-4 text-red-600 text-sm">
              Error: {error}
            </div>
          )}
          {pdfBlobUrl ? (
            <iframe
              src={pdfBlobUrl}
              className="h-full w-full"
              title="PDF Preview"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              PDF will appear here
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
