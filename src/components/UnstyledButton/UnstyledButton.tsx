import React, {useRef} from 'react';

import {handleMouseUpByBlurring} from '../../utilities/focus';
import {UnstyledLink} from '../UnstyledLink';

export interface UnstyledButtonProps {
  /** The content to display inside the button */
  children?: React.ReactNode;
  /** A destination to link to, rendered in the href attribute of a link */
  url?: string;
  /** A unique identifier for the button */
  id?: string;
  /** A custom class name to apply styles to button */
  className?: string;
  /** Disables the button, disallowing merchant interaction */
  disabled?: boolean;
  /** Allows the button to submit a form */
  submit?: boolean;
  /** Forces url to open in a new tab */
  external?: boolean;
  /** Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value */
  download?: string | boolean;
  /** Sets the button in a pressed state */
  pressed?: boolean;
  /** Visually hidden text for screen readers */
  accessibilityLabel?: string;
  /** Id of the element the button controls */
  ariaControls?: string;
  /** Tells screen reader the controlled element is expanded */
  ariaExpanded?: boolean;
  /**
   * @deprecated As of release 4.7.0, replaced by {@link https://polaris.shopify.com/components/structure/page#props-pressed}
   * Tells screen reader the element is pressed
   */
  ariaPressed?: boolean;
  /** Callback when clicked */
  onClick?(): void;
  /** Callback when button becomes focussed */
  onFocus?(): void;
  /** Callback when focus leaves button */
  onBlur?(): void;
  /** Callback when a keypress event is registered on the button */
  onKeyPress?(event: React.KeyboardEvent<HTMLButtonElement>): void;
  /** Callback when a keyup event is registered on the button */
  onKeyUp?(event: React.KeyboardEvent<HTMLButtonElement>): void;
  /** Callback when a keydown event is registered on the button */
  onKeyDown?(event: React.KeyboardEvent<HTMLButtonElement>): void;
  /** Callback when mouse enter */
  onMouseEnter?(): void;
  /** Callback when element is touched */
  onTouchStart?(): void;
  [key: string]: any;
}

export function UnstyledButton({
  id,
  url,
  disabled,
  children,
  className,
  pressed,
  accessibilityLabel,
  ariaControls,
  ariaExpanded,
  ariaPressed,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  external,
  download,
  submit,
  ...rest
}: UnstyledButtonProps) {
  const hasGivenDeprecationWarning = useRef(false);

  if (ariaPressed && !hasGivenDeprecationWarning.current) {
    // eslint-disable-next-line no-console
    console.warn(
      'Deprecation: The ariaPressed prop has been replaced with pressed',
    );
    hasGivenDeprecationWarning.current = true;
  }

  const type = submit ? 'submit' : 'button';
  const ariaPressedStatus = pressed !== undefined ? pressed : ariaPressed;

  let buttonMarkup;

  if (url) {
    buttonMarkup = disabled ? (
      // Render an `<a>` so toggling disabled/enabled state changes only the
      // `href` attribute instead of replacing the whole element.
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        id={id}
        className={className}
        aria-label={accessibilityLabel}
        data-polaris-unstyled-button
      >
        {children}
      </a>
    ) : (
      <UnstyledLink
        id={id}
        url={url}
        external={external}
        download={download}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseUp={handleMouseUpByBlurring}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
        className={className}
        aria-label={accessibilityLabel}
        data-polaris-unstyled-button
        {...rest}
      >
        {children}
      </UnstyledLink>
    );
  } else {
    buttonMarkup = (
      <button
        id={id}
        type={type}
        onClick={onClick}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
        onMouseUp={handleMouseUpByBlurring}
        onMouseEnter={onMouseEnter}
        onTouchStart={onTouchStart}
        className={className}
        disabled={disabled}
        aria-label={accessibilityLabel}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressedStatus}
        {...rest}
      >
        {children}
      </button>
    );
  }

  return buttonMarkup;
}
