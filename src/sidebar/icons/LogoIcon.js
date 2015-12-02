const React = require('react');
const PureRenderMixin = require('react-addons-pure-render-mixin');
const SvgIcon = require('material-ui/lib/svg-icon');

export default React.createClass({
    mixins: [PureRenderMixin],

    render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M 5.0526 13.8 L 15.3454 6.225 L 20.9112 12.5375 L 20.398 13.05 L 15.3454 8.425 L 7.5789 16.5125 L 5.0526 13.8 ZM 0 14.4312 C 0 18.2662 3.1104 21.375 6.9474 21.375 C 10.7843 21.375 13.8947 18.2662 13.8947 14.4312 C 13.8947 13.6796 13.7747 12.9566 13.5537 12.2787 C 14.0576 12.4471 14.5973 12.5375 15.1579 12.5375 C 15.5953 12.5375 16.0226 12.4841 16.4274 12.3797 L 16.4211 12.5375 C 16.4211 14.6293 18.1176 16.325 20.2105 16.325 C 22.3034 16.325 24 14.6293 24 12.5375 C 24 10.4457 22.3034 8.75 20.2105 8.75 L 20.0526 8.7563 C 20.1569 8.3517 20.2105 7.9246 20.2105 7.4875 C 20.2105 4.6984 17.9484 2.4375 15.1579 2.4375 C 12.3674 2.4375 10.1053 4.6984 10.1053 7.4875 C 10.1053 7.756 10.1281 8.0194 10.1684 8.2766 C 9.2061 7.7725 8.1092 7.4875 6.9474 7.4875 C 3.1104 7.4875 0 10.5963 0 14.4312 Z"/>
            </SvgIcon>
        );
    }
});
