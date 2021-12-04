import React, { useState } from "react";
import { Avatar, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFirstAid, faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar({ items, cart, setCart }) {
	const [options, setOptions] = useState(Object.values(items));
	const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

	const onSearchBarChange = (_event, item) => {
		if (item == null) return;
		if (item.pk in cart) return;
		cart[item.pk] = 1;
		setCart(cart);
	};

	const onSearchBarFocus = () => {
		setOptions(Object.values(items));
	};

	return (
		<div className="navbar">
			<input type="checkbox" id="nav-check"></input>
			<Link to="/" className="home-link">
				<div className="logo">MEDIKIT</div>
				<FontAwesomeIcon
					size="1x"
					color="white"
					icon={faFirstAid}
				></FontAwesomeIcon>
			</Link>
			<Autocomplete
				className="searchbar"
				options={options}
				getOptionLabel={(item) => item.name}
				onChange={onSearchBarChange}
				onFocus={onSearchBarFocus}
				renderInput={(params) => (
					<TextField {...params} label="Search" variant="outlined" />
				)}
			/>
			<label for="nav-check">
				<span></span>
				<span></span>
				<span></span>
			</label>
			<div className="button-container">
				{isAuthenticated ? (
					<>
						<div className="avatar">
							<Avatar>
								<FontAwesomeIcon
									icon={faUser}
								></FontAwesomeIcon>
							</Avatar>
						</div>
						<Link to="owner/FXL4Q4">
							<button className="login-btn">My Pharmacy</button>
						</Link>
						<Link to="/video">
							<button className="login-btn">
								Consult Doctor
							</button>
						</Link>
						<button
							className="login-btn"
							onClick={() =>
								logout({ returnTo: window.location.origin })
							}
						>
							LogOut
						</button>
					</>
				) : (
					<>
						<Link onClick={() => loginWithRedirect()}>
							<button className="login-btn">Log In</button>
						</Link>
						<Link to="owner/FXL4Q4">
							<button className="login-btn">My Pharmacy</button>
						</Link>

						<Link to="/video">
							<button className="login-btn">
								Consult Doctor
							</button>
						</Link>
					</>
				)}
			</div>
		</div>
	);
}
