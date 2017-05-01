import React, {Component} from 'react';
import { Linking, Alert, Text } from 'react-native';
import computeProps from './lib/computeProps';
import _ from 'lodash';

const urlRegex =/(\b((http(s)?|ftp|file):\/\/.)?(www\.)?[-a-zA-Z0-9@%_\+~#=]{2,256}(\.[a-z]{2,6})+(?:\/[\+~%\/.\w-_]*)?(\?(?:[-\+=&;%@.\w_]*)?)?#?(?:[\w]*))/ig;
const telRegex =/([0-9+\(]{1}[0-9 +\(\)]{4,}[0-9)]{1})+/ig;

export default class HyperText extends Component {

    propTypes: {
        style : Text.PropTypes.object,
        linkColor : React.PropTypes.string,
        underLine : React.PropTypes.boolean,
        linkifyTel : React.PropTypes.boolean,
        onPress : React.PropTypes.func,
        onLongPress : React.PropTypes.func,
    }

    prepareRootProps() {
        let defaultProps = {};
        let props = this.props;

        if(props.onPress) delete props.onPress;
        if(props.onLongPress) delete props.onLongPress;
        if(props.linkColor) delete props.linkColor;
        if(props.underLine) delete props.underLine;
        if(props.linkifyTel) delete props.linkifyTel;

        return computeProps(props, defaultProps);

    }

    _handleClick(url){
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            if(url.substring(0,4) == "tel:"){
                // Works on both iOS and Android
                Alert.alert(
                    '',
                    'Carrier charges may apply.\nCalls are placed through your mobile carrier, not over the Internet.',
                    [
                        {text: 'Cancel'},
                        {text: 'Call', onPress: () => Linking.openURL(url)},
                    ]
                );
            }else{
                Linking.openURL(url);
            }
          } else {
            console.log('Don\'t know how to open URI: ' + url);
          }
        });
     };

     _getHyperTextStyle(){
         return {
             color: this.props.linkColor?this.props.linkColor:'#00E',
             textDecorationLine: (this.props.underLine === false)?'none':'underline',
         }
     }

    _linkifyTel(text,n){
        let resChildren = [], _text = text+"$", a = '',i=0;
        text.replace(telRegex,(tel) => {
            [a,_text] = _text.split(new RegExp(tel.replace(/([+\(\)])/g,(a)=>("\\"+a))+'(.+)'),2);
            if(a)resChildren.push(a.replace(/\\r\\n/g, "\r\n").replace(/\\\\/g,'\\'));
            resChildren.push(<Text allowFontScaling={false} key={+n+"_"+(i++)}
                style={this._getHyperTextStyle()}
                onPress={()=>this.props.onPress?this.props.onPress(tel):this._handleClick("tel:"+tel)}
                onLongPress={() => this.props.onLongPress && this.props.onLongPress(tel)}>
                {tel}</Text>);
        });
        _text = _text.substring(-1,_text.length-1);
        if(_text)resChildren.push(_text.replace(/\\r\\n/g, "\r\n").replace(/\\\\/g,'\\'));
        return resChildren;
    }

    _linkify(text,n){
        text = text.replace(/\\/g,'\\\\').replace(/\r?\n/g, "\\r\\n");
        let resChildren = [], _text = text+"$", a = '',i=0;
        text.replace(urlRegex,(url) => {
            [a,_text] = _text.split(new RegExp(url+'(.+)'),2);
            if(a){
                if(this.props.linkifyTel)
                    resChildren=resChildren.concat(this._linkifyTel(a,"_ht_"+n+"_"+i));
                else
                    resChildren=resChildren.concat(a);
            }
            let _url = url;
            if(url.toLowerCase().substring(0,4) != "http"){
                _url = "http://"+url;
            }
            resChildren.push(<Text allowFontScaling={false} key={"_ht_"+n+"_"+(i++)}
                style={this._getHyperTextStyle()}
                onPress={()=>this.props.onPress?this.props.onPress(_url):this._handleClick(_url)}
                onLongPress={() => this.props.onLongPress && this.props.onLongPress(_url)}>
                {url}</Text>);
        });
        _text = _text.substring(-1,_text.length-1);
        if(_text){
            if(this.props.linkifyTel)
                resChildren=resChildren.concat(this._linkifyTel(_text,"_ht_"+n+"_"+i));
            else
                resChildren=resChildren.concat(_text);
        }
        return resChildren;
    }

    renderChildren() {
        let n=1;
        if(typeof this.props.children == 'string') {
			return this._linkify(this.props.children,n);
		}else if(Array.isArray(this.props.children)) {
			var newChildren = [];
			React.Children.forEach(this.props.children, (child) => {
                n++;
				if(typeof child == 'string') {
					newChildren.push(this._linkify(child,n));
				}else{
					newChildren.push(child);
				}
	        });
			return newChildren;
		}else{
            return this.props.children;
        }
    }

    render() {
        return(
            <Text allowFontScaling={false} {...this.prepareRootProps()} >
                {this.renderChildren()}
            </Text>
        );
    }
}
