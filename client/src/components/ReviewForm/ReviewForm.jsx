import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS } from "../../utils/queries";

const ReviewForm = ({productId, userId}) => {
	// console.log(props);

	const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
	const [reviewFormState, setReviewFormState] = useState({
		comment: "",
		rating: 0,
	});

	const [characterCount, setCharacterCount] = useState(0);

	const [addReview, { error }] = useMutation(ADD_REVIEW);
    // {
		// update(cache, { data: { addReview } }) {
		// 	try {
		// 		const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

		// 		cache.writeQuery({
		// 			query: QUERY_REVIEWS,
		// 			data: { reviews: [addReview, ...reviews] },
		// 		});
		// 	} catch (e) {
		// 		console.error(e);
		// 	}
		// },
	// });

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		try {
			const { data } = await addReview({
				variables: { productId, userId, comment, rating },
			});

			setReviewFormState({
				comment: "",
				rating: 0,
			});
		} catch (e) {
			console.log(e);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		if (name === "comment" && value.length <= 280) {
			setComment(value);
			setCharacterCount(value.length);
			// 	reviewFormState({ ...reviewFormState, [name]: value });
			// 	setCharacterCount(value.length);
			// } else if (name !== "comment") {
			// 	setReviewFormState({ ...reviewFormState, [name]: value });
		}
	};

	// const [review, {error, data}]

	return (
		<div>
			<form
				className="flex-row justify-center justify-space-between-md align-center"
				onSubmit={handleFormSubmit}
			>
				<div>
					<textarea
						name="comment"
						placeholder="Add your review..."
						value={comment}
						className="form-input w-full border-2 border-zinc-700 px-1"
						style={{ lineHeight: "2.5" }}
						onChange={handleChange}
					></textarea>
                    <div>
                        
                    </div>
				</div>

					<button
						onClick={(e) => {
							e.preventDefault();
						}}
						className="rounded-lg p-3 my-3 bg-sky-600 text-white drop-shadow-xl text-lg w-full"
					>
						Write a review
					</button>
			</form>
		</div>
	);
};

export default ReviewForm;
