import { useState } from 'react';

export default function QuestionTerminal({ question, onSubmit, error }) {
  const [input, setInput] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    onSubmit(input);
    setInput('');
  };

  return (
    <div className="flex h-full flex-col rounded-lg border border-cyan-500/40 bg-black/50 p-3 font-terminal shadow-[0_0_12px_rgba(34,211,238,0.15)]">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-cyan-300">PLAYER TERMINAL</span>
        <button
          type="button"
          onClick={() => setShowHint((v) => !v)}
          className="text-[10px] text-purple-300 underline hover:text-purple-200"
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
      </div>

      <pre className="mb-2 overflow-x-auto whitespace-pre-wrap rounded bg-[#0d001a] p-2 text-xs text-green-300">
        {question.snippetBefore}
        <span className="border-b border-dashed border-cyan-400 px-1 text-cyan-200">
          ___
        </span>
        {question.snippetAfter}
      </pre>

      {showHint && (
        <p className="mb-2 text-[11px] italic text-yellow-300/80">{question.hint}</p>
      )}

      <div className="mt-auto flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Type answer..."
          className="flex-1 rounded border border-cyan-600/50 bg-[#0a0014] px-2 py-1.5 text-sm text-white outline-none focus:border-cyan-400"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded border border-cyan-400 bg-cyan-900/40 px-3 py-1.5 text-xs text-cyan-200 hover:bg-cyan-800/50"
        >
          FIRE
        </button>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
