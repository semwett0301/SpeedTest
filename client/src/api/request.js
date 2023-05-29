import ip from "./modules/ip";
import {mainInstance} from "./init/mainInstance";

export default {
    network: {
        ip: ip(mainInstance)
    }
}
