export default function CPUTerminal({ question, cpuInput, cpuThinking, cpuError }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-fuchsia-500/40 bg-black/50 p-3 font-terminal shadow-[0_0_12px_rgba(217,70,239,0.15)]">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-fuchsia-300">CPU TERMINAL</span>
        {cpuThinking && (
          <span className="animate-blink text-[10px] text-yellow-300">
            ⚡ CPU Thinking...
          </span>
        )}
      </div>

      <pre className="mb-2 overflow-x-auto whitespace-pre-wrap rounded bg-[#0d001a] p-2 text-xs text-green-300">
        {question.snippetBefore}
        <span className="border-b border-dashed border-fuchsia-400 px-1 text-fuchsia-200">
          {cpuInput || '___'}
        </span>
        {question.snippetAfter}
      </pre>

      <div className="mt-auto rounded border border-fuchsia-700/40 bg-[#0a0014] px-2 py-1.5 text-sm text-fuchsia-100 min-h-[36px]">
        {cpuInput || <span className="text-purple-500/50">awaiting execution...</span>}
      </div>

      {cpuError && (
        <p className="mt-2 text-xs font-bold text-red-500">{cpuError}</p>
      )}
    </div>
  );
}
