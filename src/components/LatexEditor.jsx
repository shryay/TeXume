import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import config from "../config";

const backendURL = config.backendURL;
export default function LatexEditor() {
  const [latexCode, setLatexCode] = useState(
    "\\documentclass{article}\n\\begin{document}\n" +
      "\n".repeat(40) +
      "Hello, world!\n\\end{document}"
  );
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
