import React, {useEffect, useState} from 'react'
import './test.scss'
import {Types} from '../../utils/types'
import {dia, shapes, ui} from '@clientio/rappid'

const Test: React.FC<Types.Comp> = () => {



    const [scaleFactor, setScaleFactor] = useState({x: 1, y: 1});
    const [paper, setPaper] = useState({
        scale: (x: number, y: number) => {}
    });

    useEffect(() => {

        const graph = new dia.Graph({}, {cellNamespace: shapes});

        const paper = new dia.Paper({
            el: document.getElementById('test'),
            model: graph,
            width: 600,
            height: 400,
            gridSize: 20,
            drawGrid: true,
            drawGridSize: 20,
            cellViewNamespace: shapes,
            background: {
                color: '#99ffdb'
            }
        });

        // @ts-ignore
        setPaper(paper);

        var rect = new shapes.standard.Rectangle();
        rect.position(100, 30);
        rect.resize(100, 40);
        rect.attr({
            body: {
                fill: '#c3acff'
            },
            label: {
                text: 'Hello',
                fill: 'white'
            }
        });

        rect.addTo(graph);


        const rect2 = rect.clone();
        // rect2.position(300, 30);
        rect2.translate(350, 0)
        rect2.attr('label/text', 'Hello again')

        rect2.addTo(graph);

        const link = new shapes.standard.Link();
        link.source(rect);
        link.target(rect2);

        link.addTo(graph)

    }, []);

    useEffect(() => {
        if (paper) {
            paper.scale(scaleFactor.x, scaleFactor.y)
        }
    }, [scaleFactor]);

    const upscale = () => {
        setScaleFactor({
            x: scaleFactor.x + .1,
            y: scaleFactor.y + .1,
        })
    };
    const downscale = () => {
        setScaleFactor({
            x: scaleFactor.x - .1,
            y: scaleFactor.y - .1,
        })
    };

    return <div className='test'>
        <div id="test"></div>
        <div className="" onClick={upscale}>+</div>
        <div className="" onClick={downscale}>-</div>
    </div>
};

export default Test;