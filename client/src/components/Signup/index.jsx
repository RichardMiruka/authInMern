import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/users", data);
            console.log(response.data);
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message || "An error occurred");
                alert("Email already exists");
            }
            console.error(error);
        }
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.left}></div>
            <div className={styles.signup_form_container}>
                <h1>Welcome Back</h1>
                <Link to="/login">
                    <button type="button" className={styles.white_btn}>
                        Sign in
                    </button>
                </Link>
            </div>
            <div className={styles.right}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirm_password"
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    {error && <div className={styles.error_message}>{error}</div>}
                    <button type="submit" className={styles.green_btn}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
