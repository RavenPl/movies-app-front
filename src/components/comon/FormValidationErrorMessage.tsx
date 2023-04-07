interface Props {
    message: string;
    display: string;
}

export const FormValidationErrorMessage = (props: Props) => {
    return (
        <p style={{display: props.display, backgroundColor: "red"}} className="form-validation-error-message">
            {props.message}
        </p>
    );
};
