import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  renderActions = () => {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <button
          onClick={() => this.props.deleteStream(id)}
          className='ui button negative'
        >
          Delete
        </button>
        <Link to='/' className='ui button'>
          Cancel
        </Link>
      </Fragment>
    );
  };

  renderContent = () => {
    const text = 'Are you sure you want to delete';
    if (!this.props.stream) {
      return `${text} this stream ?`;
    }

    return `${text} the stream with title: "${this.props.stream.title}" ?`;
  };

  render() {
    return (
      <Modal
        title='Delete Stream'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
