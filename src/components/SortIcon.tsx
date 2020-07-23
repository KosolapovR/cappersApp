import React from 'react';
import {ASC} from "../config/types";

function SortIcon(props: { status: any }) {
    const renderedIcon = props.status ?
        props.status === ASC ?
            <i className="fas fa-sort-amount-down-alt"></i> :
            <i className="fas fa-sort-amount-up"></i>
        :
        <i className="fas fa-sort-amount-down-alt" style={{color: '#999'}}></i>
    ;

    return (
        <>
            {renderedIcon}
        </>);
}

export default SortIcon;
