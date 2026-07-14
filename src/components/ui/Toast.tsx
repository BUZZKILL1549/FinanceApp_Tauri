import React from 'react';
import './Toast.css';

export type ToastLevel = 'info' | 'success' | 'error' | 'warn';

export interface ToastItem {
  id: string;
  level: ToastLevel;
  message: string;
  timeout?: number;
}

type Props = {
  toast: ToastItem;
  onClose: (id: string) => void;
};

export default function Toast({ toast, onClose }: Props) {
  const { id, level, message } = toast;
  return (
    <div className={`toast toast-${level}`} role="status" aria-live="polite">
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={() => onClose(id)} aria-label="Dismiss">×</button>
    </div>
  );
}
