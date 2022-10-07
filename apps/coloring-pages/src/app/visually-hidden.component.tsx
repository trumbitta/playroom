// Adapted from https://github.com/reach/reach-ui/blob/cc1ef7426dbdf250f9056992ed94a4bedebc4f5c/packages/visually-hidden/src/index.tsx
// Because the package is not working with React 18

import { forwardRef } from 'react';

/**
 * VisuallyHidden
 *
 * Provides text for screen readers that is visually hidden.
 * It is the logical opposite of the `aria-hidden` attribute.
 */
export const VisuallyHidden = forwardRef<any, any>(function VisuallyHidden(
  { style = {}, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      style={{
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        width: '1px',

        // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        ...style,
      }}
      {...props}
    />
  );
});

/**
 * @see Docs https://reach.tech/visually-hidden#visuallyhidden-props
 */
interface VisuallyHiddenProps {
  /**
   * @see Docs https://reach.tech/visually-hidden#visuallyhidden-children
   */
  children: React.ReactNode;
}

VisuallyHidden.displayName = 'VisuallyHidden';
