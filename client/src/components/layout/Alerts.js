import React from "react";
import PropsTypes from "prop-types";
import {connect} from "react-redux";
 
const Alert = ({alerts}) =>
    alerts!==null &&
    alerts.length >0 &&
    alerts.map(alert=>{
    return <div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
    });

Alert.propsTypes={
    alerts:PropsTypes.array.isRequired
}
const mapStateToProps=state=>({
    alerts:state.alert
})
export default connect(mapStateToProps)(Alert);