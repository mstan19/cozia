import { ImStarFull, ImStarHalf, ImStarEmpty } from "react-icons/im";

export function calculateDiscountPrice(price, discount) {
	return (price - price * (discount / 100)).toFixed(2);
}

export function sortDateDesc(array) {
	return array.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
}

export function sortByHighPrice(array) {
	return array.sort((a, b) => (a.price > b.price ? -1 : 1));
}

export function sortByLowPrice(array) {
	return array.sort((a, b) => (a.price > b.price ? 1 : -1));
}

export function sortDiscountDesc(array) {
	return array.sort((a, b) => (a.discount > b.discount ? -1 : 1));
}

export function removeHyphensAndCapitalize(string) {
    return string.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
}

export function displayRatings(totalRating) {
	// TODO: See how to include half stars, but mongoose doesn't accept decimals and clothes data won't load
	switch (true) {
		case (totalRating === 0):
			return (
				<>
					<ImStarEmpty />
					<ImStarEmpty />
					<ImStarEmpty />
					<ImStarEmpty />
					<ImStarEmpty />
				</>
			);
		case (0 < totalRating < 1):
			return (
				<>
					<ImStarHalf />
					<ImStarEmpty />
					<ImStarEmpty />
					<ImStarEmpty />
					<ImStarEmpty />
				</>
			);
		case (totalRating === 1):
			return (
				<>
					<ImStarFull />
					<ImStarEmpty />
					<ImStarEmpty />
					<ImStarEmpty />
					<ImStarEmpty />
				</>
			);
		case (1 < totalRating < 2):
			return (
				<>
					<ImStarFull />
					<ImStarEmpty />
					<ImStarEmpty />
					<ImStarEmpty />
					<ImStarEmpty />
				</>
			);
		case 2:
			return (
				<>
					<ImStarFull />
					<ImStarFull />
					<ImStarEmpty />
					<ImStarEmpty />
					<ImStarEmpty />
				</>
			);
		case 3:
			return (
				<>
					<ImStarFull />
					<ImStarFull />
					<ImStarFull />
					<ImStarEmpty />
					<ImStarEmpty />
				</>
			);
		case 4:
			return (
				<>
					<ImStarFull />
					<ImStarFull />
					<ImStarFull />
					<ImStarFull />
					<ImStarEmpty />
				</>
			);
		case 5:
			return (
				<>
					<ImStarFull />
					<ImStarFull />
					<ImStarFull />
					<ImStarFull />
					<ImStarFull />
				</>
			);
		default:
			return <></>;
	}
}