import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  name: { type: String, required: true },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    //console.log("Users password:", this.password);
    this.password = await bcrypt.hash(this.password, 5);
    //console.log("Hashed password", this.password);
  }
});

const User = mongoose.model("User", userSchema);
export default User;

/* 데이터 베이스 명령 관련.
show dbs => 모든 데이터베이스 나열.
use xxx => xxx 데이터 베이스 사용.
show collections => 데이터베이스 테이블 나열.
db.xxxx.find() => xxxx 테이블의 모든 값을 나열.
db.xxxx.remove({}) => 해당 테이블의 모든 데이터블 삭제.
*/
