import React, {useEffect, useRef} from 'react'
import './application.scss'
import {dia, shapes, ui} from '@clientio/rappid'
import {StencilService} from './services/stencil-service';
import {ToolbarService} from './services/toolbar-service';
import {InspectorService} from './services/inspector-service';
import {HaloService} from './services/halo-service';
import {KeyboardService} from './services/keyboard-service';
import RappidService from './services/kitchensink-service';

import {ThemePicker} from './components/theme-picker';
import {sampleGraphs} from './config/sample-graphs';

const Application: React.FC<any> = () => {

    // const canvas: any = useRef(null);

    const elementRef = React.createRef<HTMLDivElement>();

    useEffect(() => {

        const rappid = new RappidService(
            elementRef.current,
            new StencilService(),
            new ToolbarService(),
            new InspectorService(),
            new HaloService(),
            new KeyboardService()
        );

        rappid.startRappid();

        const themePicker = new ThemePicker({ mainView: rappid });
        themePicker.render().$el.appendTo(document.body);

        rappid.graph.fromJSON(JSON.parse(sampleGraphs.emergencyProcedure));

    }, []);


    // return <div className='demo-graph'>
    //     <div className="canvas" ref={canvas}/>
    // </div>

    return <div ref={elementRef} className="joint-app joint-theme-modern">
        <div className="app-header">
            <div className="app-title">
                <h1>JointJS+</h1>
            </div>
            <div className="toolbar-container"/>
        </div>
        <div className="app-body">
            <div className="stencil-container"/>
            <div className="paper-container"/>
            <div className="inspector-container"/>
            <div className="navigator-container"/>
        </div>
    </div>
};

export default Application;