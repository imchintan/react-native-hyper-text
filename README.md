# React Native Hyper Text
[![NPM version](https://badge.fury.io/js/react-native-hyper-text.svg)](http://badge.fury.io/js/react-native-hyper-text)

A `<HyperText />` component for [react-native](http://facebook.github.io/react-native/) that makes urls, telephones etc clickable

## Installation
```sh
npm i --save react-native-hyper-text
```

## Props
| name | desc | type | default
| --- | --- | --- | --- |
| `style` | text with styles | Text.propTypes.style | -
| `linkColor` | highlight clickable text with color | string | blue(#0000EE)
| `underLine` | highlight clickable text with underLine | boolean | true
| `linkifyTel` | highlight telephone as a clickable text | boolean | `false`
| `onClick` | func to handle click over a clickable text with parsed text as arg | function | open in `browser`or `dialer`
| `onLongClick` | func to handle long click over a clickable text with parsed text as arg | function | -

## Examples

```javascript
import HyperText from 'react-native-hyper-text'

export const regularText = () =>
  <HyperText style={{fontSize:14}} onClick={ url => alert(url) }>
    This text will be parsed to check for clickable strings like https://github.com/imchintan/react-native-hyper-text and made clickable.
  </HyperText>

export const textWithoutUnderLine = () =>
  <HyperText style={{fontSize:14}} underLine={false} onClick={ url => alert(url) }>
    This text will be parsed to check for clickable strings like https://github.com/imchintan/react-native-hyper-text and made clickable.
  </HyperText>

export const textLinkifyTelePhone = () =>
  <HyperText style={{fontSize:14}} linkifyTel={true} onClick={ url => alert(url) }>
    This text will be parsed to check for clickable strings like https://github.com/imchintan/react-native-hyper-text or +123 512 (1234) and made clickable.
  </HyperText>

export const regularTextLongPress = () =>
  <HyperText onLongClick={ url => alert(url) }>
      This text will be parsed to check for clickable strings like https://github.com/imchintan/react-native-hyper-text and made clickable for long click.
  </HyperText>

export const highlightText = () =>
  <HyperText linkColor='#2980b9'>    
      Make clickable strings like https://github.com/imchintan/react-native-hyper-text stylable
  </HyperText>

```

License
----
MIT License
