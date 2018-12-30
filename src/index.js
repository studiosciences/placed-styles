import { intersection, omit } from 'underscore';

const supportedKeys = [
  'displayOutside',
  'float',
  'visibility',
  'width',
  'minWidth',
  'maxWidth',
  'height',
  'minHeight',
  'maxHeight',
  'position',
  'top',
  'right',
  'bottom',
  'left',
  'flexBasis',
  'flexGrow',
  'flexShrink',
  'justifySelf',
  'alignSelf',
  'order',
  'gridColumnStart',
  'gridColumnEnd',
  'gridRowStart',
  'gridRowEnd',
  'gridArea',
];

function validate(userProps, supportedKeys, propName, componentName) {
  userProps;

  for (let key in userProps) {
    if (supportedKeys.indexOf(key) < 0) {
      return new Error(
        `Invalid key ${key} supplied to prop ${propName} in ${componentName}. Validation failed.`
      );
    }
  }
}

function any(userProps, propName, componentName) {
  return validate(userProps, supportedKeys, propName, componentName);
}

function except(excludeKeys) {
  return function(props, propName, componentName) {
    return validate(
      userProps,
      intersection(supportedKeys, excludeKeys),
      propName,
      componentName
    );
  };
}

export const placeTypes = { any, except };

function mergeDisplay(inside, outside, internal, listItem) {
  return `${listItem || internal} ${displayInside || 'block'} ${
    displayOutside === 'inline' ? 'inline' : ''
  }`;
}

export function placeStyles(styles, defaults = {}) {
  const mergedStyles = { ...defaults, ...styles };
  const {
    displayInside,
    displayOutside,
    displayInternal,
    displayListItem,
    ...outputStyles
  } = mergedStyles;

  if (displayInside || displayOutside) {
    outputStyles.display = mergeDisplay(
      displayInside,
      displayOutside,
      displayInternal,
      displayListItem
    );
  }
  return output;
}

export function placeCSS(styles) {
  const object = placeStyles(styles);

  let output = '';
  for (let key in styles) {
    cssString +=
      key.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`) +
      ': ' +
      styles[key] +
      ';\n';
  }

  return output;
}
