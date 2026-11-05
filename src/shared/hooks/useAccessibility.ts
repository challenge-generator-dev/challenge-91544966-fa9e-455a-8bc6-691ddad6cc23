import { useState, useCallback, useEffect, useRef } from 'react';

interface UseAccessibilityOptions {
  initialExpanded?: boolean;
  initialPressed?: boolean;
  initialSelected?: boolean;
  initialChecked?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  onPressedChange?: (pressed: boolean) => void;
  onSelectedChange?: (selected: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
}

interface AccessibilityState {
  expanded: boolean;
  pressed: boolean;
  selected: boolean;
  checked: boolean;
  disabled: boolean;
  readonly: boolean;
  hidden: boolean;
}

interface UseAccessibilityReturn extends AccessibilityState {
  toggleExpanded: () => void;
  togglePressed: () => void;
  toggleSelected: () => void;
  toggleChecked: () => void;
  setExpanded: (value: boolean) => void;
  setPressed: (value: boolean) => void;
  setSelected: (value: boolean) => void;
  setDisabled: (value: boolean) => void;
  setReadonly: (value: boolean) => void;
  setHidden: (value: boolean) => void;
  getAriaAttributes: () => Record<string, string | boolean>;
}

export const useAccessibility = (
  options: UseAccessibilityOptions = {}
): UseAccessibilityReturn => {
  const {
    initialExpanded = false,
    initialPressed = false,
    initialSelected = false,
    initialChecked = false,
    onExpandedChange,
    onPressedChange,
    onSelectedChange,
    onCheckedChange,
  } = options;

  const [expanded, setExpanded] = useState(initialExpanded);
  const [pressed, setPressed] = useState(initialPressed);
  const [selected, setSelected] = useState(initialSelected);
  const [checked, setChecked] = useState(initialChecked);
  const [disabled, setDisabled] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const [hidden, setHidden] = useState(false);

  const handleExpandedChange = useCallback(
    (value: boolean) => {
      setExpanded(value);
      onExpandedChange?.(value);
    },
    [onExpandedChange]
  );

  const handlePressedChange = useCallback(
    (value: boolean) => {
      setPressed(value);
      onPressedChange?.(value);
    },
    [onPressedChange]
  );

  const handleSelectedChange = useCallback(
    (value: boolean) => {
      setSelected(value);
      onSelectedChange?.(value);
    },
    [onSelectedChange]
  );

  const handleCheckedChange = useCallback(
    (value: boolean) => {
      setChecked(value);
      onCheckedChange?.(value);
    },
    [onCheckedChange]
  );

  const toggleExpanded = useCallback(() => {
    handleExpandedChange(!expanded);
  }, [expanded, handleExpandedChange]);

  const togglePressed = useCallback(() => {
    handlePressedChange(!pressed);
  }, [pressed, handlePressedChange]);

  const toggleSelected = useCallback(() => {
    handleSelectedChange(!selected);
  }, [selected, handleSelectedChange]);

  const toggleChecked = useCallback(() => {
    if (!disabled && !readonly) {
      handleCheckedChange(!checked);
    }
  }, [checked, disabled, readonly, handleCheckedChange]);

  const getAriaAttributes = useCallback(() => {
    const attrs: Record<string, string | boolean> = {};

    if (expanded !== initialExpanded) {
      attrs['aria-expanded'] = expanded;
    }

    if (pressed !== initialPressed) {
      attrs['aria-pressed'] = pressed;
    }

    if (selected !== initialSelected) {
      attrs['aria-selected'] = selected;
    }

    if (checked !== initialChecked) {
      attrs['aria-checked'] = checked;
    }

    if (disabled) {
      attrs['aria-disabled'] = true;
    }

    if (readonly) {
      attrs['aria-readonly'] = true;
    }

    if (hidden) {
      attrs['aria-hidden'] = true;
    }

    return attrs;
  }, [expanded, pressed, selected, checked, disabled, readonly, hidden, initialExpanded, initialPressed, initialSelected, initialChecked]);

  return {
    expanded,
    pressed,
    selected,
    checked,
    disabled,
    readonly,
    hidden,
    toggleExpanded,
    togglePressed,
    toggleSelected,
    toggleChecked,
    setExpanded: handleExpandedChange,
    setPressed: handlePressedChange,
    setSelected: handleSelectedChange,
    setDisabled,
    setReadonly,
    setHidden,
    getAriaAttributes,
  };
};

export const useFocusTrap = (
  isActive: boolean,
  containerRef: React.RefObject<HTMLElement>
) => {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    previousFocus.current = document.activeElement as HTMLElement;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const firstFocusable = containerRef.current?.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    firstFocusable?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [isActive, containerRef]);
};

export const useAnnounce = () => {
  const announcerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const announcer = document.createElement('div');
    announcer.setAttribute('role', 'status');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText =
      'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;';
    document.body.appendChild(announcer);
    announcerRef.current = announcer;

    return () => {
      document.body.removeChild(announcer);
    };
  }, []);

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announcerRef.current) {
      announcerRef.current.setAttribute('aria-live', priority);
      announcerRef.current.textContent = '';
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message;
        }
      }, 100);
    }
  }, []);

  return announce;
};