"use client";

import { useId } from "react";

type Base = { label: string; name: string; error?: string; hint?: string; required?: boolean };

function Wrapper({ id, label, error, hint, required, children }: Base & { id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required && <span aria-hidden className="text-fuxia-forte"> *</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-blu-2">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

export function TextField({
  label,
  name,
  error,
  hint,
  required,
  ...input
}: Base & Omit<React.InputHTMLAttributes<HTMLInputElement>, "name">) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} name={name} error={error} hint={hint} required={required}>
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className="field"
        {...input}
      />
    </Wrapper>
  );
}

export function TextArea({
  label,
  name,
  error,
  hint,
  required,
  ...input
}: Base & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} name={name} error={error} hint={hint} required={required}>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className="field"
        {...input}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  required,
  children,
  ...input
}: Base & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name">) {
  const id = useId();
  return (
    <Wrapper id={id} label={label} name={name} error={error} hint={hint} required={required}>
      <select
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className="field"
        {...input}
      >
        {children}
      </select>
    </Wrapper>
  );
}

export function Checkbox({
  label,
  name,
  error,
  checked,
  onChange,
}: { label: React.ReactNode; name: string; error?: string; checked: boolean; onChange: (v: boolean) => void }) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 size-5 shrink-0 accent-fuxia-forte"
        />
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="field-error ml-8">
          {error}
        </p>
      )}
    </div>
  );
}

/** Campo trappola per i bot: invisibile e fuori dal tab order. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
      <label>
        Non compilare questo campo
        <input type="text" name="sito" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
