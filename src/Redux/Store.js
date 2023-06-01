import { legacy_createStore } from "redux";
import rootreducer from "./Reducer"

let Store = legacy_createStore(rootreducer)

export default Store