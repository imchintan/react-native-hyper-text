# React Native HyperText
[![NPM version](https://badge.fury.io/js/react-native-hyper-text.svg)](http://badge.fury.io/js/react-native-hyper-text)

A `<HyperText />` component for [react-native](http://facebook.github.io/react-native/) that makes urls, telephones etc clickable

## Installation
```sh
npm i --save react-native-hyper-text
```

## Props
| name | desc | type | default
| --- | --- | --- | --- |
| `style` | text with styles | `Text.propTypes.style` |
| `linkColor` | highlight clickable text with color | `React.PropTypes.string` | default `blue(#0000EE)`
| `underLine` | highlight clickable text with underLine | `React.PropTypes.boolean` | default `true`
| `linkifyTel` | highlight telephone as a clickable text | `React.PropTypes.boolean` | default `false`
| `onPress` | func to handle click over a clickable text with parsed text as arg | `func` |
| `onLongPress` | func to handle long click over a clickable text with parsed text as arg | `func` |

## Examples
Wrap any component that has `<Text>` (works for [nested ](https://facebook.github.io/react-native/docs/text.html#nested-text) text too) in it

```javascript
import HyperText from 'react-native-hyper-text'

export const regularText = () =>
  <HyperText style={{fontSize:14}} onPress={ url => alert(url) }>
    This text will be parsed to check for clickable strings like https://github.com/imchintan/react-native-hyper-text and made clickable.
  </HyperText>

export const textWithoutUnderLine = () =>
  <HyperText style={{fontSize:14}} underLine={false} onPress={ url => alert(url) }>
    This text will be parsed to check for clickable strings like https://github.com/imchintan/react-native-hyper-text and made clickable.
  </HyperText>

export const textLinkifyTelePhone = () =>
  <HyperText style={{fontSize:14}} linkifyTel={true} onPress={ url => alert(url) }>
    This text will be parsed to check for clickable strings like https://github.com/imchintan/react-native-hyper-text or +123 512 (1234) and made clickable.
  </HyperText>

export const regularTextLongPress = () =>
  <HyperText onLongPress={ url => alert(url) }>
    <Text style={ { fontSize: 15 } }>
      This text will be parsed to check for clickable strings like https://github.com/imchintan/react-native-hyper-text and made clickable for long click.
    </Text>
  </HyperText>

export const nestedText = () =>
  <HyperText onPress={ url => alert(url) }>
    <View>
      <Text style={ { fontSize: 15 } }>
        A nested Text component https://facebook.github.io/react-native/docs/text.html works equally well <Text>with https://github.com/imchintan/react-native-hyper-text</Text>
      </Text>
    </View>
  </HyperText>

export const highlightText = () =>
  <HyperText linkColor='#2980b9'>    
      Make clickable strings like https://github.com/imchintan/react-native-hyper-text stylable
  </HyperText>

```

License
----
MIT License
