
import { connect } from 'react-redux';
import React, { Component } from 'react'
import { usersFetchRequested } from '../../state-managment-saga/actions/userSagaActions';

class UserSagaList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }
    render() {
        return (
            <div>
                <h1>UserSagaList</h1>
                {this.props.isLoading ? <div>loading data</div> : null}
                {this.props.message ? <div>Error Message : {this.props.message}</div> : null}
                <ul>
                    {
                        this.props.users.map(item => <li><a className="btn btn-outline-secondary m-1">
                            {item.name}
                        </a></li>)
                    }
                </ul>
                <hr />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      users: state.userSagaState.items,
      isLoading: state.userSagaState.isLoading,
      message: state.userSagaState.message,
      
    };
  }


  const mapDispatchToProps = dispatch => {
    return {
        fetchUsers : () => dispatch(usersFetchRequested()),
       
    }
  }

  export default connect(mapStateToProps,mapDispatchToProps)(UserSagaList);
