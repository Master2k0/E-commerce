import React from 'react';
import PropTypes from 'prop-types';
import upload from "../../../../../../img/pngwing.com.png";

AddImgProduct.propTypes = {
    name: PropTypes.string,
    state: PropTypes.object,
    setState: PropTypes.func,
    more: PropTypes.bool,
};

function AddImgProduct(props) {
    const {name, state, setState, more} = props;
    function handleUpload(e){
        if (e.target.files.length) {
            setState({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0],
                manyraw: e.target.files,
            });
        }
    }
    return (
        <div>
            <label
                style={{width: '300px'}}
                htmlFor={name}
                className="Add-Product-label"
            >
            {state.preview ? (
                <img
                    src={state.preview}
                    alt="Ảnh logo"
                    style={{
                        backgroundSize: "contain",
                        width: "300px",
                    }}
                />
            ) : (
                <div>
                    <img src={upload} alt="Ảnh Logo" />
                </div>
            )}
            </label>
            <input
                type="file"
                id={name}
                style={{ display: "none" }}
                onChange={handleUpload}
                multiple={more}
            />
        </div>
    );
}

export default AddImgProduct;