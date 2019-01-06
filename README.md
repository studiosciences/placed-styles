# placed-components

A library for handling component layouts with deterministic affects across versions. This separates the layout, controlled by the consumer of a component, from the appearance, controlled by the component developer.

## Example Component

Here's how you use it to create a component.

```jsx
import { PlaceTypes, placeStyles } from 'placed-components';
import { styled } from 'styled-components';

...

static propTypes = {
  place: PlaceTypes.any,
  label: PropTypes.string,
};

static defaultPlace = {
  displayOutside: 'inline',
  displayInside: 'flex',
}

const Tag = styled.button`
  background: #666;
  border: none;
  color: white;
`;

render() {
  return <Tag styles={placeStyles(this.props.place, this.defaultPlace)} label={this.props.label} />
}
```

## Example Composition

Here's how the consumer of the component may use it.

```jsx
import Button from 'components/Button';
...

render() {
  return {
    <div>
      <Button place={{flexGrow: '0', flexBasis: '200px'}} label="Cancel" />
      <Button place={{flexGrow: '1', flexBasis: '200px'}} label="OK" />
    </div>
}
```

## PropType Validation

Generally, the placeTypes have the same restrictions as React styles prop.

The main difference is that the display property has been split into it's
constituent parts. The `placeStyles()` and `placeCSS()` functions will merge
these as necessary.

```
position,
top,
right,
bottom,
left,

margin-top,
margin-right,
margin-bottom,
margin-left,

width,
height,
min-width,
max-width,
min-height,
max-height,

flex-basis,
flex-grow,
flex-shrink,
align-self,
order,

grid-column-start,
grid-column-end,
grid-row-start,
grid-row-end,
grid-column,
grid-row,
grid-area,
justify-self,
place-self,

visibility,
```

### PlaceTypes.any

```jsx
import { PlaceTypes } from 'placed-components';

...

static propTypes = {
  place: PlaceTypes.any,
  value: PropTypes.number,
};
```

### PlaceTypes.except

If a component doesn't support some layout css, such as `inline block`, or
must control some part itself, such as `min-width`, the component can exclude
these in the propTypes.

```jsx
import { PlaceTypes } from 'placed-components';

...

static propTypes = {
  place: PlaceTypes.except(['minWidth', 'height', 'minHeight', 'maxHeight']),
  value: PropTypes.number,
};
```

## Inserting Styles from Props

```
displayOutside: 'block' | 'inline',
displayInside: 'flow' | 'flow-root' | 'table' | 'flow-root' | 'flex' | 'grid',
displayInternal: 'table-row-group' | table-header-group' | 'table-footer-group' | 'table-row' | 'table-cell' | 'table-column-group' | 'table-column' | 'table-caption' ,
displayListItem: 'list-item',
```

### `placeStyles(outsideStyles, [outsideDefaults], insideStyles)`

This function returns the consumer defined styles and the defaults as a single
styles object for use in the `styles` element property. It also combines the
outside `display` ('inline' or 'block') with the inside `display`
('flex', 'block') property and errors if there are conflicts.

#### Parameters

#### `outsideStyles`

_Description_: The styles as defined by the consumer in the component props.

_Type_: Object

_Required_: Yes

#### `insideStyles`

_Description_: The default styles to use in placing the component.

_Type_: Object

_Required_: No

_Default_: `{ display: 'block' }`

#### Example

```jsx
import { PlaceTypes, placeStyles } from 'placed-components';

...

static defaultPlace = {
  displayOutside: 'inline',
  displayInside: 'flex',
}

render() {
  return <Button styles={placeStyles(Props.place, defaultPlace)} label="OK" />
}
```

### `placeCSS(outsideStyles, [displayInside])`

This function returns the consumer defined styles and the defaults as a single
string of css for use in another library, such as styled-components. It also
combines `displayInside`, `displayOutside`, `displayListItem`, and
`displayTable` into a single `display` property.

#### Parameters

#### `styles`

_Description_: The styles as defined by the consumer in the component props.

_Type_: Object

_Required_: Yes

#### `defaultStyles`

_Description_: The default styles to use in placing the component.

_Type_: Object

_Required_: No

_Default_: `{ displayOutside: 'block' }`

#### Example

```jsx
import styled from 'styled-components';
import { PlaceTypes, placeCSS } from 'placed-components';

...

static defaultPlace = {
  displayOutside: 'inline',
}

const Tag = styled.button`
  ${placeCSS(props.place, defaultPlace)};
  background: #666;
  border: none;
  color: white;
`;

render() {
  return <Tag label={this.props.label} />
}
```
