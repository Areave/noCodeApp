import React, {useEffect, useRef} from 'react'
import './mi.scss'
import {
    dia,
    shapes,
    util,
    linkTools,
    elementTools,
    connectionStrategies
} from '@clientio/rappid'
import {COLORS, MARGIN, NAME_HEIGHT, RADIUS, TYPE_HEIGHT, UNIT} from './const'
import {orthogonalRouter} from "./orthogonalRouter";
import data from "./data";
import {createLabels, getAbsoluteAnchor, getPackagePort, getTextAnchor, snapAnchorToGrid, updateLabelsTextAnchor} from "./getPackagePort";

const Mi: React.FC<any> = () => {

    useEffect(() => {

        const shapeNamespace = { ...shapes };

        const graph = new dia.Graph({}, { cellNamespace: shapeNamespace });
        const paper = new dia.Paper({
            model: graph,
            cellViewNamespace: shapeNamespace,
            width: "100%",
            height: "100%",
            gridSize: UNIT,
            drawGrid: { name: "mesh", color: COLORS.grid },
            async: true,
            sorting: dia.Paper.sorting.APPROX,
            defaultConnectionPoint: {
                name: "boundary",
                args: {
                    offset: 2
                }
            },
            defaultConnector: {
                name: "rounded",
                args: { radius: RADIUS }
            },
            background: {
                color: COLORS.background
            },
            labelsLayer: true,
            defaultRouter: orthogonalRouter,
            clickThreshold: 10,
            moveThreshold: 10
        });




        // -- Shape definitions

        class UMLLink extends shapes.standard.Link {
            defaults() {
                return util.defaultsDeep(
                    {
                        type: "UMLLink",
                        attrs: {
                            root: {
                                pointerEvents: "none"
                            },
                            line: {
                                // @ts-ignore
                                stroke: COLORS.outlineColor,
                                targetMarker: {
                                    type: "path",
                                    fill: "none",
                                    // @ts-ignore
                                    stroke: COLORS.outlineColor,
                                    "stroke-width": 2,
                                    d: "M 7 -4 0 0 7 4"
                                }
                            }
                        }
                    },
                    super.defaults
                );
            }
        }

        class Aggregation extends UMLLink {
            defaults() {
                return util.defaultsDeep(
                    {
                        type: "Aggregation",
                        attrs: {
                            line: {
                                sourceMarker: {
                                    type: "path",
                                    fill: COLORS.background,
                                    "stroke-width": 2,
                                    d: "M 10 -4 0 0 10 4 20 0 z"
                                }
                            }
                        }
                    },
                    super.defaults()
                );
            }
        }

        class Composition extends UMLLink {
            defaults() {
                return util.defaultsDeep(
                    {
                        type: "Composition",
                        attrs: {
                            line: {
                                sourceMarker: {
                                    type: "path",
                                    fill: COLORS.outline,
                                    "stroke-width": 2,
                                    d: "M 10 -4 0 0 10 4 20 0 z"
                                }
                            }
                        }
                    },
                    super.defaults()
                );
            }
        }

        class UML extends shapes.standard.Record {
            defaults() {
                return util.defaultsDeep(
                    {
                        thickness: 2,
                        headerColor: COLORS.header,
                        textColor: COLORS.text,
                        outlineColor: COLORS.outline,
                        color: COLORS.main,
                        itemHeight: 2 * UNIT,
                        itemOffset: 5,
                        umlName: "",
                        umlType: "",
                        attrs: {
                            root: {
                                magnetSelector: "body"
                            },
                            body: {
                                width: "calc(w)",
                                height: "calc(h)",
                                stroke: "#000000",
                                fill: "#FFFFFF",
                                rx: RADIUS,
                                ry: RADIUS
                            },
                            header: {
                                width: "calc(w)",
                                stroke: "#000000",
                                fill: "transparent"
                            },
                            typeNameLabel: {
                                x: "calc(0.5 * w)",
                                height: "calc(h)",
                                textAnchor: "middle",
                                textVerticalAnchor: "middle",
                                fontSize: 14,
                                fill: "none",
                                fontFamily: "sans-serif"
                            },
                            umlNameLabel: {
                                x: "calc(0.5 * w)",
                                fontFamily: "sans-serif",
                                textAnchor: "middle",
                                textVerticalAnchor: "middle",
                                fontSize: 18,
                                fontWeight: "bold",
                                // @ts-ignore
                                fill: COLORS.textColor
                            },
                            itemLabel_attributesHeader: {
                                fontFamily: "sans-serif",
                                fontStyle: "italic",
                                textAnchor: "middle",
                                x: "calc(0.5 * w)",
                                fontSize: 12
                            },
                            itemLabel_operationsHeader: {
                                fontFamily: "sans-serif",
                                fontStyle: "italic",
                                textAnchor: "middle",
                                x: "calc(0.5 * w)",
                                fontSize: 12
                            },
                            itemLabels_static: {
                                textDecoration: "underline"
                            },
                            itemLabels: {
                                fontFamily: "sans-serif"
                            }
                        }
                    },
                    super.defaults
                );
            }

            preinitialize(...args: any[]) {
                super.preinitialize(...args);
                this.markup = [
                    {
                        tagName: "rect",
                        selector: "body"
                    },
                    {
                        tagName: "rect",
                        selector: "header"
                    },
                    {
                        tagName: "text",
                        selector: "umlNameLabel"
                    },
                    {
                        tagName: "text",
                        selector: "typeNameLabel"
                    }
                ];
            }

            buildHeader() {
                const {
                    umlType,
                    umlName,
                    textColor,
                    outlineColor,
                    headerColor,
                    thickness
                } = this.attributes;

                return {
                    header: {
                        stroke: outlineColor,
                        strokeWidth: thickness,
                        height: TYPE_HEIGHT + NAME_HEIGHT,
                        fill: headerColor
                    },
                    typeNameLabel: {
                        y: TYPE_HEIGHT,
                        text: `<<${umlType}>>`,
                        fill: textColor,
                        textVerticalAnchor: "bottom"
                    },
                    umlNameLabel: {
                        y: TYPE_HEIGHT + NAME_HEIGHT / 2,
                        text: umlName,
                        fill: textColor
                    }
                };
            }
        }

        class UMLComponent extends UML {
            defaults() {

                return {
                    ...super.defaults(),
                    type: "UMLComponent",
                    // @ts-ignore
                    subComponents: [],
                    ports: {
                        groups: {
                            subComponents: {
                                position: {
                                    name: "bottom"
                                }
                            }
                        }
                    }
                };
            }

            initialize(...args: any[]) {
                super.initialize(...args);
                this.buildShape();
            }

            buildShape(opt = {}) {
                const {
                    subComponents,
                    outlineColor,
                    thickness,
                    color,
                    textColor
                } = this.attributes;

                this.removePorts();

                if (subComponents.length > 0) {
                    subComponents.forEach((subComponent: any) => {
                        const { name, type, subheader } = subComponent;
                        this.addPort(
                            getPackagePort(name, type, subheader, color, outlineColor, thickness)
                        );
                    });
                }

                const headerAttrs = this.buildHeader();
                const padding = util.normalizeSides(this.get("padding"));

                // @ts-ignore
                this.set(
                    {
                        padding: { ...padding, top: TYPE_HEIGHT + NAME_HEIGHT },
                        attrs: util.defaultsDeep(
                            {
                                body: {
                                    stroke: outlineColor,
                                    strokeWidth: thickness,
                                    fill: color
                                },
                                ...headerAttrs,
                                itemLabels: {
                                    fill: textColor
                                },
                                itemBody_delimiter: {
                                    fill: outlineColor
                                }
                            },
                            this.attr()
                        )
                    },
                    opt
                );
            }
        }
        class UMLClass extends UML {
            defaults() {
                return {
                    ...super.defaults(),
                    type: "UMLClass",
                    attributesHeader: "",
                    operationsHeader: ""
                };
            }

            initialize(...args: any[]) {
                super.initialize(...args);
                this.buildItems();
            }

            buildItems(opt = {}) {
                const {
                    attributesHeader,
                    operationsHeader,
                    color,
                    outlineColor,
                    textColor,
                    attributes = [],
                    operations = [],
                    thickness
                } = this.attributes;

                const attributesItems = attributes.map((attribute: any, index: any) => {
                    const {
                        visibility = "+",
                        name = "",
                        type = "",
                        isStatic = false
                    } = attribute;
                    return {
                        id: `attribute${index}`,
                        label: `${name}: ${type}`,
                        icon: this.getVisibilityIcon(visibility, textColor),
                        group: isStatic ? "static" : null
                    };
                });

                const operationsItems = operations.map((operation: any, index: any) => {
                    const {
                        visibility = "+",
                        name = "",
                        returnType = "",
                        parameters = [],
                        isStatic = false
                    } = operation;

                    const nameParams = parameters
                        ? parameters.map((parameter: any) => {
                            const { name = "", returnType = "" } = parameter;
                            return `${name}: ${returnType}`;
                        })
                        : [];

                    return {
                        id: `operation${index}`,
                        label: `${name}(${nameParams.join(",")}): ${returnType}`,
                        icon: this.getVisibilityIcon(visibility, textColor),
                        group: isStatic ? "static" : null
                    };
                });

                const items = [];

                if (attributesHeader) {
                    items.push({
                        id: "attributesHeader",
                        label: attributesHeader
                    });
                }

                items.push(...attributesItems);

                if (attributesItems.length > 0 && operationsItems.length > 0) {
                    items.push({
                        id: "delimiter",
                        height: thickness,
                        label: ""
                    });
                }

                if (operationsHeader) {
                    items.push({
                        id: "operationsHeader",
                        label: operationsHeader
                    });
                }

                items.push(...operationsItems);

                const headerAttrs = this.buildHeader();
                const padding = util.normalizeSides(this.get("padding"));

                // @ts-ignore
                this.set(
                    {
                        padding: { ...padding, top: TYPE_HEIGHT + NAME_HEIGHT },
                        attrs: util.defaultsDeep(
                            {
                                body: {
                                    stroke: outlineColor,
                                    strokeWidth: thickness,
                                    fill: color
                                },
                                ...headerAttrs,
                                itemLabels: {
                                    fill: textColor
                                },
                                itemBody_delimiter: {
                                    fill: outlineColor
                                }
                            },
                            this.attr()
                        ),
                        items: [items]
                    },
                    opt
                );
            }

            getVisibilityIcon(visibility: any, color: any) {
                // @ts-ignore
                const d = {
                    "+": "M 8 0 V 16 M 0 8 H 16",
                    "-": "M 0 8 H 16",
                    "#": "M 5 0 3 16 M 0 5 H 16 M 12 0 10 16 M 0 11 H 16",
                    "~": "M 0 8 A 4 4 1 1 1 8 8 A 4 4 1 1 0 16 8",
                    "/": "M 12 0 L 4 16"
                }[visibility];
                return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg
                xmlns='http://www.w3.org/2000/svg'
                xmlns:xlink='http://www.w3.org/1999/xlink'
                version='1.1'
                viewBox='-3 -3 22 22'
            >
                <path d='${d}' stroke='${color}' stroke-width='2' fill='none'/>
            </svg>`)}`;
            }
        }


        // Enable UML elements and links to be recreated from JSON
// Test: graph.fromJSON(graph.toJSON())
        Object.assign(shapeNamespace, {
            UMLClass,
            UMLComponent,
            Composition,
            Aggregation
        });

// -- Instantiating UML elements and links

        const storeCells = {};
        // @ts-ignore
        const storeLinks = [];
        data.forEach((item, i)=>{
            // @ts-ignore
            storeCells[item.id] = new UMLClass({
                size: { width: 220 , height: 30},
                position: { x: Math.round(i/5) * 180, y: i%5 * 300 },
                padding: { bottom: 2 * MARGIN },
                ...item.data});
        });

        data.forEach((item, i)=>{
            if (!item.master_id) return;
            storeLinks.push(
                new Aggregation({
                    // @ts-ignore
                    source: { id: storeCells[item.id].id },
                    // @ts-ignore
                    target: { id: storeCells[item.master_id].id, anchor: { name: "right" } },
                    labels: createLabels([
                        {
                            type: "label-target",
                            content: "seed"
                        },
                        {
                            type: "multiplicity-target",
                            content: "1..*"
                        }
                    ])
                }));
        });


        graph.addCells([
            ...Object.entries(storeCells).map(([_,d])=>d),
            // @ts-ignore
            ...storeLinks
        ]);

        graph.getLinks().forEach((link) => updateLabelsTextAnchor(link));


        // -- Tools

        class TargetAnchorWithLabels extends linkTools.TargetAnchor {
            updateAnchor() {
                updateLabelsTextAnchor(this.relatedView.model);
            }
        }

        class SourceAnchorWithLabels extends linkTools.SourceAnchor {
            updateAnchor() {
                updateLabelsTextAnchor(this.relatedView.model);
            }
        }

// Update the link labels position based on the anchor position name stored in
// the link's source/target anchor property.
// This way the link views do not need to be rendered to get the anchor position.
        function updateLabelsTextAnchor(link: any) {
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

// -- Event handlers

        paper.on("element:pointerclick", (elementView) => {
            paper.removeTools();
            const element = elementView.model;
            const toolsView = new dia.ToolsView({
                tools: [
                    new elementTools.Boundary({
                        attributes: {
                            rx: RADIUS,
                            ry: RADIUS,
                            fill: "none",
                            stroke: COLORS.outline,
                            "stroke-dasharray": "6,2",
                            "stroke-width": 1,
                            "pointer-events": "none"
                        }
                    })
                ]
            });
            elementView.addTools(toolsView);
            const customAnchorAttributes = {
                "stroke-width": 2,
                fill: COLORS.tools,
                stroke: COLORS.outline,
                r: 6
            };
            graph.getConnectedLinks(element).forEach((link) => {
                const tools = [];
                if (link.source().id === element.id) {
                    tools.push(
                        new SourceAnchorWithLabels({
                            snap: snapAnchorToGrid,
                            anchor: getAbsoluteAnchor,
                            resetAnchor: false,
                            // Hide the area where the anchor can be moved.
                            // We already restrict the movement to the element's boundary with snapAnchor().
                            restrictArea: false,
                            customAnchorAttributes
                        })
                    );
                }
                if (link.target().id === element.id) {
                    tools.push(
                        new TargetAnchorWithLabels({
                            snap: snapAnchorToGrid,
                            anchor: getAbsoluteAnchor,
                            resetAnchor: false,
                            // See `SourceAnchorWithLabels` above.
                            restrictArea: false,
                            customAnchorAttributes
                        })
                    );
                }
                const linkView = paper.findViewByModel(link);
                const toolsView = new dia.ToolsView({ tools });
                linkView.addTools(toolsView);
            });
        });

        paper.on("blank:pointerdown", () => {
            paper.removeTools();
        });

        function scaleToFit() {
            const graphBBox = graph.getBBox();
            paper.scaleContentToFit({
                padding: 50,
                contentArea: graphBBox
            });
            const { sy } = paper.scale();
            const area = paper.getArea();
            const yTop = area.height / 2 - graphBBox.y - graphBBox.height / 2;
            const xLeft = area.width / 2 - graphBBox.x - graphBBox.width / 2;
            paper.translate(xLeft * sy, yTop * sy);
        }


        window.addEventListener("resize", () => scaleToFit());
        // scaleToFit();


        const pc = document.getElementById("paper-container");
        pc.appendChild(paper.el);

        scaleToFit();

        return () => {
            // scroller.remove();
            paper.remove();
        };


    }, []);

    return <div className='mishino'>
        <div id="paper-container"></div>
    </div>
};

export default Mi;