import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type AppRoute =
  | '/'
  | '/about-us'
  | '/our-services'
  | '/contact-us'
  | '/privacy-policy'
  | '/terms-and-conditions';

export const VALID_ROUTES: AppRoute[] = [
  '/',
  '/about-us',
  '/our-services',
  '/contact-us',
  '/privacy-policy',
  '/terms-and-conditions',
];

function normalizePath(pathname: string): AppRoute {
  const cleaned = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (VALID_ROUTES.includes(cleaned as AppRoute)) {
    return cleaned as AppRoute;
  }
  return '/';
}

interface NavigateOptions {
  hash?: string;
  search?: string;
}

interface RouterContextValue {
  currentPath: AppRoute;
  searchParams: URLSearchParams;
  navigate: (to: AppRoute, options?: NavigateOptions) => void;
  navigateToSection: (sectionId: string, page?: AppRoute) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<AppRoute>(() =>
    normalizePath(window.location.pathname)
  );
  const [searchString, setSearchString] = useState<string>(() => window.location.search);
  const pendingHashRef = React.useRef<string | null>(
    window.location.hash ? window.location.hash.replace(/^#/, '') : null
  );

  const scrollToElement = useCallback((elementId: string) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(elementId);
        if (target) {
          const headerOffset = 84;
          const elementPosition = target.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: Math.max(0, elementPosition - headerOffset),
            behavior: 'smooth',
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
      setSearchString(window.location.search);
      pendingHashRef.current = window.location.hash ? window.location.hash.replace(/^#/, '') : null;
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (pendingHashRef.current) {
      const targetId = pendingHashRef.current;
      pendingHashRef.current = null;
      scrollToElement(targetId);
    }
  }, [currentPath, scrollToElement]);

  const navigate = useCallback(
    (to: AppRoute, options?: NavigateOptions) => {
      const normalized = normalizePath(to);
      const searchPart = options?.search ? `?${options.search.replace(/^\?/, '')}` : '';
      const hashPart = options?.hash ? `#${options.hash.replace(/^#/, '')}` : '';
      const nextUrl = `${normalized}${searchPart}${hashPart}`;

      if (window.location.pathname + window.location.search + window.location.hash !== nextUrl) {
        window.history.pushState({}, '', nextUrl);
      }

      if (options?.hash) {
        const id = options.hash.replace(/^#/, '');
        if (currentPath === normalized) {
          scrollToElement(id);
        } else {
          pendingHashRef.current = id;
        }
      } else {
        pendingHashRef.current = null;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      setCurrentPath(normalized);
      setSearchString(searchPart);
    },
    [currentPath, scrollToElement]
  );

  const navigateToSection = useCallback(
    (sectionId: string, page: AppRoute = '/') => {
      if (currentPath === page) {
        const cleanHash = `#${sectionId}`;
        if (window.location.hash !== cleanHash) {
          window.history.replaceState({}, '', `${page}${window.location.search}${cleanHash}`);
        }
        scrollToElement(sectionId);
      } else {
        navigate(page, { hash: sectionId });
      }
    },
    [currentPath, navigate, scrollToElement]
  );

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        searchParams: new URLSearchParams(searchString),
        navigate,
        navigateToSection,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used inside RouterProvider');
  }
  return ctx;
}
