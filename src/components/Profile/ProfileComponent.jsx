import React from "react";
import { connect } from "react-redux";

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.dataUser,
    };
  }
  render() {
    return (
      <div>
        <h2 className="font-bold text-3xl">Profile</h2>
        <div className="mt-5">
          <form action="put" className="grid grid-cols-2 gap-2">
            <div className="col-span-1">
              <label htmlFor="username" className="text-sm font-bold">
                Username<span className="text-red-700">*</span>
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Fill it with your name"
                defaultValue={this.state.user.username}
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="email" className="text-sm font-bold">
                Email<span className="text-red-700">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Fill it with your mail address"
                defaultValue={this.state.user.email}
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="col-span-2 text-xl font-bold mt-5">
              <h3>Change password</h3>
            </div>
            <div className="col-span-1 space-y-1">
              <label htmlFor="oldpass" className="text-sm font-bold">
                Old Password
              </label>
              <input
                id="oldpass"
                name="oldpass"
                type="password"
                placeholder="Old Password"
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div className="col-span-1 space-y-1">
              <label htmlFor="oldpass" className="text-sm font-bold">
              New Password
              </label>
              <input
                id="newpass"
                name="newpass"
                type="password"
                placeholder="New Password"
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
              />

              <input
                id="newpass"
                name="newpass"
                type="password"
                placeholder="Re - New Password"
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            <div className="col-span-1">
              <p className="font-semibold text-sm">
                <span className="text-red-700">*</span> Must filled and cannot
                empty
              </p>
            </div>
            <div className="col-span-1">
              <button className="bg-orange-400 text-white py-1 px-4 rounded-full hover:bg-orange-500 transition-colors">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataUser: state.handleAPI.dataUser,
});

export default connect(mapStateToProps)(ProfileComponent);
