import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS } from "../../utils/queries";
import { FaStar } from "react-icons/fa";

const ReviewForm = ({ productId, userId }) => {
	const [reviewFormState, setReviewFormState] = useState({
		comment: "",
		rating: "",
	});

	// Star rating useStates
	const [rating, setRating] = useState("");
	const [hover, setHover] = useState(0);
	const stars = Array(5).fill(0);

    // On click, set star rating's value
	const handleOnClick = (index) => {
		let ratingInput = index + 1;
		setRating(JSON.stringify(ratingInput));
	};

    // On hover, display star rating
	const handleMouseOver = (index) => {
		setHover(index + 1);
	};
    
	const handleMouseLeave = () => {
		setHover(0);
	};

	useEffect(() => {
		reviewFormState["rating"] = parseFloat(rating);
	}, [reviewFormState, rating]);

	const [addReview, { error }] = useMutation(ADD_REVIEW, {
		update(cache, { data: { addReview } }) {
			try {
				const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

				cache.writeQuery({
					query: QUERY_REVIEWS,
					data: { reviews: [addReview, ...reviews] },
				});
			} catch (e) {
				console.error(e);
			}
		},
	});

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			reviewFormState["rating"] = parseFloat(reviewFormState.rating);

			const { data } = await addReview({
				variables: {
					reviewData: reviewFormState,
					productId: productId,
					userId: userId,
				},
			});

			setReviewFormState({
				comment: "",
				rating: 0,
			});

			window.location.reload();
		} catch (e) {
			console.error(e);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setReviewFormState({ ...reviewFormState, [name]: value });
	};

	return (
		<div>
			<form
				className="flex-row justify-center justify-space-between-md align-center mb-3"
				onSubmit={handleFormSubmit}
			>
				<div>
					<textarea
						name="comment"
						placeholder="Add your review..."
						value={reviewFormState.comment}
						className="form-input w-full border-2 border-zinc-700 px-1"
						style={{ lineHeight: "2.5" }}
						onChange={handleChange}
					></textarea>
					<div className="flex items-center justify-between">
						<p className="mr-3">Give a star rating:</p>
						<div className="flex text-2xl">
							{stars.map((star, index) => {
								return (
									<FaStar
										key={index}
										style={{ cursor: "pointer", margin: 3 }}
										color={
											(hover || rating) > index
												? "#FFBA5A"
												: "#a9a9a9"
										}
										onClick={() => handleOnClick(index)}
										onMouseOver={() =>
											handleMouseOver(index)
										}
										onMouseLeave={() => handleMouseLeave}
										value={rating}
									/>
								);
							})}
						</div>
					</div>
				</div>

				<button
					className="rounded-lg p-3 my-3 bg-sky-600 text-white drop-shadow-xl text-lg w-full"
					type="submit"
				>
					Submit review
				</button>
			</form>
		</div>
	);
};

export default ReviewForm;
