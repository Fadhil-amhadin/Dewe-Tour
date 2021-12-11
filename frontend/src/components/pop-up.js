function Popup({setPopup}){
    return(
        <div className="popupBackground">
            <div className="popupContainer">
                <div className="popupContent">
                    <p>Your payment will be confirmed within 1 x 24 hours</p>
                    <p>To see order click <b><p onClick={() => setPopup(false)}>Here</p></b> thank you</p>
                </div>
            </div>
        </div>
    )
}

export default Popup;