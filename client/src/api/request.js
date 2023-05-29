import ip from "./modules/ip";
import {networkInstance} from "./init/networkInstance";
import ping from "./modules/ping";
import rx from "./modules/rx";
import tx from "./modules/tx";

export default {
    network: {
        ip: ip(networkInstance),
        ping: ping(networkInstance),
        rx: rx(networkInstance),
        tx: tx(networkInstance)
    }
}
