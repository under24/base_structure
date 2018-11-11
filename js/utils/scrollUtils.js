const scrollUtils = {
  nodeInViewport(node, offset = 0) {
    const nodeTopX = node.getBoundingClientRect().top;

    const intersectionX = nodeTopX - window.innerHeight - offset;

    return intersectionX <= 0;
  }
};

export default scrollUtils;
