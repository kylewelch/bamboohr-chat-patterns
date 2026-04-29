import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const PreviewPaneContext = createContext(null);

export function usePreviewPane() {
  return useContext(PreviewPaneContext);
}

export function PreviewPaneProvider({ children }) {
  const [entries, setEntries] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const observerRef = useRef(null);
  const refToIdRef = useRef(new Map());
  const ratiosRef = useRef(new Map());

  const recomputeActive = useCallback(() => {
    let bestId = null;
    let bestRatio = 0;
    for (const [id, ratio] of ratiosRef.current.entries()) {
      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = id;
      }
    }
    if (bestId) {
      setActiveId(bestId);
    } else {
      // Nothing visible — fall back to the first registered entry
      setActiveId(prev => prev ?? (refToIdRef.current.size > 0
        ? refToIdRef.current.values().next().value
        : null));
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((observed) => {
      for (const entry of observed) {
        const id = refToIdRef.current.get(entry.target);
        if (!id) continue;
        ratiosRef.current.set(id, entry.intersectionRatio);
      }
      recomputeActive();
    }, {
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    });
    observerRef.current = observer;
    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [recomputeActive]);

  const register = useCallback((id, payload) => {
    setEntries(prev => {
      const without = prev.filter(e => e.id !== id);
      return [...without, { id, ...payload }];
    });
    if (payload.ref?.current && observerRef.current) {
      refToIdRef.current.set(payload.ref.current, id);
      observerRef.current.observe(payload.ref.current);
    }
    setActiveId(prev => prev ?? id);
    return () => {
      setEntries(prev => prev.filter(e => e.id !== id));
      if (payload.ref?.current && observerRef.current) {
        observerRef.current.unobserve(payload.ref.current);
        refToIdRef.current.delete(payload.ref.current);
      }
      ratiosRef.current.delete(id);
      setActiveId(prev => (prev === id ? null : prev));
    };
  }, []);

  const value = useMemo(() => ({
    entries,
    activeId,
    register,
  }), [entries, activeId, register]);

  return (
    <PreviewPaneContext.Provider value={value}>
      {children}
    </PreviewPaneContext.Provider>
  );
}
