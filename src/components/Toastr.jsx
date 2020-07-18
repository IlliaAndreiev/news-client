import React from 'react';
import { Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toggleToastr } from '../redux/actions';

const styles = {
    main: {
        position: 'fixed',
        top: '65px',
        right: '12px',
    },
}
const mapStateToProps = (state) => {
    const { toastrReducer: { show, color, text, status} } = state;

    return { show, color, text, status };
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      toggleToastr: toastrData => dispatch(toggleToastr(toastrData))
    }
  }
const Toastr = (props) => {
    const { color, show, status, text, toggleToastr } = props;

    return (
        <Toast style={{...styles.main, background: color}} onClose={() => toggleToastr({ show: false })} show={show} autohide>
            <Toast.Header>
                <strong className="mr-auto">{status}</strong>
            </Toast.Header>
            <Toast.Body>{text}</Toast.Body>
        </Toast>
    )
}

export default connect(mapStateToProps, mapDispatchToProps) (Toastr);