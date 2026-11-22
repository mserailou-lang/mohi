import { journal } from '../data/site.js';

export default function JournalContent() {
  return (
    <>
      <p className="dialog__intro">
        Notes on feeding, rest and the first tender months. Sample entries — replace them with your
        own writing.
      </p>

      <div className="dialog__journal">
        {journal.map((entry) => (
          <details key={entry.title} className="dialog__entry">
            <summary>
              <span className="dialog__entry-title">{entry.title}</span>
              <span className="dialog__entry-date">{entry.date}</span>
            </summary>
            <div className="dialog__entry-body">
              <p>{entry.excerpt}</p>
              <p>{entry.body}</p>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
