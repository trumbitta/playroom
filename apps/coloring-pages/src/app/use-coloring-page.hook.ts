import { useRef, useCallback, useEffect, RefObject } from 'react';

export const useColoringPage = (
  colorCode: string
): RefObject<SVGSVGElement> => {
  const svgRef = useRef<SVGSVGElement>(null);

  const findTargetElement = (clickedElement: HTMLElement): HTMLElement => {
    if (clickedElement.hasAttribute('id')) {
      return clickedElement;
    }

    let currentElement = clickedElement.parentElement;
    while (!currentElement?.hasAttribute('id')) {
      currentElement = currentElement?.parentElement ?? null;
    }

    return currentElement;
  };

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const clickedElement = event.target as HTMLElement;
      const targetElement = findTargetElement(clickedElement);
      targetElement.setAttribute('fill', colorCode);
    },
    [colorCode]
  );

  const toggleClickEvents = useCallback(
    (
      elements: SVGElement[],
      method: 'addEventListener' | 'removeEventListener'
    ) => {
      for (const element of elements) {
        element[method]('click', (event) => handleClick(event as MouseEvent));
      }
    },
    [handleClick]
  );

  useEffect(() => {
    const svgElement = svgRef.current;
    const notableElementsNodeList =
      svgElement?.querySelectorAll<SVGElement>('[id]');
    const notableElements = Object.entries(notableElementsNodeList ?? {}).map(
      ([_, element]) => element
    );

    toggleClickEvents(notableElements, 'addEventListener');

    return () => {
      toggleClickEvents(notableElements, 'removeEventListener');
    };
  }, [toggleClickEvents]);

  return svgRef;
};
