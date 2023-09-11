import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUser } from '../../state-management-thunk/actions/userThunkActions';
export const UserListThunk = () => {

    const users = useSelector(store => store.userThunkState.items);
    const isLoading = useSelector(store => store.userThunkState.isLoading);
    const dispatch = useDispatch();
    React.useEffect(() => {
        getAllUser(dispatch);
    }, [])

    return (
        <div>
            <h2>UserList</h2>
            <ul>
                {users.map(item =>
                    <li key={item.id}>{item.name}--{item.phone}
                        {/* <button onClick={() => dispatch(productRemove(item.id))}>Remove</button> */}
                    </li>)}
            </ul>

        </div>
    )
}
