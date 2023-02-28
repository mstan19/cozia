import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import SearchBar from "../../components/SearchBar/SearchBar";
import DeleteModal from "../../components/Modal/DeleteModal";
import samplePic from "../../assets/sample-image-ecommerce.jpg";
import { QUERY_ME, QUERY_MYPRODUCTS } from "../../utils/queries";
import { REMOVE_PRODUCT } from "../../utils/mutations";
import filterIcon from "../../assets/filter.png";
// import { LOGIN_USER } from "../../utils/mutations";


const MyProduct = () => {
	const [userData, setUserData] = useState({});
	const { data, loading } = useQuery(QUERY_ME);
	const {  data: myProductsData, loading:myProductLoading, error:myProductError } = useQuery(QUERY_MYPRODUCTS, {
		variables: { userId: data?.me?._id },
		});
	const [removeProduct] = useMutation(REMOVE_PRODUCT);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedProductId, setSelectedProductId] = useState();

	useEffect(() => {
		const getUserData = async () => {
		  try {
			const token = Auth.loggedIn() ? Auth.getToken() : null;

			if (!token) {
			  return false;
			}
	
			const user = await data?.me;
			setUserData(user);
		  } catch (err) {
			console.error(err);
		  }
		};
	
		getUserData();
	  }, [data]);

	function stockCheck(index) {
		if (myProductsData?.getMyProducts[index].countInStock <= 3) {
			return (<span className="text-red-600">{myProductsData?.getMyProducts[index].countInStock} left</span>);
		} else {
			return (<span className="text-black">{myProductsData?.getMyProducts[index].countInStock} left</span>);
		}
	}
	
	function wordAppearance(input, index) {
		let color = myProductsData?.getMyProducts[index].color;
		let size = myProductsData?.getMyProducts[index].size;
		if (input === "color") {
			let upperCaseFirstLetterColor = color.charAt(0).toUpperCase() + color.slice(1);
			let ArrayString = upperCaseFirstLetterColor.split(/(?=[A-Z])/);
			if (ArrayString.length === 1) {
				return upperCaseFirstLetterColor;
			}
			return ArrayString.join(' ')
		} else if (input === "size") {
			let upperCaseFirstLetterSize = size.charAt(0).toUpperCase() + size.slice(1);
			let ArrayString = upperCaseFirstLetterSize.split(/(?=[A-Z])/);
			if (ArrayString.length === 1) {
				return upperCaseFirstLetterSize;
			}
			return ArrayString.join(' ')
		}
	}
	
	const nav = useNavigate();
	function handleInputChange() {
		console.log("change input");
	}

	function handleAddProductBtn() {
		nav('/addproduct')
	  }

	function handleEditProductBtn () {
		console.log("edit product");
		
	}

	const openModal = (id) => {
		setModalOpen(true);
		setSelectedProductId(id);
	};

	const handleDeleteProductBtn = async (productId) => {
		const token = Auth.loggedIn() ? Auth.getToken() : null;
		if (!token) {
		throw new Error("please login");
		}

		try {
		
		const updatedProducts = await removeProduct({ variables: { productId: productId } });
		if (!productId) {
			throw new Error("there is no product with that id");
		}

		setSelectedProductId(updatedProducts);
		window.location.reload();
		} catch (err) {
		console.error(err);
		}
	}
  
  return (
	<div className="my-product-page">
		 {Auth.loggedIn() ? (
		<div className="">
			<SearchBar />

			<div className="relative flex justify-between items-center sm:grid-cols-3 gap-x-8 gap-y-4" id="my-product-header">
			{/* Add product Card */}
				<button className="add-product row inline-block w-1/5 ml-6 mt-2 rounded-lg text-green-600 hover:text-white border border-green-600 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800" id="add-product-btn"  onClick={handleAddProductBtn} type="submit">Add</button>
			{/* Filter */}
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-block">My Products</div>
				<div className="dropdown-filter py-3 pr-5">
					<button className="inline-block mr-2">		
						<div>
							<select className="w-full block appearance-none bg-white px-4 py-2 pr-8 rounded leading-tight focus:outline-none" name="filter" onChange={handleInputChange} >
								<option value="recentlyAdd">Recently Add</option>
								<option value="mostSold">Most Sold</option>
								<option value="stockLtoH">Stock (Low to High)</option>
								<option value="priceLtoH">Price (Low to High)</option>
								<option value="priceHtoL">Price (High to Low)</option>
							</select>
						</div>
						<div>
							<img src={filterIcon} alt="filter-image" id="filter-image" className="w-7" />	
						</div>
					</button>
				</div>
				
			</div>
				
			<div className="container mx-auto pt-2 mx-5">

				{/* Gallery product Card */}
				<div className="my-product-cards flex flex-wrap w-full grid sm:grid-cols-3 gap-x-8 gap-y-4" id="product-cards">
				{myProductsData && myProductsData.getMyProducts.map((product, index) => { 
					return (
					<div className="my-product-card bg-white px-2 pt-3" key={product._id} >
						<div className="flex justify-center">
							<img src={samplePic} alt="product-image" id="product-image" className="object-cover" />
						</div>

						<div className="content p-5 columns-2">
							<h3 className="text-lg">{product.productName}</h3>
								<div className="">
									<p>Price: ${product.price}</p>
									<p>Stock: {stockCheck(index)}</p>
									<p>Color: {wordAppearance("color", index)}</p>
									<p>Size: {wordAppearance("size", index)}</p>
								</div>
								<div className="grid grid-rows-1 flex-nowrap justify-end py-3">
									<button className="bg-blue-500 rounded-lg my-0.5 hover:bg-blue-500 text-white py-2 px-5 focus:outline-none" id="edit-product-btn" onClick={() => handleEditProductBtn()} type="submit">Edit</button>
									<button className=" bg-red-600 rounded-lg my-0.5 hover:bg-red-600 text-white py-2 px-5 focus:outline-none" id="delete-product-btn" type="button"
									onClick={() => {setModalOpen(true); openModal(product._id)}}>Delete</button>
									{modalOpen && <DeleteModal setOpenModal={setModalOpen} onDeleteFunction={() => handleDeleteProductBtn(selectedProductId)} onDeleteProductID={selectedProductId}/>}
								</div>
						</div>
						
					</div>
				)})}
				</div>

			</div>       
		</div>
		) : (
        <>
			<div>please log in</div>
		</>
		)}
	</div>
	
  );
};
export default MyProduct;
