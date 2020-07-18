import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import "../App.css";
import Manager from '../api/games/Manager';
import { connect } from 'react-redux';
import { setPlatforms, deletePlatform } from '../redux/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        setPlatforms: platforms => dispatch(setPlatforms(platforms)),
        deletePlatform: id => dispatch(deletePlatform(id))
    }
}

const Admin = (props) => {
    const [platforms, setPlatforms] = useState('');

    const redirectToUpdatePage = (id) => {
        props.history.push(`/update/${id}`)
    }

    const handleDelete = async (id) => {
        try {
            await Manager.deleteplatform(id);
            props.deletePlatform(id)
        } catch (e) {
            console.error('e', e)
        }
    }

    return (
        <div className="card mb-4 shadow-sm">
            <div className="card-body">
                <p className="card-text"></p>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                        {/* <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => redirectToUpdatePage(platform._id)}>Edit</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => handleDelete(platform._id)}>DELETE</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(withRouter(Admin));