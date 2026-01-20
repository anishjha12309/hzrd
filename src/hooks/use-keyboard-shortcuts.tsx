"use client";

import { useEffect, useCallback, createContext, useContext, useState, ReactNode } from "react";

interface KeyboardShortcutsContextType {
  openSearch: () => void;
  setOpenSearchHandler: (handler: () => void) => void;
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | null>(null);

export function useKeyboardShortcuts() {
  const context = useContext(KeyboardShortcutsContext);
  if (!context) {
    throw new Error("useKeyboardShortcuts must be used within KeyboardShortcutsProvider");
  }
  return context;
}

interface KeyboardShortcutsProviderProps {
  children: ReactNode;
}

export function KeyboardShortcutsProvider({ children }: KeyboardShortcutsProviderProps) {
  const [openSearchHandler, setOpenSearchHandler] = useState<(() => void) | null>(null);

  const openSearch = useCallback(() => {
    if (openSearchHandler) {
      openSearchHandler();
    }
  }, [openSearchHandler]);

  const setHandler = useCallback((handler: () => void) => {
    setOpenSearchHandler(() => handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      const isEditable =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // / to open search (not when typing)
      if (e.key === "/" && !isEditable) {
        e.preventDefault();
        openSearch();
      }

      // Escape to close modals/drawers (handled by individual components)
      // This is just a central reference point
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openSearch]);

  return (
    <KeyboardShortcutsContext.Provider
      value={{
        openSearch,
        setOpenSearchHandler: setHandler,
      }}
    >
      {children}
    </KeyboardShortcutsContext.Provider>
  );
}
