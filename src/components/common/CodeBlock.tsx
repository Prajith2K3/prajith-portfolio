import React, { useState } from 'react';
import { Copy, Check, Terminal, FileCode } from 'lucide-react';

interface CodeBlockProps {
  language: 'sql' | 'python' | 'dax';
  title: string;
  code: string;
}

const LANG_COLORS = {
  sql: { accent: '#60A5FA', icon: Terminal, badge: 'bg-[rgba(59,130,246,0.15)] text-[#60A5FA] border-[rgba(59,130,246,0.25)]' },
  python: { accent: '#34D399', icon: FileCode, badge: 'bg-[rgba(16,185,129,0.15)] text-[#34D399] border-[rgba(16,185,129,0.25)]' },
  dax: { accent: '#F59E0B', icon: Terminal, badge: 'bg-[rgba(245,158,11,0.15)] text-[#F59E0B] border-[rgba(245,158,11,0.25)]' },
};

export const CodeBlock: React.FC<CodeBlockProps> = ({ language, title, code }) => {
  const [copied, setCopied] = useState(false);
  const langMeta = LANG_COLORS[language] || LANG_COLORS.sql;
  const LangIcon = langMeta.icon;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="rounded-2xl overflow-hidden font-mono text-xs md:text-sm" style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(99,146,255,0.15)' }}>
      {/* Code Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[rgba(99,146,255,0.1)]" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] opacity-70" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] opacity-70" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] opacity-70" />
          </div>
          <span className="text-[rgba(99,146,255,0.3)]">|</span>
          <span className="flex items-center gap-2">
            <LangIcon className="w-3.5 h-3.5" style={{ color: langMeta.accent }} />
            <span className={`uppercase text-xs font-bold px-2 py-0.5 rounded-md border ${langMeta.badge}`}>
              {language}
            </span>
            <span className="text-[#CBD5E1] font-sans text-xs sm:text-sm font-semibold truncate max-w-[200px] md:max-w-none">
              {title}
            </span>
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(59,130,246,0.15)] text-[#CBD5E1] hover:text-white text-xs transition-all cursor-pointer border border-[rgba(148,163,184,0.2)] hover:border-[rgba(96,165,250,0.5)] font-semibold"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[#10B981] text-xs font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="p-5 overflow-x-auto max-h-[380px] leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-[rgba(59,130,246,0.08)] transition-colors">
                <td className="w-8 pr-4 text-right select-none text-[#93C5FD] text-xs font-mono border-r border-[rgba(148,163,184,0.15)] font-medium">
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
    return <span className="text-[#94A3B8] font-medium italic">{line}</span>;
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
          return <span key={i} className="text-[#60A5FA] font-bold">{word}</span>;
        }

        if (
          lang === 'python' &&
          ['import', 'from', 'as', 'def', 'return', 'if', 'else', 'elif', 'for', 'in', 'while', 'try', 'except', 'True', 'False', 'None', 'print', 'pd', 'np', 'plt', 'sns'].includes(word)
        ) {
          return <span key={i} className="text-[#60A5FA] font-bold">{word}</span>;
        }

        if (
          lang === 'dax' &&
          ['CALCULATE', 'SUM', 'AVERAGEX', 'VALUES', 'DATESINPERIOD', 'DATEADD', 'MAX', 'DIVIDE', 'ISBLANK', 'BLANK', 'RETURN', 'VAR', 'IF', 'SAMEPERIODLASTYEAR'].includes(uppercaseWord)
        ) {
          return <span key={i} className="text-[#F59E0B] font-bold">{word}</span>;
        }

        if (word.startsWith("'") || word.startsWith('"')) {
          return <span key={i} className="text-[#34D399] font-medium">{word}</span>;
        }

        if (/^\d+(\.\d+)?$/.test(word)) {
          return <span key={i} className="text-[#F59E0B] font-medium">{word}</span>;
        }

        return <span key={i} className="text-[#F1F5F9]">{word}</span>;
      })}
    </>
  );
}
