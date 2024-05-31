import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Generating Response...");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
      console.log(response)

      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="scroll">
        <div className="bg-black h-auto w-screen p-5 font-bold scroll">
          <form
            onSubmit={generateAnswer}
            className="w-full md:w-2/3 m-auto text-center rounded bg-black py-2"
          >
            <a href="https://github.com/Megh2005/Megh2005" target="_blank">
              <h1 className="text-3xl text-center text-violet-500 mb-4 font-bold">
                Sampark AI
              </h1>
            </a>
            <textarea
              required
              className="border rounded w-11/12 my-2 min-h-fit p-3 bg-transparent text-white resize-none focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent transition-all duration-300 mb-6"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Hello I am Sampark AI, Ask me anything!"
            ></textarea>
            <button
              type="submit"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 duration-1000"
              disabled={generatingAnswer}
            >
              Generate Response
            </button>
          </form>
          <div className="md:w-2/3 items-center justify-center m-auto text-start w-96 h-screen rounded bg-transparent text-blue-500 my-2 gap-2">
            <ReactMarkdown className="p-3">{answer}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
