import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import Toast, { ToastItem, ToastLevel } from '../components/ui/Toast';

type AddToastFn = (message: string, level?: ToastLevel, timeout?: number) => void;

const ToastContext = createContext<{ addToast: AddToastFn } | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((message: string, level: ToastLevel = 'info', timeout = 4500) => {
    const id = Math.random().toString(36).slice(2, 9);
    const t: ToastItem = { id, message, level, timeout };
    setToasts(prev => [t, ...prev]);
    if (timeout && timeout > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(x => x.id !== id));
      }, timeout);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length > 6) {
      setToasts(prev => prev.slice(0, 6));
    }
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map(t => (
          <Toast key={t.id} toast={t} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
