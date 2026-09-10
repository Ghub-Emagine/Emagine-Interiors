"use client";

import { useState } from "react";
import { TARGET_DEVELOPERS } from "@/lib/constants";

type Props = {
  id?: string;
  name?: string;
  required?: boolean;
  label?: string;
  className?: string;
};

/**
 * Dropdown of known developers + free-text for any project / society.
 */
export default function DeveloperLocationField({
  id = "location",
  name = "location",
  required = true,
  label = "Developer / location",
  className = "",
}: Props) {
  const [mode, setMode] = useState<"list" | "custom">("list");
  const [listValue, setListValue] = useState("");
  const [customValue, setCustomValue] = useState("");

  const inputClass =
    "w-full bg-white border border-[var(--border)] text-[var(--text-primary)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--accent-gold-bright)]";

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2 font-semibold"
      >
        {label}
        {required ? " *" : ""}
      </label>

      {mode === "list" ? (
        <select
          id={id}
          name={name}
          required={required}
          value={listValue}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "__custom__") {
              setMode("custom");
              setListValue("");
              return;
            }
            setListValue(v);
          }}
          className={inputClass}
        >
          <option value="" disabled>
            Select developer
          </option>
          {TARGET_DEVELOPERS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
          <option value="__custom__">Type a different project…</option>
        </select>
      ) : (
        <div className="space-y-2">
          <input
            id={id}
            name={name}
            required={required}
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            placeholder="e.g. Sobha · OMR, or society name"
            className={inputClass}
            autoFocus
          />
          <button
            type="button"
            onClick={() => {
              setMode("list");
              setCustomValue("");
            }}
            className="text-xs text-[var(--accent-gold)] hover:underline"
          >
            ← Back to list
          </button>
        </div>
      )}
    </div>
  );
}
