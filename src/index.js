import { intersection } from 'underscore';

const supportedKeys = [
  'float',
  'visibility',
  'vertical-align',
  'width',
  'minWidth',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
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

export function placeStyles(outsideStyles, defaultStyles = {}) {
  return { ...defaultStyles, ...outsideStyles };
}

export function placeCSS(outsideStyles) {
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
