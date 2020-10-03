import React from 'react'
import PropTypes from 'prop-types'

// IMPORTANT! This component should ONLY be used as a child of an <path> element in an SVG wrapper
const SvgPathAnimation = props => {
  const {
    duration,
    coordinatesStart,
    coordinatesEnd,
    repeatCount = "indefinite",
    isEaseInOut = true
  } = props;

  const keyframeOrder = [coordinatesStart, coordinatesEnd, coordinatesStart];

  const attributes = {
    attributeName: "d",
    dur: `${duration}ms`,
    repeatCount,
    from: coordinatesStart,
    to: coordinatesEnd,
    begin: "0s",
    values: keyframeOrder.join(';')
  }

  if (isEaseInOut) {
    const cubicBezierValues = '0.25, 0.1, 0.25, 1';
    attributes.calcMode = 'spline';
    attributes.keySplines = new Array(keyframeOrder.length - 1).fill(cubicBezierValues).join(';');
  }

  return <animate {...attributes} />;
}

SvgPathAnimation.propTypes = {
  duration: PropTypes.number.isRequired,
  coordinatesStart: PropTypes.string.isRequired,
  coordinatesEnd: PropTypes.string.isRequired,
  repeatCount: PropTypes.oneOf([
    PropTypes.oneOf(['indefinite']),
    PropTypes.number,
  ]),
  isEaseInOut: PropTypes.bool,
}

export default SvgPathAnimation
