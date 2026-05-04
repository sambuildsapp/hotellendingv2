import { useEffect, useRef } from 'react';

/**
 * Hook to automatically smooth-scroll to an element when a trigger condition is met.
 * @param trigger The value that triggers the scroll (usually the current stage/step index).
 * @param offset Vertical offset in pixels (default: 100px from top).
 * @returns A RefObject to attach to the target element.
 */
export function useAutoScroll<T extends HTMLElement>(trigger: any, offset: number = 100) {
    const ref = useRef<T>(null);

    useEffect(() => {
        if (ref.current) {
            const element = ref.current;
            const rect = element.getBoundingClientRect();
            const absoluteTop = window.scrollY + rect.top;

            // Only scroll if the element is not fully in view
            const isInView = (
                rect.top >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
            );

            if (!isInView) {
                window.scrollTo({
                    top: absoluteTop - offset,
                    behavior: 'smooth'
                });
            }
        }
    }, [trigger, offset]);

    return ref;
}
