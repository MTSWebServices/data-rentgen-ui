export const BASE_NODE_HEIGHT = 120;
export const BASE_NODE_WIDTH = 800;
export const BASE_NODE_WIDTH_PER_CHAR = 25;

const getDefaultNode = () => {
    return {
        position: { x: 0, y: 0 },
        initialWidth: BASE_NODE_WIDTH,
        initialHeight: BASE_NODE_HEIGHT,
    };
};
export default getDefaultNode;
