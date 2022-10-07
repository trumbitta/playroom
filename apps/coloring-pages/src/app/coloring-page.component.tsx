import { PropsWithChildren } from 'react';

// Coloring Pages
import { ReactComponent as Anna } from '@playroom/coloring-pages/images/anna.svg';
import { ReactComponent as Elsa } from '@playroom/coloring-pages/images/elsa.svg';

// Hooks
import { useColoringPage } from './use-coloring-page.hook';
import { useAppContext } from './context/use-app-context.hook';

// Types
import { Drawing } from './context/app.context';

interface ColoringPageProps {
  className?: string;
}

export const ColoringPage = ({
  className,
}: PropsWithChildren<ColoringPageProps>) => {
  const {
    currentColor: { code: currentColorCode },
    drawing,
  } = useAppContext();

  const Picture = (
    {
      anna: Anna,
      elsa: Elsa,
    } as Record<
      Drawing,
      React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
          title?: string | undefined;
        }
      >
    >
  )[drawing];

  const svgRef = useColoringPage(currentColorCode);

  return <Picture ref={svgRef} className={className} />;
};
