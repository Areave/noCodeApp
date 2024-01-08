import React, {useEffect, useRef} from 'react'
import './mi.scss'
import {
    dia,
    shapes,
    util,
    ui,
    linkTools,
    elementTools,
    connectionStrategies
} from '@clientio/rappid'
import {COLORS, MARGIN, NAME_HEIGHT, RADIUS, TYPE_HEIGHT, UNIT} from './const'
import {orthogonalRouter} from "./orthogonalRouter";
import data, {storeCells, storeLinks} from "./data";
import {createLabels, getAbsoluteAnchor, getPackagePort, getTextAnchor, snapAnchorToGrid, updateLabelsTextAnchor} from "./getPackagePort";
import {Aggregation, Composition, UMLClass, UMLComponent} from "./classes";

const Mi: React.FC<any> = () => {

    const canvas: any = useRef(null);

    useEffect(() => {

        const shapeNamespace = { ...shapes};

        const graph = new dia.Graph({}, { cellNamespace: shapeNamespace });
        const paper = new dia.Paper({
            model: graph,
            cellViewNamespace: shapeNamespace,
            width: 600,
            height: 700,
            // width: '100%',
            // height: '100%',
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

        const scroller = new ui.PaperScroller({
            paper,
            cursor: 'grab',
            baseWidth: 100,
            baseHeight: 100,
            inertia: { friction: 0.8 },
            autoResizePaper: true,
            contentOptions: function() {
                return {
                    useModelGeometry: true,
                    allowNewOrigin: 'any',
                    padding: 40,
                    allowNegativeBottomRight: true
                };
            }
        });
        //
        //
        // // document.getElementsByClassName("mishino")[0].appendChild(scroller.el);
        // document.getElementById("paper-container").appendChild(scroller.el);
        // scroller.render().center();

        // const graph = new dia.Graph({}, { cellNamespace: shapes });
        //
        // const paper = new dia.Paper({
        //     model: graph,
        //     width: 1000,
        //     height: 800,
        //     gridSize: 20,
        //     background: {
        //         color: '#F8F9FA',
        //     },
        //     frozen: true,
        //     async: true,
        //     sorting: dia.Paper.sorting.APPROX,
        //     cellViewNamespace: shapes
        // });
        //
        // const scroller = new ui.PaperScroller({
        //     paper,
        //     cursor: 'grab',
        //     autoResizePaper: false,
        //     baseWidth: 300,
        //     baseHeight: 100,
        //     inertia: { friction: 0.9 },
        //     contentOptions: function() {
        //         return {
        //             useModelGeometry: true,
        //             allowNewOrigin: 'any',
        //             padding: 20,
        //             allowNegativeBottomRight: true
        //         };
        //     }
        // });

        canvas.current.appendChild(scroller.el);
        scroller.render().center();

        // const rect = new shapes.standard.Rectangle({
        //     position: { x: 100, y: 100 },
        //     size: { width: 100, height: 50 },
        //     attrs: {
        //         label: {
        //             text: 'Hello World'
        //         }
        //     }
        // });
        // graph.addCell(rect);

        // paper.unfreeze();


        // Enable UML elements and links to be recreated from JSON
// Test: graph.fromJSON(graph.toJSON())
        Object.assign(shapeNamespace, {
            UMLClass,
            UMLComponent,
            Composition,
            Aggregation
        });

        console.log(storeCells);
        console.log(storeLinks);
        graph.addCells([
            ...Object.values(storeCells),
            ...storeLinks
        ]);

        // graph.getLinks().forEach((link) => updateLabelsTextAnchor(link));


        // -- Tools

        // class TargetAnchorWithLabels extends linkTools.TargetAnchor {
        //     updateAnchor() {
        //         updateLabelsTextAnchor(this.relatedView.model);
        //     }
        // }
        //
        // class SourceAnchorWithLabels extends linkTools.SourceAnchor {
        //     updateAnchor() {
        //         updateLabelsTextAnchor(this.relatedView.model);
        //     }
        // }



// -- Event handlers

        // paper.on("element:pointerclick", (elementView) => {
        //     console.log(elementView);
        //     paper.removeTools();
        //     const element = elementView.model;
        //     const toolsView = new dia.ToolsView({
        //         tools: [
        //             new elementTools.Boundary({
        //                 attributes: {
        //                     rx: RADIUS,
        //                     ry: RADIUS,
        //                     fill: "none",
        //                     stroke: COLORS.outline,
        //                     "stroke-dasharray": "6,2",
        //                     "stroke-width": 1,
        //                     "pointer-events": "none"
        //                 }
        //             })
        //         ]
        //     });
        //     elementView.addTools(toolsView);
        //     const customAnchorAttributes = {
        //         "stroke-width": 2,
        //         fill: COLORS.tools,
        //         stroke: COLORS.outline,
        //         r: 6
        //     };
        //     graph.getConnectedLinks(element).forEach((link) => {
        //         const tools = [];
        //         if (link.source().id === element.id) {
        //             tools.push(
        //                 new SourceAnchorWithLabels({
        //                     snap: snapAnchorToGrid,
        //                     anchor: getAbsoluteAnchor,
        //                     resetAnchor: false,
        //                     // Hide the area where the anchor can be moved.
        //                     // We already restrict the movement to the element's boundary with snapAnchor().
        //                     restrictArea: false,
        //                     customAnchorAttributes
        //                 })
        //             );
        //         }
        //         if (link.target().id === element.id) {
        //             tools.push(
        //                 new TargetAnchorWithLabels({
        //                     snap: snapAnchorToGrid,
        //                     anchor: getAbsoluteAnchor,
        //                     resetAnchor: false,
        //                     // See `SourceAnchorWithLabels` above.
        //                     restrictArea: false,
        //                     customAnchorAttributes
        //                 })
        //             );
        //         }
        //         const linkView = paper.findViewByModel(link);
        //         const toolsView = new dia.ToolsView({ tools });
        //         linkView.addTools(toolsView);
        //     });
        // });
        //
        // paper.on("blank:pointerdown", () => {
        //     paper.removeTools();
        // });

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
        // window.addEventListener("resize", () => scaleToFit());

        // scaleToFit();

        // document.getElementById("paper-container").appendChild(paper.el);



        return () => {
            scroller.remove();
            paper.remove();
        };


    }, []);

    return <div className='mishino'>
        <div id="stencil-container"/>
        <div id="paper-container" ref={canvas}/>
        <div id="inspector-container"/>
    </div>
};

export default Mi;