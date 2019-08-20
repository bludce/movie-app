import React, {Component, Fragment} from "react";
import { Link } from "react-router-dom";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      active: false,
    };
  }


  handleShowLogin = (e) => {
    this.setState({active: true});
  }

  handleShowRegister = (e) => {
    this.setState({active: false});
  }

  handleSubmitLogin = (e) => {
    
  }

  render(){
    const { email, password } = this.state;
    return(
      <div className={`container ${this.state.active ? "right-panel-active" : ""}`}>
        <div className="form-container sign-up">
          <form className="form sign-up__form" onSubmit={this.handleRegisterSubmit}> 
            <h1 className="form__title">Create account</h1>
            <span className="form__subtitle">or use your email fo registration</span>
            <input 
              type="text" 
              placeholder="Name" 
              className="form__input" 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="form__input" 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="form__input" 
            />
            <button className="form__btn">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form action="" className="form sign-in__form" onSubmit={this.handleSubmitLogin}>
            <h1 className="form__title">Sign in</h1>
            <span className="form__subtitle">or use your account</span>
            <input 
              type="text" 
              placeholder="Name" 
              className="form__input" 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="form__input" 
            />
            <a href="" className="form__forgot-btn">Forgot your password</a>
            <button className="form__btn">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-panel--left">
              <h1 className="overlay-panel__title">Welcome Back!</h1>
              <p className="overlay-panel__text">To keep connected with us please login with your personal info</p>
              <Link className="overlay-panel__btn" onClick={this.handleShowRegister} to={"/login"}>Sign In</Link>
            </div>
            <div className="overlay-panel overlay-panel--right">
              <h1 className="overlay-panel__title">Hello, Friend!</h1>
              <p className="overlay-panel__text">Enter your personal details and start journey with us</p>
              <Link className="overlay-panel__btn" onClick={this.handleShowLogin} to={"/register"}>SignUp</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
