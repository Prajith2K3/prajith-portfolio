import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode } from 'lucide-react';

interface CodeBlockProps {
  language: 'sql' | 'python' | 'dax';
  title: string;
  code: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, title, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0C] text-slate-200 font-mono text-xs md:text-sm shadow-xl">
      {/* Code Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#141419] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block opacity-80" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block opacity-80" />
          </div>
          <span className="text-[#6E6E73] font-mono text-xs">|</span>
          <span className="flex items-center gap-2 text-[#0071E3] font-medium text-xs">
            {language === 'sql' && <Terminal className="w-3.5 h-3.5 text-[#0071E3]" />}
            {language === 'python' && <FileCode className="w-3.5 h-3.5 text-emerald-400" />}
            {language === 'dax' && <Terminal className="w-3.5 h-3.5 text-amber-400" />}
            <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10">
              {language}
            </span>
            <span className="text-[#F5F5F7] font-sans ml-1 text-xs truncate max-w-[200px] md:max-w-none">
              {title}
            </span>
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-sans transition-colors cursor-pointer border border-white/10"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-5 overflow-x-auto max-h-[380px] scrollbar-thin text-slate-300 leading-relaxed font-mono">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="w-8 pr-4 text-right select-none text-[#6E6E73] text-xs font-mono border-r border-white/5">
                  {idx + 1}
                </td>
                <td className="pl-4 whitespace-pre">
                  {highlightSyntax(line, language)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function highlightSyntax(line: string, lang: string) {
  if (!line) return <span>&nbsp;</span>;

  if (line.trim().startsWith('--') || line.trim().startsWith('#') || line.trim().startsWith('//')) {
    return <span className="text-[#6E6E73] italic">{line}</span>;
  }

  const words = line.split(/(\s+|,|\(|\)|=|\+|-|\*|\/|<|>|;)/);

  return (
    <>
      {words.map((word, i) => {
        const uppercaseWord = word.toUpperCase();

        if (
          lang === 'sql' &&
          ['WITH', 'SELECT', 'FROM', 'WHERE', 'GROUP', 'BY', 'ORDER', 'HAVING', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'ON', 'AS', 'OVER', 'PARTITION', 'AND', 'OR', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'LIMIT', 'OFFSET', 'ROUND', 'SUM', 'COUNT', 'AVG', 'NTILE', 'LAG', 'LEAD', 'DATE_TRUNC', 'NULLIF', 'DISTINCT', 'DESC', 'ASC'].includes(uppercaseWord)
        ) {
          return (
            <span key={i} className="text-[#0071E3] font-medium">
              {word}
            </span>
          );
        }

        if (
          lang === 'python' &&
          ['import', 'from', 'as', 'def', 'return', 'if', 'else', 'elif', 'for', 'in', 'while', 'try', 'except', 'True', 'False', 'None', 'print', 'pd', 'np', 'plt', 'sns'].includes(word)
        ) {
          return (
            <span key={i} className="text-emerald-400 font-medium">
              {word}
            </span>
          );
        }

        if (
          lang === 'dax' &&
          ['CALCULATE', 'SUM', 'AVERAGEX', 'VALUES', 'DATESINPERIOD', 'DATEADD', 'MAX', 'DIVIDE', 'ISBLANK', 'BLANK', 'RETURN', 'VAR', 'IF'].includes(uppercaseWord)
        ) {
          return (
            <span key={i} className="text-amber-400 font-medium">
              {word}
            </span>
          );
        }

        if (word.startsWith("'") || word.startsWith('"')) {
          return (
            <span key={i} className="text-emerald-300">
              {word}
            </span>
          );
        }

        if (/^\d+(\.\d+)?$/.test(word)) {
          return (
            <span key={i} className="text-blue-300">
              {word}
            </span>
          );
        }

        return <span key={i}>{word}</span>;
      })}
    </>
  );
}
