const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('material-ui/lib/svg-icon');

export default React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M 14 3 L 23 3 L 23 20 L 14 20 L 14 17 L 21 17 L 21 16 L 14 16 L 14 15 L 21 15 L 21 14 L 14 14 L 14 13 L 21 13 L 21 12 L 14 12 L 14 11 L 21 11 L 21 10 L 14 10 L 14 9 L 21 9 L 21 8 L 14 8 L 14 7 L 21 7 L 21 6 L 14 6 L 14 3 ZM 6 7 L 8 7 L 9 13 L 10 7 L 12 7 L 10 15 L 8 15 L 7 10 L 6 15 L 4 15 L 2 7 L 4 7 L 5 13 L 6 7 ZM 12 0 L 0 2 L 0 21 L 12 23 L 14 23 L 14 21 L 24 21 L 24 2 L 14 2 L 14 0 L 12 0 Z" fill="#2a5699"/>
            </SvgIcon>
        );
    }
});
