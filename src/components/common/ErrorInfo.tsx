interface Props {
    message: string;
    style?: {};
}

export const ErrorInfo = (props: Props) => {

    return (
        <p className="error-info">
            {props.message}
        </p>
    )
};
