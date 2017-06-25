import * as React from 'react';
import {render} from "react-dom";
import SwitchBgParent from "./switch";

export default function (rootEle:HTMLElement) {
    render(
        <SwitchBgParent/>,
        rootEle
    )
}