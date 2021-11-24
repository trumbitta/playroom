import React, { FC } from 'react';

// Coloring Pages
import { ReactComponent as Picture } from '@coloring-pages/images/elsa.svg';

// Hooks
import { useColoringPage } from './use-coloring-page.hook';

interface ColoringPageProps {
  className?: string;
  currentColorCode: string;
}

export const ColoringPage: FC<ColoringPageProps> = ({
  className,
  currentColorCode,
}) => {
  const svgRef = useColoringPage(currentColorCode);

  return <Picture ref={svgRef} className={className} />;
};
