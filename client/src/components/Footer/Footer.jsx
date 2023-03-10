import React from "react";

const Footer = () => {
	return (
		<footer className="p-5 flex flex-col items-center">
			<section className="flex justify-between max-w-xl">
				<article className="w-4/6">
					<h3 className="text-xl mb-2">Cozia</h3>
					<p className="footer-body">
						Fresh clothing store that brings us all together for a
						pair of new sets. Stay updated by subscribing to our
						newsletter!
					</p>
					<br />
					<p className="footer-body">
						DISCLAIMER: This is not a real clothing store, so
						purchases are not possible.
					</p>
				</article>
				<article className="flex flex-col">
					<h4 className="text-sm mb-4">FOLLOW US</h4>
					<a
						className="footer-body"
						href="https://github.com/christylex3"
						target="_blank"
						rel="noreferrer"
					>
						Christy Le
					</a>
					<a
						className="footer-body"
						href="https://github.com/mstan19"
						target="_blank"
						rel="noreferrer"
					>
						Melissa Stan
					</a>
				</article>
			</section>
			<section className="">
				<hr className="footer-divider m-4" />
				<p className="footer-label text-center">© 2023 Cozia</p>
			</section>
		</footer>
	);
};

export default Footer;
