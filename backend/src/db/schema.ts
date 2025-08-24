import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser extends Document {
   fullName: string
   username: string
   password: string
   isValidPassword(password: string): Promise<boolean>
}

const UserSchema = new mongoose.Schema<IUser>({
   fullName: {
      type: String,
      require: true,
   },
   username: {
      type: String,
      require: true,
      unique: true,
   },
   password: {
      type: String,
      require: true,
   },
})

UserSchema.pre<IUser>('save', async function (next) {
   try {
      if (!this.isModified('password')) return next()

      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
      next()
   } catch (error) {
      next(error as Error)
   }
})

UserSchema.methods.isValidPassword = async function (password: string) {
   try {
      return await bcrypt.compare(password, this.password)
   } catch (error) {
      throw new Error('Password comparsion failed')
   }
}

const typeEnum: string[] = ['image', 'Twitter', 'Youtube', 'Notion']
const ContentSchema = new mongoose.Schema({
   link: {
      type: String,
      require: true,
   },
   type: {
      type: String,
      enum: typeEnum,
      require: true,
   },
   title: {
      type: String,
      require: true,
   },
   tags: [
      {
         type: mongoose.Types.ObjectId,
         ref: 'Tags',
         require: true,
      },
   ],
   date: {
      type: String,
   },
   userId: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      require: true,
   },
})

const TagsSchema = new mongoose.Schema({
   title: {
      type: String,
      require: true,
      unique: true,
   },
})

const LinkSchema = new mongoose.Schema({
   hash: {
      type: String,
   },
   userId: {
      type: mongoose.Types.ObjectId,
      ref: 'Users',
      require: true,
      unique: true,
   },
})
export const Users = mongoose.model('Users', UserSchema)
export const Content = mongoose.model('Content', ContentSchema)
export const Tags = mongoose.model('Tags', TagsSchema)
export const Links = mongoose.model('Links', LinkSchema)
