export default function EditorNote({ note }: { note: string | null }) {
  if (!note) return null;

  return (
    <p className="mt-10 border-t border-slate-200 pt-4 text-xs leading-5 text-slate-500">
      Catatan redaksi: {note}
    </p>
  );
}