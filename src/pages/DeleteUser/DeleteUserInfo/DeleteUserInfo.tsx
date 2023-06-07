import "./DeleteUserInfo.css";

interface Props {
    setConfirmed: (val: boolean | null) => void;
    deleteUser: () => void;
}

export const DeleteUserInfo = (props: Props) => {
    return (
        <div className="delete-user">
            <h3>Do you really want to delete your account?</h3>
            <button onClick={() => props.deleteUser()}>YES!</button>
            <button onClick={() => props.setConfirmed(false)}>NO!</button>
        </div>
    );
};
