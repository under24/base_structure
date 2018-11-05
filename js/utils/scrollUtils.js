const scrollUtils = {
  nodeInViewport(node, offset = 0) {
    const nodeTopX = node.getBoundingClientRect().top;
    const screenBottomX = window.innerHeight + window.pageXOffset;

    const intersectionX = nodeTopX - screenBottomX - offset;

    return intersectionX <= 0;
  }
};

export default scrollUtils;
