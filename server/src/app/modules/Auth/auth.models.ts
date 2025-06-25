import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
// import { IName } from '../Tutor/tutor.interface';
export interface UserInterface {
  isPasswordMatched(password: string): unknown;
  _id: string;
  name:string;
  email: string;
  password: string;
  Profileimage:string;
  role: 'admin ' |'user'

}

export interface UserModel extends Model<UserInterface> {
  isUserExists(email: string): Promise<UserInterface | null>;
isPasswordMatched(enteredPassword: string): Promise<boolean>;

}


const UserSchema = new mongoose.Schema<UserInterface, UserModel>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Ensure password is not retrieved by default
    },
   
    Profileimage: {
      type: String,
      required: true ,
      default:"https://media-hosting.imagekit.io//da3192128fbf47ba/icon-7797704_1280.png?Expires=1837355766&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Isi7PB56px8a8YHL36sD-mGFswYDO~JEbKjUzJ7gP~sbSg0tvkuqrHUlt-R71yjeaLw9gEqgsIBDejosr8AyMp~B2n3Z4FDnsTvLeqsue26m7kfNvg3al7OnDpGaTIYztBC3I~F0gg2i3zygw~vhIa2hP8BZp0nOoMTFyzUXq6V0a2zsm0AELELl62VSsHZ-fJV7aItA0D6DRQjMaU0xTfYmbtjszjagi51VuK9MrZou2-2DqqtxA0IkJv83PUMlrjPQS~FCoDowLPoQOkPK17lAazSFv4Bx8Ft6SHKpAPqDbwLgXOqabC6vRa7YOhKa14uBZQxOeL2Bc8L~RBgAZg__",
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
      }
  },
  
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = Number(config.bcrypt_salt_rounds || 10); // fallback default
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error as mongoose.CallbackError);
  }
});

// Check if user exists
UserSchema.statics.isUserExists = async function (email: string) {
  return await Users.findOne({ email }).select("+password");
};
UserSchema.methods.isPasswordMatched = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};


export const Users = mongoose.model<UserInterface, UserModel>("Users", UserSchema);