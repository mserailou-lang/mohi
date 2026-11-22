import { useEffect, useId, useRef } from 'react';
import { CloseIcon } from './icons.jsx';
import './Dialog.css';

export default function Dialog({ open, onClose, title, children }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (open && !node.open) {
      node.showModal();
      document.body.style.overflow = 'hidden';
    } else if (!open && node.open) {
      node.close();
      document.body.style.overflow = '';
    }
  }, [open]);

  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    [],
  );

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="dialog__panel">
        <button type="button" className="dialog__close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
        {title && (
          <h2 id={titleId} className="dialog__title">
            {title}
          </h2>
        )}
        <div className="dialog__body">{children}</div>
      </div>
    </dialog>
  );
}
