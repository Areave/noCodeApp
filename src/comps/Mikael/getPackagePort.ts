import {
    util,
    connectionStrategies
} from '@clientio/rappid'
import {COLORS, MARGIN, UNIT} from './const'

export function snapAnchorToGrid(coords: any, endView: any) {
    coords.snapToGrid(UNIT);
    const bbox = endView.model.getBBox();
    // Find the closest point on the bbox border.
    return bbox.pointNearestToPoint(coords);
}

export function getAbsoluteAnchor(coords: any, view: any, magnet: any) {
    // Calculate the anchor offset from the magnet's top-left corner.
    // @ts-ignore
    return connectionStrategies.pinAbsolute({}, view, magnet, coords).anchor;
}

export function getPackagePort(name: any, type: any, subheader: any, color: any, outlineColor: any, thickness: any) {
    return {
        group: "subComponents",
        label: {
            position: {
                name: "bottom"
            },
            markup: [
                {
                    tagName: "text",
                    selector: "name"
                },
                {
                    tagName: "text",
                    selector: "subheader"
                }
            ]
        },
        attrs: {
            body: {
                width: 24,
                height: 24,
                x: -12,
                y: -6,
                stroke: outlineColor,
                fill: color,
                strokeWidth: thickness
            },
            name: {
                text: `${name}: ${type}`,
                // @ts-ignore
                fill: COLORS.textColor,
                y: 16,
                fontSize: 12,
                fontFamily: "sans-serif"
            },
            subheader: {
                text: `${subheader}`,
                // @ts-ignore
                fill: COLORS.textColor,
                y: 28,
                fontSize: 12,
                fontFamily: "sans-serif"
            }
        },
        markup: [
            {
                tagName: "rect",
                selector: "body"
            }
        ]
    };
}

export function getTextAnchor(side: any) {
    return side === "left" || side === "bottom" ? "end" : "start";
}

export function createLabels(comments: any) {
    return comments.map((comment: any) => {
        const { type, content } = comment;

        const [commentType, position] = type.split("-");

        const isSource = position === "source";
        const isLabel = commentType === "label";

        return {
            attrs: {
                text: {
                    text: content,
                    fontSize: 12,
                    fill: COLORS.text,
                    fontFamily: "sans-serif",
                    textVerticalAnchor: "middle",
                    pointerEvents: "none"
                    // textAnchor is set in `updateLabelsTextAnchor()`
                },
                rect: {
                    fill: COLORS.background
                }
            },
            position: {
                distance: isSource ? MARGIN : -MARGIN,
                offset: UNIT * (isLabel ? 1 : -1),
                args: {
                    keepGradient: true,
                    ensureLegibility: true
                }
            }
        };
    });}


export function updateLabelsTextAnchor(link: any) {
    const labels = util.cloneDeep(link.labels()).map((label: any) => {
        let anchorDef, element;
        if (label.position.distance < 0) {
            element = link.getTargetCell();
            anchorDef = link.target().anchor;
        } else {
            element = link.getSourceCell();
            anchorDef = link.source().anchor;
        }
        const bbox = element.getBBox();
        const { name = "topLeft", args = {} } = anchorDef;
        const anchorName = util.toKebabCase(name);
        const anchorOffset = { x: args.dx, y: args.dy };
        const anchor = util
            // @ts-ignore
            .getRectPoint(bbox, anchorName)
            .offset(anchorOffset);
        label.attrs.text.textAnchor = getTextAnchor(
            bbox.sideNearestToPoint(anchor)
        );
        return label;
    });
    link.labels(labels);
}