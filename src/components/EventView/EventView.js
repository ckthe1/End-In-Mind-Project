import React, { Component } from "react";
// import './ViewEventList.css';
import { connect } from 'react-redux';
import ViewEventList from "../ViewEventList/ViewEventList";

class EventView extends Component {

    render() {
        return (
            <div className="event">
                
                    <div>
                        <ViewEventList/>
                    </div>
                
            </div>
        );
    }
}

const reduxMap = reduxState => {
    return reduxState;
}

export default connect(reduxMap)(EventView );