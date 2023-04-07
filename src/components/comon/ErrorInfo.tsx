interface Props {
    message: string;
}

export const ErrorInfo = (props: Props) => {

    return (
        <p className="error-info">
            {props.message}
        </p>
    )
};
