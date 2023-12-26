import {COLORS, NAME_HEIGHT, RADIUS, TYPE_HEIGHT, UNIT} from "./const";
import {getPackagePort} from "./getPackagePort";
import {shapes, util} from '@clientio/rappid'

export class UMLLink extends shapes.standard.Link {
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

export class Aggregation extends UMLLink {
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

export class Composition extends UMLLink {
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

export class UML extends shapes.standard.Record {
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

export class UMLComponent extends UML {
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

export class UMLClass extends UML {
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