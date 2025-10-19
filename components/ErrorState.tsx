interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = "Ha ocurrido un problema al cargar los datos." }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-200 shadow-[0_0_30px_rgba(239,68,68,0.15)]"
    >
      {message}
    </div>
  );
}
