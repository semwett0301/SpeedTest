import NetworkSettings from "./components/NetworkSettings/NetworkSettings";
import {presetGpnDefault, Theme} from "@consta/uikit/Theme";
import './App.scss'

function App() {
    return (
        <Theme preset={presetGpnDefault}>
            <div className={'app'}>
                <NetworkSettings/>
            </div>
        </Theme>
    );
}

export default App;
