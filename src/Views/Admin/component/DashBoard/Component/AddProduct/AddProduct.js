import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getDatabase, ref as refDatabase, onValue, set, push, child, update } from "firebase/database";
import { getStorage,  uploadBytes, ref as refStorage } from "firebase/storage";
import { useHistory } from 'react-router-dom';
import "./AddProduct.css";
import AddImgProduct from "./AddImgProduct";
import { Alert } from "react-bootstrap";
import PropTypes from 'prop-types';

AddProduct.propTypes = {
    setMessage: PropTypes.func,
}

function AddProduct(props) {
    const {setMessage} = props;
    const [anotherType, setAnotherType] = useState(false);
    const [anotherCompany, setAnotherCompany] = useState(false);
    const [listCompany, setListCompany] = useState();
    const [listType, setListType] = useState();
    const [imageCompany, setImageCompany] = useState({ preview: "", raw: "", manyraw: "" });
    const [imageProduct, setImageProduct] = useState({ preview: "", raw: "", manyraw: "" });
    const [thumbnailProduct, setThumbnailProduct] = useState({ preview: "", raw: "", manyraw: "" });
    const [success, setSuccess] = useState(false);
    
    const history = useHistory();
    const db = getDatabase();
    const storage = getStorage();
    const { register, handleSubmit, setValue, getValues } = useForm({
        defaultValues: {
            product: {
                name: "",
                price: "",
                image: "",
                color: "",
            },
        },
    });
    useEffect(() => {
        const lsType = refDatabase(db, 'Type' );
            onValue(lsType, (snapshot) => {
                // console.log(Object.keys(snapshot.val()));
                if(snapshot.val())
                    setListType(Object.keys(snapshot.val()));
            });
    },[db])
    // console.log(imageCompany.raw.name)

    function onHandleSubmit(data) {
        // Lắng nghe khi thêm loại sản phẩm mới
        if(anotherType){
            const type = {
                name: data.product.name,
            }
            const updates={}
            updates['/Type/' + data.type + '/' + data.product.name.replace(/\s/g, '')] = type;
            update(refDatabase(db), updates)
        }
        else{ //Thêm 1 sản phẩm mới vào loại sản phẩm đã có sẵn
            const type = {
                name: data.product.name,
            }
            const updates={}
            updates['/Type/' + data.type + '/' + data.product.name.replace(/\s/g, '')] = type;
            update(refDatabase(db), updates)
        }


        // Lắng nghe khi thêm 1 hãng mới
        if(anotherCompany){
            const brandRef = refStorage(storage, imageCompany.raw.name);
            uploadBytes(brandRef, imageCompany.raw).then((snapshot) => {
                console.log('Uploaded a blob or file!');
              });
            // setValue("product.image", `gs://e-commerce-97b0e.appspot.com/${imageCompany.raw.name}` ) Không dùng
            const company = {
                image: `gs://e-commerce-97b0e.appspot.com/${imageCompany.raw.name}`,
            }
            const updates={}
            updates['/Brand_' + data.type + '/' + data.company ] = company;
            update(refDatabase(db), updates)
        }

        // Thêm sản phẩm vào danh sách các thương hiệu
        function addProductToListBrand(){
            const IdProduct = {
                name: data.product.name.replace(/\s/g, '')
            }
            const updates={}
            updates['/Model_' + data.company + '_' + data.type + '/' + data.product.name.replace(/\s/g, '')] = IdProduct;
            update(refDatabase(db), updates)
        }
        addProductToListBrand()

        // Thêm sản phẩm vào danh sách toàn bộ sản phẩm
        function addProductToListProduct(){
            const thumbnailRef = refStorage(storage, thumbnailProduct.raw.name);
            uploadBytes(thumbnailRef, thumbnailProduct.raw).then((snapshot) => {
                console.log('Uploaded a blob or file!');
              });
            let listImg = []
            for (let i = 0; i < imageProduct.manyraw.length; i++) {
                const imageProductRef = refStorage(storage, imageProduct.manyraw[i].name);
                listImg.push(`gs://e-commerce-97b0e.appspot.com/${imageProduct.manyraw[i].name}`)
                uploadBytes(imageProductRef, imageProduct.manyraw[i]).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                });
            }
            setValue("product.image", listImg);
            // console.log(listImg);
            const Product = {
                name: data.product.name,
                price: data.product.price,
                image: JSON.stringify(data.product.image),
                thumbnail: `gs://e-commerce-97b0e.appspot.com/${thumbnailProduct.raw.name}`,
                color: data.product.color,
            }
            const updates={}
            updates['/Product/' +  data.product.name.replace(/\s/g, '')] = Product;
            update(refDatabase(db), updates)
        }
        // addProductToListProduct()
        // setSuccess(true);
        async function Success(){
            await addProductToListProduct();
            setMessage({type: 'success', content: 'Up thành công'})
            history.push(
               {
                pathname: '/DashBoard/Product',
               }
            )
        }
        Success();

        
        // console.log(data);
    }

    function handleChangeType(e) {
        if (e.target.value === "different") {
            setAnotherType(true);
            setValue("type", "");
            setListCompany([])
        } else {
            setAnotherType(false);
            setValue("type", e.target.value);
            const lsCompany = refDatabase(db, 'Brand_' + getValues("type"));
            onValue(lsCompany, (snapshot) => {
                // console.log(Object.keys(snapshot.val()));
                if(snapshot.val())
                    setListCompany(Object.keys(snapshot.val()));
            });
        }
    }

    function handleChangeCompany(e) {
        if (e.target.value === "different") {
            setAnotherCompany(true);
            setValue("company", "");
        } else {
            setAnotherCompany(false);
            setValue("company", e.target.value);
        }
    }

    return (
        <div className="Add-Product container">
            {success && <Alert variant='success'>Đã thêm thành công</Alert>}
            <form onSubmit={handleSubmit(onHandleSubmit)}>
                <div className="row Add-Product-row">
                    <div className="Add-Product-col col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="Add-Product-label-select">
                            <label
                                htmlFor="select-type"
                                className="Add-Product-label"
                            >
                                Loại sản phẩm
                            </label>
                            <div className="Add-Product-select-input">
                                <select
                                    name="select-type"
                                    className="Add-Product-select"
                                    onChange={handleChangeType}
                                >
                                    <option value="">Chọn loại sản phẩm</option>
                                    {listType && listType.map((type)=>{
                                        return (
                                            <option key={type} value={type}>{type}</option>
                                            )
                                    })}
                                    <option value="different">Khác...</option>
                                </select>
                                {anotherType && (
                                    <input
                                        className="Add-Product-input"
                                        {...register("type")}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="Add-Product-col col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div className="Add-Product-label-select">
                            <label
                                htmlFor="select-company"
                                className="Add-Product-label"
                            >
                                Hãng sản phẩm
                            </label>
                            <div className="Add-Product-select-input">
                                <select
                                    name="select-company"
                                    className="Add-Product-select"
                                    onChange={handleChangeCompany}
                                >
                                    <option value="">Chọn hãng sản phẩm</option>
                                    {listCompany && listCompany.map((company)=>{
                                        return (
                                            <option key={company} value={company}>{company}</option>
                                            )
                                    })}
                                    <option value="different">Khác...</option>
                                </select>
                                {anotherCompany && (
                                    <input
                                        className="Add-Product-input"
                                        {...register("company")}
                                    />
                                )}
                            </div>
                        </div>

                        {anotherCompany && (
                        <div className="Add-Product-col">
                            <label>Ảnh thương hiệu</label>
                            <AddImgProduct name={'img-company'} state={imageCompany} setState={setImageCompany}/>
                        </div>
                        )}
                    </div>
                </div>
                <div className="row Add-Product-row">
                    <div className="Add-Product-col Add-Product-col-name-price col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <label>Tên sản phẩm</label>
                        <input
                            className="Add-Product-input"
                            placeholder="Nhập tên sản phẩm"
                            {...register("product.name")}
                        />

                        <label>Giá sản phẩm</label>
                        <input
                            className="Add-Product-input"
                            placeholder="Nhập giá sản phẩm"
                            {...register("product.price")}
                        />

                        <label>Màu sản phẩm</label>
                        <input
                            className="Add-Product-input"
                            placeholder="Xanh, Đỏ, Tím, Vàng"
                            {...register("product.color")}
                        />
                    </div>

                    <div className="Add-Product-col col-sm-12 col-md-6 col-lg-4 col-xl-6">
                        <label>Ảnh thư viện sản phẩm</label>
                        <AddImgProduct name={'img-product'} state={imageProduct} setState={setImageProduct} more={true}/>
                        <br></br>
                        <label>Ảnh sản phẩm</label>
                        <AddImgProduct name={'thumbnail-product'} state={thumbnailProduct} setState={setThumbnailProduct} />
                    </div>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
}

export default AddProduct;
