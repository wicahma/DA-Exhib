import React from "react";
import { connect } from "react-redux";

class ProfileComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      user : this.props.dataUser[0]
    })
  }
  render() {
    return (
      <div>
        <h2 className="font-bold text-3xl">Profile</h2>
        <div className="mt-5">
          <form action="put" className="grid grid-cols-2 gap-2">
            <div className="col-span-2">
              <label htmlFor="nickname" className="text-sm font-bold">
                Nickname<span className="text-red-700">*</span>
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="Fill it with your name"
                defaultValue={this.state.user.nickname}
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="fullname" className="text-sm font-bold">
                Full Name<span className="text-red-700">*</span>
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Fill it with your name"
                defaultValue={this.state.user.nama}
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="gender" className="text-sm font-bold">
                Gender<span className="text-red-700">*</span>
              </label>
              <select
                name="gender"
                id="gender"
                className="rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
              >
                <option value="none" disabled>
                  None
                </option>
                <option value="laki-laki">
                  Men{" "}
                </option>
                <option value="perempuan">Women </option>
              </select>
            </div>

            <div className="col-span-1">
              <label htmlFor="birth" className="text-sm font-bold">
                Birth<span className="text-red-700">*</span>
              </label>
              <input
                id="birth"
                name="birth"
                type="date"
                defaultValue={this.state.user.birth}
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
            <div className="col-span-1 row-span-2">
              <label htmlFor="bio" className="text-sm font-bold">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                type="text"
                placeholder="Fill it with your name"
                defaultValue={"Teguh Dwi Cahya Kusuma"}
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500 caret-orange-500 min-h-[214px]"
              />
            </div>
            <div className="col-span-1 space-y-1">
              <label htmlFor="oldpass" className="text-sm font-bold">
                Renew Password
              </label>
              <input
                id="oldpass"
                name="oldpass"
                type="password"
                placeholder="Old Password"
                className="col-span-2 rounded-xl w-full focus:border-orange-500 focus:ring-orange-500"
              />

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
