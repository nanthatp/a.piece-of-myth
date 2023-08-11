
//       <div className="col-md-9">
//         <h1 className="text-center">All Products</h1>
//       </div>
//       <div className="container-fluid row mt-3 home-page">
//         <div className="col-md-3 filters">
//           <h4 className="text-center">Filter By Category</h4>
//           <div className="d-flex flex-column">
//             {categories?.map((c) => (
//               <Checkbox
//                 key={c._id}
//                 onChange={(e) => handleFilter(e.target.checked, c._id)}
//               >
//                 {c.name}
//               </Checkbox>
//             ))}
//           </div>
//           {/* price filter */}
//           <h4 className="text-center mt-4">Filter By Price</h4>
//           <div className="d-flex flex-column">
//             <Radio.Group onChange={(e) => setRadio(e.target.value)}>
//               {Prices?.map((p) => (
//                 <div key={p._id}>
//                   <Radio value={p.array}>{p.name}</Radio>
//                 </div>
//               ))}
//             </Radio.Group>
//           </div>
//           <div className="d-flex flex-column">
//             <button
//               className="btn btn-danger"
//               onClick={() => window.location.reload()}
//             >
//               RESET FILTERS
//             </button>
//           </div>
//         </div>
//         <div className="col-md-9 ">
//           <h1 className="text-center">All Products</h1>
//           <div className="d-flex flex-wrap">
//             {products?.map((p) => (
//               <div className="card m-2" key={p._id}>
//                 <img
//                   src={`/api/v1/product/product-photo/${p._id}`}
//                   className="card-img-top"
//                   alt={p.name}
//                 />
//                 <div className="card-body">
//                   <div className="card-name-price">
//                     <h5 className="card-title">{p.name}</h5>
//                     <h5 className="card-title card-price">
//                       {p.price.toLocaleString("th", {
//                         style: "currency",
//                         currency: "THB",
//                       })}
//                     </h5>
//                   </div>
//                   <p className="card-text ">
//                     {p.description.substring(0, 60)}...
//                   </p>
//                   <div className="card-name-price">
//                     <button
//                       className="btn btn-info ms-1"
//                       onClick={() => navigate(`/product/${p.slug}`)}
//                     >
//                       More Details
//                     </button>
//                     <button
//                       className="btn btn-dark ms-1"
//                       onClick={() => {
//                         setCart([...cart, p]);
//                         localStorage.setItem(
//                           "cart",
//                           JSON.stringify([...cart, p])
//                         );
//                         toast.success("Item Added to cart");
//                       }}
//                     >
//                       ADD TO CART
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="m-2 p-3">
//             {products && products.length < total && (
//               <button
//                 className="btn loadmore"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPage(page + 1);
//                 }}
//               >
//                 {loading ? (
//                   "Loading ..."
//                 ) : (
//                   <>
//                     {" "}
//                     Loadmore <AiOutlineReload />
//                   </>
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>


//   {/* <video className="video-slide active" src= "/images/dreambanner.mp4" autoPlay muted loop ></video> 
//         <video className="video-slide" src= "/images/127banner.mp4" autoPlay muted loop ></video> 
//         <video className="video-slide" src= "/images/dreambanner.mp4" autoPlay muted loop ></video> 
//         <video className="video-slide" src= "/images/127banner.mp4" autoPlay muted loop ></video> 
//         <div className="content active">
//           <h1>NCT DREAM</h1>
//           <a href="#">Pre-Order Now</a>
//         </div>
//         <div className="content">
//           <h1>NCT 127</h1>
//           <a href="#">Pre-Order Now</a>
//         </div>
//         <div className="content">
//           <h1>NCT DREAM</h1>
//           <a href="#">Pre-Order Now</a>
//         </div>
//         <div className="content">
//           <h1>NCT 127</h1>
//           <a href="#">Pre-Order Now</a>
//         </div>
//         <div className="slider-navigation">
//           <div className="nav-btn active"></div>
//           <div className="nav-btn"></div>
//           <div className="nav-btn"></div>
//           <div className="nav-btn"></div>
//         </div> */}

//===============================Create Category==============================

{/* <Layout title={"Dashboard - Create Category"}>
                    <div className="container-fluid m-3 p-3 dashboard">
                        <div className="row">
                            <div className="col-md-3">
                                <AdminMenu />
                            </div>
                            <div className='col-sm text-center'>
                                <h1>Manage Category</h1>
                                <div className='m-1 w-75'>
                                    <CategoryForm 
                                        handleSubmit={handleSubmit}
                                        value={name}
                                        setValue={setName} 
                                    />
                                </div>
                            </div>
                            <div className="col-md-9 text-center">
                                <div>
                                    <table class="sticky-table-headers">
                                        <thead>
                                            <tr class="sticky-table-headers__sticky">
                                                <th scope="col">Name</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                                {categories.map((c) => (
                                                    <>
                                                        <tr>
                                                            <td key = {c._id}>{c.name}</td>
                                                            <td>
                                                                <button 
                                                                    className='btn btn-primary ms-2' 
                                                                    onClick={() => {
                                                                        setVisible(true);
                                                                        setUpdatedName(c.name);
                                                                        setSelected(c);
                                                                    }}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button 
                                                                    className='btn btn-danger ms-2'
                                                                    onClick={() => {
                                                                        handleDelete(c._id);
                                                                    }}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Modal 
                                    onCancel={() => setVisible(false)}
                                    footer={null}
                                    visible={visible}
                                > 
                                    <CategoryForm 
                                        value={updatedName}
                                        setValue={setUpdatedName}
                                        handleSubmit={handleUpdate}
                                    />

                                </Modal>
                            </div>
                        </div>
                    </div>
             
            
        </Layout> */}


//==============create product=================
{/* <div className="container-fluid m-3 p-3 dashboard">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Manage Product</h1>
                    <div className="m-1 w-75">
                        <Select
                            bordered={false}
                            placeholder="Select a category"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setCategory(value);
                            }}
                        >
                            {categories?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            bordered={false}
                            placeholder="Select a Artist"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setArtist(value);
                            }}
                        >
                            {artists?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <Select
                            bordered={false}
                            placeholder="Select a Member"
                            size="medium"
                            showSearch
                            className="form-select mb-3"
                            onChange={(value) => {
                                setMember(value);
                            }}
                        >
                            {members?.map((c) => (
                                <Option key={c._id} value={c._id}>
                                    {c.name}
                                </Option>
                            ))}
                        </Select>

                        <div className="mb-3">
                            <label className="btn btn-outline-secondary col-md-12">
                                {photo ? photo.name : "Upload Photo"}
                                <input
                                    type="file"
                                    name="photo"
                                    accept="image/*"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                    hidden
                                />
                            </label>
                        </div>
                        <div className="mb-3">
                            {photo && (
                                <div className="text-center">
                                    <img
                                        src={URL.createObjectURL(photo)}
                                        alt="product_photo"
                                        height={"200px"}
                                        className="img img-responsive"
                                    />
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                value={name}
                                placeholder="write a name"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                type="text"
                                value={description}
                                placeholder="write a description"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                value={price}
                                placeholder="write a Price"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                value={quantity}
                                placeholder="write a quantity"
                                className="form-control"
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <Select
                                bordered={false}
                                placeholder="Select Shipping "
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setShipping(value);
                                }}
                            >
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={handleCreate}>
                            CREATE PRODUCT
                            </button>
                        </div>
                    </div>
                </div>

                <div className="uploadWrapper">
                <form id="imageUploadForm" className="imageUploadForm">
                    <span className="helpText" id="helpText">Upload an image</span>
                    <input type="file" id="file" className="uploadButton" accept="image/*" />
                    <div id="uploadedImg" className="uploadedImg">
                    <span className="unveil" />
                    </div>
                    <span className="pickFile">
                    <a href="#" className="pickFileButton">Pick file</a>
                    </span>
                </form>
                </div>

            </div>
        </div> */}

//============== Update Product =========================
        // <div className="row dashboard">
        //         <div className="col-md-3">
        //             <AdminMenu />
        //         </div>
        //         <div className="col-md-9">
        //             <h1>My Product</h1>
        //             <div className="m-1 w-75">
        //                 <Select
        //                     bordered={false}
        //                     placeholder="Select a category"
        //                     size="medium"
        //                     showSearch
        //                     className="form-select mb-3"
        //                     onChange={(value) => {
        //                         setCategory(value);
        //                     }}
        //                     value={category}
        //                 >
        //                     {categories?.map((c) => (
        //                         <op key={c._id} value={c._id}>
        //                             {c.name}
        //                         </op>
        //                     ))}
        //                 </Select>

        //                 <Select
        //                     bordered={false}
        //                     placeholder="Select a Artist"
        //                     size="medium"
        //                     showSearch
        //                     className="form-select mb-3"
        //                     onChange={(value) => {
        //                         setArtist(value);
        //                     }}
        //                     value={artist}
        //                 >
        //                     {artists?.map((c) => (
        //                         <Option key={c._id} value={c._id}>
        //                             {c.name}
        //                         </Option>
        //                     ))}
        //                 </Select>

        //                 <Select
        //                     bordered={false}
        //                     placeholder="Select a Member"
        //                     size="medium"
        //                     showSearch
        //                     className="form-select mb-3"
        //                     onChange={(value) => {
        //                         setMember(value);
        //                     }}
        //                     value={member}
        //                 >
        //                     {members?.map((c) => (
        //                         <Option key={c._id} value={c._id}>
        //                             {c.name}
        //                         </Option>
        //                     ))}
        //                 </Select>

        //                 <div className="mb-3">
        //                     <label className="btn btn-outline-secondary col-md-12">
        //                         {photo ? photo.name : "Upload Photo"}
        //                         <input
        //                             type="file"
        //                             name="photo"
        //                             accept="image/*"
        //                             onChange={(e) => setPhoto(e.target.files[0])}
        //                             hidden
        //                         />
        //                     </label>
        //                 </div>
        //                 <div className="mb-3">
        //                     {photo ? (
        //                         <div className="text-center">
        //                             <img
        //                                 src={URL.createObjectURL(photo)}
        //                                 alt="product_photo"
        //                                 height={"200px"}
        //                                 className="img img-responsive"
        //                             />
        //                         </div>
                            
        //                     ) : (
        //                         <div className="text-center">
        //                             <img
        //                             src={`/api/v1/product/product-photo/${id}`}
        //                             alt="product_photo"
        //                             height={"200px"}
        //                             className="img img-responsive"
        //                             />
        //                         </div>
        //                     )}
        //                 </div>
        //                 <div className="mb-3">
        //                     <input
        //                         type="text"
        //                         value={name}
        //                         placeholder="write a name"
        //                         className="form-control"
        //                         onChange={(e) => setName(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <textarea
        //                         type="text"
        //                         value={description}
        //                         placeholder="write a description"
        //                         className="form-control"
        //                         onChange={(e) => setDescription(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <input
        //                         type="number"
        //                         value={price}
        //                         placeholder="write a Price"
        //                         className="form-control"
        //                         onChange={(e) => setPrice(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <input
        //                         type="number"
        //                         value={quantity}
        //                         placeholder="write a quantity"
        //                         className="form-control"
        //                         onChange={(e) => setQuantity(e.target.value)}
        //                     />
        //                 </div>
        //                 <div className="mb-3">
        //                     <Select
        //                         bordered={false}
        //                         placeholder="Select Shipping "
        //                         size="large"
        //                         showSearch
        //                         className="form-select mb-3"
        //                         onChange={(value) => {
        //                             setShipping(value);
        //                         }}
        //                         value={shipping ? "yes" : "No"}
        //                     >
        //                         <Option value="0">No</Option>
        //                         <Option value="1">Yes</Option>
        //                     </Select>
        //                 </div>
        //                 <div className="mb-3">
        //                     <button className="btn btn-primary" onClick={handleUpdate}>
        //                     UPDATE PRODUCT
        //                     </button>
        //                 </div>
        //                 <div className="mb-3">
        //                     <button className="btn btn-danger" onClick={handleDelete}>
        //                     DELETE PRODUCT
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>