import React, {useEffect, useRef} from 'react'
import './demoGraph.scss'
import {dia, shapes, ui} from '@clientio/rappid'

const DemoGraph: React.FC<any> = () => {

    const canvas: any = useRef(null);

    useEffect(() => {

        const graph = new dia.Graph({}, { cellNamespace: shapes });

        const paper = new dia.Paper({
            model: graph,
            width: 1000,
            height: 800,
            gridSize: 20,
            background: {
                color: '#F8F9FA',
            },
            frozen: true,
            async: true,
            sorting: dia.Paper.sorting.APPROX,
            cellViewNamespace: shapes
        });

        const scroller = new ui.PaperScroller({
            paper,
            cursor: 'grab',
            autoResizePaper: false,
            baseWidth: 300,
            baseHeight: 100,
            inertia: { friction: 0.9 },
            contentOptions: function() {
                return {
                    useModelGeometry: true,
                    allowNewOrigin: 'any',
                    padding: 20,
                    allowNegativeBottomRight: true
                };
            }
        });

        canvas.current.appendChild(scroller.el);
        scroller.render().center();

        const rect = new shapes.standard.Rectangle({
            position: { x: 100, y: 100 },
            size: { width: 100, height: 50 },
            attrs: {
                label: {
                    text: 'Hello World'
                }
            }
        });
        graph.addCell(rect);
        paper.unfreeze();

        return () => {
            scroller.remove();
            paper.remove();
        };


    }, []);


    return <div className='demo-graph'>
        <div className="canvas" ref={canvas}/>
    </div>
};

export default DemoGraph;