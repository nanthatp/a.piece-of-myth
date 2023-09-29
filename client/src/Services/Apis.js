import {commonrequest} from "./ApiCall"
import {BASE_URL} from "./helper"

export const exporttocsvfunc = async()=>{
    return await commonrequest("GET",`${BASE_URL}/api/v1/preproduct/preorder-export`,"");
}