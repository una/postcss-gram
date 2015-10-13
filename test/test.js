var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};

describe('postcss-gram', function () {

    it('converts filter into provided properties', () => {
        check(
            `div {
                instafilter: aden;
            }`,
            `div {
              position: relative;
              -webkit-filter: hue-rotate(-20deg) contrast(.9) saturate(85%) brightness(1.2);
              filter: hue-rotate(-20deg) contrast(.9) saturate(85%) brightness(1.2); }
            div:after {
                content: '';
                display: block;
                height: 100%;
                width: 100%;
                top: 0;
                left: 0;
                position: absolute;
                background: -webkit-linear-gradient(left, rgba(66, 10, 14, 0.2), transparent);
                background: linear-gradient(to right, rgba(66, 10, 14, 0.2), transparent);
                mix-blend-mode: darken;}`
        );
    });

});
