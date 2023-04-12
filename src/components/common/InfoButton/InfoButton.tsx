import './InfoButton.css'

interface Props {
    title: string;
}

export const InfoButton = (props: Props) => {
    return (
        <div className="info_button_container">
            <button className="info-button">
                {props.title}
            </button>
        </div>
    );
};
