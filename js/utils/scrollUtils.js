const scrollUtils = {
  nodeInViewport(node, offset = 0) {
    const nodeTopX = node.getBoundingClientRect().top;

    const intersectionX = nodeTopX - window.innerHeight - offset;

    return intersectionX <= 0;
  },
  nodeTouchesViewportTop(node, offset = 0) {
    const nodeTopX = node.getBoundingClientRect().top - offset;
    console.log(nodeTopX);
    debugger;

    return nodeTopX <= 0;
  },
  scrollToTop() {
    document.documentElement.scrollTop = 0;
  }
};

export default scrollUtils;
