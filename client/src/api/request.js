import ip from "./modules/ip";
import {networkInstance} from "./init/networkInstance";
import ping from "./modules/ping";

export default {
    network: {
        ip: ip(networkInstance),
        ping: ping(networkInstance)
    }
}
